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
import { useNavigate } from 'react-router';

export default function Header() {
  const { user, signOut } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  function handleSearchMovie() {
    navigate(`/search/${search}}`);
  }

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setUserAvatar(
        `https://image.tmdb.org/t/p/w400${user.avatar.tmdb.avatar_path}`
      );
    } else {
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
      >
        <Heading size="md">Noctis</Heading>

        <InputGroup
          maxW={{ base: '70%', md: '70%' }}
          m={{ base: '1rem', md: '0 2rem' }}
        >
          <InputRightElement cursor="pointer" onClick={handleSearchMovie}>
            <AiOutlineSearch />
          </InputRightElement>
          <Input
            border="2px solid"
            placeholder="Pesquise por um filme, série..."
            focusBorderColor="none"
            onChange={(e) => setSearch(e.target.value)}
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
