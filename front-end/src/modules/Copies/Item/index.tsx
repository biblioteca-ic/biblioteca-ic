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

  const [isOpenToConfirmRent, setIsOpenToConfirmRent] = useState(false);
  const onCloseToConfirmRent = () => setIsOpenToConfirmRent(false);
  const cancelRefToRent = useRef<HTMLButtonElement>(null);

  const clickToRemove = () => setIsOpenToRemove(true);

  const clickToViewInfo = () => setIsOpenToViewInfo(true);

  const clickToRentCopy = () => setIsOpenToRentCopy(true);

  const checkIfCanRemoveOrRentCopy = () => {
    // Usuário só pode deletar ou emprestar uma cópia disponível.
   
    return copyBook.status === COPY_BOOK.AVAILABLE.value;
  };

  useEffect(() => {console.log("o nome do livro recebido foi", copyBook)}, [])

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

    /* await api.get(`/api/users/${userId}`).then((res) => {
      console.log("Attemp to rent to user:", res.data);
      setUser(res.data);
    }) */

    console.log('user return', userReturn)
    setUser(userReturn);    
  }

  const rentCopy = async () => {
    const data = {
      bookId: copyBook.book_id,
      copyId: copyBook.id,
      userId: user?.userId,
    }
    console.log("Data:",data)
    // await api.post("/api/book-copy/borrow", data)
  }

  return (
    <>
      <Tr key={copyBook.id}>
        <Td>
          <Link display="block" href={`users/show/${copyBook.id}`}>
            {copyBook.code}
          </Link>
        </Td>
        <Td>
          <Link display="block" href={`users/show/${copyBook.id}`}>
          {COPY_BOOK[copyBook.status].label}
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
      
      <Modal isOpen={isOpenToViewInfo} onClose={onCloseToViewInfo} >
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
      
      <Modal isOpen={isOpenToRentCopy} onClose={onCloseToRentCopy} >
        <ModalOverlay />
        <ModalContent  >
          <ModalHeader>Emprestar cópia {copyBook.code}</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <Box h={540} maxH='90%' background=''>
              <UserList onUserSelected={handleSelectUser}/>

              <AlertDialog isOpen={isOpenToConfirmRent} leastDestructiveRef={cancelRefToRent} onClose={onCloseToConfirmRent}>
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Confirmar Empréstimo de Cópia
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Confirmar empréstimo de cópia <strong>&quot;{copyBook.code}&quot;</strong> do livro <strong>&quot;{copyBook.bookTitle}&quot;</strong> ao aluno <strong>&quot;{user?.name}&quot;</strong>? 
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
