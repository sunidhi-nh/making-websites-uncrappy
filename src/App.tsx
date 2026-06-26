import React, { useState } from "react";
import OnboardingStep from "./components/OnboardingStep";
import MoodStep from "./components/MoodStep";
import LoadingStep from "./components/LoadingStep";
import BrandShowroom from "./components/BrandShowroom";
import { generatePalette, selectFontPairing, generateCopyGuidelines, generatePreviewContent } from "./utils/brandEngine";
import type { PreviewContent } from "./utils/brandEngine";
import type { ColorPalette, FontPairing } from "./data/brandTemplates";
import * as Icons from "lucide-react";

type Step = "onboarding" | "mood" | "loading" | "showroom";

export const App: React.FC = () => {
  // Wizard States
  const [step, setStep] = useState<Step>("onboarding");
  const [companyName, setCompanyName] = useState("");
  const [tagline, setTagline] = useState("");
  const [industryId, setIndustryId] = useState("ai_overlord");
  
  // Slider calibration states
  const [weirdness, setWeirdness] = useState(50);
  const [complexity, setComplexity] = useState(50);
  const [vibe, setVibe] = useState(50);

  // Derived/Generated Brand States
  const [palette, setPalette] = useState<ColorPalette | null>(null);
  const [fontPairing, setFontPairing] = useState<FontPairing | null>(null);
  const [copyGuidelines, setCopyGuidelines] = useState<string[]>([]);
  const [previewContent, setPreviewContent] = useState<PreviewContent | null>(null);

  const handleBlendIdentity = () => {
    // Generate brand spec
    const generatedPalette = generatePalette(weirdness, complexity, vibe);
    const generatedFont = selectFontPairing(vibe, weirdness, complexity);
    const generatedGuidelines = generateCopyGuidelines(industryId, weirdness);
    const initialPreviewContent = generatePreviewContent(companyName, tagline, industryId, weirdness);

    setPalette(generatedPalette);
    setFontPairing(generatedFont);
    setCopyGuidelines(generatedGuidelines);
    setPreviewContent(initialPreviewContent);

    // Transition to loading animation
    setStep("loading");
  };

  const handleReset = () => {
    setStep("onboarding");
    setCompanyName("");
    setTagline("");
    setIndustryId("ai_overlord");
    setWeirdness(50);
    setComplexity(50);
    setVibe(50);
    setPalette(null);
    setFontPairing(null);
    setCopyGuidelines([]);
    setPreviewContent(null);
  };

  const renderStep = () => {
    switch (step) {
      case "onboarding":
        return (
          <OnboardingStep
            companyName={companyName}
            setCompanyName={setCompanyName}
            tagline={tagline}
            setTagline={setTagline}
            industryId={industryId}
            setIndustryId={setIndustryId}
            onNext={() => setStep("mood")}
          />
        );
      case "mood":
        return (
          <MoodStep
            weirdness={weirdness}
            setWeirdness={setWeirdness}
            complexity={complexity}
            setComplexity={setComplexity}
            vibe={vibe}
            setVibe={setVibe}
            onNext={handleBlendIdentity}
            onBack={() => setStep("onboarding")}
          />
        );
      case "loading":
        return <LoadingStep onComplete={() => setStep("showroom")} />;
      case "showroom":
        if (palette && fontPairing && previewContent) {
          return (
            <BrandShowroom
              companyName={companyName}
              tagline={tagline}
              industryId={industryId}
              weirdness={weirdness}
              palette={palette}
              fontPairing={fontPairing}
              previewContent={previewContent}
              setPreviewContent={setPreviewContent}
              copyGuidelines={copyGuidelines}
              onReset={handleReset}
            />
          );
        }
        return null;
      default:
        return null;
    }
  };

  // Step indicator state
  const stepNumber = () => {
    if (step === "onboarding") return 1;
    if (step === "mood") return 2;
    if (step === "loading") return 3;
    return 4;
  };

  return (
    <div className="min-h-screen bg-[#08080A] text-white flex flex-col justify-between overflow-x-hidden relative font-sans">
      
      {/* Dynamic Background Mesh Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary-color/10 filter blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-accent-color/10 filter blur-[80px]" />
        <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] rounded-full bg-secondary-color/5 filter blur-[120px]" />
      </div>

      {/* Main Header */}
      <header className="w-full py-5 px-6 border-b border-white/5 bg-black/20 backdrop-blur-md relative z-10 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={handleReset}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-color to-accent-color flex items-center justify-center shadow-lg shadow-primary-color/20">
            <Icons.Layers className="w-4 h-4 text-slate-900" />
          </div>
          <span className="font-display-orbitron text-xs font-black tracking-wider uppercase">
            BRANDKIT <span className="text-accent-color">//</span>
          </span>
        </div>

        {/* Step Indicator Bullets */}
        {step !== "showroom" && (
          <div className="flex gap-2 items-center font-mono text-[10px]">
            <span className={stepNumber() >= 1 ? "text-accent" : "text-secondary"}>01. SPARK</span>
            <span className="text-secondary">&rarr;</span>
            <span className={stepNumber() >= 2 ? "text-accent" : "text-secondary"}>02. VIBE</span>
            <span className="text-secondary">&rarr;</span>
            <span className={stepNumber() >= 3 ? "text-accent" : "text-secondary"}>03. BLEND</span>
          </div>
        )}
      </header>

      {/* Main Application Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 relative z-10 w-full">
        <div className={`w-full ${step === "showroom" ? "max-w-7xl" : "max-w-lg"} transition-all duration-500 ease-in-out`}>
          {renderStep()}
        </div>
      </main>

      {/* Main Footer */}
      <footer className="app-footer">
        &copy; 2026. All rights reserved.
      </footer>

    </div>
  );
};
export default App;
