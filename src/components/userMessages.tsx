"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface UserMessageProps {
  message: string;
  success: boolean;
  duration?: number; // optional, in ms
}

export default function UserMessage({
  message,
  success,
  duration = 3000,
}: UserMessageProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="absolute flex items-center justify-center z-50"
        >
          <div className="flex items-center gap-2 py-2 px-4 rounded-2xl bg-black shadow-6xl">
            {success ? (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <CheckCircle className="w-7 h-7 text-[var(--gold)]" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <XCircle className="w-7 h-7 text-red-500" />
              </motion.div>
            )}

            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-base font-semibold ${
                success ? "text-[var(--gold)]" : "text-red-600"
              }`}
            >
              {message}
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
