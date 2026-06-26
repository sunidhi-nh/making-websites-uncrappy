import React from "react";
import type { ColorPalette } from "../data/brandTemplates";

interface LogoGeneratorProps {
  industryId: string;
  weirdness: number;
  complexity: number;
  vibe: number;
  palette: ColorPalette;
  width?: string | number;
  height?: string | number;
}

export const LogoGenerator: React.FC<LogoGeneratorProps> = ({
  industryId,
  weirdness,
  complexity,
  vibe,
  palette,
  width = "100%",
  height = "100%"
}) => {
  const { primary, secondary, accent } = palette;

  // We can render different paths based on industry
  const renderLogoPath = () => {
    // Determine details based on complexity slider (1 to 5 items)
    const detailLevel = Math.max(1, Math.min(5, Math.ceil(complexity / 20)));
    const isWeird = weirdness > 60;
    const isRetro = vibe < 35;

    switch (industryId) {
      case "ai_overlord":
        return (
          <g>
            {/* Neural Net Nodes / Robot Eye */}
            <defs>
              <radialGradient id="aiGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={accent} stopOpacity="1" />
                <stop offset="100%" stopColor={primary} stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Outer ring */}
            <circle
              cx="100"
              cy="100"
              r="70"
              fill="none"
              stroke={primary}
              strokeWidth={isWeird ? "8" : "4"}
              strokeDasharray={isWeird ? "15 5 5 5" : "none"}
            />
            {/* Eye core or central chip */}
            {isWeird ? (
              <polygon
                points="100,60 135,120 65,120"
                fill={accent}
                opacity="0.9"
              />
            ) : (
              <rect
                x="70"
                y="70"
                width="60"
                height="60"
                rx={10}
                fill={secondary}
                stroke={primary}
                strokeWidth="4"
              />
            )}
            {/* Neural connections */}
            {detailLevel >= 2 && (
              <path
                d="M50,100 L150,100 M100,50 L100,150"
                stroke={accent}
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            )}
            {detailLevel >= 3 && (
              <>
                <circle cx="50" cy="100" r="8" fill={secondary} />
                <circle cx="150" cy="100" r="8" fill={secondary} />
                <circle cx="100" cy="50" r="8" fill={secondary} />
                <circle cx="100" cy="150" r="8" fill={secondary} />
              </>
            )}
            {detailLevel >= 4 && (
              <circle cx="100" cy="100" r="25" fill="url(#aiGlow)" />
            )}
            <circle cx="100" cy="100" r="12" fill={accent} />
          </g>
        );

      case "samosa_ai":
        return (
          <g>
            {/* Triangles, Low poly */}
            {/* Main samosa body */}
            <polygon
              points="100,45 155,145 45,145"
              fill={primary}
              stroke={secondary}
              strokeWidth={isWeird ? "6" : "3"}
              strokeLinejoin="round"
            />
            {/* Shadow fold / design detail */}
            <polygon
              points="100,45 100,145 45,145"
              fill={secondary}
              opacity="0.3"
            />
            {/* Chutney dip / weirdness glow */}
            {detailLevel >= 2 && (
              <circle
                cx="100"
                cy="105"
                r="22"
                fill={accent}
                opacity="0.85"
                clipPath="url(#samosaClip)"
              />
            )}
            {/* Dynamic decorative steam lines */}
            {detailLevel >= 3 && (
              <g stroke={accent} strokeWidth="3" fill="none" strokeLinecap="round">
                <path d="M90,30 Q95,20 90,10" />
                <path d="M100,28 Q105,15 100,8" />
                {detailLevel >= 4 && <path d="M110,30 Q115,22 110,12" />}
              </g>
            )}
            {/* Low-poly mesh lines (weird/brutalist) */}
            {isWeird && (
              <path
                d="M100,45 L110,145 M100,45 L90,145 M45,145 L100,95 L155,145"
                stroke={accent}
                strokeWidth="1.5"
                opacity="0.6"
              />
            )}
          </g>
        );

      case "doomscroll":
        return (
          <g>
            {/* Repeating spiral/waves or phone frame */}
            <defs>
              <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primary} />
                <stop offset="50%" stopColor={secondary} />
                <stop offset="100%" stopColor={accent} />
              </linearGradient>
            </defs>
            {/* Infinity loop / vortex */}
            {isWeird ? (
              <g fill="none" strokeWidth={isRetro ? "12" : "8"} strokeLinecap="round">
                {/* Weird spiral vortex */}
                <path
                  d="M100,100 A20,20 0 1,0 120,120 A40,40 0 1,0 80,80 A60,60 0 1,0 140,140"
                  stroke="url(#scrollGrad)"
                />
              </g>
            ) : (
              <g>
                {/* Standard app scroll window */}
                <rect
                  x="65"
                  y="40"
                  width="70"
                  height="120"
                  rx="15"
                  fill="none"
                  stroke={primary}
                  strokeWidth="5"
                />
                {/* Feeds */}
                <rect x="75" y="55" width="50" height="25" rx="5" fill={secondary} opacity="0.8" />
                <rect x="75" y="90" width="50" height="15" rx="3" fill={accent} opacity="0.9" />
                {detailLevel >= 3 && (
                  <rect x="75" y="115" width="30" height="8" rx="2" fill={primary} opacity="0.6" />
                )}
                {detailLevel >= 4 && (
                  <circle cx="120" cy="120" r="5" fill={accent} />
                )}
              </g>
            )}
            {/* Abstract scrolling particles */}
            {detailLevel >= 2 && isWeird && (
              <g fill={accent}>
                <circle cx="60" cy="70" r="6" />
                <circle cx="140" cy="130" r="4" />
                <circle cx="150" cy="80" r="8" />
              </g>
            )}
          </g>
        );

      case "crypto_casino":
        return (
          <g>
            {/* Hexagonal shape with diamond and dollar signs */}
            <polygon
              points="100,35 155,67 155,133 100,165 45,133 45,67"
              fill="none"
              stroke={primary}
              strokeWidth="5"
            />
            {/* Inner chart or diamond */}
            {isWeird ? (
              <g stroke={accent} strokeWidth="3" fill="none">
                {/* Candlestick chart elements */}
                <path d="M70,80 L70,130 M70,95 L70,115" stroke={accent} strokeWidth="6" />
                <path d="M100,60 L100,140 M100,75 L100,120" stroke={secondary} strokeWidth="6" />
                <path d="M130,90 L130,120 M130,95 L130,105" stroke={primary} strokeWidth="6" />
              </g>
            ) : (
              <g>
                <polygon
                  points="100,55 135,90 100,125 65,90"
                  fill={secondary}
                  opacity="0.85"
                />
                <circle cx="100" cy="90" r="15" fill={accent} />
              </g>
            )}
            {/* Sparkles */}
            {detailLevel >= 3 && (
              <g fill={accent}>
                <path d="M140,50 L145,55 L140,60 L135,55 Z" />
                <path d="M60,140 L65,145 L60,150 L55,145 Z" />
              </g>
            )}
            {/* Grid overlay */}
            {detailLevel >= 4 && (
              <path
                d="M50,80 H150 M50,120 H150"
                stroke={secondary}
                strokeWidth="1"
                opacity="0.3"
              />
            )}
          </g>
        );

      case "space_tourism":
        return (
          <g>
            {/* Planet sphere and orbital lines */}
            <circle cx="100" cy="100" r="40" fill={primary} />
            <circle cx="100" cy="100" r="40" fill={secondary} opacity="0.3" />
            
            {/* Orbit ring */}
            <ellipse
              cx="100"
              cy="100"
              rx="75"
              ry="25"
              fill="none"
              stroke={accent}
              strokeWidth="5"
              transform="rotate(-25 100 100)"
            />

            {/* Tiny rocket shape */}
            {detailLevel >= 2 && (
              <g transform="translate(155, 75) rotate(35)">
                <path
                  d="M0,-12 L6,2 L0,-1 L-6,2 Z"
                  fill={accent}
                />
                {/* Rocket flame */}
                <path d="M-3,3 L0,12 L3,3 Z" fill={secondary} />
              </g>
            )}

            {/* Stars */}
            {detailLevel >= 3 && (
              <g fill={accent}>
                <circle cx="50" cy="50" r="3" />
                <circle cx="150" cy="140" r="2" />
                <circle cx="60" cy="130" r="4" />
                {detailLevel >= 4 && <circle cx="140" cy="40" r="1.5" />}
              </g>
            )}

            {/* Planet crater rings */}
            {detailLevel >= 4 && (
              <g fill="none" stroke={secondary} strokeWidth="2" opacity="0.5">
                <circle cx="90" cy="90" r="8" />
                <circle cx="115" cy="110" r="5" />
              </g>
            )}
          </g>
        );

      case "minimal_saas":
        return (
          <g>
            {/* Simple abstract geometry */}
            {/* Minimal border box */}
            <rect
              x="50"
              y="50"
              width="100"
              height="100"
              fill="none"
              stroke={primary}
              strokeWidth={isWeird ? "1" : "4"}
            />
            {/* Central accent circle */}
            <circle
              cx={isWeird ? "80" : "100"}
              cy={isWeird ? "80" : "100"}
              r={detailLevel * 8}
              fill={accent}
              opacity="0.9"
            />
            {/* Secondary offset rectangle */}
            {detailLevel >= 2 && (
              <rect
                x="70"
                y="70"
                width="60"
                height="60"
                fill="none"
                stroke={secondary}
                strokeWidth="2"
                transform="rotate(15 100 100)"
              />
            )}
            {/* Grid dot */}
            {detailLevel >= 3 && (
              <circle cx="140" cy="60" r="6" fill={primary} />
            )}
            {detailLevel >= 4 && (
              <circle cx="60" cy="140" r="4" fill={secondary} />
            )}
          </g>
        );

      case "cyber_cafe":
      default:
        return (
          <g>
            {/* Glitch boxes / Terminal shape */}
            <rect
              x="45"
              y="50"
              width="110"
              height="90"
              rx="8"
              fill="none"
              stroke={primary}
              strokeWidth="5"
            />
            {/* Keyboard dock */}
            <line x1="60" y1="150" x2="140" y2="150" stroke={primary} strokeWidth="5" strokeLinecap="round" />
            <line x1="100" y1="140" x2="100" y2="150" stroke={primary} strokeWidth="5" />

            {/* Terminal prompt symbol */}
            <path
              d="M60,80 L75,95 L60,110"
              fill="none"
              stroke={accent}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Blinking cursor */}
            <rect
              x="85"
              y="102"
              width="15"
              height="4"
              fill={secondary}
              className="animate-pulse"
            />

            {/* Background cyber lines */}
            {detailLevel >= 3 && (
              <g stroke={secondary} strokeWidth="1" opacity="0.4">
                <line x1="30" y1="70" x2="45" y2="70" />
                <line x1="155" y1="120" x2="170" y2="120" />
              </g>
            )}
            {/* Floppy disk or retro icon beside it */}
            {detailLevel >= 4 && (
              <circle cx="145" cy="65" r="4" fill={accent} />
            )}
          </g>
        );
    }
  };

  return (
    <svg
      viewBox="0 0 200 200"
      width={width}
      height={height}
      style={{ display: "block" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {renderLogoPath()}
    </svg>
  );
};
export default LogoGenerator;
