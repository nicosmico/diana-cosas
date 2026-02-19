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
                backgroundColor: '#FAFAFA',
                color: '#E57373',
                padding: '20px 40px',
                fontSize: '1.2rem',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(229, 115, 115, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(4px)',
            }}
        >
            <Heart size={24} fill="#E57373" strokeWidth={0} />
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 500, color: '#555' }}>
                Click Me
            </span>
        </motion.button>
    );
};

export default HeartButton;
