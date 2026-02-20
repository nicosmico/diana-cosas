import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';

import { getDaysElapsed } from '../data/loveData';
import { useEquivalencePoolContext } from '../context/EquivalencePoolContext';

// ─── Greeting según hora ─────────────────────────────────────────
const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { title: 'Buenos días Diana ☀️', message: 'Que tengas lindo día,' };
    if (hour < 21) return { title: 'Hola Diana!', message: 'Que tengas linda tarde,' };
    return { title: 'Buenas noches Diana 🌙', message: 'Que descanses,' };
};

// ─── Componente ───────────────────────────────────────────────────
const LovePopup = ({ isOpen, onClose }) => {
    const { title, message } = getGreeting();
    const days = getDaysElapsed();
    const { pickEquivalence } = useEquivalencePoolContext();

    const [current, setCurrent] = useState(null);
    const [showCounter, setShowCounter] = useState(false);
    const [showExtra, setShowExtra] = useState(false);

    // Al abrir: elegir equivalencia del pool y programar reveals
    useEffect(() => {
        if (!isOpen) {
            setShowCounter(false);
            setShowExtra(false);
            return;
        }

        const picked = pickEquivalence(current?._id ?? null);
        setCurrent(picked);
        setShowCounter(false);
        setShowExtra(false);

        const counterTimer = setTimeout(() => setShowCounter(true), 3000);
        const extraTimer = setTimeout(() => setShowExtra(true), 8000);
        return () => {
            clearTimeout(counterTimer);
            clearTimeout(extraTimer);
        };
    }, [isOpen]);

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
                        layout
                        initial={{ scale: 0.5, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            padding: '40px',
                            borderRadius: '24px',
                            maxWidth: '90%',
                            width: '400px',
                            textAlign: 'center',
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                            position: 'relative',
                            border: '2px solid #FFCDD2',
                            backdropFilter: 'blur(10px)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Botón cerrar */}
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '12px',
                                right: '12px',
                                background: 'transparent',
                                border: 'none',
                                color: '#9CA3AF',
                                cursor: 'pointer',
                                padding: '8px',
                                borderRadius: '50%',
                                transition: 'background-color 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F5F5F5'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <X size={24} />
                        </button>

                        {/* Corazón */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            style={{ display: 'inline-block', marginBottom: '16px' }}
                        >
                            <div style={{
                                backgroundColor: '#FFEBEE',
                                padding: '24px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 10px 20px rgba(255, 235, 238, 0.5)',
                            }}>
                                <Heart size={56} fill="#E57373" color="#E57373" />
                            </div>
                        </motion.div>

                        {/* Título */}
                        <h2 style={{
                            margin: '0 0 8px 0',
                            color: '#2C3E50',
                            fontSize: '2rem',
                            fontWeight: 700,
                            fontFamily: '"Lora", serif',
                            letterSpacing: '-0.02em',
                        }}>
                            {title}
                        </h2>

                        {/* Mensaje principal */}
                        <p style={{
                            margin: '0 0 24px 0',
                            color: '#546E7A',
                            fontSize: '1.15rem',
                            lineHeight: 1.6,
                            fontFamily: '"Outfit", sans-serif',
                        }}>
                            {message} <br />
                            <span style={{ color: '#E57373', fontWeight: 600 }}>te quiero mucho.</span>
                        </p>

                        {/* Divider + Contador — solo se montan cuando showCounter es true */}
                        <AnimatePresence>
                            {showCounter && (
                                <motion.div
                                    key="counter"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div style={{
                                        width: '40px',
                                        height: '2px',
                                        backgroundColor: '#FFCDD2',
                                        margin: '0 auto 20px',
                                        borderRadius: '2px',
                                    }} />
                                    <p style={{
                                        margin: '0 0 6px 0',
                                        fontSize: '0.85rem',
                                        color: '#90A4AE',
                                        fontFamily: '"Outfit", sans-serif',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                    }}>
                                        Han pasado
                                    </p>
                                    <p style={{
                                        margin: '0 0 4px 0',
                                        fontSize: '2.6rem',
                                        fontWeight: 700,
                                        color: '#E57373',
                                        fontFamily: '"Lora", serif',
                                        lineHeight: 1,
                                    }}>
                                        {days}
                                    </p>
                                    <p style={{
                                        margin: '0 0 16px 0',
                                        fontSize: '0.9rem',
                                        color: '#90A4AE',
                                        fontFamily: '"Outfit", sans-serif',
                                    }}>
                                        días desde la primera vez que salimos
                                    </p>

                                    {/* Equivalencia */}
                                    <div style={{
                                        backgroundColor: '#FFF8F8',
                                        border: '1px solid #FFCDD2',
                                        borderRadius: '12px',
                                        padding: '12px 16px',
                                        minHeight: '56px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                    }}>
                                        <span style={{ fontSize: '1.3rem' }}>{current.icon}</span>
                                        <p style={{
                                            margin: 0,
                                            fontSize: '0.85rem',
                                            color: '#546E7A',
                                            fontFamily: '"Outfit", sans-serif',
                                            lineHeight: 1.4,
                                        }}>
                                            Eso equivale a <strong>{current.getEquivalence(days)}</strong>
                                        </p>
                                    </div>

                                    {/* Extra messages — solo se montan cuando showExtra es true */}
                                    <AnimatePresence>
                                        {showExtra && current.extraMessages && current.extraMessages.map((msg, i) => (
                                            <motion.p
                                                key={`${equivIndex}-${i}`}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ delay: i * 0.5, duration: 0.4 }}
                                                style={{
                                                    margin: '8px 0 0 0',
                                                    fontSize: '0.8rem',
                                                    color: '#90A4AE',
                                                    fontFamily: '"Outfit", sans-serif',
                                                    fontStyle: 'italic',
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                {msg}
                                            </motion.p>
                                        ))}
                                    </AnimatePresence>

                                </motion.div>
                            )}
                        </AnimatePresence>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LovePopup;
