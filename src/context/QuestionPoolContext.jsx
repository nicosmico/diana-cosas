import React, { createContext, useContext } from 'react';
import useQuestionPool from '../hooks/useQuestionPool';

const QuestionPoolContext = createContext(null);

/** Proveedor — envuelve la app para compartir el pool entre componentes */
export const QuestionPoolProvider = ({ children }) => {
    const pool = useQuestionPool();
    return (
        <QuestionPoolContext.Provider value={pool}>
            {children}
        </QuestionPoolContext.Provider>
    );
};

/** Hook de consumo — usar en cualquier componente hijo */
export const useQuestionPoolContext = () => {
    const ctx = useContext(QuestionPoolContext);
    if (!ctx) throw new Error('useQuestionPoolContext debe usarse dentro de QuestionPoolProvider');
    return ctx;
};
