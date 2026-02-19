import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import HeartButton from './components/HeartButton';
import LovePopup from './components/LovePopup';
import SecurityPopup from './components/SecurityPopup';
import { vibratePattern } from './utils/vibration';

// Created once at module level — never re-instantiated on re-renders
const successAudio = new Audio('/sounds/undertale-shop.mp3');
successAudio.preload = 'auto';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);

  const triggerConfetti = () => {
    vibratePattern(200); // Success vibration (safely handled)
    const duration = 3000;
    const end = Date.now() + duration;

    // Premium pastel colors for hearts
    const colors = ['#E57373', '#F06292', '#FFCDD2', '#FF8A80'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        shapes: ['heart'],
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        shapes: ['heart'],
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };


  const handleClick = () => {
    setIsSecurityOpen(true);
  };

  const handleSecuritySuccess = () => {
    setIsSecurityOpen(false);
    setIsPopupOpen(true);
    triggerConfetti();
    // Play success sound
    try {
      successAudio.currentTime = 0;
      successAudio.play().catch(e => console.error('Success audio failed:', e));
    } catch (e) {
      console.error('Success audio error:', e);
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100dvh', // Dynamic Viewport Height for perfect mobile centering
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden' // Prevent any internal scroll
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <HeartButton onClick={handleClick} />
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            margin: 0,
            fontSize: '0.8rem',
            color: 'rgba(44, 62, 80, 0.84)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            letterSpacing: '0.02em',
            userSelect: 'none',
          }}
        >
          🔊 La página tiene sonidos, te aviso por si acaso
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          style={{
            margin: 0,
            fontSize: '0.8rem',
            color: 'rgba(44, 62, 80, 0.84)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            letterSpacing: '0.02em',
            userSelect: 'none',
          }}
        >
          Atte. yo
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.6 }}
          style={{
            margin: 0,
            fontSize: '0.8rem',
            color: 'rgba(44, 62, 80, 0.84)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            letterSpacing: '0.02em',
            userSelect: 'none',
          }}
        >
          el Nico 🦝
        </motion.p>
      </div>

      <SecurityPopup
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
        onCorrectAnswer={handleSecuritySuccess}
      />

      <LovePopup
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
          successAudio.pause();
          successAudio.currentTime = 0;
        }}
      />
    </div>
  );
}

export default App;
