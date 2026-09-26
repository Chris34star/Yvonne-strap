import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  enter: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -30, scale: 0.98 },
};

const reducedVariants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 },
};

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

interface ScreenTransitionProps {
  screenKey: string;
  children: ReactNode;
}

export function ScreenTransition({ screenKey, children }: ScreenTransitionProps) {
  const reduced = prefersReducedMotion();
  const variants = reduced ? reducedVariants : pageVariants;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={screenKey}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={{ duration: reduced ? 0.15 : 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

interface StaggerProps {
  children: ReactNode;
  delay?: number;
}

export function StaggerItem({ children, delay = 0 }: StaggerProps) {
  const reduced = prefersReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.15 : 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function TextReveal({ children, delay = 0, className }: TextRevealProps) {
  const reduced = prefersReducedMotion();
  return (
    <motion.p
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 15 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.15 : 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.p>
  );
}
