import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

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
                        backgroundColor: '#FF5252',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '50px',
                        boxShadow: '0 8px 24px rgba(255, 82, 82, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        zIndex: 2000, // Higher than modal
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        fontSize: '0.95rem'
                    }}
                >
                    <AlertCircle size={20} strokeWidth={2.5} />
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ErrorSnackbar;
