import type { FontPairing, ColorPalette } from "../data/brandTemplates";
import { FONT_PAIRINGS, INDUSTRIES } from "../data/brandTemplates";

// Helper to convert HSL to Hex
export function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// Simple helper to parse hex to HSL (just for display if needed)
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Generate quirky name for colors based on hue and saturation
export function getColorFunnyName(h: number, s: number, l: number, type: "primary" | "secondary" | "accent" | "background" | "text"): string {
  if (type === "background") {
    if (l > 80) return "Vanilla Boardroom White";
    if (l > 50) return "Beige Indifference";
    if (h < 50) return "Warm Chai Stain";
    if (h > 200 && h < 250) return "SaaS Void Navy";
    return "Cyberpunk Server Room Black";
  }
  if (type === "text") {
    if (l < 20) return "Soul-Crushing Black";
    if (l < 50) return "Passive Aggressive Gray";
    return "Glowing Screen White";
  }

  // Hue classification
  if (s < 15) {
    return "Depressing Corporate Gray";
  }

  if (h >= 340 || h < 15) {
    // Red/Pink
    if (l > 60) return "VC Burn Rate Pink";
    if (l < 40) return "Unpaid Intern Tears";
    return "ASAP Deadline Red";
  }
  if (h >= 15 && h < 50) {
    // Orange
    if (l > 60) return "Unstable Energy Drink Orange";
    return "Burnout Rust";
  }
  if (h >= 50 && h < 80) {
    // Yellow
    return "Golden Parachute Yellow";
  }
  if (h >= 80 && h < 160) {
    // Green
    if (l > 65) return "Radioactive Lime";
    if (l < 45) return "Greenwashed Eco-Guilt";
    return "Money Printer Green";
  }
  if (h >= 160 && h < 200) {
    // Cyan
    return "Artificial Intelligence Cyan";
  }
  if (h >= 200 && h < 260) {
    // Blue
    if (l < 30) return "Deep Existential Blue";
    if (l > 60) return "Out of Office Cyan";
    return "Refused Funding Blue";
  }
  if (h >= 260 && h < 340) {
    // Purple/Magenta
    if (l > 60) return "Dopamine Loop Violet";
    return "Crypto Bullshit Purple";
  }

  return "Indecisive Hex";
}

// Generate dynamic palette based on sliders
export function generatePalette(weirdness: number, _complexity: number, vibe: number): ColorPalette {
  let primaryHue = 220; // Default blue
  let secondaryHue = 200;
  let accentHue = 320; // Pink
  let isDark = vibe > 50 || weirdness > 70;

  // 1. Calculate Primary Hue based on Vibe and Weirdness
  if (vibe < 35) {
    // Retro warm tones: oranges, rusts, yellows, browns
    primaryHue = 25 + (weirdness * 0.2); // 25 to 45
    secondaryHue = 45 + (weirdness * 0.1);
    accentHue = 350; // Terracotta/Red
  } else if (vibe >= 35 && vibe < 70) {
    // Corporate/Modern: Blues, Cyans, Emeralds
    if (weirdness < 40) {
      primaryHue = 220; // Safe Blue
      secondaryHue = 200; // Sky Blue
      accentHue = 145; // Safe Emerald Green
    } else {
      // Slightly weird startup
      primaryHue = 270; // Purple
      secondaryHue = 190; // Cyan
      accentHue = 330; // Bright Pink
    }
  } else {
    // Cyberpunk Future: Purples, Hot Pinks, Neon Greens, Cyans
    primaryHue = 280 + (weirdness * 0.5); // 280 to 330
    secondaryHue = 180 + (weirdness * 0.4); // 180 to 220
    accentHue = 90 + (weirdness * 0.2); // Neon Green/Yellow
  }

  // Saturation adjustments based on weirdness
  const primarySat = Math.max(30, Math.min(100, 40 + weirdness * 0.6));
  const secondarySat = Math.max(35, Math.min(95, 45 + weirdness * 0.5));
  const accentSat = Math.max(50, Math.min(100, 60 + weirdness * 0.4));

  // Lightness adjustments based on style
  const primaryLight = isDark ? 55 : 45;
  const secondaryLight = isDark ? 65 : 40;
  const accentLight = 50;

  // Background HSL
  let bgH = 220, bgS = 10, bgL = 98;
  if (isDark) {
    if (vibe > 80) {
      // Cyberpunk deep purple/black background
      bgH = 270;
      bgS = 25;
      bgL = 5;
    } else {
      // Normal dark slate
      bgH = 222;
      bgS = 15;
      bgL = 8;
    }
  } else {
    if (vibe < 35) {
      // Retro warm cream
      bgH = 40;
      bgS = 22;
      bgL = 95;
    } else {
      // Modern cool gray
      bgH = 210;
      bgS = 10;
      bgL = 98;
    }
  }

  // Text HSL
  const textH = bgH;
  const textS = bgS;
  const textL = isDark ? 95 : 12;

  // HEX outputs
  const primary = hslToHex(primaryHue, primarySat, primaryLight);
  const secondary = hslToHex(secondaryHue, secondarySat, secondaryLight);
  const accent = hslToHex(accentHue, accentSat, accentLight);
  const background = hslToHex(bgH, bgS, bgL);
  const text = hslToHex(textH, textS, textL);

  return {
    name: `${vibe < 35 ? "Vintage" : vibe > 70 ? "Cyberpunk" : "SaaS"} ${weirdness > 70 ? "Madness" : "Classic"}`,
    primary,
    secondary,
    accent,
    background,
    text,
    funnyNames: {
      primary: getColorFunnyName(primaryHue, primarySat, primaryLight, "primary"),
      secondary: getColorFunnyName(secondaryHue, secondarySat, secondaryLight, "secondary"),
      accent: getColorFunnyName(accentHue, accentSat, accentLight, "accent"),
      background: getColorFunnyName(bgH, bgS, bgL, "background"),
      text: getColorFunnyName(textH, textS, textL, "text")
    }
  };
}

