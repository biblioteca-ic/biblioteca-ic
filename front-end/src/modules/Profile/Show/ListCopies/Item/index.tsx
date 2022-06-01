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
import { CopyBookType } from '../../../../../types/Book';
import { UserType } from '../../../../../types/User';
import { UserListReturn } from '../../../../../types/UserListReturn';
import { CopyBookDetails } from '../../../../../components/CopyBookDetails';
import { COPY_BOOK } from '../../../../../constants';
import UserList from '../../../../../components/UserList';
import { useHistory } from 'react-router-dom';
import { api } from '../../../../../services/api';

export const CopyBookItem = ({ copyBook }: { copyBook: CopyBookType }) => {
  // const history = useHistory();
  const toast = useToast();

  const [user, setUser] = useState<UserListReturn>();

  const [isOpenToBackCopy, setIsOpenToBackCopy] = useState(false);
  const onCloseToBackCopy = () => setIsOpenToBackCopy(false);
  const cancelRefToBackCopy = useRef<HTMLButtonElement>(null);

  const [isOpenToViewInfo, setIsOpenToViewInfo] = useState(false);
  const onCloseToViewInfo = () => setIsOpenToViewInfo(false);

  const [isOpenToRentCopy, setIsOpenToRentCopy] = useState(false);
  const onCloseToRentCopy = () => setIsOpenToRentCopy(false);

  const [isOpenToConfirmRent, setIsOpenToConfirmRent] = useState(false);
  const onCloseToConfirmRent = () => setIsOpenToConfirmRent(false);
  const cancelRefToRent = useRef<HTMLButtonElement>(null);

  const clickToBackCopy = () => setIsOpenToBackCopy(true);

  const clickToViewInfo = () => setIsOpenToViewInfo(true);

  const clickToRentCopy = () => setIsOpenToRentCopy(true);

  const checkIfCanBackCopyOrRentCopy = () => {
    // Usuário só pode deletar ou emprestar uma cópia disponível.

    return copyBook.status === COPY_BOOK.AVAILABLE.value;
  };

  useEffect(() => {
    // console.log('o nome do livro recebido foi', copyBook);
  }, []);

  const backCopy = async () => {
    try {
      // await api.delete(`api//users/${id}`, { data: { userId: user.id } });

      toast({
        title: 'Cópia devolvida com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });

      onCloseToBackCopy();

      setTimeout(() => {
        window.location.reload();
      }, 1400);
    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: 'Ocorreu um erro ao tentar devolver a cópia',
        description: err?.message ? err?.message : 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  const history = useHistory();

  const rentCopy = async () => {
    const data = {
      bookId: copyBook.book_id,
      copyId: copyBook.id,
      userId: user?.userId,
    };
    // console.log('Data:', data);
    await api.post('api/book-copy/borrow', data);

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
            {copyBook.title}
          </Link>
        </Td>
        <Td>
          <Link display="block" href={`books/show/${copyBook.id}`}>
            16/02/2022
          </Link>
        </Td>
        <Td>
          <Link display="block" href={`books/show/${copyBook.id}`}>
            26/02/2022
          </Link>
        </Td>
        <Td>
          <Link display="block" href={`books/show/${copyBook.id}`}>
            1/3
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
              {true && ( //devolver
                <Button colorScheme="red" variant="outline" onClick={clickToBackCopy}>
                  Devolver
                </Button>
              )}
              {checkIfCanBackCopyOrRentCopy() && (
                <Button colorScheme="teal" variant="outline" onClick={() => setIsOpenToConfirmRent(true)}>
                  Renovar
                </Button>
              )}
            </Box>
          </Box>
        </Td>
      </Tr>

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

      <AlertDialog isOpen={isOpenToConfirmRent} leastDestructiveRef={cancelRefToRent} onClose={onCloseToConfirmRent}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmar renovação de cópia
            </AlertDialogHeader>

            <AlertDialogBody>
              Confirmar renovação de cópia <strong>&quot;{copyBook.code}&quot;</strong> do livro{' '}
              <strong>&quot;{copyBook.bookTitle}&quot;</strong>?
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
    </>
  );
};

export default CopyBookItem;
