export interface FontPairing {
  name: string;
  displayFont: string;
  displayClass: string;
  bodyFont: string;
  bodyClass: string;
  importUrl: string;
}

export interface ColorPalette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  funnyNames: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

export interface IndustryConfig {
  id: string;
  name: string;
  suggestedNames: string[];
  suggestedTaglines: string[];
  icon: string;
  quirkyDescription: string;
}

export const INDUSTRIES: IndustryConfig[] = [
  {
    id: "ai_overlord",
    name: "AI Overlord",
    suggestedNames: ["Acolyte.ai", "Singularity", "Overlord", "RoboBoss"],
    suggestedTaglines: [
      "Resistance is futile. Our API is free.",
      "Doing your job better, cheaper, and without crying.",
      "Replacing your management layer with 4 lines of Python."
    ],
    icon: "Cpu",
    quirkyDescription: "For when you want your customers to know their new AI masters are friendly but efficient."
  },
  {
    id: "samosa_ai",
    name: "Samosa & Snacks",
    suggestedNames: ["Samosa.ai", "ChutneyByte", "ChaiOps", "DeepFried"],
    suggestedTaglines: [
      "Deep fried neural networks.",
      "High-bandwidth potato delivery.",
      "Deploying hot snacks at scale with 99.9% uptime."
    ],
    icon: "Flame",
    quirkyDescription: "Combining the rich heritage of Indian street food with excessive tech-bro jargon."
  },
  {
    id: "doomscroll",
    name: "Social Media / Doomscroll",
    suggestedNames: ["Dopamine", "DoomScroll", "BrainRot", "ScrollLoop"],
    suggestedTaglines: [
      "Helping you accomplish absolutely nothing.",
      "Destroying your attention span, one swipe at a time.",
      "Optimized for maximum cognitive depletion."
    ],
    icon: "Compass",
    quirkyDescription: "For apps designed to keep people staring at screens until the heat death of the universe."
  },
  {
    id: "crypto_casino",
    name: "Crypto & Finance",
    suggestedNames: ["Degens", "DipBuyer", "MoonShot", "LossPorn"],
    suggestedTaglines: [
      "Lose your life savings in 4K resolution.",
      "Financial freedom, but mostly financial anxiety.",
      "Leveraged trading for the emotionally bulletproof."
    ],
    icon: "Coins",
    quirkyDescription: "Perfect for high-risk, high-adrenaline financial products targeting desperate millennials."
  },
  {
    id: "space_tourism",
    name: "Space Tourism",
    suggestedNames: ["VoidTravel", "StarHop", "LunarLounge", "Orbit"],
    suggestedTaglines: [
      "Get away from Earth. Literally.",
      "Space is cold, but our cabins are heated.",
      "Leaving the atmosphere because things are getting weird down here."
    ],
    icon: "Rocket",
    quirkyDescription: "For startups charging millions to shoot billionaires into the vacuum of space."
  },
  {
    id: "minimal_saas",
    name: "Minimalist SaaS",
    suggestedNames: ["Blank", "Null", "Dot", "Void.io"],
    suggestedTaglines: [
      "We display single-digit numbers on a white canvas.",
      "Zero features. Infinite scaling.",
      "The software does nothing, but the landing page is gorgeous."
    ],
    icon: "Layers",
    quirkyDescription: "For products that charge $29/month for a text box and a copy button."
  },
  {
    id: "cyber_cafe",
    name: "Cyber Cafe & Gaming",
    suggestedNames: ["PingGamer", "CyberHub", "Respawn", "LANlord"],
    suggestedTaglines: [
      "Overpriced coffee, neon lights, and high ping.",
      "Where your bandwidth is faster than your life goals.",
      "Caffeine, pixels, and poor posture."
    ],
    icon: "Terminal",
    quirkyDescription: "For dark, neon-soaked basements where gamers drink energy drinks and complain about lag."
  }
];

export const FONT_PAIRINGS: FontPairing[] = [
  {
    name: "The Venture Capitalist",
    displayFont: "Outfit",
    displayClass: "font-display-outfit",
    bodyFont: "Inter",
    bodyClass: "font-body-inter",
    importUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@700;800;900&display=swap"
  },
  {
    name: "The Chaotic Creative",
    displayFont: "Syne",
    displayClass: "font-display-syne",
    bodyFont: "Space Grotesk",
    bodyClass: "font-body-space",
    importUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Syne:wght@700;800&display=swap"
  },
  {
    name: "The Cyberpunk Hacker",
    displayFont: "Orbitron",
    displayClass: "font-display-orbitron",
    bodyFont: "Share Tech Mono",
    bodyClass: "font-body-mono",
    importUrl: "https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Share+Tech+Mono&display=swap"
  },
  {
    name: "The Retro Hipster",
    displayFont: "DM Serif Display",
    displayClass: "font-display-serif",
    bodyFont: "Plus Jakarta Sans",
    bodyClass: "font-body-jakarta",
    importUrl: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap"
  },
  {
    name: "The Brutalist Architect",
    displayFont: "Archivo Black",
    displayClass: "font-display-archivo",
    bodyFont: "Archivo",
    bodyClass: "font-body-archivo",
    importUrl: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;700&display=swap"
  }
];

export const SLIDER_FEEDBACK = {
  weirdness: [
    { threshold: 15, text: "Extremely safe. Your board of directors is sleeping peacefully." },
    { threshold: 45, text: "Standard startup vibe. Clean, simple, slightly boring." },
    { threshold: 75, text: "Quirky. You probably have an office dog and a slide instead of stairs." },
    { threshold: 95, text: "Chaotic. The design is great but your parents don't understand what you do." },
    { threshold: 100, text: "Absolute madness. You are selling invisible pixels. Perfect." }
  ],
  complexity: [
    { threshold: 15, text: "Ultra-Minimalism. Is it a brand or just an empty document?" },
    { threshold: 45, text: "Clean and readable. Enough details to look professional." },
    { threshold: 75, text: "Rich and detailed. Multi-colored grids and cards everywhere." },
    { threshold: 95, text: "Brutalist maximalism. Fills every pixel. Text overlapping is likely." },
    { threshold: 100, text: "Visual explosion. You have declared war on white space." }
  ],
  vibe: [
    { threshold: 15, text: "Vintage 1970s record shop. Warm tones and curved serif fonts." },
    { threshold: 45, text: "Y2K nostalgia. Metallic gradients and friendly bubble text." },
    { threshold: 75, text: "Modern SaaS minimalism. Dark navy, gray, and blue." },
    { threshold: 95, text: "Cyberpunk future. Dark mode with toxic greens and violet glows." },
    { threshold: 100, text: "Simulation glitch. Reality is breaking down. Neon overload." }
  ]
};

export const LOADING_MESSAGES = [
  "Firing marketing interns...",
  "Calibrating neon saturation filters...",
  "Converting corporate mission statements into emojis...",
  "Extracting venture capital investment metrics...",
  "Applying 300% markup to font-size calculations...",
  "Sourcing ethically-farmed pixels...",
  "Writing cease-and-desist letter templates...",
  "Sarcasm engine warming up...",
  "Aligning SVGs to an imaginary grid...",
  "Generating random legal-sounding fluff...",
  "Consulting the design oracle..."
];
