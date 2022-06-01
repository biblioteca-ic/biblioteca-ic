import React from 'react';
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
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';
import { useAuth } from '../../../../providers/AuthProvider';
import { api } from '../../../../services/api';
import { copiesMock } from '../../../../services/mocks';
import { BookType, CopyBookType } from '../../../../types/Book';
import CopiesBookItem from './Item';

interface CopyTypeSearch extends CopyBookType {
  statusToString?: string;
}

const ListCopies = ({ book }: { book: BookType }) => {
  const [copies, setCopies] = React.useState<CopyTypeSearch[]>([]);
  const [copiesSearch, setCopiesSearch] = React.useState<CopyTypeSearch[]>([]);

  const { user } = useAuth();


  const getAllCopies = async () => {
    try {
      // console.log(`Req: /book-copy/${book.code}`);
      // const { data: response } = await api.get(`api/book-copy/${book.code}`);

      // const booksCopyResponse = copiesMock.map(copyData => ({
      //   ...copyData,
      //   // statusToString: COPY_BOOK[copyData.status].label,
      // }));
      const booksCopyResponse = copiesMock.map(function (item: any) {
        // console.log('status list', item.status.label);
        return { ...item, bookTitle: book.title, statusToString: item.status.label };
      });
      // console.log('Cópias:', booksCopyResponse);
      setCopies(booksCopyResponse);
      setCopiesSearch(booksCopyResponse);
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
            copyFilter?.book_id?.toLowerCase().includes(value.toLocaleLowerCase()) ||
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
    <>
      <Box pt={8}>
        <Box display="flex" mb={10} flexDirection="column" justifyContent="space-between" margin="auto">
          <Box display="flex" w="100%" mb={4} alignItems="center" justifyContent={user ? 'space-between' : 'left'}>
            <Heading color="teal" textAlign="center" mr={2}>
              Livros alugados
            </Heading>
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
        {copies.length !== 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Livro</Th>
                <Th>Data de Empréstimo</Th>
                <Th>Data máx. para renovação</Th>
                <Th>Qnt. de renovações disponíveis</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {copiesSearch.map((copyFilter: CopyBookType) => {
                // console.log('Cópias:', copiesSearch);
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

    </>
  );
};

export default ListCopies;
