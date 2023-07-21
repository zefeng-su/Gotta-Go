// This is a JavaScript object that serves as a design token system for colors used in the app.
// Each color is represented as an object with different shades represented as properties of that object.
// For instance, the "grey" color has 12 shades ranging from 0 (white) to 1000 (black).
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#c2f0ce",
    100: "#b4f1c4",
    200: "#95f3ae",
    300: "#71f895",
    400: "#47f776",
    500: "#34a853",
    600: "#0da034",
    700: "#107c2d",
    800: "#034d17",
    900: "#02250c",
  },
};

// This function returns an object that serves as a configuration for Material-UI's theme.
// The theme configuration changes based on whether the application is in "light" or "dark" mode, which is determined by the "mode" parameter.
export const themeSettings = (mode) => {
  return {
    // Sets the color mode for Material-UI theme. Depending on the "mode" value, it can be either "dark" or "light".
    // The ternary operator is used to change color settings based on the application's color mode.
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // Dark mode colors:
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // Light mode colors:
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    // Defining the typography settings.
    // The default font family is "Noto Sans", with a fallback to the generic "sans-serif" font family if "Noto Sans" isn't available.
    // The default font size is 12.
    // note: h1 is used for the app name font
    typography: {
      fontFamily: ["Noto Sans", "sans-serif"].join(","),
      fontSize: 12, 
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Noto Sans", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Noto Sans", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Noto Sans", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Noto Sans", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Noto Sans", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};