import { useContext, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
  Heading,
  Text,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { AuthContext } from '../contexts/auth';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Header() {
  const { user, signOut } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setUsername(user.username);
      setUserAvatar(
        `https://image.tmdb.org/t/p/w400${user.avatar.tmdb.avatar_path}`
      );
    } else {
      setUsername('Usuário');
      setUserAvatar('https://avatars.dicebear.com/api/male/username.svg');
    }
  }, [user]);
  return (
    <Box>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        padding={['0 1rem', '0 2rem', '0 6rem']}
        bgGradient={
          'linear-gradient(90deg, rgba(0,0,0,0.5130427170868348) 0%, rgba(0,0,0,0.5130427170868348) 100%)'
        }
      >
        <Heading color="white" size="md">
          Noctis
        </Heading>

        <InputGroup w="32rem">
          <InputRightElement pointerEvents="none">
            <AiOutlineSearch color="white" />
          </InputRightElement>
          <Input
            border="2px solid"
            color="#D1D5DB"
            placeholder="Pesquise por um filme, série..."
            _placeholder={{ opacity: 1, color: '#D1D5DB' }}
            focusBorderColor="none"
          />
        </InputGroup>

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
                  <Text>{username}</Text>
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
