# Brandkit - Making websites uncrappy

A quirky, immersive, and brand-forward **Brand Identity Builder** that spins up full UX brand books and live editable website mockups in seconds. No boring slides, no overpriced agencies, no endless alignment meetings. Just pure vibes and instant pixels.

---

## ⚡ What it is

**Brandkit** is an interactive playground where you can calibrate your brand's DNA and see it manifest instantly. Tuned via custom range sliders representing different eras and chaotic variables, the engine synthesizes:

*   🎨 **A Dynamic Color Palette:** Tailored HSL color combinations matching your mood, complete with sarcastic color descriptions (e.g. *VC Burn Rate Pink*, *Unpaid Intern Tears*, *Money Printer Green*).
*   🏷️ **A Custom Vector Logo:** A programmatically generated SVG logo mark that shifts in geometry, borders, and accents based on your industry and vibe settings.
*   🔤 **A Typography Duo:** High-fidelity Google Font pairings (loaded dynamically into the DOM) mapping Display and Body fonts matching different eras.
*   💻 **A Live Showroom View:** A split-screen showroom displaying your brand book specifications alongside a fully responsive, **directly editable website preview canvas** (featuring Light/Dark mode toggles).

---

## ⚙️ Interactive Controls (The Vibe Check)

Adjust the brand dials to calibrate your identity:
*   **Weirdness (Corporate $\leftrightarrow$ Chaotic Weird):** Slide from boring enterprise blues to chaotic neon pinks and toxic greens. Warning: Setting to 0% corporate and 100% complexity triggers a bureaucratic alarm.
*   **Complexity (Minimal $\leftrightarrow$ Maximalist):** Control the density of borders, grids, crater shapes, and geometric details.
*   **Era Vibe (Retro 70s $\leftrightarrow$ Cyberpunk 2099):** Shift between warm cream serifs and glow-in-the-dark monospaced terminal grids.

---

## 🛠️ Technology Stack

Built with a clean, high-performance web foundation:
*   **Frontend Library:** React 18 + TypeScript + Vite
*   **Styling:** Pure Vanilla CSS (strictly adhering to a structured design system with custom tokens, glassmorphisms, and custom range tracks)
*   **Icon Vectors:** `lucide-react`

---

## 🚀 Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sunidhi-nh/making-websites-uncrappy.git
    cd making-websites-uncrappy
    ```
2.  **Install the dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

4.  **Build for production:**
    ```bash
    npm run build
    ```

---

## 📦 Exporting Brand Assets

Once you compile an identity, the Spec Panel provides direct actions:
1.  **Download .SVG Logo:** Saves the custom mathematical SVG logo directly to your computer.
2.  **Copy SVG Code:** Copies the raw XML source code of the logo to your clipboard.
3.  **Download Brandbook (JSON):** Generates a JSON manifest file listing all color hex values, fonts, and slogans.
4.  **Copy CSS Custom Variables:** Instantly copies ready-to-use `:root { --brand-primary: ... }` variables to copy-paste into your own web projects.

**Built by - Sunidhi N**
