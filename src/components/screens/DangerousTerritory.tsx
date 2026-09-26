import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionFlow } from '@/components/screens/QuestionFlow';
import { TextReveal, StaggerItem } from '@/components/ui/ScreenTransition';
import { dangerousTerritoryQuestions } from '@/lib/questions';

interface DangerousTerritoryProps {
  onComplete: (answers: Record<string, unknown>) => void;
  onBack: () => void;
  initialAnswers?: Record<string, unknown>;
}

export function DangerousTerritory({
  onComplete,
  onBack,
  initialAnswers,
}: DangerousTerritoryProps) {
  const [phase, setPhase] = useState<'intro' | 'questions' | 'analyzing'>('intro');

  if (phase === 'questions') {
    return (
      <QuestionFlow
        chapterTitle="Dangerous Territory 👀"
        questions={dangerousTerritoryQuestions}
        onComplete={(answers) => {
          setPhase('analyzing');
          setTimeout(() => onComplete(answers), 3500);
        }}
        onBack={() => setPhase('intro')}
        initialAnswers={initialAnswers}
      />
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative z-10">
      <div className="w-full max-w-md text-center">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <StaggerItem>
                <p className="text-5xl mb-4">👀</p>
              </StaggerItem>
              <TextReveal delay={0.2} className="text-white/60 leading-relaxed">
                Chris has been informed that the next question is slightly risky.
              </TextReveal>
              <div className="pt-4">
                <motion.button
                  type="button"
                  onClick={() => setPhase('questions')}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Ask it 😂
                </motion.button>
              </div>
            </motion.div>
          )}

          {phase === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <TextReveal delay={0} className="text-2xl font-bold text-white">
                Interesting…
              </TextReveal>
              <div className="space-y-3 pt-4">
                <TextReveal delay={0.8} className="text-white/40 text-sm">
                  Chris is definitely not analyzing this information…
                </TextReveal>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, delay: 1.6, repeat: 2 }}
                  className="text-white/30 text-lg"
                >
                  …
                </motion.p>
                <TextReveal delay={3} className="text-blush-400 font-semibold">
                  He is absolutely analyzing this information 😂
                </TextReveal>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
