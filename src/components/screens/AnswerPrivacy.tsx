import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal, StaggerItem } from '@/components/ui/ScreenTransition';
import { supabase } from '@/lib/supabase';
import type { AllAnswers } from '@/lib/types';
import { Check, Lock, Share2, X } from 'lucide-react';

interface AnswerPrivacyProps {
  answers: AllAnswers;
  questionForChris: string | null;
  finalResponse: string | null;
  dateResponse: string | null;
  onShared: () => void;
  onKeepPrivate: () => void;
}

function formatAnswer(key: string, value: unknown): string {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'number') return `${value}%`;
  return String(value ?? '—');
}

const ANSWER_LABELS: { key: keyof AllAnswers; label: string }[] = [
  { key: 'whyGuess', label: 'Why she thinks you made this' },
  { key: 'freeTime', label: 'Free time activities' },
  { key: 'personalityType', label: 'Personality type' },
  { key: 'perfectWeekend', label: 'Perfect weekend' },
  { key: 'talkAboutHours', label: 'Could talk about for hours' },
  { key: 'musicGenre', label: 'Favourite music' },
  { key: 'musicArtistSong', label: 'Artist/song on repeat' },
  { key: 'movieGenre', label: 'Movie genre' },
  { key: 'foodNeverTired', label: 'Never-tired food' },
  { key: 'drinkPreference', label: 'Drink preference' },
  { key: 'friendshipValues', label: 'What matters in friendship/relationship' },
  { key: 'feelAppreciated', label: 'What makes her feel appreciated' },
  { key: 'appreciatedQuality', label: 'Appreciated quality in people' },
  { key: 'guyAttention', label: 'What catches her attention' },
  { key: 'attractiveBeyondLooks', label: 'Attractive beyond looks' },
  { key: 'likePersonality', label: 'Makes her like a personality' },
  { key: 'putsOff', label: 'What puts her off' },
  { key: 'partnerType', label: 'Would rather have someone who…' },
  { key: 'ambitionImportance', label: 'Ambition importance' },
  { key: 'dateType', label: 'Date type' },
  { key: 'dayOrEvening', label: 'Day or evening' },
  { key: 'fancyOrSimple', label: 'Fancy or simple' },
  { key: 'plannedOrSpontaneous', label: 'Planned or spontaneous' },
];

export function AnswerPrivacy({
  answers,
  questionForChris,
  finalResponse,
  dateResponse,
  onShared,
  onKeepPrivate,
}: AnswerPrivacyProps) {
  const [phase, setPhase] = useState<'choice' | 'preview' | 'done' | 'private'>('choice');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filledAnswers = ANSWER_LABELS.filter(
    (a) => answers[a.key] !== undefined && answers[a.key] !== null && answers[a.key] !== ''
  );

  const handleShare = async () => {
    setSending(true);
    setError(null);
    try {
      const { error: insertError } = await supabase.from('shared_answers').insert({
        answers: answers as Record<string, unknown>,
        question_for_chris: questionForChris ?? null,
        final_response: finalResponse ?? null,
        date_response: dateResponse ?? null,
      });
      if (insertError) throw insertError;
      setPhase('done');
      setSending(false);
      setTimeout(onShared, 2000);
    } catch {
      setError('Something went wrong. Your answers are still saved on your device.');
      setSending(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-8 relative z-10">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {phase === 'choice' && (
            <motion.div
              key="choice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-6"
            >
              <StaggerItem>
                <div className="flex justify-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white/40" />
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blush-500/10 flex items-center justify-center">
                    <Share2 className="w-6 h-6 text-blush-400" />
                  </div>
                </div>
              </StaggerItem>
              <TextReveal delay={0.1} className="text-xl font-bold text-white">
                Want Chris to see your answers?
              </TextReveal>
              <TextReveal delay={0.4} className="text-white/40 text-sm leading-relaxed">
                Your answers are saved only on your device right now.
                Nothing has been sent to anyone.
              </TextReveal>

              <div className="flex flex-col gap-3 pt-4">
                <motion.button
                  type="button"
                  onClick={() => setPhase('preview')}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Share my answers with Chris
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => {
                    setPhase('private');
                    setTimeout(onKeepPrivate, 2000);
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-ghost"
                >
                  No, keep them private
                </motion.button>
              </div>
            </motion.div>
          )}

          {phase === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <StaggerItem>
                <h3 className="text-lg font-bold text-white mb-2 text-center">
                  Here's exactly what will be shared:
                </h3>
                <p className="text-white/40 text-sm text-center mb-6">
                  You can review everything before sending.
                </p>
              </StaggerItem>

              <div className="space-y-2 max-h-[50vh] overflow-y-auto no-scrollbar">
                {filledAnswers.map((item, i) => (
                  <StaggerItem key={item.key} delay={i * 0.03}>
                    <div className="glass-card px-4 py-3">
                      <p className="text-white/30 text-xs mb-1">{item.label}</p>
                      <p className="text-white/80 text-sm">
                        {formatAnswer(item.key, answers[item.key])}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
                {questionForChris && (
                  <StaggerItem delay={0.3}>
                    <div className="glass-card px-4 py-3">
                      <p className="text-white/30 text-xs mb-1">Her question for Chris</p>
                      <p className="text-white/80 text-sm">{questionForChris}</p>
                    </div>
                  </StaggerItem>
                )}
                {finalResponse && (
                  <StaggerItem delay={0.4}>
                    <div className="glass-card px-4 py-3">
                      <p className="text-white/30 text-xs mb-1">Her response</p>
                      <p className="text-white/80 text-sm">{finalResponse}</p>
                    </div>
                  </StaggerItem>
                )}
                {dateResponse && (
                  <StaggerItem delay={0.5}>
                    <div className="glass-card px-4 py-3">
                      <p className="text-white/30 text-xs mb-1">Date question response</p>
                      <p className="text-white/80 text-sm">{dateResponse}</p>
                    </div>
                  </StaggerItem>
                )}
              </div>

              {error && (
                <p className="text-blush-400 text-sm text-center mt-4">{error}</p>
              )}

              <div className="flex gap-3 mt-6">
                <motion.button
                  type="button"
                  onClick={() => setPhase('choice')}
                  whileTap={{ scale: 0.95 }}
                  className="btn-ghost flex-1"
                >
                  <span className="flex items-center justify-center gap-2">
                    <X className="w-4 h-4" /> Cancel
                  </span>
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleShare}
                  disabled={sending}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex-1"
                >
                  {sending ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" /> Send
                    </span>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}

          {phase === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-16 h-16 rounded-full bg-blush-500/20 flex items-center justify-center mx-auto"
              >
                <Check className="w-8 h-8 text-blush-400" />
              </motion.div>
              <TextReveal delay={0.4} className="text-xl font-bold text-white">
                Sent! 💗
              </TextReveal>
              <TextReveal delay={0.8} className="text-white/40 text-sm">
                Chris will see your answers. No pressure though 😊
              </TextReveal>
            </motion.div>
          )}

          {phase === 'private' && (
            <motion.div
              key="private"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto"
              >
                <Lock className="w-8 h-8 text-white/40" />
              </motion.div>
              <TextReveal delay={0.4} className="text-xl font-bold text-white">
                Kept private 🔒
              </TextReveal>
              <TextReveal delay={0.8} className="text-white/40 text-sm">
                Your answers stay on your device. Chris won't see them.
              </TextReveal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
