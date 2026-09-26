import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal, StaggerItem } from '@/components/ui/ScreenTransition';
import { Code, Rocket, Smile, Target, MessageCircle } from 'lucide-react';

interface YvoneAsksProps {
  onContinue: () => void;
  onAnswer: (key: string, value: string) => void;
  initialValue?: string;
}

const CHRIS_CARDS = [
  {
    emoji: '💻',
    icon: Code,
    title: 'Tech guy',
    description: "I'm really into technology, coding, AI and building things.",
  },
  {
    emoji: '🚀',
    icon: Rocket,
    title: 'Builder',
    description: "If I get an idea, there's a dangerous chance I'll actually try building it.",
  },
  {
    emoji: '😂',
    icon: Smile,
    title: 'Personality',
    description: "You'll have to discover this one yourself.",
  },
  {
    emoji: '🎯',
    icon: Target,
    title: 'Ambition',
    description: 'I care a lot about where I\'m going in life.',
  },
];

export function YvoneAsks({ onContinue, onAnswer, initialValue }: YvoneAsksProps) {
  const [question, setQuestion] = useState(initialValue ?? '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (question.trim()) {
      onAnswer('questionForChris', question.trim());
    }
    setSaved(true);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col px-6 py-4 relative z-10">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {!saved && (
            <motion.div
              key="ask"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <StaggerItem>
                <p className="text-5xl mb-4 text-center">💬</p>
              </StaggerItem>
              <TextReveal delay={0.1} className="text-2xl font-bold text-white text-center mb-2">
                Wait…
              </TextReveal>
              <TextReveal delay={0.5} className="text-white/60 text-center mb-1">
                You've answered enough questions.
              </TextReveal>
              <TextReveal delay={0.9} className="text-xl font-semibold text-white text-center mb-6">
                Your turn.
              </TextReveal>
              <TextReveal delay={1.2} className="text-white/50 text-center mb-6">
                Ask Chris something.
              </TextReveal>

              <StaggerItem delay={0.4}>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Anything you want to know about me…"
                  rows={3}
                  className="input-field resize-none"
                  autoFocus
                />
              </StaggerItem>

              <div className="flex flex-col gap-3 mt-4">
                <motion.button
                  type="button"
                  onClick={handleSave}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Save my question
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setSaved(true)}
                  whileTap={{ scale: 0.95 }}
                  className="btn-ghost"
                >
                  I'll ask you on WhatsApp instead 😂
                </motion.button>
              </div>
            </motion.div>
          )}

          {saved && (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StaggerItem>
                <p className="text-blush-400/60 text-sm font-medium mb-2 tracking-wide uppercase">
                  Things you might want to know about Chris
                </p>
              </StaggerItem>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {CHRIS_CARDS.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <StaggerItem key={card.title} delay={0.1 + i * 0.1}>
                      <div className="glass-card p-5 hover:border-blush-400/20 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="shrink-0 w-10 h-10 rounded-xl bg-blush-500/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-blush-400" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-sm mb-1">
                              {card.title}
                            </h3>
                            <p className="text-white/50 text-xs leading-relaxed">
                              {card.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </div>

              <div className="mt-8 text-center space-y-6">
                <TextReveal delay={0.6} className="text-white/50 leading-relaxed">
                  But reading cards isn't really how you get to know someone.
                </TextReveal>
                <TextReveal delay={1.2} className="text-white font-semibold">
                  So maybe we should actually talk more.
                </TextReveal>
                <div className="pt-4">
                  <motion.button
                    type="button"
                    onClick={onContinue}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                  >
                    Continue 💗
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
