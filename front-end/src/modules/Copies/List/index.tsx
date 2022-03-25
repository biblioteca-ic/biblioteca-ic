import * as React from 'react';
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Box,
  Heading,
  Link,
  InputGroup,
  Input,
  InputRightElement,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { BsInfoCircle, BsSearch, BsTrashFill } from 'react-icons/bs';
import { FaUserPlus } from 'react-icons/fa';
import { AddIcon } from '@chakra-ui/icons';
import { useAuth } from '../../../providers/AuthProvider';
// import { api } from '../../../services/api';
import { copiesMock } from '../../../services/mocks';
import { BookType, CopyBookType } from '../../../types/Book';
import { CopiesBookItem } from '..';

interface CopyTypeSearch extends CopyBookType {
  statusToString?: string;
}

const CopiesList = ({ book }: { book: BookType }) => {
  const history = useHistory();
  const [copies, setCopies] = React.useState<CopyTypeSearch[]>([]);
  const [copiesSearch, setCopiesSearch] = React.useState<CopyTypeSearch[]>([]);

  const { user } = useAuth();

  const getAllCopies = async () => {
    try {
      // const { data: response } = await api.get('/users');

      const data = copiesMock.map(copyData =>
        copyData.status === 'avaliable' ? { ...copyData, statusToString: 'avaliable' } : copyData,
      );
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

  return (
    <Box p={8}>
      <Box display="flex" mb={10} flexDirection="column" justifyContent="space-between" margin="auto">
        <Box display="flex" w="100%" mb={4} alignItems="center" justifyContent={user ? 'space-between' : 'left'}>
          <Heading color="teal" textAlign="center" mr={2}>
            {`Cópias do livro ${book.title}`}
          </Heading>
          {user && (
            <Button
              leftIcon={<AddIcon />}
              // onClick={() => history.push('register')}
              colorScheme="teal"
              variant="outline"
            >
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
          <Text>Não há cópias cadastradas</Text>
          <Link href="/register" textDecoration="none">
            <Button colorScheme="teal" leftIcon={<FaUserPlus />}>
              Criar cópia
            </Button>
          </Link>
        </>
      )}
    </Box>
  );
};

export default CopiesList;
