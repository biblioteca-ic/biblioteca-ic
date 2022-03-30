import * as React from 'react';
import { Box, Button, Container, Heading, Link } from '@chakra-ui/react';
import { FaUserEdit, FaUserPlus, FaLock, FaUserFriends } from 'react-icons/fa';
import { Page } from '../../../components/Page';
import { useAuth } from '../../../providers/AuthProvider';
import { UserDetails } from '../../../components/UserDetails';

const Profile = () => {
  const { user } = useAuth();
  return (
    <Page>
      <Container fontSize="xl" p={6}>
        <Heading color="teal" textAlign="center" mb={6}>
          Perfil
        </Heading>
        <Box>
          <Box display="flex" w="100%" justifyContent="space-between" gap={6}>
            <Box>
              <UserDetails user={user} showName />
            </Box>
            <Box>
              <Box w="100%" alignSelf="center">
                <Link href="/profile/edit" textDecoration="none">
                  <Button variant="link" colorScheme="teal" leftIcon={<FaUserEdit />}>
                    Editar Perfil
                  </Button>
                </Link>
              </Box>
              <Box w="100%" alignSelf="center">
                <Link href="/profile/edit/password" textDecoration="none">
                  <Button variant="link" colorScheme="teal" leftIcon={<FaLock />}>
                    Alterar Senha
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
          {user.admin && (
            <Box>
              <Heading as="h6" size="md" my={4}>
                Funções de Administrador
              </Heading>
              <Box mb={4}>
                <Link href="/users" textDecoration="none">
                  <Button colorScheme="teal" leftIcon={<FaUserFriends />}>
                    Ver usuários
                  </Button>
                </Link>
              </Box>
              <Box>
                <Link href="/register" textDecoration="none">
                  <Button colorScheme="teal" leftIcon={<FaUserPlus />}>
                    Adicionar usuário
                  </Button>
                </Link>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Page>
  );
};

export default Profile;
