import React, { useState } from "react";
import { INDUSTRIES } from "../data/brandTemplates";
import * as Icons from "lucide-react";

interface OnboardingStepProps {
  companyName: string;
  setCompanyName: (name: string) => void;
  tagline: string;
  setTagline: (tagline: string) => void;
  industryId: string;
  setIndustryId: (id: string) => void;
  onNext: () => void;
}

export const OnboardingStep: React.FC<OnboardingStepProps> = ({
  companyName,
  setCompanyName,
  tagline,
  setTagline,
  industryId,
  setIndustryId,
  onNext
}) => {
  const [error, setError] = useState<string | null>(null);

  // Helper to dynamically render Lucide icons
  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5" />;
    }
    return <Icons.HelpCircle className="w-5 h-5" />;
  };

  const handleChaosRoll = () => {
    setError(null);
    // Pick random industry
    const randomIndustry = INDUSTRIES[Math.floor(Math.random() * INDUSTRIES.length)];
    // Pick random name
    const randomName = randomIndustry.suggestedNames[Math.floor(Math.random() * randomIndustry.suggestedNames.length)];
    // Pick random tagline
    const randomTagline = randomIndustry.suggestedTaglines[Math.floor(Math.random() * randomIndustry.suggestedTaglines.length)];

    setIndustryId(randomIndustry.id);
    setCompanyName(randomName);
    setTagline(randomTagline);
  };

  const handleNext = () => {
    if (!companyName.trim()) {
      const errorJokes = [
        "A brand needs a name, unless you're starting a secret cult. Are you?",
        "Anonymous corporations are suspicious. Give us a name!",
        "Even placeholder startups need names. Don't be shy.",
        "Your future investors can't write checks to an empty text field."
      ];
      setError(errorJokes[Math.floor(Math.random() * errorJokes.length)]);
      return;
    }
    setError(null);
    onNext();
  };

  return (
    <div className="card glass-panel fade-in">
      <div className="card-header text-center">
        <h2 className="text-display font-bold mb-2">Let's build a brand.</h2>
        <p className="text-secondary text-sm">
          No boards, no meetings, no overpriced agencies. Just pure vibes and instant pixels.
        </p>
      </div>

      <div className="card-body">
        {/* Company Name */}
        <div className="input-group mb-6">
          <label className="input-label" htmlFor="company-name">
            Company Name
          </label>
          <div className="input-wrapper">
            <input
              id="company-name"
              type="text"
              className={`input-field ${error ? "input-error" : ""}`}
              placeholder="e.g. ChaiOps, Samosa.ai..."
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                if (error) setError(null);
              }}
            />
            <button
              type="button"
              className="chaos-btn"
              title="Roll the chaos dice!"
              onClick={handleChaosRoll}
            >
              <Icons.Dices className="w-5 h-5 text-accent animate-hover" />
            </button>
          </div>
          {error && <p className="error-message mt-2 text-xs text-rose-500">{error}</p>}
        </div>

        {/* Tagline */}
        <div className="input-group mb-6">
          <label className="input-label" htmlFor="tagline">
            Tagline / One-liner
          </label>
          <input
            id="tagline"
            type="text"
            className="input-field"
            placeholder="e.g. Resistance is futile, our API is free."
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </div>

        {/* Industry Selection */}
        <div className="input-group mb-8">
          <label className="input-label">Select Industry / Arena</label>
          <div className="industry-grid">
            {INDUSTRIES.map((ind) => {
              const isSelected = industryId === ind.id;
              return (
                <button
                  key={ind.id}
                  type="button"
                  className={`industry-card ${isSelected ? "selected" : ""}`}
                  onClick={() => setIndustryId(ind.id)}
                >
                  <div className="industry-icon-wrapper">{renderIcon(ind.icon)}</div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">{ind.name}</div>
                    <div className="text-secondary text-xs line-clamp-1">{ind.quirkyDescription}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Action */}
        <button type="button" className="btn btn-primary w-full" onClick={handleNext}>
          Configure Vibe
          <Icons.ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};
export default OnboardingStep;
