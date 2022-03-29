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
// import { api } from '../../../services/api';
import { UserType } from '../../../types/User';
import { usersMock } from '../../../services/mocks';
import { formatCpf } from '../../../helpers/formatCpf';

interface UserTypeSearch extends UserType {
  adminToString?: string;
}

const UsersList = () => {
  const history = useHistory();
  const [users, setUsers] = React.useState<UserTypeSearch[]>([]);
  const [usersSearch, setUsersSearch] = React.useState<UserTypeSearch[]>([]);

  const { user } = useAuth();

  const getAllUsers = async () => {
    try {
      // const { data: response } = await api.get('/users');

      const data = usersMock.map(userData => (userData.admin ? { ...userData, adminToString: 'admin' } : userData));
      setUsers(data);
      setUsersSearch(data);
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getAllUsers();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (users.length) {
      if (value) {
        const newUsers = users.filter(userFilter => {
          return (
            userFilter?.name?.toLowerCase().includes(value.toLowerCase()) ||
            userFilter?.registrationNumber?.toLowerCase().includes(value.toLowerCase()) ||
            userFilter?.cpf?.toLowerCase().includes(value.toLowerCase()) ||
            userFilter?.adminToString?.toLowerCase().includes(value.toLowerCase()) ||
            userFilter?.email?.toLowerCase().includes(value.toLowerCase())
          );
        });
        setUsersSearch(newUsers);
      } else {
        setUsersSearch(users);
      }
    }
  };

  return (
    <Page>
      <Box p={8}>
        <Box display="flex" mb={10} flexDirection="column" justifyContent="space-between" margin="auto">
          <Box display="flex" w="100%" mb={4} alignItems="center" justifyContent={user ? 'space-between' : 'left'}>
            <Heading color="teal" textAlign="center" mr={2}>
              Usuários
            </Heading>
            {user && (
              <Button
                leftIcon={<AddIcon />}
                onClick={() => history.push('register')}
                colorScheme="teal"
                variant="outline"
              >
                Criar novo
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
        {users.length !== 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>E-mail</Th>
                <Th>Matrícula</Th>
                <Th>CPF</Th>
                <Th>É admin?</Th>
              </Tr>
            </Thead>
            <Tbody>
              {usersSearch.map(userFilter => {
                return (
                  <Tr key={userFilter.id}>
                    <Td>
                      <Link display="block" href={`users/show/${userFilter.id}`}>
                        {userFilter.name}
                      </Link>
                    </Td>
                    <Td>
                      <Link display="block" href={`users/show/${userFilter.id}`}>
                        {userFilter.email}
                      </Link>
                    </Td>
                    <Td>
                      <Link display="block" href={`users/show/${userFilter.id}`}>
                        {userFilter.registrationNumber}
                      </Link>
                    </Td>
                    <Td>
                      <Link display="block" href={`users/show/${userFilter.id}`}>
                        {formatCpf(userFilter.cpf)}
                      </Link>
                    </Td>
                    <Td>
                      <Link display="block" href={`users/show/${userFilter.id}`}>
                        {userFilter.admin ? 'Sim' : 'Não'}
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        ) : (
          <>
            <Text>Não há usuários cadastrados</Text>
            <Link href="/register" textDecoration="none">
              <Button colorScheme="teal" leftIcon={<FaUserPlus />}>
                Criar usuário
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Page>
  );
};

export default UsersList;
