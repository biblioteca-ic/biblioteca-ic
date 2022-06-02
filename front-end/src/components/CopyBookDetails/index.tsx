import React, {useState, useEffect} from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { CopyBookType } from '../../types/Book';
import { formatCpf } from '../../helpers/formatCpf';
import { COPY_BOOK } from '../../constants';
import { UserType } from '../../types/User';
import { api } from '../../services/api';

interface UserResponseType {
  name: string;
  email: string;
  cpf: string;
  admin: boolean;
  registrationNumber: string;
}

export const CopyBookDetails = ({ copyBook, userId }: { copyBook: CopyBookType; userId: string | undefined }) => {
  const [user, setUser] = useState<UserResponseType>();

  useEffect(() => {
    api.get(`api/users/${userId}`).then((response) => {
      setUser(response.data.body);
    });
  }, []);


  return ( 
  <>
    <Box mt={2} textAlign="left">
      <Text fontSize="18px">
        <b>Identificador: </b>
        {copyBook.code}
      </Text>
    </Box>

    {copyBook.status === 'RENTED' && (
      <>
        <Heading size="lg" my="3" textAlign="center">
          Dados de quem alugou
        </Heading>
        <Box mt={2} textAlign="left">
          <Text fontSize="18px">
            <b>Nome de quem alugou: </b>
            {user?.name}
          </Text>
        </Box>

        <Box mt={3} textAlign="left">
          <Text fontSize="18px">
            <b>E-mail de quem alugou: </b>
            {user?.email}
          </Text>
        </Box>

        <Box mt={3} textAlign="left">
          <Text fontSize="18px">
            <b>CPF de quem alugou: </b>
            {formatCpf(user?.cpf)}
          </Text>
        </Box>
        <Box mt={3} textAlign="left">
          <Text fontSize="18px">
            <b>É admin? </b>
            {user?.admin ? 'Sim' : 'Não'}
          </Text>
        </Box>
      </>
    )}
    {copyBook.status === COPY_BOOK.AVAILABLE.value && (
      <>
        <Box mt={2} textAlign="left">
          <Text fontSize="18px">A cópia está disponível para aluguel.</Text>
        </Box>
      </>
    )}
  </>
  )
};
