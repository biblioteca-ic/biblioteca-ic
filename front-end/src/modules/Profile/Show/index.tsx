import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Link,
  Heading,
  Button,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useToast,
  useMediaQuery
} from '@chakra-ui/react';
import { BsTrashFill } from 'react-icons/bs';
import { api } from '../../../services/api';
import { AxiosError } from 'axios';
import { FaUserEdit, FaUserPlus, FaLock, FaUserFriends } from 'react-icons/fa';
import { useHistory, useParams } from 'react-router-dom';
import { Page } from '../../../components/Page';
import { useAuth } from '../../../providers/AuthProvider';
import { getUser } from '../../../services/auth';
import { UserDetails } from '../../../components/UserDetails';
import { UserType } from '../../../types/User';

export const UserItem = ({ userData }: { userData: UserType | undefined}) => {
  
  const history = useHistory();
  // const { id } = useParams<ItemParams>();
  const toast = useToast();
  const { user } = useAuth();

  const [isOpenToRemove, setIsOpenToRemove] = useState(false);
  const onCloseToRemove = () => setIsOpenToRemove(false);
  const cancelRefToRemove = useRef<HTMLButtonElement>(null);

  const [isOpenToTurnAdmin, setIsOpenToTurnAdmin] = useState(false);
  const onCloseToTurnAdmin = () => setIsOpenToTurnAdmin(false);
  const cancelRefToTurnAdmin = useRef<HTMLButtonElement>(null);
  const clickToRemove = () => {
    setIsOpenToRemove(true);
  };

  // 3.1 Caso o usuário ainda tenha livros emprestados, não permitir a ação.
  // 3.2 Caso o usuário seja o único ADM, não permitir a ação.
  const checkIfCanRemoveUser = () => !(userData?.isOnlyAdmin && userData.admin);

  const removeUser = async () => {
    try {
      alert(userData?.id)
      await api.delete(`api/users/${userData?.id}`);

      toast({
        title: 'Usuário removido com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });

      history.push('/users');

      onCloseToRemove();
    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: 'Ocorreu um erro ao remover o usuário',
        description: err?.message ? err?.message : 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  
  
  return (
    <>
      <Box mt={4} mb={8}>
        <Box mb={3} display="flex" alignItems="center" justifyContent="space-between">
          <Heading>{userData?.name}</Heading>
          <Box>
            {checkIfCanRemoveUser() ? (
              <IconButton
                variant="outline"
                colorScheme="red"
                aria-label="Remover"
                onClick={clickToRemove}
                icon={<BsTrashFill />}
              />
            ) : null}
          </Box>
        </Box>
        <UserDetails user={userData} />
      </Box>
      <AlertDialog isOpen={isOpenToRemove} leastDestructiveRef={cancelRefToRemove} onClose={onCloseToRemove}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remover Usuário
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja remover o usuáro <strong>&quot;{userData?.name}&quot;</strong>?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={removeUser}>
                Remover
              </Button>
              <Button ref={cancelRefToRemove} onClick={onCloseToRemove} ml={3}>
                Cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      
    </>
  );
};

const Profile = () => {
  const [userData, setUserData] = useState<UserType | undefined>();
  const { id } = JSON.parse(getUser());
  const { user } = useAuth();

  const getUserData = async () => {
    try {
      const { data: response } = await api.get('/api/users?');

      const userResponse: UserType = response.body?.find((currentUser: UserType) => currentUser.id === id);

      if (userResponse) {
        setUserData(userResponse);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Page>
      <Container fontSize="xl" p={6}>
        <Heading color="teal" textAlign="center" mb={6}>
          Perfil
        </Heading>
        <Box>
          <Box display="flex" w="100%" justifyContent="space-between" gap={6}>
            <Box>
                        <UserItem userData={userData} />

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
