import React, { useEffect, useRef, useState } from 'react';
import {
  IconButton,
  Tr,
  Link,
  Box,
  Td,
  AlertDialogBody,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
// import { useHistory } from 'react-router-dom';
import { BsInfoCircle, BsTrashFill } from 'react-icons/bs';
// import { api } from '../../../services/api';
import { CopyBookType } from '../../../types/Book';
import { UserType } from '../../../types/User';
import { UserListReturn } from '../../../types/UserListReturn';
import { CopyBookDetails } from '../../../components/CopyBookDetails';
import { COPY_BOOK } from '../../../constants';
import UserList from '../../../components/UserList';
import { useHistory } from 'react-router-dom';
import { api } from '../../../services/api';

interface UserRentedCopiesInterface {
  copyCode: string,
  title: string,
  authors: string[],
  status: string,
  leaseDate: string,
  devolutionDate: string,
  email: string,
  userId: string,
  copyId: string,
  bookId: string

}

export const CopyBookItem = ({ copyBook }: { copyBook: CopyBookType }) => {
  // const history = useHistory();
  const toast = useToast();

  const [user, setUser] = useState<UserListReturn>();

  const [isOpenToRemove, setIsOpenToRemove] = useState(false);
  const onCloseToRemove = () => setIsOpenToRemove(false);
  const cancelRefToRemove = useRef<HTMLButtonElement>(null);

  const [isOpenToViewInfo, setIsOpenToViewInfo] = useState(false);
  const onCloseToViewInfo = () => setIsOpenToViewInfo(false);

  const [isOpenToRentCopy, setIsOpenToRentCopy] = useState(false);
  const onCloseToRentCopy = () => setIsOpenToRentCopy(false);

  const [isOpenToBackCopy, setIsOpenToBackCopy] = useState(false);
  const onCloseToBackCopy = () => setIsOpenToBackCopy(false);
  const cancelRefToBackCopy = useRef<HTMLButtonElement>(null);

  const [isOpenToConfirmRent, setIsOpenToConfirmRent] = useState(false);
  const onCloseToConfirmRent = () => setIsOpenToConfirmRent(false);
  const cancelRefToRent = useRef<HTMLButtonElement>(null);

  const clickToRemove = () => setIsOpenToRemove(true);

  const clickToViewInfo = () => setIsOpenToViewInfo(true);

  const clickToRentCopy = () => setIsOpenToRentCopy(true);

  const clickToBackCopy = () => setIsOpenToBackCopy(true);

  const checkIfCanRemoveOrRentCopy = () => {
    // Usuário só pode deletar ou emprestar uma cópia disponível.
    // console.log('ewmprestar', copyBook.status, COPY_BOOK.AVAILABLE.value, copyBook.status === COPY_BOOK.AVAILABLE.value);
    return copyBook.status === COPY_BOOK.AVAILABLE.value;
  };

  const checkIfCanBackCopy = () => {
    // Usuário só pode deletar ou emprestar uma cópia disponível.
    // console.log('devolução', copyBook.status, COPY_BOOK.RENTED.value, copyBook.status === COPY_BOOK.RENTED.value);
    return copyBook.status === COPY_BOOK.RENTED.value;
  };

  useEffect(() => {
    // console.log('o nome do livro recebido foi', copyBook);
  }, []);

  const removeCopy = async () => {
    try {
      // await api.delete(`api//users/${id}`, { data: { userId: user.id } });

      toast({
        title: 'Cópia removida com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });

      onCloseToRemove();

      setTimeout(() => {
        window.location.reload();
      }, 1400);
    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: 'Ocorreu um erro ao tentar apagar a cópia',
        description: err?.message ? err?.message : 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  const history = useHistory();

  const handleSelectUser = async (userReturn: UserListReturn) => {
    setIsOpenToConfirmRent(true);

    /* await api.get(`api/users/${userId}`).then((res) => {
      // console.log("Attemp to rent to user:", res.data);
      setUser(res.data);
    }) */

    // console.log('user return', userReturn);
    setUser(userReturn);
  };

  const rentCopy = async () => {
    console.log("on rent copy")
    const dtNow = new Date();
    const data = {
      bookId: copyBook.book_id,
      copyId: copyBook.id,
      userId: user?.userId,
    };

    const { data: { body: userRentedCopies } } = await api.get(`api/rented-copies/${data.userId}`);

    console.log("api/rented-copies/{data.userId}", userRentedCopies)
    console.log("api/rented-copies/{data.userId}", userRentedCopies.length)

    let error;
    if (userRentedCopies.length >= 3) {
      console.log('inside condition');
      error = 'Não é possível realizar o empréstimo. Limite de cópias atingido.';
    }

    console.log('a'); 
    console.log("user copies:",userRentedCopies);

    Object.values(userRentedCopies).forEach((copy: any) => {
      console.log('for copies: ', copy)
      if (dtNow.valueOf() - new Date(copy.devolutionDate).valueOf() > 604800000) {
        error = 'Não é possível realizar o empréstimo. Existe devolução de cópia em atraso.';
      }
      if (copy.bookId === data.bookId) {
        error = 'Não é possível realizar o empréstimo. Já existe uma cópia do mesmo livro emprestada para este usuário.';
      }
    })

    if (!error) {
      console.log('Data:', data);
      await api.post('api/book-copy/borrow', data);
      onCloseToRentCopy();
    } else alert(error);

    setTimeout(() => {
      window.location.reload();
    }, 1400);

    // for (const copy in userRentedCopys) {
    //   // console.log('for copies: ', copy)
    //   // if (dtNow.valueOf() - new Date(copy.devolutionDate).valueOf() > 604800000) {
    //   //   // console.log('Não é possível realizar o empréstimo. Limite de cópias atingido.');
    //   //   return;
    //   // }
    //   // if (copy.bookId === data.bookId) {
    //   //   // console.log('Não é possível realizar o empréstimo. Já existe uma cópia do mesmo livro emprestada para este usuário.');
    //   //   return;
    //   // }
    // }
  };

  const backCopy = async () => {
    const data = {
      bookId: copyBook.book_id,
      copyId: copyBook.id,
      userId: user?.userId,
    };
    // console.log('Data:', data);
    // await api.post('api/book-copy/borrow', data);

    onCloseToRentCopy();

    setTimeout(() => {
      window.location.reload();
    }, 1400);
  };

  // console.log('copybook', copyBook);

  return (
    <>
      <Tr key={copyBook.id}>
        <Td>
          <Link display="block" href={`books/show/${copyBook.id}`}>
            {copyBook.code}
          </Link>
        </Td>
        <Td>
          <Link display="block" href={`books/show/${copyBook.id}`}>
            {copyBook.status}
          </Link>
        </Td>
        <Td>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <IconButton
                variant="outline"
                colorScheme="blue"
                mr={2}
                aria-label="Informações da cópia"
                onClick={clickToViewInfo}
                icon={<BsInfoCircle />}
              />
              {checkIfCanRemoveOrRentCopy() && (
                <IconButton
                  variant="outline"
                  colorScheme="red"
                  mr={2}
                  aria-label="Remover cópia"
                  onClick={clickToRemove}
                  icon={<BsTrashFill />}
                />
              )}
            </Box>
            {checkIfCanRemoveOrRentCopy() && (
              <Button colorScheme="teal" variant="outline" onClick={clickToRentCopy}>
                Emprestar
              </Button>
            )}
            {checkIfCanBackCopy() && (
              <Button colorScheme="blue" variant="outline" onClick={clickToBackCopy}>
                Fazer devolução
              </Button>
            )}
          </Box>
        </Td>
      </Tr>

      <AlertDialog isOpen={isOpenToRemove} leastDestructiveRef={cancelRefToRemove} onClose={onCloseToRemove}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remover Cópia
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja remover a cópia <strong>&quot;{copyBook.code}&quot;</strong>?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={removeCopy}>
                Remover
              </Button>
              <Button ref={cancelRefToRemove} onClick={onCloseToRemove} ml={3}>
                Cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog isOpen={isOpenToBackCopy} leastDestructiveRef={cancelRefToBackCopy} onClose={onCloseToBackCopy}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Devolver Cópia
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja devolver a cópia <strong>&quot;{copyBook.code}&quot;</strong>?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="blue" onClick={backCopy}>
                Devolver
              </Button>
              <Button ref={cancelRefToBackCopy} onClick={onCloseToBackCopy} ml={3}>
                Cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal isOpen={isOpenToViewInfo} onClose={onCloseToViewInfo}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Informações da cópia {copyBook.code}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CopyBookDetails copyBook={copyBook} />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onCloseToViewInfo}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenToRentCopy} onClose={onCloseToRentCopy}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Emprestar cópia {copyBook.code}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box h={540} maxH="90%" background="">
              <UserList onUserSelected={handleSelectUser} />

              <AlertDialog
                isOpen={isOpenToConfirmRent}
                leastDestructiveRef={cancelRefToRent}
                onClose={onCloseToConfirmRent}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Confirmar Empréstimo de Cópia
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Confirmar empréstimo de cópia <strong>&quot;{copyBook.code}&quot;</strong> ao aluno{' '}
                      <strong>&quot;{user?.name}&quot;</strong>?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button colorScheme="green" onClick={rentCopy}>
                        Confirmar
                      </Button>
                      <Button ref={cancelRefToRent} onClick={onCloseToConfirmRent} ml={3}>
                        Cancelar
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onCloseToRentCopy}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CopyBookItem;
