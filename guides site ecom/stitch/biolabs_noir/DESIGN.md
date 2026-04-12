# Design System Document

## 1. Overview & Creative North Star: "The Synthetic Alchemist"

This design system is forged at the intersection of clinical precision and high-fashion editorial. We call the creative north star **"The Synthetic Alchemist."** It moves beyond the generic "health and wellness" trope of bright whites and leafy greens, instead embracing a high-contrast, dark-mode environment that feels tech-forward, exclusive, and scientifically potent.

The core visual tension is created by pairing the raw, aggressive energy of **vibrant lime accents** with the quiet, authoritative sophistication of **classical serif typography**. To move beyond a "template" look, the system utilizes an asymmetric grid where product photography breaks containment lines, creating a sense of dynamic movement and premium intentionality.

---

## 2. Colors

The palette is anchored in deep charcoals and blacks to provide a canvas where product photography and key messaging can radiate.

### Core Palette
- **Background (`#131313`)**: Our canvas. A pure, deep void that minimizes eye strain and maximizes the "pop" of the accent colors.
- **Primary (`#ccff80`)**: A high-visibility, "Cyber Lime." Use this sparingly for critical conversion points and high-energy brand moments.
- **Secondary (`#bec2ff`)**: A "Soft Lavender" used to bridge the gap between the aggressive lime and the dark background, adding a layer of sophisticated tech-calm.

### The "No-Line" Rule
Standard 1px borders are strictly prohibited for defining layout sections. We define boundaries through **Tonal Transitions**. A section shift should be indicated by moving from `surface` (`#131313`) to `surface-container-low` (`#1c1b1b`). This creates a seamless, high-end "liquid" feel rather than a boxed-in layout.

### Surface Hierarchy & Nesting
Use the `surface-container` tokens to build "depth through tone." 
- **Hero Sections**: Use `surface` or `surface-dim`.
- **Product Cards**: Nest `surface-container-highest` (`#353535`) inside a `surface-container-low` background.
- **Floating UI**: Use **Glassmorphism**. Apply `surface-bright` at 60% opacity with a `24px` backdrop-blur for elements like floating navigation or modal overlays.

---

## 3. Typography

The typographic strategy is a dialogue between the past (Editorial Serifs) and the future (Technical Monospace).

- **Display & Headlines (`Noto Serif`)**: These are the "Editorial" voice. Set headlines with tight letter-spacing. Use `display-lg` (3.5rem) for high-impact statements. The serif adds the "Trust" and "Sophistication" required for a premium supplement brand.
- **Body & Titles (`Inter`)**: The "Functional" voice. Inter provides maximum legibility for scientific data and product descriptions.
- **Labels (`Space Grotesk`)**: The "Technical" voice. Used for nutritional facts, small UI labels, and meta-data. Its wide stance and geometric shapes echo a lab-ready, tech-forward aesthetic.

---

## 4. Elevation & Depth

We eschew traditional "Drop Shadows" in favor of **Ambient Tonal Layering.**

- **The Layering Principle**: Instead of lifting an object with a shadow, lift it by lightening its background. A `surface-container-highest` card placed on a `surface` background provides all the "lift" a high-end UI needs.
- **Ambient Shadows**: For floating elements (e.g., a "Buy Now" sticky bar), use a shadow color derived from the background: `rgba(0, 0, 0, 0.4)` with a `40px` blur and `0px` offset. It should feel like a soft glow, not a hard shadow.
- **The Ghost Border**: If accessibility requires a stroke, use `outline-variant` at 15% opacity. It must be felt, not seen.

---

## 5. Components

### Buttons
- **Primary**: `background: primary (#ccff80)`, `color: on-primary (#213600)`. Radius: `0.25rem`. Type: `label-md` uppercase.
- **Secondary**: `background: transparent`, `border: 1px solid outline-variant`, `color: on-surface`.
- **Interaction**: On hover, Primary buttons should "glow" using a subtle box-shadow of the primary color at 30% opacity.

### Cards & Lists
- **The "No-Divider" Rule**: Never use horizontal rules. Separate list items using `1.5rem` of vertical whitespace or a subtle background shift between items using `surface-container-low` and `surface-container-lowest`.
- **Product Cards**: Use an asymmetric layout. The product image should "bleed" over the edge of the container to break the rigid grid.

### Input Fields
- **Style**: Underline only or ghost-fill (`surface-container-high`). Avoid the "enclosed box" look. 
- **Focus State**: The underline transitions to `primary` (#ccff80) with a subtle vertical expansion of 2px.

### High-End Detail: Custom Scrollers
Scrollbars must be themed: `track: surface`, `thumb: surface-container-highest` with a `4px` radius.

---

## 6. Do's and Don'ts

### Do
- **DO** use massive amounts of whitespace. Premium brands "breathe."
- **DO** use `display-lg` typography for single, powerful words that set the tone of a section.
- **DO** integrate high-fidelity 3D product renders that interact with the background (e.g., soft shadows cast onto the `surface` color).
- **DO** use the `secondary` (#bec2ff) color for "Information" or "Science" callouts to distinguish them from "Action" callouts.

### Don't
- **DON'T** use 100% white (`#FFFFFF`) for large blocks of body text; use `on-surface-variant` (`#c2cab0`) to maintain the "Dark Mode" sophistication.
- **DON'T** use rounded corners larger than `0.75rem` (xl). We want the system to feel sharp and precise, not "bubbly" or "friendly."
- **DON'T** use standard iconography. Use thin-stroke (1px or 1.5px) custom icons that match the technicality of the `Space Grotesk` labels.
- **DON'T** align everything to a center axis. Use a left-heavy editorial grid to create visual interest.