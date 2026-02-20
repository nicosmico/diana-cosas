import { useState, useCallback } from 'react';
import { questions } from '../data/questions';

const STORAGE_KEY = 'diana_seen_question_ids';
const TOTAL = questions.length;

/**
 * Hook que gestiona el pool de preguntas con persistencia en localStorage.
 *
 * Lógica:
 *  - Guarda en localStorage los IDs de las preguntas ya mostradas.
 *  - Al pedir una pregunta, filtra las no vistas y elige una al azar.
 *  - Si ya se vieron todas (pool vacío), elige cualquiera sin limpiar localStorage.
 *  - El localStorage nunca se resetea automáticamente.
 *
 * Expone:
 *  - pickQuestion()  → devuelve la pregunta elegida
 *  - seenCount       → cuántas preguntas distintas se han visto
 *  - totalCount      → total de preguntas disponibles
 *  - allSeen         → true cuando seenCount >= totalCount
 *  - resetPool()     → limpia el historial manualmente (útil en devtools)
 */
const useQuestionPool = () => {
    const readSeenIds = () => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
        } catch {
            return [];
        }
    };

    // Estado reactivo para que los componentes re-rendericen al cambiar
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
     * Devuelve una pregunta al azar.
     * Prioriza las no vistas; si no quedan, elige de todas.
     */
    const pickQuestion = useCallback(() => {
        const seenIds = readSeenIds();
        const unseen = questions.filter(q => !seenIds.includes(q.id));

        // Si quedan preguntas no vistas, elige de ahí; si no, de todas
        const pool = unseen.length > 0 ? unseen : questions;

        console.log(
            `[QuestionPool] Vistas: ${seenIds.length}/${TOTAL} | Pool disponible: ${pool.length} | Unseen: ${unseen.length}`
        );

        const picked = pool[Math.floor(Math.random() * pool.length)];
        markAsSeen(picked.id);
        return picked;
    }, [markAsSeen]);

    /** Limpia historial manualmente desde devtools si hace falta */
    const resetPool = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setSeenCount(0);
        console.log('[QuestionPool] Historial limpiado manualmente.');
    }, []);

    return {
        pickQuestion,
        resetPool,
        seenCount,
        totalCount: TOTAL,
        allSeen: seenCount >= TOTAL,
    };
};

export default useQuestionPool;
