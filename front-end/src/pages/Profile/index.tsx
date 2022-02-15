import * as React from 'react';
import { Box, Button, Container, Grid, GridItem, Heading, Link, Text } from '@chakra-ui/react';
import { FaUserEdit, FaUserPlus, FaLock } from 'react-icons/fa';
import { Page } from '../../components/Page';
import { useAuth } from '../../providers/AuthProvider';

const Profile = () => {
  const { user } = useAuth();
  return (
    <Page>
      <Container fontSize="xl" p={6}>
        <Heading as="h4" textAlign="center" size="lg">
          Perfil
        </Heading>
        <Box>
          <Grid templateColumns="repeat(3, 1fr)" my={4} gap={6}>
            <GridItem w="100%">
              <Text fontWeight="bold">Nome:</Text>
              <Text>{user.name}</Text>
            </GridItem>
            <GridItem w="100%">
              <Text fontWeight="bold">Matrícula:</Text>
              <Text>{user.registrationNumber}</Text>
            </GridItem>
            <GridItem w="100%">
              <Text fontWeight="bold">E-mail:</Text>
              <Text>{user.email}</Text>
            </GridItem>
          </Grid>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <GridItem w="100%">
              <Text fontWeight="bold">CPF:</Text>
              <Text>{user.cpf}</Text>
            </GridItem>
            <GridItem w="100%">
              <Text fontWeight="bold">É administrador?</Text>
              <Text>{user.admin ? 'Sim' : 'Não'}</Text>
            </GridItem>
            
            <GridItem w="100%" alignSelf="center">
              <Link href="/profile/edit" textDecoration="none">
                <Button variant="link" colorScheme="teal" leftIcon={<FaUserEdit />}>
                  Editar Perfil
                </Button>
              </Link>
              
              <Link href="/profile/edit/password" textDecoration="none">
                <Button variant="link" colorScheme="teal" leftIcon={<FaLock />}>
                  Alterar Senha
                </Button>
              </Link>
            </GridItem>          
          </Grid>
          {user.admin && (
            <Box>
              <Heading as="h6" size="md" my={4}>
                Funções de Administrador
              </Heading>
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
