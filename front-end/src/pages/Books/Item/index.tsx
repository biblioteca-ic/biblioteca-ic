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
import { useAuth } from '../../../providers/AuthProvider';
import { booksMock } from '../../../services/mocks';
import { Page } from '../../../components/Page';
// import { api } from '../../../services/api';
import { BookType } from '../../../types/Book';
import { UserType } from '../../../types/User';
import { BookDetails } from '../../../components/BookDetails';

type ItemParams = {
  id: string;
};

export const BookItem = ({ bookData, userData }: { bookData: BookType, userData: UserType | undefined }) => {
  const history = useHistory();
  // const toast = useToast();

  const checkIfCanEdit = () => {
    if (userData) return userData.admin;
    return null
  };

  return (
    <>
      <Box mt={4} mb={8}>
        <Box mb={3} display="flex" alignItems="center" justifyContent="space-between">
          <Heading>{bookData.title}</Heading>
          <Box>
            {checkIfCanEdit() ? (
              <Button variant="outline" colorScheme="blue" mr={2} onClick={() => history.push(`/books/edit/${bookData.id}`)}>
                Editar livro
              </Button>
            ) : null}
          </Box>
        </Box>
        <BookDetails book={bookData} />
      </Box>
    </>
  );
};

const BookItemPage = () => {
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');
  const [bookData, setBookData] = useState<BookType>();
  const [userData, setUserData] = useState<UserType>();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams<ItemParams>();
  const { user } = useAuth() as any;

  const getBookData = async () => {
    try {
      // const { data } = await api.get(`/users/${id}`);

      const data = booksMock;
      setBookData(data[Number(id) - 1]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      // const { data } = await api.get(`/users/${id}`);


      const data = user.body;
      delete data.accessToken;

      console.log(data)

      setUserData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }

  }

  useEffect(() => {
    getBookData();
    getUserData();
  }, [id]);

  return (
    <Page>
      <Box p={8} pt={isLargerThan766 ? 10 : 8}>
        {!bookData ? (
          <Center flexDirection="column">
            <Heading color="teal" textAlign="center" mb={6}>
              Dados do livro
            </Heading>
            {isLoading ? <Spinner color="teal" size="xl" /> : <Text>Não há livro com esse id.</Text>}
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
                  Dados do livro
                </Heading>
              </Box>
            </Box>
            <Box maxW="80vh" margin="auto">
              <BookItem bookData={bookData} userData={userData} />
            </Box>
          </>
        )}
      </Box>
    </Page>
  );
};

export default BookItemPage;