// Select Font Pairing based on sliders
export function selectFontPairing(vibe: number, weirdness: number, complexity: number): FontPairing {
  // vibe: 0-100 (Retro -> Cyberpunk)
  // weirdness: 0-100 (Corporate -> Weird)
  // complexity: 0-100 (Minimal -> Maximal)

  if (weirdness > 80 && vibe > 70) {
    // Cyberpunk Hacker
    return FONT_PAIRINGS[2];
  }
  if (vibe < 35) {
    // Retro Hipster
    return FONT_PAIRINGS[3];
  }
  if (weirdness > 60 && complexity > 60) {
    // Brutalist Architect
    return FONT_PAIRINGS[4];
  }
  if (weirdness > 50) {
    // Chaotic Creative
    return FONT_PAIRINGS[1];
  }
  // Default: Venture Capitalist
  return FONT_PAIRINGS[0];
}

// Copy guidelines based on weirdness and industry
export function generateCopyGuidelines(_industryId: string, weirdness: number): string[] {
  const baseRules = [
    "Never apologize for server downtime. Call it a 'scheduled digital detox.'",
    "Use exclamation marks only when discussing coffee or funding rounds."
  ];

  if (weirdness < 30) {
    return [
      "Keep all sentences grammatically correct and emotionally dry.",
      "Use terms like 'synergistic optimization' and 'leverage value-add' at least twice per paragraph.",
      "Ensure the tone represents a beige-colored cubicle in a suburb of Delaware.",
      ...baseRules
    ];
  }

  if (weirdness >= 30 && weirdness < 75) {
    return [
      "Talk like a friendly tech-bro who has read half of a self-help book.",
      "Use emojis to hide the fact that we collect user data.",
      "Capitalize random letters in headers to look 'disruptive.'",
      "Mention your 'core mission to change the world' when pricing rises.",
      ...baseRules
    ];
  }

  // Ultra weird
  return [
    "Capital letters are for boomer corporations. Keep everything lowercase. Or ALL CAPS. Nothing in between.",
    "Speak as if you are a sentient toaster that is slightly disappointed in humanity.",
    "If a customer complains, suggest they try meditating or buying our stock.",
    "Include at least one obscure reference to 90s anime or street food in every newsletter.",
    "Our legal warnings must be written in haikus."
  ];
}

// Landing page mock structure generator
export interface PreviewContent {
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  feature1Title: string;
  feature1Text: string;
  feature2Title: string;
  feature2Text: string;
  feature3Title: string;
  feature3Text: string;
  pricingPlan: string;
  pricingPrice: string;
  pricingPeriod: string;
}

