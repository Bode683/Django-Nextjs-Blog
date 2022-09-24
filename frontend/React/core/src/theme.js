import { createTheme } from "@mui/material/styles";

const Colors = {
  // primary: "#00adb5",
  // secondary: "#95defb",
  nav_color: "#660746",
  success: "#4CAF50",
  info: "#00a2ff",
  danger: "#FF5722",
  warning: "#FFC107",
  dark: "#0e1b20",
  light: "#aaa",
  muted: "#abafb3",
  border: "#DDDFE1",
  inverse: "#2F3D4A",
  shaft: "#333",
  dove_gray: "#d5d5d5",
  body_bg: "#f3f6f9",

  ///////////////
  // Solid Color
  ///////////////
  white: "#fff",
  black: "#000",
};
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#007788",
    },
    secondary: {
      main: "#c6dde1",
    },
    success: {
      main: Colors.success,
    },
    nav_color: {
      main: Colors.nav_color,
    },
    error: {
      main: "#FF0000",
    },
    white: {
      main: Colors.white,
    },
    black: {
      main: Colors.black,
    },
    info: {
      main: Colors.info,
    },
    danger: {
      main: Colors.danger,
    },
    warning: {
      main: Colors.warning,
    },
    body_bg: {
      main: Colors.body_bg,
    },
  },

  //////////////////////////////////////
  typography: {
    h1: {
      fontFamily: "Comic Sans MS",
      fontSize: 40,
      fontWeight: 700,
    },
    h2: {
      fontFamily: "Comic Sans MS",
      fontSize: 30,
      fontWeight: 700,
    },
    h3: {
      fontFamily: "Comic Sans MS",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "Comic Sans MS",
      fontWeight: 700,
    },
    // subtitle1: {
    //   fontSize: 12,
    // },
    body1: {
      fontSize: 18,
      fontWeight: 400,
      lineHeight: 1.5,
    },
    // button: {
    //   fontFamily: "Comic Sans MS",
    // },
  },
});

export default theme;
