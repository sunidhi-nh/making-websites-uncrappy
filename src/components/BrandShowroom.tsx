import React, { useState } from "react";
import type { ColorPalette, FontPairing } from "../data/brandTemplates";
import type { PreviewContent } from "../utils/brandEngine";
import LogoGenerator from "./LogoGenerator";
import InteractivePreview from "./InteractivePreview";
import * as Icons from "lucide-react";

interface BrandShowroomProps {
  companyName: string;
  tagline: string;
  industryId: string;
  weirdness: number;
  palette: ColorPalette;
  fontPairing: FontPairing;
  previewContent: PreviewContent;
  setPreviewContent: (content: PreviewContent) => void;
  copyGuidelines: string[];
  onReset: () => void;
}

export const BrandShowroom: React.FC<BrandShowroomProps> = ({
  companyName,
  tagline,
  industryId,
  weirdness,
  palette,
  fontPairing,
  previewContent,
  setPreviewContent,
  copyGuidelines,
  onReset
}) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const triggerCopyToast = (text: string) => {
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerCopyToast(`Copied ${label}!`);
  };

  const downloadSvgLogo = () => {
    const svgEl = document.querySelector(".showroom-logo-box svg");
    if (!svgEl) {
      triggerCopyToast("Logo container not found");
      return;
    }
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    const name = companyName.trim() || "brand";
    link.download = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-logo.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    triggerCopyToast("SVG Logo Downloaded!");
  };

  const downloadBrandBook = () => {
    const brandBook = {
      brandName: companyName,
      tagline: tagline,
      industry: industryId,
      sliders: { weirdness },
      palette: {
        primary: { hex: palette.primary, concept: palette.funnyNames.primary },
        secondary: { hex: palette.secondary, concept: palette.funnyNames.secondary },
        accent: { hex: palette.accent, concept: palette.funnyNames.accent },
        background: { hex: palette.background, concept: palette.funnyNames.background },
        text: { hex: palette.text, concept: palette.funnyNames.text }
      },
      typography: {
        heading: fontPairing.displayFont,
        body: fontPairing.bodyFont,
        googleFontsImport: fontPairing.importUrl
      },
      toneGuidelines: copyGuidelines
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(brandBook, null, 2));
    const link = document.createElement("a");
    link.href = dataStr;
    const name = companyName.trim() || "brand";
    link.download = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-brandbook.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerCopyToast("Brandbook JSON Downloaded!");
  };

  const copyCssVars = () => {
    const cssText = `:root {
  /* Dynamic brand variables generated for ${companyName} */
  --brand-primary: ${palette.primary}; /* ${palette.funnyNames.primary} */
  --brand-secondary: ${palette.secondary}; /* ${palette.funnyNames.secondary} */
  --brand-accent: ${palette.accent}; /* ${palette.funnyNames.accent} */
  --brand-bg: ${palette.background}; /* ${palette.funnyNames.background} */
  --brand-text: ${palette.text}; /* ${palette.funnyNames.text} */
  --brand-font-display: "${fontPairing.displayFont}", sans-serif;
  --brand-font-body: "${fontPairing.bodyFont}", sans-serif;
}`;
    copyToClipboard(cssText, "CSS Variables");
  };

  const copyRawSvg = () => {
    const svgEl = document.querySelector(".showroom-logo-box svg");
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    copyToClipboard(source, "Raw SVG Code");
  };

  const swatches = [
    { label: "Primary Color", hex: palette.primary, desc: palette.funnyNames.primary },
    { label: "Secondary Color", hex: palette.secondary, desc: palette.funnyNames.secondary },
    { label: "Accent Glow", hex: palette.accent, desc: palette.funnyNames.accent },
    { label: "Background Block", hex: palette.background, desc: palette.funnyNames.background },
    { label: "Typography Ink", hex: palette.text, desc: palette.funnyNames.text }
  ];

  return (
    <div className="showroom-layout grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl mx-auto items-stretch fade-in">
      
      {/* LEFT: Specification Details Panel (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        
        {/* Header summary */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-accent font-bold">IDENTITY COMPILED</span>
            <h2 className="text-2xl font-bold tracking-tight mt-1">{companyName || "Un-named Brand"}</h2>
            <p className="text-secondary text-sm mt-1 italic">{tagline || "No slogan provided."}</p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-rose-500/25 bg-rose-500/10 text-rose-400 text-sm font-semibold hover:bg-rose-500/20 active:scale-95 transition-all duration-150"
            onClick={onReset}
          >
            <Icons.RotateCcw className="w-4 h-4" />
            Start Over
          </button>
        </div>

        {/* Logo Spec Card */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
          <h3 className="text-xs font-mono text-secondary uppercase tracking-widest">Logo Vector Spec</h3>
          <div className="flex gap-4 items-center">
            {/* Showroom Logo Frame */}
            <div
              className="showroom-logo-box w-28 h-28 rounded-xl border flex items-center justify-center p-3 relative overflow-hidden"
              style={{
                backgroundColor: palette.background,
                borderColor: "rgba(255, 255, 255, 0.15)",
                boxShadow: `0 8px 24px rgba(0,0,0,0.4)`
              }}
            >
              {/* Mesh background just for styling the viewer */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 30%, ${palette.primary} 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${palette.accent} 0%, transparent 50%)`
                }}
              />
              <LogoGenerator
                industryId={industryId}
                weirdness={weirdness}
                complexity={100}
                vibe={50}
                palette={palette}
              />
            </div>

            <div className="flex-1 flex flex-col gap-3">
              <button
                type="button"
                className="btn btn-secondary py-2-5 text-sm flex items-center justify-center gap-2-5"
                onClick={downloadSvgLogo}
              >
                <Icons.Download className="w-4 h-4 text-accent" />
                Download .SVG Logo
              </button>
              <button
                type="button"
                className="btn btn-secondary py-2-5 text-sm flex items-center justify-center gap-2-5"
                onClick={copyRawSvg}
              >
                <Icons.Code className="w-4 h-4 text-primary" />
                Copy SVG Code
              </button>
            </div>
          </div>
        </div>

        {/* Color Palette Spec Card */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
          <h3 className="text-xs font-mono text-secondary uppercase tracking-widest">Color Palette Concept</h3>
          <div className="flex flex-col gap-3">
            {swatches.map((sw, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 active:scale-[0.99] transition-all cursor-pointer"
                onClick={() => copyToClipboard(sw.hex, sw.label)}
                title={`Click to copy hex: ${sw.hex}`}
              >
                <div
                  className="w-10 h-10 rounded-lg shrink-0 border border-white/10 shadow"
                  style={{ backgroundColor: sw.hex }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-xs text-white">{sw.label}</span>
                    <span className="font-mono text-[10px] text-accent font-semibold">{sw.hex}</span>
                  </div>
                  <div className="text-secondary text-[11px] truncate italic mt-0.5">
                    &ldquo;{sw.desc}&rdquo;
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography Specs */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
          <h3 className="text-xs font-mono text-secondary uppercase tracking-widest">Typography Duo</h3>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <span className="text-[10px] font-mono text-secondary">DISPLAY HEADINGS</span>
                <div className="font-bold text-lg text-white truncate">{fontPairing.displayFont}</div>
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-mono text-secondary">BODY PARAGRAPHS</span>
                <div className="font-bold text-lg text-white truncate">{fontPairing.bodyFont}</div>
              </div>
            </div>
            {/* Live font tester */}
            <div className="font-tester-wrapper">
              <input
                type="text"
                className="font-tester-input"
                placeholder="Type here to test typography pairings..."
                style={{ fontFamily: fontPairing.displayFont }}
              />
            </div>
          </div>
        </div>

        {/* Brand Tone Guidelines */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
          <h3 className="text-xs font-mono text-secondary uppercase tracking-widest">Brand Tone Guidelines</h3>
          <ul className="flex flex-col gap-2-5">
            {copyGuidelines.map((g, idx) => (
              <li key={idx} className="flex gap-2-5 items-start text-xs leading-relaxed text-gray-300">
                <span className="text-accent mt-0.5 font-bold">⚡</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Export Operations Box */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
          <h3 className="text-xs font-mono text-secondary uppercase tracking-widest">Export Assets</h3>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="btn btn-primary py-3 text-sm flex items-center justify-center gap-2-5"
              onClick={downloadBrandBook}
            >
              <Icons.BookOpen className="w-4.5 h-4.5 text-slate-950" />
              Download Brandbook (JSON)
            </button>
            <button
              type="button"
              className="btn btn-secondary py-3 text-sm flex items-center justify-center gap-2-5 border border-white/10 bg-white/5 hover:bg-white/10"
              onClick={copyCssVars}
            >
              <Icons.ClipboardList className="w-4.5 h-4.5 text-accent" />
              Copy CSS Custom Variables
            </button>
          </div>
        </div>

      </div>

      {/* RIGHT: Live Interactive Preview Panel (7 Cols) */}
      <div className="lg:col-span-7 flex flex-col">
        <InteractivePreview
          companyName={companyName}
          tagline={tagline}
          industryId={industryId}
          weirdness={weirdness}
          palette={palette}
          fontPairing={fontPairing}
          previewContent={previewContent}
          setPreviewContent={setPreviewContent}
        />
      </div>

      {/* Clipboard Toast Alert */}
      {copiedText && (
        <div className="fixed bottom-6 right-6 p-4 rounded-xl border shadow-xl flex items-center gap-2-5 animate-slide-up z-50 bg-slate-900 border-accent text-white text-xs font-bold font-mono">
          <Icons.CheckCircle className="w-4 h-4 text-accent" />
          <span>{copiedText}</span>
        </div>
      )}

    </div>
  );
};
export default BrandShowroom;