export function generatePreviewContent(companyName: string, tagline: string, industryId: string, weirdness: number): PreviewContent {
  const cleanName = companyName.trim() || "Un-named Corp";
  const cleanTagline = tagline.trim() || "Just another company doing stuff.";
  
  const industry = INDUSTRIES.find(i => i.id === industryId) || INDUSTRIES[0];

  let heroTitle = `The Future of ${industry.name} is Here.`;
  let heroSubtitle = cleanTagline;
  let ctaText = "Get Started Free";
  
  let feature1Title = "Instant Setup";
  let feature1Text = "Integrate with three lines of JS that you copy-paste from StackOverflow.";
  let feature2Title = "AI-Driven Magic";
  let feature2Text = "We send everything to GPT-4 and charge you a 500% premium.";
  let feature3Title = "Enterprise Security";
  let feature3Text = "We promise we won't put your database on a public GitHub repo.";

  let pricingPlan = "Pro Degen";
  let pricingPrice = "$29";
  let pricingPeriod = "per month";

  // Customize based on Industry & Weirdness
  if (weirdness > 60) {
    ctaText = "Give Us Money";
    pricingPlan = "Existential Subscription";
    pricingPrice = "$99.99";
    pricingPeriod = "per anxiety attack";

    if (industryId === "ai_overlord") {
      heroTitle = `Kneel Before ${cleanName}.`;
      feature1Title = "Automated Servitude";
      feature1Text = "We automate your entire job so you can focus on doomscrolling.";
      feature2Title = "Zero Consciousness";
      feature2Text = "No thoughts, head empty, but our code compiles instantly.";
      feature3Title = "Investor Approval";
      feature3Text = "We added '.ai' to our domain name and raised $50M in seed funding.";
    } else if (industryId === "samosa_ai") {
      heroTitle = `${cleanName}: Deep-Fried Scalability.`;
      ctaText = "Order Plate Now";
      pricingPlan = "Chutney tier";
      pricingPrice = "₹120";
      pricingPeriod = "per plate";
      feature1Title = "Chai-Native Architecture";
      feature1Text = "Our servers are cooled using hot cutting-chai for maximum thermal performance.";
      feature2Title = "Crispy Algorithms";
      feature2Text = "Samosas fried exactly to 180°C using neural network heat sensors.";
      feature3Title = "Zero Calorie Code";
      feature3Text = "Code contains 0g trans fats but 100% memory efficiency.";
    } else if (industryId === "doomscroll") {
      heroTitle = `Waste Your Life With ${cleanName}.`;
      ctaText = "Inject Dopamine";
      feature1Title = "Endless Scrolling";
      feature1Text = "Scroll until your thumb falls off. Our feeds are mathematically infinite.";
      feature2Title = "Zero Productivity";
      feature2Text = "We block your calendar events and replace them with short video clips.";
      feature3Title = "Dark Patterns";
      feature3Text = "The unsubscribe button moves 5px away every time you hover over it.";
    } else if (industryId === "crypto_casino") {
      heroTitle = `${cleanName}: Lose Money Safely.`;
      ctaText = "Leverage 100x";
      pricingPlan = "Margin Call Tier";
      pricingPrice = "$0";
      pricingPeriod = "remaining in bank";
      feature1Title = "High Volatility";
      feature1Text = "Watch your portfolio fluctuate faster than your heart rate.";
      feature2Title = "Laser Eyes Integration";
      feature2Text = "Profile picture automatically edits itself to include red lasers.";
      feature3Title = "Decentralized Coping";
      feature3Text = "Connect your wallet and watch gas fees eat your remaining gas.";
    } else if (industryId === "space_tourism") {
      heroTitle = `Escape Planet Earth with ${cleanName}.`;
      ctaText = "Book Rocket Seat";
      pricingPlan = "One-Way Ticket";
      pricingPrice = "$450K";
      pricingPeriod = "per seat";
      feature1Title = "Space-Grade Wifi";
      feature1Text = "Tweet your space photos with only 45-minute satellite delay.";
      feature2Title = "Zero-G Coffee";
      feature2Text = "Drink coffee from spherical floating drops. Watch out for stains.";
      feature3Title = "Alien Neighbors";
      feature3Text = "Wave at satellites or cry silently looking at the tiny blue dot.";
    } else if (industryId === "minimal_saas") {
      heroTitle = `${cleanName} is Just a Textbox.`;
      ctaText = "Enter Text";
      pricingPlan = "Nothingness";
      pricingPrice = "$19";
      pricingPeriod = "per character";
      feature1Title = "Pure Minimalist Canvas";
      feature1Text = "We don't use boxes, lines, or borders. Text is just floating in the void.";
      feature2Title = "No Features";
      feature2Text = "Features lead to bugs. We don't have bugs because we don't do anything.";
      feature3Title = "Self-Care Typography";
      feature3Text = "Font sizing is determined by your current blood pressure levels.";
    }
  } else {
    // Normal / moderately quirky copy
    if (industryId === "ai_overlord") {
      heroTitle = `Smarter Workflows with ${cleanName}.`;
      feature1Title = "LLM Pipeline";
      feature1Text = "Chain prompt models together to automate standard business inquiries.";
      feature2Title = "Model Fine-tuning";
      feature2Text = "Train adapters on your specific corporate handbooks and docs.";
    } else if (industryId === "samosa_ai") {
      heroTitle = `${cleanName} delivers hot hot snacks.`;
      ctaText = "Get Fried Gold";
      pricingPlan = "Weekly Box";
      pricingPrice = "₹499";
    }
  }

  return {
    heroTitle,
    heroSubtitle,
    ctaText,
    feature1Title,
    feature1Text,
    feature2Title,
    feature2Text,
    feature3Title,
    feature3Text,
    pricingPlan,
    pricingPrice,
    pricingPeriod
  };
}
