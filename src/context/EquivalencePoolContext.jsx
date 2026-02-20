import React, { createContext, useContext } from 'react';
import useEquivalencePool from '../hooks/useEquivalencePool';

const EquivalencePoolContext = createContext(null);

/** Proveedor — envuelve la app para compartir el pool entre componentes */
export const EquivalencePoolProvider = ({ children }) => {
    const pool = useEquivalencePool();
    return (
        <EquivalencePoolContext.Provider value={pool}>
            {children}
        </EquivalencePoolContext.Provider>
    );
};

/** Hook de consumo */
export const useEquivalencePoolContext = () => {
    const ctx = useContext(EquivalencePoolContext);
    if (!ctx) throw new Error('useEquivalencePoolContext debe usarse dentro de EquivalencePoolProvider');
    return ctx;
};
