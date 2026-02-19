import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { questions } from '../data/questions';
import { errorMessages } from '../data/errorMessages';
import ErrorSnackbar from './ErrorSnackbar';
import { vibratePattern } from '../utils/vibration';

const SecurityPopup = ({ isOpen, onClose, onCorrectAnswer }) => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [shake, setShake] = useState(false);

    // State for error messages
    const [availableErrors, setAvailableErrors] = useState([...errorMessages]);
    const [currentError, setCurrentError] = useState(null);

    // Audio cache
    const audioCache = React.useRef({});

    // Preload sounds on mount
    useEffect(() => {
        errorMessages.forEach(msg => {
            if (msg.sound && !audioCache.current[msg.sound]) {
                const audio = new Audio(msg.sound);
                audio.preload = 'auto'; // Request preload
                audioCache.current[msg.sound] = audio;
            }
        });
    }, []);

    useEffect(() => {
        if (isOpen) {
            // Pick a random question each time it opens
            const randomIndex = Math.floor(Math.random() * questions.length);
            setCurrentQuestion(questions[randomIndex]);
            setShake(false);
            setCurrentError(null);
            // Reset errors pool if needed, or keep history? 
            // Better to keep history across opens if we want strict non-repeat, 
            // but resetting on new attempt is fine too. Let's keep history for now.
        }
    }, [isOpen]);

    const handleOptionClick = (option) => {
        if (option === currentQuestion.correctAnswer) {
            onCorrectAnswer();
        } else {
            // Incorrect answer animation
            vibratePattern(100); // Error vibration
            setShake(true);
            setTimeout(() => setShake(false), 500);

            // Show random, unique error message
            let pool = availableErrors;
            if (pool.length === 0) {
                pool = [...errorMessages]; // Reset if exhausted
            }

            const randomIndex = Math.floor(Math.random() * pool.length);
            const errorData = pool[randomIndex];

            setCurrentError(errorData.text);

            // Play error sound - use preloaded if available
            try {
                let audio = audioCache.current[errorData.sound];

                if (!audio) {
                    audio = new Audio(errorData.sound);
                } else {
                    audio.currentTime = 0; // Reset to start if reusing
                }

                audio.play().catch(e => console.error("Audio play failed:", e));
            } catch (e) {
                console.error("Audio creation failed:", e);
            }

            // Remove used message from pool
            const newPool = pool.filter((_, index) => index !== randomIndex);
            setAvailableErrors(newPool);
        }
    };

    if (!currentQuestion) return null;

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            zIndex: 1000,
                            backdropFilter: 'blur(3px)'
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                x: shake ? [0, -10, 10, -10, 10, 0] : 0
                            }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                                x: { duration: 0.4 } // Shake duration
                            }}
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slightly more transparent for glassmorphism
                                padding: '24px', // Reduced padding for better mobile fit
                                borderRadius: '24px',
                                maxWidth: '90%',
                                width: '450px',
                                maxHeight: '85vh', // Prevent taking full height
                                overflowY: 'auto', // Allow scrolling if content is too tall
                                textAlign: 'center',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                                position: 'relative',
                                border: '2px solid #E3F2FD', // Pastel blue border to match theme
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                style={{ marginBottom: '20px' }} // Slightly reduced margin
                            >
                                <div style={{
                                    width: '56px', // Slightly smaller icon container
                                    height: '56px',
                                    backgroundColor: '#E3F2FD',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 12px',
                                }}>
                                    <ShieldCheck size={28} color="#2196F3" />
                                </div>

                                <h2 style={{
                                    fontSize: '1.4rem', // Slightly adjusted font size
                                    color: '#2c3e50', // Updated to project primary text color
                                    marginBottom: '8px',
                                    lineHeight: 1.3,
                                    fontFamily: '"Playfair Display", serif' // Ensure font matches
                                }}>
                                    ¿Como sé si eres Diana? 🫵
                                </h2>
                                <p style={{
                                    color: '#546E7A', // Softer slate blue-grey
                                    fontSize: '0.95rem',
                                    margin: 0
                                }}>
                                    Responde esta pregunta de seguridad <span style={{ fontWeight: 'bold', color: '#2196F3' }}>inhackeable</span>
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                style={{ marginBottom: '24px' }}
                            >
                                <h3 style={{
                                    fontSize: '1.2rem',
                                    color: '#333',
                                    marginBottom: '20px',
                                    fontWeight: 600
                                }}>
                                    {currentQuestion.question}
                                </h3>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr',
                                    gap: '12px'
                                }}>
                                    {currentQuestion.options.map((option, index) => (
                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.02, backgroundColor: '#E3F2FD' }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleOptionClick(option)}
                                            style={{
                                                padding: '12px 20px',
                                                border: '2px solid #E0E0E0',
                                                borderRadius: '12px',
                                                backgroundColor: 'white',
                                                color: '#2c3e50', // Primary text color
                                                fontSize: '1rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease', // Smoother transition
                                                outline: 'none',
                                                textAlign: 'left',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px'
                                            }}
                                        >
                                            <div style={{
                                                width: '24px',
                                                height: '24px',
                                                borderRadius: '50%',
                                                border: '2px solid #BDBDBD',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '0.8rem',
                                                color: '#757575',
                                                flexShrink: 0
                                            }}>
                                                {String.fromCharCode(65 + index)}
                                            </div>
                                            {option}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Render snackbar outside AnimatePresence of modal, or inside its own */}
            <ErrorSnackbar
                message={currentError}
                onClose={() => setCurrentError(null)}
            />
        </>
    );
};

export default SecurityPopup;
