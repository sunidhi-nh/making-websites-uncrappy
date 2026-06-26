import React, { useEffect, useState } from "react";
import { LOADING_MESSAGES } from "../data/brandTemplates";
import * as Icons from "lucide-react";

interface LoadingStepProps {
  onComplete: () => void;
}

export const LoadingStep: React.FC<LoadingStepProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    // Increment progress bar smoothly
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4; // increment between 4% and 12%
        return Math.min(100, prev + step);
      });
    }, 250);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // Small buffer at 100% to make it feel deliberate
      const timeout = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  // Handle adding console log messages at random intervals
  useEffect(() => {
    if (progress >= 100) return;

    const addLog = () => {
      const nextMessage = LOADING_MESSAGES[currentMessageIndex % LOADING_MESSAGES.length];
      setLogs((prev) => [...prev.slice(-6), `[OK] ${nextMessage}`]); // Keep last 7 logs
      setCurrentMessageIndex((prev) => prev + 1);
    };

    // Initial log
    if (logs.length === 0) {
      addLog();
    }

    const logTimeout = setTimeout(() => {
      addLog();
    }, Math.random() * 400 + 300); // 300ms to 700ms

    return () => clearTimeout(logTimeout);
  }, [progress, currentMessageIndex, logs]);

  return (
    <div className="card glass-panel fade-in flex flex-col justify-between max-w-lg mx-auto min-h-[420px]">
      <div className="card-header text-center pt-6">
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          {/* Animated rings */}
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-ping" />
          <div className="absolute inset-2 border-4 border-secondary/40 border-t-secondary rounded-full animate-spin" />
          <div className="absolute inset-4 border-4 border-accent/20 border-b-accent rounded-full animate-pulse" />
          <Icons.Cpu className="w-8 h-8 text-accent animate-bounce" />
        </div>
        <h2 className="text-display font-bold mb-1">Synthesizing DNA...</h2>
        <p className="text-secondary text-sm">Our brand blender is spinning at 7200 RPM.</p>
      </div>

      <div className="card-body px-6 py-4 flex-1 flex flex-col justify-between">
        {/* Terminal logs block */}
        <div className="terminal-logs font-mono text-xs p-4 rounded-lg bg-black/50 border border-white/10 text-left min-h-[140px] flex flex-col justify-end gap-1">
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-accent shrink-0">&gt;</span>
              <span className="text-gray-300">{log}</span>
            </div>
          ))}
          {progress < 100 && (
            <div className="flex gap-2 items-center text-primary animate-pulse mt-1">
              <span className="shrink-0">&gt;</span>
              <span>Processing brand assets...</span>
            </div>
          )}
        </div>

        {/* Progress Bar Container */}
        <div className="w-full mt-6">
          <div className="flex justify-between items-center mb-2 font-mono text-xs">
            <span className="text-secondary">Progress</span>
            <span className="text-accent font-bold">{progress}%</span>
          </div>
          <div className="progress-bar-bg w-full h-3 rounded-full bg-white/10 overflow-hidden relative border border-white/5">
            <div
              className="progress-bar-fill h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 50%, var(--accent-color) 100%)",
                boxShadow: "0 0 10px rgba(var(--primary-rgb), 0.5)"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoadingStep;
