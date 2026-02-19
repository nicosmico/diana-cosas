import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const HeartButton = ({ onClick }) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Glassy white
                color: '#E57373',
                padding: '18px 48px',
                fontSize: '1.3rem',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(229, 115, 115, 0.25)', // Softer, deeper shadow
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(4px)',
            }}
        >
            <Heart size={28} fill="#E57373" strokeWidth={0} />
            <span style={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                color: '#2c3e50', // Darker text for contrast
                letterSpacing: '0.02em'
            }}>
                Para Diana
            </span>
        </motion.button>
    );
};

export default HeartButton;
