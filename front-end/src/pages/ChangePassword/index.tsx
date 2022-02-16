import * as React from 'react';
import { Box, Text, Input, Button, Stack, FormControl, FormErrorMessage, useToast, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Page } from '../../components/Page';
import { api } from '../../services/api';
import { useAuth } from '../../providers/AuthProvider';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';

export const TOKEN_KEY = '@BibliotecaIC-Token';
export const USER_KEY = '@BibliotecaIC-User';

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required('Senha é obrigatória')
    .matches(
      /^(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*.,&@#\W_-])[a-zA-Z$*&@#.,-_]{6,}$/,
      'A senha precisa ter no mínimo 6 caracteres, deve incluir letras maiúsculas e minúsculas e deve incluir pelo menos um caractere especial',
    ),
  confirmPassword: yup
    .string()
    .required('Por favor, confirme sua senha')
    .oneOf([yup.ref('newPassword'), null], 'Senhas não são iguais.'),
});

type EditFormInputs = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const [showOldPassword, setShowOldPassword] = React.useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);

  const { user, updateUser } = useAuth();
  const { signIn, signOut } = useAuth();
  const history = useHistory();
  const toggleOldPassword = () => setShowOldPassword(!showOldPassword);
  const toggleNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormInputs>({
    resolver: yupResolver(schema),
  });

  const toast = useToast();

  const onSubmitEdit = async (data: EditFormInputs) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = data;

      if (oldPassword === newPassword) {
        toast({
          title: 'As senhas precisam ser diferentes',
          status: 'error',
          position: 'top-right',
          isClosable: true,
        });
        return;
      }

      const currentUser = JSON.parse(localStorage.getItem(USER_KEY) || '{}');

      const { cpf } = currentUser;

      await signIn({
        cpf,
        password: oldPassword,
      });

      await api.patch(`/api/users/${user.id}/password`, {
        oldPassword,
        newPassword,
        newPasswordConfirmation: confirmPassword,
      }).then(() => {
        toast({
          title: 'Edição realizada com sucesso',
          status: 'success',
          position: 'top-right',
          isClosable: true,
        });
      });



      signOut();
      history.push("/login");
    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: 'Ocorreu um erro ao alterar a senha',
        description: err?.response?.status === 401 ? 'CPF e/ou senha incorreto(s).' : 'Tente novamente mais tarde',
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
          <Text>Editar perfil</Text>

          <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmitEdit)}>

            <FormControl my={2} isInvalid={!!errors.oldPassword?.message}>
              <InputGroup size="md" maxW={380}>
                <Input {...register('oldPassword')} type={showOldPassword ? 'text' : 'password'} placeholder="Senha atual" />
                <InputRightElement width="4.5rem">
                  {showOldPassword ? (
                    <IconButton
                      aria-label="Esconder senha"
                      icon={<AiOutlineEyeInvisible />}
                      size="sm"
                      onClick={toggleOldPassword}
                    />
                  ) : (
                    <IconButton aria-label="Mostrar senha" icon={<AiOutlineEye />} size="sm" onClick={toggleOldPassword} />
                  )}
                </InputRightElement>
              </InputGroup>
              {!!errors.oldPassword?.message && <FormErrorMessage>{errors.oldPassword?.message}</FormErrorMessage>}
            </FormControl>

            <FormControl my={2} isInvalid={!!errors.newPassword?.message}>
              <InputGroup size="md" maxW={380}>
                <Input {...register('newPassword')} type={showNewPassword ? 'text' : 'password'} placeholder="Nova senha" />
                <InputRightElement width="4.5rem">
                  {showNewPassword ? (
                    <IconButton
                      aria-label="Esconder senha"
                      icon={<AiOutlineEyeInvisible />}
                      size="sm"
                      onClick={toggleNewPassword}
                    />
                  ) : (
                    <IconButton aria-label="Mostrar senha" icon={<AiOutlineEye />} size="sm" onClick={toggleNewPassword} />
                  )}
                </InputRightElement>
              </InputGroup>
              {!!errors.newPassword?.message && <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>}
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
              Alterar senha
            </Button>
          </form>
        </Stack>
      </Box>
    </Page>
  );
};

export default ChangePassword;
