// FOR NODES
export const HANDLE_SPACING = 10;
export const NODE_WIDTH = 225;
export const NODE_HEIGHT = 75;
export const HANDLE_COUNT = Math.floor(NODE_HEIGHT / HANDLE_SPACING);

// COLOR SCHEMES

export const sigColors = ["#e110ad", "#ff8f17", "#60a5fa"];

// FONT DETERMINE

export const determineFontSize = (alloyCode) => {
  const lineCount = alloyCode.split("\n").length || 1;
  const updatedFontSize = Math.min(Math.max(130 / lineCount, 15), 40) + 10;
  return updatedFontSize;
};
