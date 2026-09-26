import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StaggerItem, TextReveal } from '@/components/ui/ScreenTransition';

interface IntroScreenProps {
  onContinue: () => void;
}

const LOADING_MESSAGES = [
  'Initializing…',
  'Loading something Chris probably over-engineered…',
  'Found: Yvone 💗',
];

export function IntroScreen({ onContinue }: IntroScreenProps) {
  const [phase, setPhase] = useState<'loading' | 'intro' | 'buttons'>('loading');
  const [loadingIndex, setLoadingIndex] = useState(0);

  useEffect(() => {
    if (phase !== 'loading') return;
    if (loadingIndex >= LOADING_MESSAGES.length) {
      setPhase('intro');
      return;
    }
    const timer = setTimeout(() => {
      setLoadingIndex((i) => i + 1);
    }, loadingIndex === 0 ? 800 : 1500);
    return () => clearTimeout(timer);
  }, [phase, loadingIndex]);

  useEffect(() => {
    if (phase !== 'intro') return;
    const timer = setTimeout(() => setPhase('buttons'), 3200);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative z-10">
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <motion.div
            key="loading"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={loadingIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-white/40 text-sm font-light tracking-wide"
              >
                {LOADING_MESSAGES[loadingIndex] ?? ''}
              </motion.p>
            </AnimatePresence>
            {loadingIndex < LOADING_MESSAGES.length && (
              <div className="mt-6 flex justify-center">
                <div className="w-6 h-6 border-2 border-white/10 border-t-blush-400 rounded-full animate-spin" />
              </div>
            )}
          </motion.div>
        )}

        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md space-y-5"
          >
            <TextReveal delay={0} className="text-3xl font-bold text-white">
              Hey Yvone <span className="inline-block">👋</span>
            </TextReveal>
            <TextReveal delay={0.6} className="text-white/60 leading-relaxed">
              I know we haven't talked that much yet…
            </TextReveal>
            <TextReveal delay={1.2} className="text-white/60 leading-relaxed">
              But instead of sending you a boring paragraph…
            </TextReveal>
            <TextReveal delay={1.8} className="text-white/60 leading-relaxed">
              I did what an IT guy would obviously do.
            </TextReveal>
            <TextReveal delay={2.4} className="text-2xl font-semibold text-gradient-blush">
              I built you a whole website 😂
            </TextReveal>
          </motion.div>
        )}

        {phase === 'buttons' && (
          <motion.div
            key="buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md space-y-4"
          >
            <StaggerItem>
              <p className="text-2xl font-bold text-white mb-8">
                Hey Yvone 👋
              </p>
            </StaggerItem>
            <StaggerItem delay={0.1}>
              <p className="text-white/60 mb-8 leading-relaxed">
                I know we haven't talked that much yet…
                <br />
                But instead of sending you a boring paragraph…
                <br />
                I did what an IT guy would obviously do.
              </p>
            </StaggerItem>
            <StaggerItem delay={0.2}>
              <p className="text-xl font-semibold text-gradient-blush mb-10">
                I built you a whole website 😂
              </p>
            </StaggerItem>
            <StaggerItem delay={0.3}>
              <div className="flex flex-col gap-3 items-stretch">
                <motion.button
                  type="button"
                  onClick={onContinue}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Of course you did 😂
                </motion.button>
                <motion.button
                  type="button"
                  onClick={onContinue}
                  whileTap={{ scale: 0.95 }}
                  className="btn-ghost"
                >
                  Okay, I'm curious 👀
                </motion.button>
              </div>
            </StaggerItem>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
