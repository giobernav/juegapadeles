import { defaultDarkModeOverride } from "@aws-amplify/ui-react";

const theme = {
  name: "terminal",
  primaryColor: "blue",
  secondaryColor: "blue",
  tokens: {
    fonts: {
      default: {
        variable: { value: "'Space Mono', monospace" },
        static: { value: "'Space Mono', monospace" },
      },
    },
    colors: {
      blue: {
        10: { value: "hsl(220, 95%, 95%)" },
        20: { value: "hsl(220, 85%, 85%)" },
        40: { value: "hsl(220, 70%, 70%)" },
        60: { value: "hsl(220, 50%, 50%)" },
        80: { value: "hsl(220, 95%, 30%)" },
        90: { value: "hsl(220, 100%, 20%)" },
        100: { value: "hsl(220, 100%, 15%)" },
      },
      border: {
        primary: { value: "black" },
      },
    },
    shadows: {
      small: {
        value: {
          offsetX: "0px",
          offsetY: "2px",
          blurRadius: "4px",
          color: "{colors.shadow.tertiary.value}",
        },
      },
      medium: {
        value: {
          offsetX: "10px",
          offsetY: "10px",
          spreadRadius: "0px",
          blurRadius: "0",
          color: "{colors.shadow.secondary.value}",
        },
      },
      large: {
        value: {
          offsetX: "8px",
          offsetY: "30px",
          spreadRadius: "10px",
          blurRadius: "0",
          color: "{colors.shadow.primary.value}",
        },
      },
    },
    components: {
      authenticator: {
        zIndex: { value: 4 },
        router: {},
        form: {},
      },
      card: {
        boxShadow: { value: "{shadows.medium.value}" },
      },
      radio: {
        button: {
          padding: { value: "{borderWidths.small}" },
          borderWidth: { value: "{borderWidths.small}" },
        },
      },
      heading: {
        1: { fontWeight: { value: "{fontWeights.extrabold.value}" } },
        2: { fontWeight: { value: "{fontWeights.extrabold.value}" } },
        3: { fontWeight: { value: "{fontWeights.extrabold.value}" } },
        4: { fontWeight: { value: "{fontWeights.extrabold.value}" } },
        5: { fontWeight: { value: "{fontWeights.extrabold.value}" } },
        6: { fontWeight: { value: "{fontWeights.extrabold.value}" } },
      },
      button: {
        primary: {
          backgroundColor: { value: "{colors.primary.40.value}" },
          color: { value: "{colors.font.primary.value}" },
          borderColor: { value: "{colors.border.primary.value}" },
        },
      },
    },
    radii: {
      small: { value: "0" },
      medium: { value: "0" },
      large: { value: "0" },
    },
    space: {
      xs: { value: "0.5rem" },
      small: { value: "1rem" },
      medium: { value: "1.5rem" },
      large: { value: "2rem" },
    },
    borderWidths: {
      small: { value: "2px" },
      medium: { value: "4px" },
      large: { value: "8px" },
    },
  },
  overrides: [defaultDarkModeOverride],
};

export default theme;
