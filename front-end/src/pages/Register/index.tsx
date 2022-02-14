import * as React from 'react';
import { Checkbox, Link, Box, Text, Input, InputGroup, InputRightElement, Button, Stack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { Page } from '../../components/Page';

const Register = () => {
  const [nome, setNome] = React.useState<string>('');
  const [matricula, setMatricula] = React.useState<string>('');
  const [cpf, setCpf] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [admin, setAdmin] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);

  const history = useHistory();
  const handleClick = () => setShow(!show);

  const handleReguister = () => {
    // verificar credenciais e redirecionar para a dashboard
    history.push('/dashboard');
  };

  return (
    <Page>
      <Box textAlign="center" fontSize="xl" p={8} display="flex" justifyContent="center">
        <Stack spacing={3} display="flex" alignItems="center" w="80%" maxW={380} minW={320}>
          <Text>Login</Text>
          <Input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />

          <Input value={matricula} onChange={e => setMatricula(e.target.value)} placeholder="Matrícula" />

          <Input value={cpf} onChange={e => setCpf(e.target.value)} placeholder="CPF" />

          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />

          <InputGroup size="md" maxW={380}>
            <Input
              value={password}
              onChange={e => setPassword(e.target.value)}
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Senha"
            />
            <InputRightElement width="4.5rem">
              <Button mr={2} h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Esconder' : 'Mostrar'}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Checkbox isChecked={admin}>Administrador?</Checkbox>

          <Button colorScheme="teal" size="md" w="100%" onClick={() => handleReguister()}>
            Criar conta
          </Button>

          <Box width="100%" display="flex" justifyContent="space-between">
            <Text fontSize="md">Já tem conta?</Text>
            <Link href="/login" color="#1A94DA">
              <Text fontSize="md">Fazer login</Text>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Page>
  );
};

export default Register;
