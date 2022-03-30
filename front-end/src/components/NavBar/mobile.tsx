/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-empty-function */
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
  useToast,
  Heading,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
// import { usersMock } from '../../services/mocks';
import { useAuth } from '../../providers/AuthProvider';

export const NavBarMobile = () => {
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
    <SimpleGrid
      display="flex"
      justifyContent="space-between"
      columns={[null, null, 2]}
      w="100%"
      bg="teal"
      zIndex="5"
      color="white"
      p={4}
      gridTemplateColumns="0.5fr 1fr"
      alignItems="center"
      position="fixed"
    >
      <Heading size="md" ml={4}>
        <Link href="/">Biblioteca IC</Link>
      </Heading>
      <Box>
        <Link fontSize="3xl" alignSelf="center" colorScheme="quaternary" onClick={onOpen}>
          <HamburgerIcon />
        </Link>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
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
    </SimpleGrid>
  );
};
