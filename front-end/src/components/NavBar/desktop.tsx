/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import {
  Box,
  Link,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  SimpleGrid,
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { BiChevronDown } from 'react-icons/bi';
import { useAuth } from '../../providers/AuthProvider';

export const NavBarDesktop = () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { user, signOut } = useAuth();
  const toast = useToast();

  const onLogout = () => {
    try {
      signOut();
    } catch {
      toast({
        title: 'Ocorreu um erro ao fazer o logout na plataforma',
        description: 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  return (
    <Box background="#008080">


      <SimpleGrid
        zIndex="5"
        display="flex"
        justifyContent="space-between"
        columns={[null, null, 3]}
        w="100%"
        bg="teal"
        color="white"
        p={4}
        gridTemplateColumns="0.5fr 1fr"
        alignItems="center"
        ml="auto"
        mr="auto"
        maxW={1440}
      >
        <Box>
          <Flex alignItems="center">
            <Button fontSize="3xl" alignSelf="center" colorScheme="quaternary" onClick={onOpen}>
              <HamburgerIcon />
            </Button>
          </Flex>
          <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="md">
            <DrawerOverlay>
              <DrawerContent bg="teal" color="white">
                <DrawerCloseButton top={8} right={4} fontSize="1rem" />
                <DrawerHeader pt={6}>
                  <Box top={8} position="absolute">
                    <Link href="/">Biblioteca IC</Link>
                  </Box>
                </DrawerHeader>
                <DrawerBody
                  fontWeight="bold"
                  textAlign="center"
                  justifyContent="space-between"
                  display="flex"
                  flexDir="column"
                  py={12}
                  mt={5}
                >
                  <Box>
                    <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                      <Link href="/books">Livros</Link>
                    </Box>
                    {user && user.id !== '' ? (
                      <>
                        <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                          <Link href="/profile">Meu Perfil</Link>
                        </Box>
                        <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                          <Link onClick={onLogout}>Sair</Link>
                        </Box>
                      </>
                    ) : (
                      <Box fontSize="1.2rem" onClick={onToggle} mb={3}>
                        <Link href="/login">Login</Link>
                      </Box>
                    )}
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Box>
        <Flex alignItems="center">
          <Heading size="md" ml={4}>
            <Link href="/">Biblioteca IC</Link>
          </Heading>
        </Flex>
        {user && user.id !== '' ? (
          <Box color="teal" zIndex="2">
            <Menu>
              <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                {user.name}
              </MenuButton>
              <MenuList>
                <Link href="/profile">
                  <MenuItem>
                    <span>Ir para perfil</span>
                  </MenuItem>
                </Link>
                <MenuDivider />
                <Link href="/login" onClick={onLogout}>
                  <MenuItem>
                    <span>Sair</span>
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Box>
        ) : (
          <Link href="/login" _hover={{ textDecoration: 'none' }}>
            <Button color="teal">Login</Button>
          </Link>
        )}
      </SimpleGrid>
    </Box>
  );
};
