import { useMemo } from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  type: 'heart' | 'dot';
}

function usePrefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function FloatingParticles({ count = 15 }: { count?: number }) {
  const reduced = usePrefersReducedMotion();

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 6 + Math.random() * 14,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 5,
      opacity: 0.1 + Math.random() * 0.25,
      type: i % 4 === 0 ? 'heart' : 'dot',
    }));
  }, [count]);

  if (reduced) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-float-up"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === 'heart' ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blush-400">
              <path d="M12 21s-6.5-4.35-9.5-8.5C.5 9 2 5.5 5.5 5.5c2 0 3.5 1 4.5 2.5C11 6.5 12.5 5.5 14.5 5.5 18 5.5 19.5 9 17.5 12.5 14.5 16.65 12 21 12 21z" />
            </svg>
          ) : (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-blush-400/60 to-petal-400/40" />
          )}
        </div>
      ))}
    </div>
  );
}

export function AmbientGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blush-500/8 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-petal-500/8 blur-[120px]" />
      <div className="absolute top-[30%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-blush-400/5 blur-[100px]" />
    </div>
  );
}
