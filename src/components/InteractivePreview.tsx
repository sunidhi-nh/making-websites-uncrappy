import React, { useState, useEffect } from "react";
import type { ColorPalette, FontPairing } from "../data/brandTemplates";
import type { PreviewContent } from "../utils/brandEngine";
import LogoGenerator from "./LogoGenerator";
import * as Icons from "lucide-react";

interface InteractivePreviewProps {
  companyName: string;
  tagline: string;
  industryId: string;
  weirdness: number;
  palette: ColorPalette;
  fontPairing: FontPairing;
  previewContent: PreviewContent;
  setPreviewContent: (content: PreviewContent) => void;
}

export const InteractivePreview: React.FC<InteractivePreviewProps> = ({
  companyName,
  industryId,
  weirdness,
  palette,
  fontPairing,
  previewContent,
  setPreviewContent
}) => {
  const [isPreviewDark, setIsPreviewDark] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [showDemoToast, setShowDemoToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Inject Google Font link dynamically on font change
  useEffect(() => {
    const linkId = "dynamic-brand-font-link";
    let linkElement = document.getElementById(linkId) as HTMLLinkElement;

    if (!linkElement) {
      linkElement = document.createElement("link");
      linkElement.id = linkId;
      linkElement.rel = "stylesheet";
      document.head.appendChild(linkElement);
    }
    linkElement.href = fontPairing.importUrl;
  }, [fontPairing]);

  const handleCTA = () => {
    setToastMessage(`🎉 Congrats! You clicked the CTA for ${companyName || "your brand"}.`);
    setShowDemoToast(true);
    setTimeout(() => setShowDemoToast(false), 3000);
  };

  const handleContentChange = (key: keyof PreviewContent, value: string) => {
    setPreviewContent({
      ...previewContent,
      [key]: value
    });
  };

  // Dynamic styles block for preview
  const previewStyles = {
    "--p-primary": palette.primary,
    "--p-secondary": palette.secondary,
    "--p-accent": palette.accent,
    "--p-bg": isPreviewDark ? palette.background : "#FCFCFD",
    "--p-text": isPreviewDark ? palette.text : "#1A1D25",
    "--p-border": isPreviewDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.08)",
    "--p-surface": isPreviewDark ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.02)",
    "--p-surface-hover": isPreviewDark ? "rgba(255, 255, 255, 0.06)" : "rgba(15, 23, 42, 0.04)"
  } as React.CSSProperties;

  return (
    <div className="preview-container flex flex-col h-full overflow-hidden border border-white/10 rounded-xl bg-slate-950/60 backdrop-blur-md">
      {/* Top Preview Control Panel */}
      <div className="preview-control-bar flex items-center justify-between px-4 py-2 border-b border-white/10 bg-black/40 text-xs font-mono">
        <div className="flex items-center gap-1-5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-secondary ml-2 text-[10px]">PREVIEW CANVAS</span>
        </div>

        <div className="preview-controls-group">
          {/* Edit Mode Toggle */}
          <button
            type="button"
            className={`preview-control-btn ${isEditable ? "active" : ""}`}
            onClick={() => setIsEditable(!isEditable)}
            title="Directly edit text inside the landing page preview!"
          >
            {isEditable ? <Icons.CheckSquare className="w-3.5 h-3.5" /> : <Icons.Edit2 className="w-3.5 h-3.5" />}
            {isEditable ? "Editing Live" : "Edit Copy"}
          </button>

          <button
            type="button"
            className={`preview-control-btn ${!isPreviewDark ? "active" : ""}`}
            onClick={() => setIsPreviewDark(!isPreviewDark)}
          >
            {isPreviewDark ? <Icons.Moon className="w-3.5 h-3.5" /> : <Icons.Sun className="w-3.5 h-3.5 text-amber-400" />}
            {isPreviewDark ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      </div>

      <div
        className={`preview-viewport flex-1 overflow-y-auto p-6 md:p-8 transition-colors duration-300 ${
          isPreviewDark ? "dark-theme" : "light-theme"
        }`}
        style={{
          ...previewStyles,
          backgroundColor: "var(--p-bg)",
          color: "var(--p-text)",
          fontFamily: fontPairing.bodyFont
        }}
      >
        {/* Navigation Bar */}
        <nav
          className="flex justify-between items-center mb-12 md:mb-16 pb-4 border-b"
          style={{ borderColor: "var(--p-border)" }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <LogoGenerator
                industryId={industryId}
                weirdness={weirdness}
                complexity={50}
                vibe={50}
                palette={palette}
              />
            </div>
            <span
              className="font-bold text-lg tracking-tight"
              style={{ fontFamily: fontPairing.displayFont }}
            >
              {companyName || "Un-named Corp"}
            </span>
          </div>

          <div className="hidden md:flex gap-6 text-sm opacity-80 font-medium">
            <span className="cursor-pointer hover:opacity-100">Features</span>
            <span className="cursor-pointer hover:opacity-100">Pricing</span>
            <span className="cursor-pointer hover:opacity-100">About</span>
          </div>

          <button
            type="button"
            className="preview-nav-btn"
            style={{
              borderColor: "var(--p-primary)",
              color: "var(--p-primary)"
            }}
            onClick={handleCTA}
          >
            Sign Up
          </button>
        </nav>

        {/* Hero Section */}
        <section className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h1
            className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight outline-none"
            style={{
              fontFamily: fontPairing.displayFont,
              color: "var(--p-primary)"
            }}
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentChange("heroTitle", e.target.innerText)}
          >
            {previewContent.heroTitle}
          </h1>

          <p
            className="text-base md:text-lg opacity-85 mb-8 leading-relaxed max-w-xl mx-auto outline-none"
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={(e) => handleContentChange("heroSubtitle", e.target.innerText)}
          >
            {previewContent.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              type="button"
              className="preview-btn preview-btn-primary"
              style={{
                backgroundColor: "var(--p-accent)",
                color: "#1A1D25"
              }}
              onClick={handleCTA}
            >
              {previewContent.ctaText}
            </button>
            <button
              type="button"
              className="preview-btn preview-btn-secondary"
              style={{
                borderColor: "var(--p-border)",
                backgroundColor: "var(--p-surface)",
                color: "var(--p-text)"
              }}
              onClick={() => {
                setToastMessage("😅 Secondary button clicked. Boring option.");
                setShowDemoToast(true);
                setTimeout(() => setShowDemoToast(false), 2000);
              }}
            >
              Learn More
            </button>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="mb-16 md:mb-20">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            style={{ fontFamily: fontPairing.bodyFont }}
          >
            {/* Feature 1 */}
            <div
              className="preview-feature-card p-5 rounded-xl border transition-all duration-300"
              style={{
                borderColor: "var(--p-border)",
                backgroundColor: "var(--p-surface)"
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(var(--p-primary-rgb), 0.1)", color: "var(--p-primary)" }}
              >
                <Icons.Zap className="w-5 h-5" style={{ color: "var(--p-primary)" }} />
              </div>
              <h3
                className="text-lg font-bold mb-2 outline-none"
                style={{ fontFamily: fontPairing.displayFont }}
                contentEditable={isEditable}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange("feature1Title", e.target.innerText)}
              >
                {previewContent.feature1Title}
              </h3>
              <p
                className="text-sm opacity-80 leading-relaxed outline-none"
                contentEditable={isEditable}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange("feature1Text", e.target.innerText)}
              >
                {previewContent.feature1Text}
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="preview-feature-card p-5 rounded-xl border transition-all duration-300"
              style={{
                borderColor: "var(--p-border)",
                backgroundColor: "var(--p-surface)"
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(var(--p-secondary-rgb), 0.1)", color: "var(--p-secondary)" }}
              >
                <Icons.Activity className="w-5 h-5" style={{ color: "var(--p-secondary)" }} />
              </div>
              <h3
                className="text-lg font-bold mb-2 outline-none"
                style={{ fontFamily: fontPairing.displayFont }}
                contentEditable={isEditable}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange("feature2Title", e.target.innerText)}
              >
                {previewContent.feature2Title}
              </h3>
              <p
                className="text-sm opacity-80 leading-relaxed outline-none"
                contentEditable={isEditable}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange("feature2Text", e.target.innerText)}
              >
                {previewContent.feature2Text}
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="preview-feature-card p-5 rounded-xl border transition-all duration-300"
              style={{
                borderColor: "var(--p-border)",
                backgroundColor: "var(--p-surface)"
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "rgba(var(--p-accent-rgb), 0.1)", color: "var(--p-accent)" }}
              >
                <Icons.Shield className="w-5 h-5" style={{ color: "var(--p-accent)" }} />
              </div>
              <h3
                className="text-lg font-bold mb-2 outline-none"
                style={{ fontFamily: fontPairing.displayFont }}
                contentEditable={isEditable}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange("feature3Title", e.target.innerText)}
              >
                {previewContent.feature3Title}
              </h3>
              <p
                className="text-sm opacity-80 leading-relaxed outline-none"
                contentEditable={isEditable}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange("feature3Text", e.target.innerText)}
              >
                {previewContent.feature3Text}
              </p>
            </div>
          </div>
        </section>

          {/* Pricing Section */}
          <section className="mb-8 max-w-sm mx-auto">
            <div
              className="p-6 rounded-2xl border-2 text-center relative overflow-hidden"
              style={{
                borderColor: "var(--p-accent)",
                backgroundColor: "var(--p-surface)"
              }}
            >
              <span
                className="recommended-badge"
                style={{
                  backgroundColor: "var(--p-accent)",
                  color: "#1A1D25",
                  fontFamily: fontPairing.displayFont
                }}
              >
                RECOMMENDED
              </span>
              <h3
                className="text-sm font-semibold tracking-wider uppercase mb-2 outline-none"
                contentEditable={isEditable}
                suppressContentEditableWarning={true}
                onBlur={(e) => handleContentChange("pricingPlan", e.target.innerText)}
              >
                {previewContent.pricingPlan}
              </h3>
              <div className="flex items-baseline justify-center gap-1 mb-4">
                <span
                  className="text-3xl font-black outline-none"
                  style={{ fontFamily: fontPairing.displayFont }}
                  contentEditable={isEditable}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleContentChange("pricingPrice", e.target.innerText)}
                >
                  {previewContent.pricingPrice}
                </span>
                <span
                  className="text-xs opacity-70 outline-none"
                  contentEditable={isEditable}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => handleContentChange("pricingPeriod", e.target.innerText)}
                >
                  /{previewContent.pricingPeriod}
                </span>
              </div>
              <button
                type="button"
                className="preview-btn preview-btn-primary w-full"
                style={{
                  backgroundColor: "var(--p-accent)",
                  color: "#1A1D25"
                }}
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </section>
      </div>

      {/* Floating Demo Toast */}
      {showDemoToast && (
        <div
          className="fixed bottom-6 right-6 p-4 rounded-xl border shadow-xl flex items-center gap-2-5 animate-slide-up z-50 text-xs font-semibold"
          style={{
            backgroundColor: "var(--p-bg)",
            borderColor: "var(--p-accent)",
            color: "var(--p-text)",
            fontFamily: fontPairing.bodyFont
          }}
        >
          <Icons.CheckCircle className="w-5 h-5" style={{ color: "var(--p-accent)" }} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
export default InteractivePreview;
