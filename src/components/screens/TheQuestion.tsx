import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal, StaggerItem } from '@/components/ui/ScreenTransition';
import { Confetti } from '@/components/effects/Confetti';

type Choice = 'yes' | 'maybe' | 'friends' | null;

interface TheQuestionProps {
  onChoice: (choice: string) => void;
  onDateChoice?: (choice: string) => void;
  dateResponse?: string | null;
}

export function TheQuestion({ onChoice, onDateChoice, dateResponse }: TheQuestionProps) {
  const [choice, setChoice] = useState<Choice>(null);
  const [showDateQuestion, setShowDateQuestion] = useState(false);
  const [showCrash, setShowCrash] = useState(false);
  const [dateChoice, setDateChoice] = useState<string | null>(dateResponse ?? null);

  const handleMainChoice = (c: 'yes' | 'maybe' | 'friends') => {
    setChoice(c);
    onChoice(c);
    if (c === 'yes') {
      setTimeout(() => setShowCrash(true), 800);
      setTimeout(() => setShowDateQuestion(true), 3000);
    }
  };

  const handleDateChoice = (c: string) => {
    setDateChoice(c);
    onDateChoice?.(c);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative z-10">
      <Confetti trigger={choice === 'yes'} />
      <div className="w-full max-w-md text-center">
        <AnimatePresence mode="wait">
          {!choice && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <StaggerItem>
                <p className="text-5xl mb-6">👀</p>
              </StaggerItem>
              <TextReveal delay={0.2} className="text-2xl font-bold text-white leading-relaxed">
                Would you be open to us getting to know each other better?
              </TextReveal>

              <div className="flex flex-col gap-3 pt-4">
                <StaggerItem delay={0.5}>
                  <motion.button
                    type="button"
                    onClick={() => handleMainChoice('yes')}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary w-full"
                  >
                    Yeah, I'd like that 💗
                  </motion.button>
                </StaggerItem>
                <StaggerItem delay={0.6}>
                  <motion.button
                    type="button"
                    onClick={() => handleMainChoice('maybe')}
                    whileTap={{ scale: 0.95 }}
                    className="btn-ghost w-full"
                  >
                    Maybe, let's just talk 😊
                  </motion.button>
                </StaggerItem>
                <StaggerItem delay={0.7}>
                  <motion.button
                    type="button"
                    onClick={() => handleMainChoice('friends')}
                    whileTap={{ scale: 0.95 }}
                    className="btn-ghost w-full"
                  >
                    I'd rather stay classmates/friends
                  </motion.button>
                </StaggerItem>
              </div>
            </motion.div>
          )}

          {choice === 'yes' && !showDateQuestion && (
            <motion.div
              key="crash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {showCrash && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="glass-card p-8 space-y-3"
                  >
                    <p className="text-white/40 text-sm font-mono">
                      Chris.exe has stopped responding.
                    </p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="text-blush-400 font-semibold"
                    >
                      Reason: unexpected success 😂
                    </motion.p>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}

          {choice === 'yes' && showDateQuestion && (
            <motion.div
              key="date"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <TextReveal delay={0} className="text-white/50">
                One more question…
              </TextReveal>
              <TextReveal delay={0.6} className="text-xl font-semibold text-white">
                Would you let me take you out sometime?
              </TextReveal>
              <div className="flex flex-col gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={() => handleDateChoice('yes')}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Yes 😊
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => handleDateChoice('talk')}
                  whileTap={{ scale: 0.95 }}
                  className="btn-ghost"
                >
                  Let's talk first
                </motion.button>
              </div>
            </motion.div>
          )}

          {choice === 'maybe' && (
            <motion.div
              key="maybe"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <TextReveal delay={0} className="text-3xl font-bold text-gradient-blush">
                Deal 🤝
              </TextReveal>
              <TextReveal delay={0.6} className="text-white/60 leading-relaxed">
                No pressure.
              </TextReveal>
              <TextReveal delay={1.2} className="text-white/60 leading-relaxed">
                Let's talk and see where things go.
              </TextReveal>
              <TextReveal delay={1.8} className="text-white/50 leading-relaxed">
                Besides… now you have to explain some of those answers to me 😂
              </TextReveal>
              <div className="pt-4">
                <motion.button
                  type="button"
                  onClick={() => handleDateChoice('message')}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Message Chris
                </motion.button>
              </div>
            </motion.div>
          )}

          {choice === 'friends' && (
            <motion.div
              key="friends"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <TextReveal delay={0} className="text-2xl font-bold text-white">
                Fair enough 😊
              </TextReveal>
              <TextReveal delay={0.6} className="text-white/60 leading-relaxed">
                No awkwardness.
              </TextReveal>
              <TextReveal delay={1.2} className="text-white/50 leading-relaxed">
                I'm still glad you opened this ridiculous website.
              </TextReveal>
              <div className="h-4" />
              <TextReveal delay={1.8} className="text-white/50 leading-relaxed">
                And I meant what I said…
              </TextReveal>
              <TextReveal delay={2.4} className="text-white/70 leading-relaxed">
                You're beautiful, Yvone.
              </TextReveal>
              <TextReveal delay={3} className="text-white/50 leading-relaxed">
                See you in class 😂
              </TextReveal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
