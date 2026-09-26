import { useEffect, useMemo, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  rotation: number;
  size: number;
}

const COLORS = ['#ff6b95', '#f5427a', '#e078d8', '#c94dc4', '#ffc1d6', '#ff9ab8'];

function usePrefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Confetti({ trigger }: { trigger: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger && !reduced) {
      setActive(true);
      const timer = setTimeout(() => setActive(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [trigger, reduced]);

  const pieces = useMemo<ConfettiPiece[]>(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2.5 + Math.random() * 2,
      color: COLORS[i % COLORS.length],
      rotation: Math.random() * 360,
      size: 6 + Math.random() * 8,
    }));
  }, []);

  if (!active || reduced) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-20px]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            borderRadius: '2px',
            transform: `rotate(${p.rotation}deg)`,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(105vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
