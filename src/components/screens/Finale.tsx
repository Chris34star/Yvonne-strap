import { motion } from 'framer-motion';
import { TextReveal, StaggerItem } from '@/components/ui/ScreenTransition';
import { Heart } from 'lucide-react';

interface FinaleProps {
  onMessageChris: () => void;
}

export function Finale({ onMessageChris }: FinaleProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 relative z-10">
      <div className="w-full max-w-md text-center space-y-6">
        <StaggerItem>
          <p className="text-white/40 text-sm">So…</p>
        </StaggerItem>

        <TextReveal delay={0.4} className="text-white/60 leading-relaxed">
          Maybe this isn't a girlfriend application after all.
        </TextReveal>
        <TextReveal delay={1} className="text-white/60 leading-relaxed">
          It might just be Chapter 1.
        </TextReveal>

        <div className="h-8" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card p-8 glow-blush"
        >
          <h2 className="text-3xl font-bold text-gradient-blush font-script tracking-wide">
            Chris × Yvone
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Heart className="w-4 h-4 text-blush-400 fill-blush-400" />
            <p className="text-white/50 text-sm">
              Status: Getting to know each other… 💗
            </p>
          </div>
        </motion.div>

        <TextReveal delay={2.5} className="text-white/50 leading-relaxed">
          Next mission: an actual conversation.
        </TextReveal>

        <div className="pt-4">
          <motion.button
            type="button"
            onClick={onMessageChris}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            Message Chris 💗
          </motion.button>
        </div>
      </div>
    </div>
  );
}
