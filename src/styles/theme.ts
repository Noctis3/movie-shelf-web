import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
  disableTransitionOnChange: false,
};

const fonts = {
  heading: `'DM Sans', 'sans-serif'`,
  body: `'DM Sans', sans-serif`,
};

const colors = {
  background: {
    light: '#F0F2F5',
    dark: '#111111',
  },
};

const components = {
  Text: {
    variants: {
      subtitle: {
        fontSize: 'xs',
        color: '#7e8590',
        fontWeight: 'bold',
        _dark: {
          color: '#9CA3AF',
        },
      },
    },
  },
  Button: {
    variants: {
      genre: {
        bg: 'transparent',
        border: '2px solid purple',
        borderRadius: '3.125rem',
        fontSize: '.8125rem',
        height: '25px',
        color: 'purple',
        _hover: {
          bg: 'purple',
          color: 'white',
          transition: 'all .2s linear',
        },
        _active: {
          bg: 'purple',
          color: 'white',
        },
        _dark: {
          color: 'purple.300',
          borderColor: 'purple.300',

          _hover: {
            bg: 'purple.300',
            color: 'white',
          },
          _active: {
            bg: 'purple.300',
            color: 'white',
          },
        },
      },
    },
  },
};

const theme = extendTheme({
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        transition: 'background-color .3s linear',
        color: props.colorMode === 'dark' ? 'white.primary' : 'black.secondary',
        backgroundColor:
          props.colorMode === 'dark' ? 'background.dark' : 'background.light',
      },
    }),
  },
  config,
  fonts,
  colors,
  components,
});

export default theme;
