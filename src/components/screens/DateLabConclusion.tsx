import { motion } from 'framer-motion';
import { TextReveal, StaggerItem } from '@/components/ui/ScreenTransition';

interface DateLabConclusionProps {
  onContinue: () => void;
}

export function DateLabConclusion({ onContinue }: DateLabConclusionProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative z-10">
      <div className="w-full max-w-md text-center space-y-6">
        <StaggerItem>
          <div className="text-5xl mb-4">🔬</div>
        </StaggerItem>
        <TextReveal delay={0.2} className="text-2xl font-bold text-gradient-blush">
          Research successfully collected.
        </TextReveal>
        <TextReveal delay={1} className="text-white/50 leading-relaxed">
          Chris may or may not find this useful later 😂
        </TextReveal>
        <div className="pt-6">
          <motion.button
            type="button"
            onClick={onContinue}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Next 💗
          </motion.button>
        </div>
      </div>
    </div>
  );
}
