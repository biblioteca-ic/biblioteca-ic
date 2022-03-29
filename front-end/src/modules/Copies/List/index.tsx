import React, { useState, useRef } from 'react';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Button,
  Box,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Text,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { AddIcon } from '@chakra-ui/icons';
import { AxiosError } from 'axios';
import { useAuth } from '../../../providers/AuthProvider';
import { api } from '../../../services/api';
import { copiesMock } from '../../../services/mocks';
import { BookType, CopyBookType } from '../../../types/Book';
import { CopiesBookItem } from '..';
import { COPY_BOOK } from '../../../constants';

interface CopyTypeSearch extends CopyBookType {
  statusToString?: string;
}

const CopiesList = ({ book }: { book: BookType }) => {
  const [copies, setCopies] = React.useState<CopyTypeSearch[]>([]);
  const [copiesSearch, setCopiesSearch] = React.useState<CopyTypeSearch[]>([]);

  const toast = useToast();
  const { user } = useAuth();

  const [isOpenAddNewCopy, setIsOpenAddNewCopy] = useState(false);
  const onCloseAddNewCopy = () => setIsOpenAddNewCopy(false);
  const cancelRefAddNewCopy = useRef<HTMLButtonElement>(null);

  const clickAddNewCopy = () => {
    setIsOpenAddNewCopy(true);
  };

  const getAllCopies = async () => {
    try {
      // const { data: response } = await api.get('/users');

      const data = copiesMock.map(copyData => ({ ...copyData, statusToString: COPY_BOOK[copyData.status].label }));
      setCopies(data);
      setCopiesSearch(data);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getAllCopies();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (copies.length) {
      if (value) {
        const newCopie = copies.filter(copyFilter => {
          return (
            copyFilter?.id?.toLowerCase().includes(value.toLowerCase()) ||
            copyFilter?.statusToString?.toLowerCase().includes(value.toLowerCase()) ||
            copyFilter?.code?.toLowerCase().includes(value.toLowerCase())
          );
        });
        setCopiesSearch(newCopie);
      } else {
        setCopiesSearch(copies);
      }
    }
  };

  const addNewCopy = async () => {
    try {
      await api.post('api/book-copy', {
        book_code: book.code,
        created_by: user.id,
      });
      toast({
        title: 'Nova cópia criada com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });

      onCloseAddNewCopy();

      setTimeout(() => {
        window.location.reload();
      }, 1400);
    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: 'Ocorreu um erro ao criar uma nova cópia',
        description: err?.message ? err?.message : 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box p={8}>
        <Box display="flex" mb={10} flexDirection="column" justifyContent="space-between" margin="auto">
          <Box display="flex" w="100%" mb={4} alignItems="center" justifyContent={user ? 'space-between' : 'left'}>
            <Heading color="teal" textAlign="center" mr={2}>
              {`Cópias do livro ${book.title}`}
            </Heading>
            {user && (
              <Button leftIcon={<AddIcon />} onClick={clickAddNewCopy} colorScheme="teal" variant="outline">
                Criar nova
              </Button>
            )}
          </Box>

          <Box minW="20%" w="25%" mb={user ? 6 : 0}>
            <InputGroup color="teal">
              <Input placeholder="Buscar" bg="white" onChange={handleChange} />
              <InputRightElement>
                <BsSearch />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
        {copies.length !== 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Identificador</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {copiesSearch.map((copyFilter: CopyBookType) => {
                return <CopiesBookItem key={copyFilter.id} copyBook={copyFilter} />;
              })}
            </Tbody>
          </Table>
        ) : (
          <>
            <Text textAlign="center">Não há cópias cadastradas.</Text>
          </>
        )}
      </Box>

      <AlertDialog isOpen={isOpenAddNewCopy} leastDestructiveRef={cancelRefAddNewCopy} onClose={onCloseAddNewCopy}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Criar nova cópia
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja criar uma nova cópia do livr <strong>&quot;{book.title}&quot;</strong>?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="green" onClick={addNewCopy}>
                Sim
              </Button>
              <Button ref={cancelRefAddNewCopy} onClick={onCloseAddNewCopy} ml={3}>
                Não
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CopiesList;
