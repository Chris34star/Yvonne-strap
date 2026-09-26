import { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChrisTapContext = createContext<() => void>(() => {});

export function useChrisTap() {
  return useContext(ChrisTapContext);
}

export function EasterEggs() {
  const [devMode, setDevMode] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [chrisTapCount, setChrisTapCount] = useState(0);

  useEffect(() => {
    if (typeof console !== 'undefined') {
      console.log(
        '%cHi Yvone 👀',
        'color: #f5427a; font-size: 20px; font-weight: bold;'
      );
      console.log(
        "%cIf you're checking the console, Chris is impressed.",
        'color: #ff9ab8; font-size: 14px;'
      );
    }
  }, []);

  const handleChrisTap = () => {
    setChrisTapCount((c) => {
      const next = c + 1;
      if (next >= 5) {
        setShowSecret(true);
        return 0;
      }
      return next;
    });
  };

  return (
    <ChrisTapContext.Provider value={handleChrisTap}>
      <button
        type="button"
        onClick={() => setDevMode(true)}
        className="fixed bottom-3 right-3 z-40 w-8 h-8 flex items-center justify-center
                   text-white/15 hover:text-white/40 transition-colors"
        aria-label="dev mode"
      >
        <span className="text-xs font-mono">&lt;/&gt;</span>
      </button>

      <AnimatePresence>
        {devMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/80 backdrop-blur-sm px-6"
            onClick={() => setDevMode(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card p-6 max-w-sm w-full font-mono text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-blush-400 font-semibold mb-4">
                Developer mode activated.
              </p>
              <pre className="text-white/60 text-xs leading-relaxed mb-3">
{`if (yVoneIsBeautiful) {
  chris.buildWebsite();
}`}
              </pre>
              <p className="text-white/40 text-xs">
                Result: apparently this website.
              </p>
              <button
                type="button"
                onClick={() => setDevMode(false)}
                className="mt-4 text-white/30 hover:text-white/60 text-xs"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/80 backdrop-blur-sm px-6"
            onClick={() => setShowSecret(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card p-6 max-w-sm w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-2xl mb-3">🔓</p>
              <p className="text-blush-400 font-semibold mb-2">Secret unlocked</p>
              <p className="text-white/60 text-sm leading-relaxed">
                Chris was probably nervous sending you this link 😂
              </p>
              <button
                type="button"
                onClick={() => setShowSecret(false)}
                className="mt-4 text-white/30 hover:text-white/60 text-xs"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ChrisTapContext.Provider>
  );
}
