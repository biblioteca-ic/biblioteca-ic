import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useMediaQuery,
  Center,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { BsTrashFill } from 'react-icons/bs';
import { useAuth } from '../../../providers/AuthProvider';
import { usersMock } from '../../../services/mocks';
import { Page } from '../../../components/Page';
// import { api } from '../../../services/api';
import { UserType } from '../../../types/User';
import { formatCpf } from '../../../helpers/formatCpf';
import { UserDetails } from '../../../components/UserDetails';

type ItemParams = {
  id: string;
};

export const UserItem = ({ userData }: { userData: UserType }) => {
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

  const clickToTurnAdmin = () => {
    setIsOpenToTurnAdmin(true);
  };

  const checkIfCanTurnAdmin = () => {
    return user.admin && !userData.admin;
  };

  const checkIfCanRemoveUser = () => {
    // 3.1 Caso o usuário ainda tenha livros emprestados, não permitir a ação.
    // 3.2 Caso o usuário seja o único ADM, não permitir a ação.
    return true;
  };

  const removeUser = async () => {
    // await api.delete(`api//users/${id}`, { data: { userId: user.id } });

    toast({
      title: 'Usuário removido com sucesso',
      status: 'success',
      position: 'top-right',
      isClosable: true,
    });

    history.push('/users');

    onCloseToRemove();
  };

  const turnAdmin = async () => {
    // await api.patch(`api//users/${id}/admin`, { admin: true });

    toast({
      title: 'Usuário colocado como admin com sucesso',
      status: 'success',
      position: 'top-right',
      isClosable: true,
    });

    onCloseToTurnAdmin();

    setTimeout(() => {
      window.location.reload();
    }, 1400);
  };

  return (
    <>
      <Box mt={4} mb={8}>
        <Box mb={3} display="flex" alignItems="center" justifyContent="space-between">
          <Heading>{userData.name}</Heading>
          <Box>
            {checkIfCanTurnAdmin() ? (
              <Button variant="outline" colorScheme="blue" mr={2} onClick={clickToTurnAdmin}>
                Tornar admin
              </Button>
            ) : null}
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
      <AlertDialog isOpen={isOpenToTurnAdmin} leastDestructiveRef={cancelRefToTurnAdmin} onClose={onCloseToTurnAdmin}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Tornar usuário admin
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja tornar o usuáro <strong>&quot;{userData?.name}&quot;</strong> admin?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="green" onClick={turnAdmin}>
                Sim
              </Button>
              <Button ref={cancelRefToTurnAdmin} onClick={onCloseToTurnAdmin} ml={3}>
                Não
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const UserItemPage = () => {
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');
  const [userData, setUserData] = useState<UserType | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<ItemParams>();

  const getUserData = async () => {
    try {
      // const { data } = await api.get(`/users/${id}`);

      const data = usersMock;
      setUserData(data[Number(id) - 1]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, [id]);

  return (
    <Page>
      <Box p={8} pt={isLargerThan766 ? 10 : 8}>
        {!userData ? (
          <Center flexDirection="column">
            <Heading color="teal" textAlign="center" mb={6}>
              Dados do usuário
            </Heading>
            {isLoading ? <Spinner color="teal" size="xl" /> : <Text>Não há usuário com esse id.</Text>}
          </Center>
        ) : (
          <>
            <Box
              display="flex"
              mb={10}
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              maxW={isLargerThan766 ? '80vw' : '50vw'}
              margin="auto"
            >
              <Box display="flex" w="100%" mb={4} alignItems="center" justifyContent="center">
                <Heading color="teal" textAlign="center" mr={2}>
                  Dados do usuário
                </Heading>
              </Box>
            </Box>
            <Box maxW="80vh" margin="auto">
              <UserItem userData={userData} />
            </Box>
          </>
        )}
      </Box>
    </Page>
  );
};

export default UserItemPage;
