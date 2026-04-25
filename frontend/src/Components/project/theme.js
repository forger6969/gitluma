import { createContext, useContext } from "react";

export const getC = (dark = false) => ({
  coral:        "#E8654A",
  coralHover:   "#D4512F",
  coralActive:  "#C04020",
  coralBg:      dark ? "rgba(232,101,74,0.15)" : "#FCEDE9",
  coralSubtle:  dark ? "rgba(232,101,74,0.12)" : "rgba(232,101,74,0.1)",
  charcoal:     dark ? "#0F121A" : "#2B3141",
  pageBg:       dark ? "#0B0F19" : "#EEF1F7",
  cardBg:       dark ? "#141824" : "#FFFFFF",
  inputBg:      dark ? "#1E2235" : "#F4F6FB",
  heading:      dark ? "#EEF1F7" : "#181D2A",
  body:         dark ? "#C8CDD9" : "#2B3141",
  muted:        dark ? "#8892A8" : "#5C6480",
  placeholder:  dark ? "#5C6480" : "#9AA0B4",
  borderSubtle: dark ? "#2B3141" : "#E2E5EE",
  borderDef:    dark ? "#3B4258" : "#C8CDD9",
  success:      "#22B07D",
  successBg:    dark ? "rgba(34,176,125,0.15)" : "rgba(34,176,125,0.1)",
  warning:      "#D4890A",
  warningBg:    dark ? "rgba(212,137,10,0.15)" : "rgba(245,166,35,0.1)",
  danger:       "#E03D3D",
  dangerBg:     dark ? "rgba(224,61,61,0.15)" : "rgba(224,61,61,0.1)",
  info:         "#3A7EE8",
  infoBg:       dark ? "rgba(58,126,232,0.15)" : "rgba(58,126,232,0.1)",
});

export const CCtx = createContext(getC(false));
export const useC = () => useContext(CCtx);

export const makeInputBase = (C) => ({
  backgroundColor: C.inputBg,
  border: `1.5px solid ${C.borderDef}`,
  color: C.heading,
  borderRadius: "12px",
  fontFamily: "inherit",
});

export const makeFocus = (C) => (e) => {
  e.target.style.borderColor = C.coral;
  e.target.style.boxShadow = "0 0 0 3px rgba(232,101,74,0.12)";
};

export const makeBlur = (C) => (e) => {
  e.target.style.borderColor = C.borderDef;
  e.target.style.boxShadow = "none";
};
