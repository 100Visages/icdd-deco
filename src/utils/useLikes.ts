import { useState, useEffect, useCallback } from 'react';

// Generates a deterministic baseline number of likes (between 21 and 94) based on string ID
function getBaselineLikes(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  const abs = Math.abs(hash);
  return 22 + (abs % 73); // yields likes between 22 and 94
}

const STORAGE_LIKED_IDS = 'icdd_liked_realisation_ids_v1';
const STORAGE_LIKES_DELTAS = 'icdd_likes_count_deltas_v1';

export function useLikes() {
  const [likedIds, setLikedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LIKED_IDS);
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const [deltas, setDeltas] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LIKES_DELTAS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LIKED_IDS, JSON.stringify(Array.from(likedIds)));
    } catch (e) {
      console.error('Error saving liked IDs:', e);
    }
  }, [likedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LIKES_DELTAS, JSON.stringify(deltas));
    } catch (e) {
      console.error('Error saving like deltas:', e);
    }
  }, [deltas]);

  const isLiked = useCallback((id: string): boolean => {
    return likedIds.has(id);
  }, [likedIds]);

  const getLikesCount = useCallback((id: string): number => {
    const base = getBaselineLikes(id);
    const delta = deltas[id] || 0;
    return Math.max(0, base + delta);
  }, [deltas]);

  const toggleLike = useCallback((id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      const currentlyLiked = next.has(id);
      if (currentlyLiked) {
        next.delete(id);
      } else {
        next.add(id);
      }

      setDeltas((prevDeltas) => {
        const currentDelta = prevDeltas[id] || 0;
        return {
          ...prevDeltas,
          [id]: currentlyLiked ? currentDelta - 1 : currentDelta + 1
        };
      });

      return next;
    });
  }, []);

  return {
    isLiked,
    getLikesCount,
    toggleLike
  };
}
