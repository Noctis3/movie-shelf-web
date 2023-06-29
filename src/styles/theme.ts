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

const theme = extendTheme({
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        transition: "background-color .3s linear",
        color: props.colorMode === "dark" ? "white.primary" : "black.secondary",
        backgroundColor:
          props.colorMode === "dark" ? "black.primary" : "white.primary",
      },
    }),
  },
  config,
  fonts,
});

export default theme;
