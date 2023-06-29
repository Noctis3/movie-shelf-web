import * as React from "react"
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./components/ColorModeSwitcher"
import theme from './styles/theme';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <ColorModeSwitcher justifySelf="flex-end" />
      <Heading>Oi Oi Oi</Heading>
      <Text>Oi Oi Oi</Text>
    </Box>
  </ChakraProvider>
)
