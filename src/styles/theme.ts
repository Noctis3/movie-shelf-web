import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
  disableTransitionOnChange: false,
};

const fonts = {
  heading: `'DM Sans', 'sans-serif'`,
  body: `'DM Sans', sans-serif`,
};

const colors = {
  background: {
    light: "#F0F2F5",
    dark: "#111111",
  },
};

const theme = extendTheme({
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        transition: "background-color .3s linear",
        color: props.colorMode === "dark" ? "white.primary" : "black.secondary",
        backgroundColor:
          props.colorMode === "dark" ? "background.dark" : "background.light",
      },
    }),
  },
  config,
  fonts,
  colors,
});

export default theme;
