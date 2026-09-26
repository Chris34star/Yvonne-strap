import { motion } from 'framer-motion';

const PROGRESS_LABELS: { threshold: number; label: string }[] = [
  { threshold: 0, label: 'Initializing…' },
  { threshold: 8, label: 'Getting to know Yvone… 💗' },
  { threshold: 20, label: 'Curiosity level: increasing…' },
  { threshold: 35, label: 'Chris is taking notes 👀' },
  { threshold: 50, label: 'Halfway through the chaos…' },
  { threshold: 65, label: 'Deep questions loading…' },
  { threshold: 78, label: 'Chris is definitely reading this 😂' },
  { threshold: 90, label: 'Almost there… 💗' },
  { threshold: 100, label: 'Done (for now) ✨' },
];

export function getProgressLabel(percent: number): string {
  let label = PROGRESS_LABELS[0].label;
  for (const entry of PROGRESS_LABELS) {
    if (percent >= entry.threshold) label = entry.label;
  }
  return label;
}

interface ProgressBarProps {
  percent: number;
}

export function ProgressBar({ percent }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  const label = getProgressLabel(clamped);

  return (
    <div className="w-full px-6 pt-4 pb-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-white/40 font-medium tracking-wide">
          {label}
        </span>
        <span className="text-xs text-white/30 font-medium tabular-nums">
          {Math.round(clamped)}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blush-500 via-blush-400 to-petal-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
