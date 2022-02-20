import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { formatCpf } from '../../helpers/formatCpf';
import { UserType } from '../../types/User';

export const UserDetails = ({ user, showName }: { user: UserType; showName?: boolean }) => (
  <>
    {showName && <Heading>{user.name}</Heading>}
    <Box mt={2} textAlign="left">
      <Text fontSize="18px">
        <b>Matrícula: </b>
        {user.registrationNumber}
      </Text>
    </Box>

    <Box mt={3} textAlign="left">
      <Text fontSize="18px">
        <b>E-mail: </b>
        {user.email}
      </Text>
    </Box>

    <Box mt={3} textAlign="left">
      <Text fontSize="18px">
        <b>CPF: </b>
        {formatCpf(user.cpf)}
      </Text>
    </Box>
    <Box mt={3} textAlign="left">
      <Text fontSize="18px">
        <b>É admin? </b>
        {user.admin ? 'Sim' : 'Não'}
      </Text>
    </Box>
  </>
);
