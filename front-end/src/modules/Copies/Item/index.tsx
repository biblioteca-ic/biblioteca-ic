import React, { useRef, useState } from 'react';
import {
  IconButton,
  Tr,
  Link,
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
import { useHistory } from 'react-router-dom';
import { BsInfoCircle, BsTrashFill } from 'react-icons/bs';
// import { api } from '../../../services/api';
import { CopyBookType } from '../../../types/Book';
import { CopyBookDetails } from '../../../components/CopyBookDetails';
import { AxiosError } from 'axios';

export const CopyBookItem = ({ copyBook }: { copyBook: CopyBookType }) => {
  // const history = useHistory();
  const toast = useToast();

  const [isOpenToRemove, setIsOpenToRemove] = useState(false);
  const onCloseToRemove = () => setIsOpenToRemove(false);
  const cancelRefToRemove = useRef<HTMLButtonElement>(null);

  const [isOpenToViewInfo, setIsOpenToViewInfo] = useState(false);
  const onCloseToViewInfo = () => setIsOpenToViewInfo(false);

  const clickToRemove = () => {
    setIsOpenToRemove(true);
  };

  const clickToViewInfo = () => {
    setIsOpenToViewInfo(true);
  };

  const checkIfCanRemoveCopy = () => {
    // Usuário só pode deletar uma cópia disponível.
    return copyBook.status === 'avaliable';
  };

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
            {copyBook.status}
          </Link>
        </Td>
        <Td>
          <>
            <IconButton
              variant="outline"
              colorScheme="blue"
              mr={2}
              aria-label="Informações da cópia"
              onClick={clickToViewInfo}
              icon={<BsInfoCircle />}
            />
            {checkIfCanRemoveCopy() && (
              <IconButton
                variant="outline"
                colorScheme="red"
                aria-label="Remover cópia"
                onClick={clickToRemove}
                icon={<BsTrashFill />}
              />
            )}
          </>
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
    </>
  );
};

export default CopyBookItem;
