import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, useMediaQuery, Center, Spinner, IconButton } from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';
import { booksMock } from '../../../services/mocks';
import { Page } from '../../../components/Page';
// import { api } from '../../../services/api';
import { BookType } from '../../../types/Book';
import { UserType } from '../../../types/User';
import { BookDetails } from '../../../components/BookDetails';
import { BsPencil, BsTrashFill } from 'react-icons/bs';
import { CopiesList } from '../../../modules/Copies';

type ItemParams = {
  id: string;
};

export const BookItem = ({ bookData, isAdmin }: { bookData: BookType; isAdmin: boolean | undefined }) => {
  const history = useHistory();
  // const toast = useToast();

  return (
    <>
      <Box mt={4} mb={8}>
        <Box mb={3} display="flex" alignItems="center" justifyContent="space-between">
          <Heading>{bookData.title}</Heading>
          <Box>
            {isAdmin ? (
              <>
                <IconButton
                  variant="outline"
                  colorScheme="blue"
                  mr={2}
                  aria-label="Editar livro"
                  onClick={() => history.push(`/books/edit/${bookData.id}`)}
                  icon={<BsPencil />}
                />
                <IconButton
                  variant="outline"
                  colorScheme="red"
                  aria-label="Remover livro"
                  // onClick={clickToRemove}
                  icon={<BsTrashFill />}
                />
              </>
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
  const { user } = useAuth();

  const checkIsAdmin = () => userData?.admin;

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
      const data = user;
      delete data.accessToken;

      setUserData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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
              <BookItem bookData={bookData} isAdmin={checkIsAdmin()} />
            </Box>
            {checkIsAdmin() ? (
              <>
                <CopiesList book={bookData} />
              </>
            ) : null}
          </>
        )}
      </Box>
    </Page>
  );
};

export default BookItemPage;
