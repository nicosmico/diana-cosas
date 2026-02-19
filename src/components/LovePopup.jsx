import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';

const LovePopup = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            padding: '40px',
                            borderRadius: '24px',
                            maxWidth: '90%',
                            width: '400px',
                            textAlign: 'center',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
                            position: 'relative',
                            border: '2px solid #FFEBEE',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: 'transparent',
                                color: '#9CA3AF',
                                cursor: 'pointer'
                            }}
                        >
                            <X size={20} />
                        </button>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            style={{ display: 'inline-block', marginBottom: '20px' }}
                        >
                            <div style={{
                                backgroundColor: '#FFEBEE', /* Pastel red background circle */
                                padding: '20px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Heart size={48} fill="#E57373" color="#E57373" />
                            </div>
                        </motion.div>

                        <h2 style={{
                            margin: '0 0 16px 0',
                            color: '#2C3E50',
                            fontSize: '1.8rem',
                            fontWeight: 600
                        }}>
                            Hola Diana
                        </h2>

                        <p style={{
                            margin: 0,
                            color: '#546E7A',
                            fontSize: '1.1rem',
                            lineHeight: 1.6
                        }}>
                            Que tengas lindo día, <br />
                            <span style={{ color: '#E57373', fontWeight: 600 }}>te quiero mucho.</span>
                        </p>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LovePopup;
