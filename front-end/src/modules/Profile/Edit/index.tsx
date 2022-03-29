import * as React from 'react';
import { Box, Text, Input, Button, Stack, FormControl, FormErrorMessage, useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Page } from '../../../components/Page';
import { api } from '../../../services/api';
import { useAuth } from '../../../providers/AuthProvider';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Precisa ser um e-mail válido.')
    .required('E-mail é obrigatório')
    .matches(/[^@\s]*?(?=@ic\.ufal\.br)/, 'O email precisa pertencer ao domínio do IC.'),
  registrationNumber: yup
    .string()
    .required('Matrícula é obrigatória')
    .matches(/^[0-9]+$/, 'Devem ser apenas dígitos')
    .min(8, 'Precisam ser 8 dígitos')
    .max(8, 'Não deve ultrapassar 8 dígitos'),
  name: yup.string().required('Nome é obrigatório'),
});

type EditFormInputs = {
  name: string;
  registrationNumber: string;
  email: string;
};

const EditProfile = () => {
  const { user, updateUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormInputs>({
    resolver: yupResolver(schema),
  });

  const toast = useToast();
  const history = useHistory();

  const onSubmitEdit = async (data: EditFormInputs) => {
    try {
      const { name, email, registrationNumber } = data;

      const { data: updatedUser } = await api.patch(`/api/users/${user.id}`, {
        name,
        email,
        registrationNumber,
      });

      updateUser(updatedUser.body);

      toast({
        title: 'Edição realizada com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });

      history.push('/profile');
    } catch {
      toast({
        title: 'Ocorreu um erro ao editar o usuário na plataforma',
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
          <Text>Editar perfil</Text>

          <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmitEdit)}>
            <FormControl my={2} isInvalid={!!errors.name?.message}>
              <Input {...register('name')} placeholder="Nome" defaultValue={user.name} />
              {!!errors.name?.message && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
            </FormControl>

            <FormControl my={2} isInvalid={!!errors.registrationNumber?.message}>
              <Input
                {...register('registrationNumber')}
                placeholder="Matrícula"
                defaultValue={user.registrationNumber}
                maxLength={8}
              />
              {!!errors.registrationNumber?.message && (
                <FormErrorMessage>{errors.registrationNumber.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl my={2} isInvalid={!!errors.email?.message}>
              <Input {...register('email')} type="email" placeholder="Email" defaultValue={user.email} />
              {!!errors.email?.message && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
            </FormControl>

            <Button colorScheme="teal" size="md" w="100%" type="submit">
              Editar conta
            </Button>
          </form>
        </Stack>
      </Box>
    </Page>
  );
};

export default EditProfile;
