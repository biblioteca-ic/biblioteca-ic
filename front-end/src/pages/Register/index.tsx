import * as React from 'react';
import {
  Checkbox,
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
  useToast,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Page } from '../../components/Page';
import { api } from '../../services/api';

const schema = yup.object().shape({
  cpf: yup
    .string()
    // .matches(/(^\d{3}\x2E\d{3}\x2E\d{3}\x2D\d{2}$)$/, 'Precisa estar no formato de CPF') // regex para cpf
    .required('CPF é obrigatório'),
  email: yup.string().email('Precisa ser um e-mail válido.').required('E-mail é obrigatório'),
  registrationNumber: yup.string().required('Matrícula é obrigatória'),
  name: yup.string().required('Nome é obrigatório'),
  admin: yup.boolean(),
  password: yup.string().required('Senha é obrigatória'),
  confirmPassword: yup
    .string()
    .required('Por favor, confirme sua senha')
    .oneOf([yup.ref('password'), null], 'Senhas não são iguais.'),
});

type RegisterFormInputs = {
  name: string;
  cpf: string;
  registrationNumber: string;
  email: string;
  password: string;
  admin: boolean;
  confirmPassword: string;
};

const Register = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const toast = useToast();
  const history = useHistory();
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowPassword(!showPassword);

  const onSubmitRegister = async (data: RegisterFormInputs) => {
    // colocar type/interface
    // verificar credenciais e redirecionar para a dashboard
    // history.push('/dashboard');
    console.log({ data });
    try {
      const { cpf, name, email, password, registrationNumber, admin } = data;

      await api.post('/signup', {
        cpf,
        name,
        email,
        password,
        registrationNumber,
        admin,
      });

      toast({
        title: 'Cadastro realizado com sucesso',
        description: 'Você pode realizar o acesso agora',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });

      history.push('/login', {
        email,
        password,
      });
    } catch {
      toast({
        title: 'Ocorreu um erro ao fazer o cadastro na plataforma',
        description: 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  return (
    <Page>
      <Box textAlign="center" fontSize="xl" p={8} display="flex" justifyContent="center">
        <Stack spacing={3} display="flex" alignItems="center" w="80%" maxW={380} minW={320}>
          <Text>Cadastrar</Text>

          <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmitRegister)}>
            <FormControl my={2} isInvalid={!!errors.name?.message}>
              <Input {...register('name')} placeholder="Nome" />
              {!!errors.name?.message && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
            </FormControl>

            <FormControl my={2} isInvalid={!!errors.registrationNumber?.message}>
              <Input {...register('registrationNumber')} placeholder="Matrícula" />
              {!!errors.registrationNumber?.message && (
                <FormErrorMessage>{errors.registrationNumber.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl my={2} isInvalid={!!errors.cpf?.message}>
              <Input {...register('cpf')} placeholder="CPF" />
              {!!errors.cpf?.message && <FormErrorMessage>{errors.cpf.message}</FormErrorMessage>}
            </FormControl>

            <FormControl my={2} isInvalid={!!errors.email?.message}>
              <Input {...register('email')} type="email" placeholder="Email" />
              {!!errors.email?.message && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
            </FormControl>

            <FormControl my={2} isInvalid={!!errors.admin?.message}>
              <Checkbox {...register('admin')}>É administrador?</Checkbox>
              {!!errors.admin?.message && <FormErrorMessage>{errors.admin.message}</FormErrorMessage>}
            </FormControl>

            <FormControl my={2} isInvalid={!!errors.password?.message}>
              <InputGroup size="md" maxW={380}>
                <Input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Senha" />
                <InputRightElement width="4.5rem">
                  {showPassword ? (
                    <IconButton
                      aria-label="Esconder senha"
                      icon={<AiOutlineEyeInvisible />}
                      size="sm"
                      onClick={togglePassword}
                    />
                  ) : (
                    <IconButton aria-label="Mostrar senha" icon={<AiOutlineEye />} size="sm" onClick={togglePassword} />
                  )}
                </InputRightElement>
              </InputGroup>
              {!!errors.password?.message && <FormErrorMessage>{errors.password?.message}</FormErrorMessage>}
            </FormControl>

            <FormControl my={2} isInvalid={!!errors.confirmPassword?.message}>
              <InputGroup size="md" maxW={380}>
                <Input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmar senha"
                />
                <InputRightElement width="4.5rem">
                  {showConfirmPassword ? (
                    <IconButton
                      aria-label="Esconder senha"
                      icon={<AiOutlineEyeInvisible />}
                      size="sm"
                      onClick={toggleConfirmPassword}
                    />
                  ) : (
                    <IconButton
                      aria-label="Mostrar senha"
                      icon={<AiOutlineEye />}
                      size="sm"
                      onClick={toggleConfirmPassword}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
              {!!errors.confirmPassword?.message && (
                <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
              )}
            </FormControl>

            <Button colorScheme="teal" size="md" w="100%" type="submit">
              Criar conta
            </Button>
          </form>

          <Box width="100%" display="flex">
            <Text fontSize="md" mr={2}>
              Já tem conta?
            </Text>
            <Link href="/login" color="teal">
              <Text fontSize="md">Fazer login</Text>
            </Link>
          </Box>
        </Stack>
      </Box>
    </Page>
  );
};

export default Register;
