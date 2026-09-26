import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface OptionButtonProps {
  label: string;
  emoji?: string;
  selected: boolean;
  multiple?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function OptionButton({
  label,
  emoji,
  selected,
  multiple,
  onClick,
  disabled,
}: OptionButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      className={`option-btn ${selected ? 'option-btn-selected' : ''} ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-white/90 text-base leading-snug">
          {emoji && <span className="mr-2">{emoji}</span>}
          {label}
        </span>
        {multiple && (
          <span
            className={`shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
              selected
                ? 'bg-blush-500 border-blush-400'
                : 'border-white/20'
            }`}
          >
            {selected && (
              <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-white">
                <path
                  d="M5 12l5 5L20 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        )}
        {!multiple && (
          <span
            className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              selected
                ? 'border-blush-400 bg-blush-500/20'
                : 'border-white/20'
            }`}
          >
            {selected && <span className="w-2 h-2 rounded-full bg-blush-400" />}
          </span>
        )}
      </div>
    </motion.button>
  );
}

interface ChoiceCardProps {
  title: string;
  emoji?: string;
  description?: string;
  onClick: () => void;
  children?: ReactNode;
}

export function ChoiceCard({ title, emoji, description, onClick, children }: ChoiceCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass-card p-6 text-left w-full hover:border-blush-400/30 transition-colors"
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
      {description && <p className="text-white/50 text-sm leading-relaxed">{description}</p>}
      {children}
    </motion.button>
  );
}

interface SkipButtonProps {
  onClick: () => void;
  label?: string;
}

export function SkipButton({ onClick, label = 'Skip 👀' }: SkipButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-white/30 hover:text-white/60 text-sm font-medium transition-colors px-4 py-2"
    >
      {label}
    </button>
  );
}

interface NavControlsProps {
  onBack?: () => void;
  onSkip?: () => void;
  onContinue?: () => void;
  continueLabel?: string;
  canContinue?: boolean;
}

export function NavControls({
  onBack,
  onSkip,
  onContinue,
  continueLabel = 'Continue',
  canContinue = true,
}: NavControlsProps) {
  return (
    <div className="flex items-center justify-between gap-3 mt-6">
      <div className="flex gap-2">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-white/40 hover:text-white/70 text-sm font-medium transition-colors px-3 py-2"
          >
            ← Back
          </button>
        )}
        {onSkip && <SkipButton onClick={onSkip} />}
      </div>
      {onContinue && (
        <motion.button
          type="button"
          onClick={onContinue}
          disabled={!canContinue}
          whileTap={{ scale: 0.95 }}
          className="btn-primary disabled:opacity-40 disabled:pointer-events-none"
        >
          {continueLabel}
        </motion.button>
      )}
    </div>
  );
}
