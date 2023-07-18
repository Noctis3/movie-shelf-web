import { ReactNode, useContext } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
  Text,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { AuthContext } from '../contexts/auth';

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

export default function Header() {
  const { user, signOut } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userAvatar = user.avatar.tmdb
    ? `https://image.tmdb.org/t/p/w400${user.avatar.tmdb.avatar_path}`
    : 'https://avatars.dicebear.com/api/male/username.svg';
  return (
    <Box>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        color="white"
        padding={['0 1rem', '0 2rem', '0 6rem']}
        bgGradient={
          'linear-gradient(90deg, rgba(0,0,0,0.5130427170868348) 0%, rgba(0,0,0,0.5130427170868348) 100%)'
        }
      >
        <Heading size="md">Noctis</Heading>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <ColorModeSwitcher />
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'sm'} src={userAvatar} />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Center>
                  <Avatar size={'2xl'} src={userAvatar} />
                </Center>
                <br />
                <Center>
                  <Text>{user.username}</Text>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Configurações</MenuItem>
                <MenuItem onClick={signOut}>
                  <Text>Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
