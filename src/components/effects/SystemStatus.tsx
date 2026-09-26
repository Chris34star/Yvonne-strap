import { motion } from 'framer-motion';
import { useState } from 'react';
import { Server, Database, Brain, Heart } from 'lucide-react';

export function SystemStatus() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="text-white/20 hover:text-white/40 text-xs font-mono transition-colors"
      >
        {expanded ? '▼ system status' : '▶ system status'}
      </button>
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 font-mono text-xs space-y-2"
        >
          <div className="flex items-center gap-2 text-white/40">
            <Server className="w-3 h-3" /> SERVER: <span className="text-green-400">ONLINE</span>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <Database className="w-3 h-3" /> DATABASE: <span className="text-green-400">ONLINE</span>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <Brain className="w-3 h-3" /> CHRIS' CONFIDENCE: <span className="text-yellow-400">QUESTIONABLE</span>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <Heart className="w-3 h-3" /> YVONE: <span className="text-blush-400">BEAUTIFUL ✓</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
