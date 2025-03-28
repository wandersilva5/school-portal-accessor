
type ThemeColors = {
  name: string;
  description: string;
  colors: {
    primary: string;
    accent: string;
    background: string;
    foreground: string;
  };
};

export const availableThemes: ThemeColors[] = [
  {
    name: "default",
    description: "Tema padrão com tons de azul",
    colors: {
      primary: "222 89% 55%",
      accent: "243 75% 59%",
      background: "210 40% 98%",
      foreground: "222 47% 11%",
    },
  },
  {
    name: "purple",
    description: "Tema roxo e vibrante",
    colors: {
      primary: "262 83% 58%",
      accent: "291 64% 54%",
      background: "260 40% 98%",
      foreground: "262 47% 11%",
    },
  },
  {
    name: "green",
    description: "Tema verde e calmo",
    colors: {
      primary: "142 76% 36%",
      accent: "160 84% 39%",
      background: "150 40% 98%",
      foreground: "142 47% 11%",
    },
  },
  {
    name: "orange",
    description: "Tema laranja e acolhedor",
    colors: {
      primary: "24 94% 50%",
      accent: "36 100% 50%",
      background: "20 40% 98%",
      foreground: "24 47% 11%",
    },
  },
];

export function applyTheme(themeName: string) {
  const theme = availableThemes.find((t) => t.name === themeName);
  
  if (!theme) {
    console.error(`Tema "${themeName}" não encontrado.`);
    return;
  }

  // Aplicar as cores do tema ao CSS
  document.documentElement.style.setProperty('--primary', theme.colors.primary);
  document.documentElement.style.setProperty('--accent', theme.colors.accent);
  document.documentElement.style.setProperty('--background', theme.colors.background);
  document.documentElement.style.setProperty('--foreground', theme.colors.foreground);
}

export function createCustomTheme(
  name: string,
  primary: string,
  accent: string,
  background: string = "210 40% 98%",
  foreground: string = "222 47% 11%"
): ThemeColors {
  return {
    name,
    description: `Tema personalizado: ${name}`,
    colors: {
      primary,
      accent,
      background,
      foreground,
    },
  };
}
