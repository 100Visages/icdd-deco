# Security Specification for ICDD Architecture Firebase Integration

## 1. Data Invariants
1. **Quote Ownership & Integrity**: Any quote submission must validate minimum name and email lengths, ensure the surface area and budgets are positive numbers, limit strings to prevent denial-of-wallet resource attacks, and record the server time `request.time`. If authenticated, `userId` must match `request.auth.uid`. If anonymous/unauthenticated guest, `userId == 'guest'`.
2. **Contact Message Integrity**: Contact messages require valid sender name, email, subject, message body within 2,000 characters, and exact `createdAt == request.time`. Unauthenticated visitors may submit inquiries with `userId == 'guest'`, but cannot list or read other clients' messages.
3. **Favorites Isolation**: User project bookmarks in `/users/{userId}/favorites/{projectId}` are strictly isolated using path-based RBAC. Only the authenticated user matching `userId` can read, create, or delete their favorites.
4. **Default Deny Catch-All**: All unmapped paths are closed by default (`match /{document=**} { allow read, write: if false; }`).

## 2. The Dirty Dozen Test Payloads
1. **Ghost Field in Quote**: Submitting `{ "adminFlag": true, ...validFields }` -> Denied by strict key check.
2. **Identity Spoof in Quote**: Authenticated user 'userA' setting `userId: 'userB'` -> Denied.
3. **Tampered Timestamp in Quote**: Setting `createdAt` to arbitrary future/past timestamp instead of `request.time` -> Denied.
4. **Gigantic Payload Injection**: `clientMessage` exceeding 2000 characters -> Denied by size constraint.
5. **ID Poisoning in Favorites**: Using a 500-character malicious path ID -> Denied by `isValidId()`.
6. **Cross-User Favorite Read**: User 'userA' attempting to read `/users/userB/favorites/p1` -> Denied by `isOwner(userId)`.
7. **Cross-User Favorite Write**: User 'userA' attempting to write to `/users/userB/favorites/p1` -> Denied.
8. **Blanket Message Listing**: Unauthenticated visitor attempting to query all client messages -> Denied.
9. **Malicious Negative Surface Area**: Submitting `surfaceArea: -100` -> Denied.
10. **Quote Status Escalation**: Standard user attempting to modify quote status directly without authorization -> Denied.
11. **Malicious Empty Message**: Submitting empty string message -> Denied by minimum length check.
12. **Random Collection Write**: Writing to arbitrary `/admins` or `/{document=**}` -> Denied.
