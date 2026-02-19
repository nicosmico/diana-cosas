import { useState } from 'react';
import confetti from 'canvas-confetti';
import HeartButton from './components/HeartButton';
import LovePopup from './components/LovePopup';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const triggerConfetti = () => {
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
    triggerConfetti();
    setIsPopupOpen(true);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>
      <HeartButton onClick={handleClick} />

      <LovePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
}

export default App;
