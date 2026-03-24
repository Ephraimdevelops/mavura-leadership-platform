/**
 * Mavura Leadership Platform - Design Tokens
 * 
 * Feel: California intellectual studio + Modern diplomatic archive + Premium thought-leadership journal
 */

export const tokens = {
  colors: {
    primary: {
      diplomaticBlue: "#0A1B33", // Deeper, more authoritative diplomatic navy
      gold: "#C5A059",           // Muted gold for professional accents
      cream: "#FAF7F2",         // Premium paper-like background
    },
    neutral: {
      black: "#050505",
      darkGray: "#2D3436",
      gray: "#636E72",
      lightGray: "#DFE6E9",
      white: "#FFFFFF",
      offWhite: "#F8F9FA",
    },
  },
  typography: {
    fontFamily: {
      serif: "var(--font-cormorant-garamond)", // Headings & emphasis
      sans: "var(--font-inter)",               // Body & navigation
      mono: "var(--font-jetbrains-mono)",      // Technical details
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.6,
      relaxed: 1.8,                            // For long-form essays
    },
  },
  spacing: {
    container: {
      narrow: "720px",                         // For essay content focus
      wide: "1200px",                          // For general layout
    },
    section: {
      mobile: "40px",
      desktop: "80px",
    },
  },
};
