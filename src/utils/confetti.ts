import confetti from 'canvas-confetti';

export function fireConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#FBBF24', '#F43F5E', '#8B5CF6', '#10B981'],
    });
  } catch {
    // fallback if canvas not available
  }
}

export function fireStarBurst() {
  try {
    const end = Date.now() + 1.2 * 1000;
    const colors = ['#F59E0B', '#FDE047', '#FFFFFF'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } catch {
    // ignore
  }
}
