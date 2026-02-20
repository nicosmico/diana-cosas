import { useState, useCallback } from 'react';
import { EQUIVALENCES } from '../data/loveData';

const STORAGE_KEY = 'diana_seen_equivalence_ids';
const TOTAL = EQUIVALENCES.length;

/**
 * Hook que gestiona el pool de equivalencias con persistencia en localStorage.
 *
 * Lógica:
 *  - Guarda en localStorage los `id` de equivalencias ya mostradas.
 *  - Al pedir una, filtra las no vistas y elige al azar.
 *  - Nunca repite la misma dos veces seguidas (excluye lastId).
 *  - Si ya se vieron todas, elige de cualquiera sin limpiar localStorage.
 *
 * Expone:
 *  - pickEquivalence(lastId?)  → devuelve la equivalencia elegida
 *  - seenCount                 → cuántas distintas se han visto
 *  - totalCount                → total de equivalencias
 *  - allSeen                   → true cuando seenCount >= totalCount
 *  - resetPool()               → limpia historial manualmente
 */
const useEquivalencePool = () => {
    const readSeenIds = () => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
        } catch {
            return [];
        }
    };

    const [seenCount, setSeenCount] = useState(() => readSeenIds().length);

    const markAsSeen = useCallback((id) => {
        try {
            const seen = readSeenIds();
            if (!seen.includes(id)) {
                const updated = [...seen, id];
                localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                setSeenCount(updated.length);
            }
        } catch {
            // localStorage no disponible
        }
    }, []);

    /**
     * Devuelve una equivalencia al azar.
     * @param {string|null} lastId - id de la última mostrada (para no repetir)
     */
    const pickEquivalence = useCallback((lastId = null) => {
        const seenIds = readSeenIds();
        const unseen = EQUIVALENCES.filter(e => !seenIds.includes(e.id));

        // Priorizar no vistas; si no quedan, usar todas
        let pool = unseen.length > 0 ? unseen : EQUIVALENCES;

        // Nunca repetir la misma dos veces seguidas
        const withoutLast = pool.filter(e => e.id !== lastId);
        if (withoutLast.length > 0) pool = withoutLast;

        console.log(
            `[EquivalencePool] Vistas: ${seenIds.length}/${TOTAL} | Pool: ${pool.length} | Unseen: ${unseen.length}`
        );

        const picked = pool[Math.floor(Math.random() * pool.length)];
        markAsSeen(picked.id);
        return picked;
    }, [markAsSeen]);

    const resetPool = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setSeenCount(0);
        console.log('[EquivalencePool] Historial limpiado.');
    }, []);

    return {
        pickEquivalence,
        resetPool,
        seenCount,
        totalCount: TOTAL,
        allSeen: seenCount >= TOTAL,
    };
};

export default useEquivalencePool;
