import { CodemixWordDataWithColor, CodemixWords } from "@/types";

export const formatType = (type: string) => {
  return type
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, char => char.toLowerCase());
};


export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};


export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

// Function to convert HEX to RGB
function hexToRgb(hex: string) {
  const bigint = parseInt(hex.substring(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

// Function to darken an RGB color
function darkenColor(rgb: number[], factor: number) {
  // Ensure value stays within [0, 255]
  return rgb.map((value) => Math.max(0, Math.min(255, value * factor)));
}

// Function to generate border and background colors dynamically
export const generateColorVariation = (hexColors: string[]) => {
  return hexColors.map((hex) => {
    const rgb = hexToRgb(hex);
    // Darken the color by 20%
    const darkRgb = darkenColor(rgb, 0.8);
    return {
      borderColor: `rgb(${darkRgb[0]}, ${darkRgb[1]}, ${darkRgb[2]})`,
      backgroundColor: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.5)`,
    };
  });
}
export const hexColors = ['#FF5733', '#33FF57', '#3357FF', '#F39C12', '#8E44AD', '#27AE60', '#2980B9', '#8E44AD'];

// Assign colors to words
export const assignColorsToWords = (data: CodemixWords[]): CodemixWordDataWithColor[] => {
  const colorMapping: { [key: string]: string } = {};
  const colorCount = hexColors.length;
  let colorIndex = 0;

  return data.map(item => {
    const word = item.words;

    // If the word doesn't have a color assigned yet, assign a color
    if (!colorMapping[word]) {
      colorMapping[word] = hexColors[colorIndex];
      colorIndex = (colorIndex + 1) % colorCount;
    }

    return {
      ...item,
      color: colorMapping[word],
    };
  });
};
