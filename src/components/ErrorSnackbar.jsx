import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const ErrorSnackbar = ({ message, onClose }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: 20, x: "-50%" }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{
                        position: 'fixed',
                        bottom: '32px',
                        left: '50%',
                        backgroundColor: '#263238', // Charcoal / Almost Black
                        color: '#ECEFF1', // Soft white for text
                        border: '1px solid #455A64', // Subtle integration border
                        padding: '12px 24px',
                        borderRadius: '50px',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)', // Subtle shadow
                        display: 'flex',
                        alignItems: 'center',

                        zIndex: 2000, // Higher than modal
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        fontSize: '0.95rem'
                    }}
                >

                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ErrorSnackbar;
