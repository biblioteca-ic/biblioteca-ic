import * as React from 'react';
import { Box, Icon, Heading, Link } from '@chakra-ui/react';
import { ImBooks, ImProfile, ImUsers } from 'react-icons/im';
// import { FaUserFriends } from 'react-icons/fa';
import { Page } from '../../components/Page';
import { useAuth } from '../../providers/AuthProvider';

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <Page>
      <Box textAlign="center" fontSize="xl" p={8}>
        <Box w="70%" margin="auto">
          <Heading color="teal" textAlign="center" mb={6}>
            Funcionalidades:
          </Heading>
          <Link color="teal" href="/books" _focus={{ boxShadow: 'none' }}>
            <Box border="1px" p={5} display="flex" alignItems="center" justifyContent="center" mb={4}>
              <Icon as={ImBooks} fontSize="2rem" mr={2} />
              <Heading fontSize="md" textTransform="uppercase">
                Livros
              </Heading>
            </Box>
          </Link>
          {user && (
            <>
              <Link color="teal" href="/profile" _focus={{ boxShadow: 'none' }}>
                <Box border="1px" p={5} display="flex" alignItems="center" justifyContent="center" mb={4}>
                  <Icon as={ImProfile} fontSize="2rem" mr={2} />
                  <Heading fontSize="md" textTransform="uppercase">
                    Meu Perfil
                  </Heading>
                </Box>
              </Link>
              {user.admin && (
                <>
                  <Link color="teal" href="/users" _focus={{ boxShadow: 'none' }}>
                    <Box border="1px" p={5} display="flex" alignItems="center" justifyContent="center" mb={4}>
                      <Icon as={ImUsers} fontSize="2rem" mr={2} />
                      <Heading fontSize="md" textTransform="uppercase">
                        Usuários
                      </Heading>
                    </Box>
                  </Link>
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    </Page>
  );
};

export default Dashboard;
