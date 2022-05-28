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
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { FaUserPlus } from 'react-icons/fa';
import { AddIcon } from '@chakra-ui/icons';
import { Page } from '../../../components/Page';
import { useAuth } from '../../../providers/AuthProvider';
import { api } from '../../../services/api';
import { BookType } from '../../../types/Book';
import { getToken } from '../../../services/auth';

interface BookTypeSearch extends BookType {
  adminToString?: string;
}

const BooksList = () => {
  const history = useHistory();
  const [books, setBooks] = React.useState<BookTypeSearch[]>([]);
  const [booksSearch, setBooksSearch] = React.useState<BookTypeSearch[]>([]);

  const { user } = useAuth();

  const token = getToken();

  console.log('token', token);

  const getAllBooks = async () => {
    try {
      const { data } = await api.get('api/books');

      // const data = booksMock;
      console.log(data.body);
      setBooks(data.body);
      setBooksSearch(data.body);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getAllBooks();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (books.length) {
      if (value) {
        const newBooks = books.filter(bookFilter => {
          return (
            bookFilter?.title?.toLowerCase().includes(value.toLowerCase()) ||
            // bookFilter?.authors?.map((item) => item.toLowerCase().includes(value.toLowerCase())) ||
            bookFilter?.authors[0]?.toLowerCase().includes(value.toLowerCase()) ||
            // bookFilter?.categories?.map((item) => item.toLowerCase().includes(value.toLowerCase())) ||
            bookFilter?.categories[0]?.toLowerCase().includes(value.toLowerCase())
          );
        });
        setBooksSearch(newBooks);
      } else {
        setBooksSearch(books);
      }
    }
  };

  return (
    <Page>
      <Box p={8}>
        <Box display="flex" mb={10} flexDirection="column" justifyContent="space-between" margin="auto">
          <Box display="flex" w="100%" mb={4} alignItems="center" justifyContent={user ? 'space-between' : 'left'}>
            <Heading color="teal" textAlign="center" mr={2}>
              Livros
            </Heading>
            {user?.admin && (
              <Button
                leftIcon={<AddIcon />}
                onClick={() => history.push('/books/new')}
                colorScheme="teal"
                variant="outline"
              >
                Criar novo
              </Button>
            )}
          </Box>

          <Box minW="30%" mb={user ? 6 : 0}>
            <InputGroup color="teal">
              <Input placeholder="Buscar" bg="white" onChange={handleChange} />
              <InputRightElement>
                <BsSearch />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
        {books.length !== 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Título</Th>
                <Th>Autor</Th>
                <Th>Categoria</Th>
                <Th>Cópias disponíveis/Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {booksSearch.map(bookFilter => {
                return (
                  <Tr key={bookFilter.id}>
                    <Td>
                      <Link display="block" href={`/books/show/${bookFilter.id}`}>
                        {bookFilter.title}
                      </Link>
                    </Td>
                    <Td>
                      <Link display="block" href={`/books/show/${bookFilter.id}`}>
                        {bookFilter.authors[0]}
                      </Link>
                    </Td>
                    <Td>
                      <Link display="block" href={`/books/show/${bookFilter.id}`}>
                        {bookFilter.categories[0]}
                      </Link>
                    </Td>
                    <Td>
                      <Link display="block" href={`/books/show/${bookFilter.id}`}>
                        {`${bookFilter.availableCopies}/${bookFilter.copies}`}
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        ) : (
          <>
            <Text>Não há livros cadastrados</Text>
            {user?.admin && (
              <Link href="/books/new" textDecoration="none">
                <Button colorScheme="teal" leftIcon={<FaUserPlus />}>
                  Cadastrar livro
                </Button>
              </Link>
            )}
          </>
        )}
      </Box>
    </Page>
  );
};

export default BooksList;
