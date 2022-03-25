import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { CopyBookType } from '../../types/Book';
import { formatCpf } from '../../helpers/formatCpf';

export const CopyBookDetails = ({ copyBook }: { copyBook: CopyBookType }) => (
  <>
    <Box mt={2} textAlign="left">
      <Text fontSize="18px">
        <b>Identificador: </b>
        {copyBook.code}
      </Text>
    </Box>

    {copyBook.status === 'rented' && (
      <>
        <Heading size="lg" my="3" textAlign="center">
          Dados de quem alugou
        </Heading>
        <Box mt={2} textAlign="left">
          <Text fontSize="18px">
            <b>Nome de quem alugou: </b>
            {copyBook.rentedBy?.name}
          </Text>
        </Box>
        <Box mt={2} textAlign="left">
          <Text fontSize="18px">
            <b>Matrícula de quem alugou: </b>
            {copyBook.rentedBy?.registrationNumber}
          </Text>
        </Box>

        <Box mt={3} textAlign="left">
          <Text fontSize="18px">
            <b>E-mail de quem alugou: </b>
            {copyBook.rentedBy?.email}
          </Text>
        </Box>

        <Box mt={3} textAlign="left">
          <Text fontSize="18px">
            <b>CPF de quem alugou: </b>
            {formatCpf(copyBook.rentedBy?.cpf)}
          </Text>
        </Box>
        <Box mt={3} textAlign="left">
          <Text fontSize="18px">
            <b>É admin? </b>
            {copyBook.rentedBy?.admin ? 'Sim' : 'Não'}
          </Text>
        </Box>
      </>
    )}
    {copyBook.status === 'avaliable' && (
      <>
        <Box mt={2} textAlign="left">
          <Text fontSize="18px">A cópia está disponível para aluguel.</Text>
        </Box>
      </>
    )}
  </>
);
