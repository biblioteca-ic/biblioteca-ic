import * as React from 'react';
import {
  Link,
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
  IconButton,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Page } from '../../components/Page';

const schema = yup.object().shape({
  cpf: yup
    .string()
    // .matches(/(^\d{3}\x2E\d{3}\x2E\d{3}\x2D\d{2}$)$/, 'Precisa estar no formato de CPF') // regex para cpf
    .required('CPF é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

const Login = () => {
  const [show, setShow] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();
  const handleClick = () => setShow(!show);

  const onSubmitLogin = (data: any) => {
    // colocar type/interface
    // verificar credenciais e redirecionar para a dashboard
    // history.push('/dashboard');
    console.log({ data });
    reset();
  };

  return (
    <Page>
      <Box textAlign="center" fontSize="xl" p={8} display="flex" justifyContent="center">
        <Stack spacing={3} display="flex" alignItems="center" w="80%" maxW={380} minW={320}>
          <Text>Login</Text>
          <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmitLogin)}>
            <FormControl my={2} isInvalid={errors.cpf?.message}>
              <Input {...register('cpf')} placeholder="CPF" />
              {!!errors.cpf?.message && <FormErrorMessage>{errors.cpf.message}</FormErrorMessage>}
            </FormControl>

            <FormControl my={2} isInvalid={errors.password?.message}>
              <InputGroup size="md" maxW={380}>
                <Input {...register('password')} type={show ? 'text' : 'password'} placeholder="Senha" />
                <InputRightElement width="4.5rem">
                  {show ? (
                    <IconButton
                      aria-label="Esconder senha"
                      icon={<AiOutlineEyeInvisible />}
                      size="sm"
                      onClick={handleClick}
                    />
                  ) : (
                    <IconButton aria-label="Mostrar senha" icon={<AiOutlineEye />} size="sm" onClick={handleClick} />
                  )}
                </InputRightElement>
              </InputGroup>
              {!!errors.cpf?.message && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
            </FormControl>

            <Button colorScheme="teal" size="md" w="100%" type="submit">
              Entrar
            </Button>
          </form>

          <Box width="100%" display="flex" justifyContent="space-between">
            <Text fontSize="md">Ainda não tem conta?</Text>
            <Link href="/register" color="#1A94DA">
              <Text fontSize="md">Cadastre-se</Text>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Page>
  );
};

export default Login;
