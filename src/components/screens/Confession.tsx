import { motion } from 'framer-motion';
import { TextReveal, StaggerItem } from '@/components/ui/ScreenTransition';

interface ConfessionProps {
  onContinue: () => void;
}

export function Confession({ onContinue }: ConfessionProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative z-10">
      <div className="w-full max-w-md text-center space-y-5">
        <StaggerItem>
          <p className="text-4xl mb-6">💗</p>
        </StaggerItem>

        <TextReveal delay={0.2} className="text-2xl font-bold text-white">
          Okay Yvone…
        </TextReveal>
        <TextReveal delay={0.8} className="text-white/50 leading-relaxed">
          No more questionnaires.
        </TextReveal>
        <TextReveal delay={1.4} className="text-white/50 leading-relaxed">
          I could have just texted this.
        </TextReveal>
        <TextReveal delay={2} className="text-white/50 leading-relaxed">
          But apparently my brain decided building an entire website was easier 😂
        </TextReveal>

        <div className="h-6" />

        <TextReveal delay={3} className="text-xl font-semibold text-gradient-blush">
          The truth is pretty simple.
        </TextReveal>
        <TextReveal delay={3.6} className="text-white/70 leading-relaxed">
          I think you're beautiful.
        </TextReveal>
        <TextReveal delay={4.2} className="text-white/50 leading-relaxed">
          And even though we haven't talked much yet…
        </TextReveal>
        <TextReveal delay={4.8} className="text-white/70 leading-relaxed">
          You caught my attention.
        </TextReveal>
        <TextReveal delay={5.4} className="text-white font-semibold leading-relaxed">
          I'd like the chance to actually know you.
        </TextReveal>

        <div className="h-4" />

        <TextReveal delay={6.2} className="text-white/40 leading-relaxed">
          And there's one thing I wanted to ask…
        </TextReveal>

        <div className="pt-6">
          <motion.button
            type="button"
            onClick={onContinue}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 7 }}
          >
            Continue 💗
          </motion.button>
        </div>
      </div>
    </div>
  );
}
