import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OptionButton } from '@/components/ui/OptionButton';
import { StaggerItem, TextReveal } from '@/components/ui/ScreenTransition';

interface WhyScreenProps {
  onContinue: () => void;
  onAnswer: (key: string, value: string) => void;
}

const OPTIONS = [
  { label: 'He had too much free time', emoji: '🕐' },
  { label: 'He wanted an excuse to code', emoji: '💻' },
  { label: "He thinks you're beautiful 👀", emoji: '💗' },
  { label: "There's probably more to it", emoji: '🤔' },
];

const PLAYFUL_RESPONSES: Record<string, string> = {
  'He had too much free time': 'Bold of you to assume I have free time 😂',
  'He wanted an excuse to code': 'I mean… technically yes but also no 👀',
  "He thinks you're beautiful 👀": 'Okay you caught me. Moving on… 😳',
  "There's probably more to it": 'You might be right about that…',
};

export function WhyScreen({ onContinue, onAnswer }: WhyScreenProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<'question' | 'response' | 'reveal'>('question');

  const handleSelect = (label: string) => {
    setSelected(label);
    onAnswer('whyGuess', label);
    setPhase('response');
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-8 relative z-10">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {phase === 'question' && (
            <motion.div key="question" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <StaggerItem>
                <h2 className="text-2xl font-bold text-white text-center mb-2">
                  Why do you think Chris made this?
                </h2>
              </StaggerItem>
              <div className="mt-8 space-y-3">
                {OPTIONS.map((opt, i) => (
                  <StaggerItem key={opt.label} delay={0.1 + i * 0.08}>
                    <OptionButton
                      label={opt.label}
                      emoji={opt.emoji}
                      selected={false}
                      onClick={() => handleSelect(opt.label)}
                    />
                  </StaggerItem>
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'response' && selected && (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-6"
            >
              <div className="glass-card p-6">
                <p className="text-white/80 text-lg leading-relaxed">
                  {PLAYFUL_RESPONSES[selected]}
                </p>
              </div>
              <motion.button
                type="button"
                onClick={() => setPhase('reveal')}
                whileTap={{ scale: 0.95 }}
                className="btn-ghost"
              >
                Real answer? 👀
              </motion.button>
            </motion.div>
          )}

          {phase === 'reveal' && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-5"
            >
              <TextReveal delay={0} className="text-3xl font-bold text-gradient-blush">
                C… with a little bit of D.
              </TextReveal>
              <TextReveal delay={0.8} className="text-white/60 leading-relaxed">
                I don't know you that well yet.
              </TextReveal>
              <TextReveal delay={1.4} className="text-white/60 leading-relaxed">
                And that's actually the point.
              </TextReveal>
              <TextReveal delay={2} className="text-xl font-semibold text-white">
                I'd like to.
              </TextReveal>
              <div className="pt-4">
                <motion.button
                  type="button"
                  onClick={onContinue}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Okay then… 👀
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
