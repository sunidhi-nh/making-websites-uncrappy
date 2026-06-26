import React from "react";
import { SLIDER_FEEDBACK } from "../data/brandTemplates";
import * as Icons from "lucide-react";

interface MoodStepProps {
  weirdness: number;
  setWeirdness: (v: number) => void;
  complexity: number;
  setComplexity: (v: number) => void;
  vibe: number;
  setVibe: (v: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export const MoodStep: React.FC<MoodStepProps> = ({
  weirdness,
  setWeirdness,
  complexity,
  setComplexity,
  vibe,
  setVibe,
  onNext,
  onBack
}) => {
  // Helper to get matching slider comment
  const getFeedback = (type: "weirdness" | "complexity" | "vibe", val: number) => {
    const list = SLIDER_FEEDBACK[type];
    for (const item of list) {
      if (val <= item.threshold) {
        return item.text;
      }
    }
    return list[list.length - 1].text;
  };

  return (
    <div className="card glass-panel fade-in">
      <div className="card-header text-center">
        <h2 className="text-display font-bold mb-2">Tune the Brand Dial.</h2>
        <p className="text-secondary text-sm">
          Slide to calibrate your brand's chemical composition. Careful, too much corporate kills the design.
        </p>
      </div>

      <div className="card-body">
        {/* Weirdness Slider */}
        <div className="slider-group mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="slider-label flex items-center gap-2">
              <Icons.ShieldAlert className="w-4 h-4 text-primary" />
              Weirdness
            </span>
            <span className="slider-value text-xs font-mono font-bold text-primary">
              {weirdness === 0 ? "Boring" : weirdness === 100 ? "Pure Chaos" : `${weirdness}%`}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={weirdness}
            onChange={(e) => setWeirdness(Number(e.target.value))}
            className="slider-input"
            style={{ "--accent-color": "var(--primary-color)" } as React.CSSProperties}
          />
          <div className="slider-commentary mt-2">
            <span className="font-mono text-xs text-secondary italic">
              &ldquo;{getFeedback("weirdness", weirdness)}&rdquo;
            </span>
          </div>
        </div>

        {/* Complexity Slider */}
        <div className="slider-group mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="slider-label flex items-center gap-2">
              <Icons.Sliders className="w-4 h-4 text-secondary" />
              Density / Complexity
            </span>
            <span className="slider-value text-xs font-mono font-bold text-secondary">
              {complexity === 0 ? "Empty Doc" : complexity === 100 ? "Lego Tower" : `${complexity}%`}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={complexity}
            onChange={(e) => setComplexity(Number(e.target.value))}
            className="slider-input"
            style={{ "--accent-color": "var(--secondary-color)" } as React.CSSProperties}
          />
          <div className="slider-commentary mt-2">
            <span className="font-mono text-xs text-secondary italic">
              &ldquo;{getFeedback("complexity", complexity)}&rdquo;
            </span>
          </div>
        </div>

        {/* Vibe / Time-machine Slider */}
        <div className="slider-group mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="slider-label flex items-center gap-2">
              <Icons.Compass className="w-4 h-4 text-accent" />
              Era Vibe
            </span>
            <span className="slider-value text-xs font-mono font-bold text-accent">
              {vibe === 0 ? "Retro 70s" : vibe === 100 ? "Cyberpunk 2099" : `${vibe}%`}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={vibe}
            onChange={(e) => setVibe(Number(e.target.value))}
            className="slider-input"
            style={{ "--accent-color": "var(--accent-color)" } as React.CSSProperties}
          />
          <div className="slider-commentary mt-2">
            <span className="font-mono text-xs text-secondary italic">
              &ldquo;{getFeedback("vibe", vibe)}&rdquo;
            </span>
          </div>
        </div>

        {/* Error Trigger (Quirky easter egg) */}
        {weirdness === 0 && complexity === 100 && (
          <div className="alert alert-warning mb-6 p-3 rounded-lg border border-yellow-600/30 bg-yellow-950/20 text-yellow-500 text-xs flex gap-2 items-start">
            <Icons.AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <strong>Alert: Excessive Bureaucracy!</strong> You've combined maximum complexity with zero weirdness. This triggers a corporate black hole. Please add some weirdness to prevent the layout from turning beige.
            </div>
          </div>
        )}

        {/* Back and Next Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3-5 mt-4">
          <button type="button" className="btn btn-secondary flex-1" onClick={onBack}>
            <Icons.ArrowLeft className="mr-2" size={16} />
            Back
          </button>
          <button
            type="button"
            className="btn btn-primary flex-1"
            onClick={onNext}
            disabled={weirdness === 0 && complexity === 100}
          >
            Blend Identity
            <Icons.Sparkles className="ml-2" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default MoodStep;
