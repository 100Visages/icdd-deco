import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc,
  deleteDoc, 
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { ShopProduct, StaffMember, ClientQuote, ClientMessage } from '../types';
import { ICDD_SHOP_PRODUCTS } from '../data/shop';
import { INITIAL_STAFF_MEMBERS } from '../data/staff';

export function useShopProducts() {
  const [products, setProducts] = useState<ShopProduct[]>(ICDD_SHOP_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, 'shop_products');
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: ShopProduct[] = snapshot.docs.map(d => ({
            id: d.id,
            ...(d.data() as Omit<ShopProduct, 'id'>)
          }));
          setProducts(list);
        } else {
          // Fallback to initial catalogue if none created yet
          setProducts(ICDD_SHOP_PRODUCTS);
        }
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'shop_products');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const saveProduct = async (product: ShopProduct) => {
    const docId = product.id || 'p_' + Date.now();
    const docRef = doc(db, 'shop_products', docId);
    await setDoc(docRef, {
      ...product,
      id: docId,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return docId;
  };

  const deleteProduct = async (productId: string) => {
    const docRef = doc(db, 'shop_products', productId);
    await deleteDoc(docRef);
  };

  return { products, loading, saveProduct, deleteProduct };
}

export function useStaffMembers() {
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF_MEMBERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, 'staff_members');
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: StaffMember[] = snapshot.docs.map(d => ({
            id: d.id,
            ...(d.data() as Omit<StaffMember, 'id'>)
          }));
          list.sort((a, b) => (a.order || 99) - (b.order || 99));
          setStaff(list);
        } else {
          // Fallback to initial team
          setStaff(INITIAL_STAFF_MEMBERS);
        }
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'staff_members');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const saveStaffMember = async (member: StaffMember) => {
    const docId = member.id || 'staff_' + Date.now();
    const docRef = doc(db, 'staff_members', docId);
    await setDoc(docRef, {
      ...member,
      id: docId,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    return docId;
  };

  const deleteStaffMember = async (memberId: string) => {
    const docRef = doc(db, 'staff_members', memberId);
    await deleteDoc(docRef);
  };

  return { staff, loading, saveStaffMember, deleteStaffMember };
}

export function useQuotes() {
  const [quotes, setQuotes] = useState<ClientQuote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, 'quotes');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: ClientQuote[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<ClientQuote, 'id'>)
        }));
        setQuotes(list);
        setLoading(false);
      },
      (error) => {
        // Fallback without orderBy in case index or field missing
        const fallbackUnsubscribe = onSnapshot(
          colRef,
          (fallbackSnapshot) => {
            const list: ClientQuote[] = fallbackSnapshot.docs.map((d) => ({
              id: d.id,
              ...(d.data() as Omit<ClientQuote, 'id'>)
            }));
            setQuotes(list);
            setLoading(false);
          },
          (fallbackError) => {
            handleFirestoreError(fallbackError, OperationType.GET, 'quotes');
            setLoading(false);
          }
        );
        return () => fallbackUnsubscribe();
      }
    );

    return () => unsubscribe();
  }, []);

  const updateQuoteStatus = async (quoteId: string, status: 'pending' | 'in_review' | 'contacted') => {
    const docRef = doc(db, 'quotes', quoteId);
    await updateDoc(docRef, { status });
  };

  const deleteQuote = async (quoteId: string) => {
    const docRef = doc(db, 'quotes', quoteId);
    await deleteDoc(docRef);
  };

  return { quotes, loading, updateQuoteStatus, deleteQuote };
}

export function useContactMessages() {
  const [messages, setMessages] = useState<ClientMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, 'messages');
    const q = query(colRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: ClientMessage[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<ClientMessage, 'id'>)
        }));
        setMessages(list);
        setLoading(false);
      },
      (error) => {
        const fallbackUnsubscribe = onSnapshot(
          colRef,
          (fallbackSnapshot) => {
            const list: ClientMessage[] = fallbackSnapshot.docs.map((d) => ({
              id: d.id,
              ...(d.data() as Omit<ClientMessage, 'id'>)
            }));
            setMessages(list);
            setLoading(false);
          },
          (fallbackError) => {
            handleFirestoreError(fallbackError, OperationType.GET, 'messages');
            setLoading(false);
          }
        );
        return () => fallbackUnsubscribe();
      }
    );

    return () => unsubscribe();
  }, []);

  const updateMessageStatus = async (messageId: string, status: 'unread' | 'read') => {
    const docRef = doc(db, 'messages', messageId);
    await updateDoc(docRef, { status });
  };

  const deleteMessage = async (messageId: string) => {
    const docRef = doc(db, 'messages', messageId);
    await deleteDoc(docRef);
  };

  return { messages, loading, updateMessageStatus, deleteMessage };
}
