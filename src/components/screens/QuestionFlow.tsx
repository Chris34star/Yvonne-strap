import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OptionButton } from '@/components/ui/OptionButton';
import { NavControls } from '@/components/ui/OptionButton';
import { StaggerItem } from '@/components/ui/ScreenTransition';

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  type: 'single' | 'multi' | 'text' | 'slider';
  options?: { label: string; emoji?: string }[];
  placeholder?: string;
  maxSelections?: number;
  optional?: boolean;
  sliderMin?: number;
  sliderMax?: number;
  sliderMinLabel?: string;
  sliderMaxLabel?: string;
}

interface QuestionFlowProps {
  chapterTitle: string;
  questions: Question[];
  onComplete: (answers: Record<string, unknown>) => void;
  onBack?: () => void;
  initialAnswers?: Record<string, unknown>;
}

export function QuestionFlow({
  chapterTitle,
  questions,
  onComplete,
  onBack,
  initialAnswers = {},
}: QuestionFlowProps) {
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>(initialAnswers);
  const [textInput, setTextInput] = useState('');
  const [sliderValue, setSliderValue] = useState(50);

  const currentQ = questions[qIndex];
  const isLast = qIndex === questions.length - 1;

  const currentValue = answers[currentQ.id];

  const handleSingleSelect = (label: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: label }));
  };

  const handleMultiToggle = (label: string) => {
    const max = currentQ.maxSelections ?? 99;
    setAnswers((prev) => {
      const existing = (prev[currentQ.id] as string[]) ?? [];
      if (existing.includes(label)) {
        return { ...prev, [currentQ.id]: existing.filter((l) => l !== label) };
      }
      if (existing.length >= max) return prev;
      return { ...prev, [currentQ.id]: [...existing, label] };
    });
  };

  const handleTextSave = () => {
    if (textInput.trim()) {
      setAnswers((prev) => ({ ...prev, [currentQ.id]: textInput.trim() }));
    }
  };

  const handleSliderSave = () => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: sliderValue }));
  };

  const canContinue = useMemo(() => {
    if (currentQ.optional) return true;
    if (currentQ.type === 'text') return !!(answers[currentQ.id] || textInput.trim());
    if (currentQ.type === 'slider') return true;
    const val = answers[currentQ.id];
    if (Array.isArray(val)) return val.length > 0;
    return !!val;
  }, [currentQ, answers, textInput]);

  const handleContinue = () => {
    if (currentQ.type === 'text' && textInput.trim() && !answers[currentQ.id]) {
      handleTextSave();
    }
    if (currentQ.type === 'slider' && !answers[currentQ.id]) {
      handleSliderSave();
    }
    if (isLast) {
      onComplete(answers);
    } else {
      setQIndex((i) => i + 1);
      setTextInput('');
    }
  };

  const handleSkip = () => {
    if (isLast) {
      onComplete(answers);
    } else {
      setQIndex((i) => i + 1);
      setTextInput('');
    }
  };

  const handleBack = () => {
    if (qIndex > 0) {
      setQIndex((i) => i - 1);
      const prevAnswer = answers[questions[qIndex - 1].id];
      if (typeof prevAnswer === 'string' && questions[qIndex - 1].type === 'text') {
        setTextInput(prevAnswer);
      }
    } else if (onBack) {
      onBack();
    }
  };

  const selectedMulti = (answers[currentQ.id] as string[]) ?? [];

  return (
    <div className="min-h-[100dvh] flex flex-col px-6 py-4 relative z-10">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={qIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {qIndex === 0 && (
              <StaggerItem>
                <p className="text-blush-400/60 text-sm font-medium mb-2 tracking-wide uppercase">
                  {chapterTitle}
                </p>
              </StaggerItem>
            )}

            <StaggerItem delay={0.05}>
              <h2 className="text-2xl font-bold text-white mb-1 leading-tight">
                {currentQ.title}
              </h2>
            </StaggerItem>

            {currentQ.subtitle && (
              <StaggerItem delay={0.1}>
                <p className="text-white/40 text-sm mb-6">{currentQ.subtitle}</p>
              </StaggerItem>
            )}

            <div className={`mt-6 ${currentQ.type === 'text' ? '' : 'space-y-3'}`}>
              {currentQ.type === 'single' && currentQ.options && (
                <>
                  {currentQ.options.map((opt, i) => (
                    <StaggerItem key={opt.label} delay={0.1 + i * 0.06}>
                      <OptionButton
                        label={opt.label}
                        emoji={opt.emoji}
                        selected={currentValue === opt.label}
                        onClick={() => handleSingleSelect(opt.label)}
                      />
                    </StaggerItem>
                  ))}
                </>
              )}

              {currentQ.type === 'multi' && currentQ.options && (
                <>
                  {currentQ.maxSelections && currentQ.maxSelections < 99 && (
                    <p className="text-white/30 text-xs mb-3">
                      Choose up to {currentQ.maxSelections}
                    </p>
                  )}
                  {currentQ.options.map((opt, i) => (
                    <StaggerItem key={opt.label} delay={0.1 + i * 0.05}>
                      <OptionButton
                        label={opt.label}
                        emoji={opt.emoji}
                        selected={selectedMulti.includes(opt.label)}
                        multiple
                        onClick={() => handleMultiToggle(opt.label)}
                        disabled={
                          !selectedMulti.includes(opt.label) &&
                          selectedMulti.length >= (currentQ.maxSelections ?? 99)
                        }
                      />
                    </StaggerItem>
                  ))}
                </>
              )}

              {currentQ.type === 'text' && (
                <StaggerItem delay={0.1}>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder={currentQ.placeholder ?? 'Type here…'}
                    rows={3}
                    className="input-field resize-none"
                    autoFocus
                  />
                </StaggerItem>
              )}

              {currentQ.type === 'slider' && (
                <StaggerItem delay={0.1}>
                  <div className="py-8">
                    <div className="flex justify-between mb-3 text-sm text-white/40">
                      <span>{currentQ.sliderMinLabel ?? 'Low'}</span>
                      <span className="text-blush-400 font-semibold text-lg">
                        {sliderValue}%
                      </span>
                      <span>{currentQ.sliderMaxLabel ?? 'High'}</span>
                    </div>
                    <input
                      type="range"
                      min={currentQ.sliderMin ?? 0}
                      max={currentQ.sliderMax ?? 100}
                      value={sliderValue}
                      onChange={(e) => setSliderValue(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer
                                 bg-white/10 accent-blush-500"
                    />
                  </div>
                </StaggerItem>
              )}
            </div>

            <div className="mt-8">
              <NavControls
                onBack={qIndex > 0 || onBack ? handleBack : undefined}
                onSkip={currentQ.optional ? handleSkip : undefined}
                onContinue={handleContinue}
                canContinue={canContinue}
                continueLabel={isLast ? 'Continue' : 'Next'}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
