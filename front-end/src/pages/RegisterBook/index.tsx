import * as React from 'react';
import {
  Checkbox,
  Link,
  FormLabel,
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
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import * as yup from 'yup';
import { Page } from '../../components/Page';
import { api } from '../../services/api';

const schema = yup.object().shape({
  bookName: yup
    .string()
    .required('O nome do livro é obrigatório'),
  authors: yup
    .string()
    .required('O livro precisa ter pelo menos um autor'),
  year: yup
    .number()
    .typeError('O ano precisa ser um número')
    .max(2022, 'O ano não pode ser maior que o atual')
    .required('O ano de publicação é obrigatório'),
  publishingCompany: yup
    .string()
    .required('A editora é obrigatória'),
});

type Authors = {
  author: string;
};

type RegisterFormInputs = {
  bookName: string;
  authors: Array<Authors>;
  year: number;
  publishingCompany: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<RegisterFormInputs & Authors>({
    resolver: yupResolver(schema),
    defaultValues: {
      authors: [{ author: "" }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "authors"
  });

  const toast = useToast();
  const history = useHistory();

  const onSubmitRegister = async (data: RegisterFormInputs) => {
    console.log({ data });
    try {
      const { bookName, authors, year, publishingCompany } = data;

      // fazer chamada a api
      await api.post('/books', {
        bookName,
        authors,
        year,
        publishingCompany,
      });

      toast({
        title: 'Livro cadastrado com sucesso',
        description: 'Agora é possível criar cópias desse livro',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });

      history.push('/dashboard');

    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: 'Ocorreu um erro ao cadastrar o livro na plataforma',
        description: err?.message ? err?.message : 'Tente novamente mais tarde',
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
          <Text>Cadastrar Livro</Text>

          <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmitRegister)}>
            <FormControl my={2} isInvalid={!!errors.bookName?.message}>
              <FormLabel htmlFor='bookName'>Nome do livro</FormLabel>
              <Input id="bookName" {...register('bookName')} placeholder="Ex.: O alienista" />
              {!!errors.bookName?.message && <FormErrorMessage>{errors.bookName.message}</FormErrorMessage>}
            </FormControl>

            {fields.map((field, index) => (
              <FormControl my={2} isInvalid={!!errors.author?.message}>
                <FormLabel htmlFor={`authors-${index}`}>Autores (separados por vírgula)</FormLabel>
                <InputGroup size="md" maxW={380}>
                  <Input key={field.id} id={`authors-${index}`} {...register(`authors.${index}.author`)}
                    placeholder="Ex.: Machado de Assis" pr={getValues("authors").length > 1 ? "6rem" : "4.5rem"} />
                  <InputRightElement width={getValues("authors").length > 1 ? "6rem" : "4.5rem"} justifyContent="space-around" >
                    <IconButton aria-label="Adicionar autor" icon={<AiOutlinePlus />} size="sm" onClick={() => { if (getValues("authors").length < 4) append({ author: "" }) }} />
                    {getValues("authors").length > 1 ? (
                      <IconButton aria-label="Remover autor" icon={<AiOutlineMinus />} size="sm" onClick={() => remove(index)} />
                    ) : (<>
                    </>)}

                  </InputRightElement>
                </InputGroup>
                {!!errors.author?.message && <FormErrorMessage>{errors.author.message}</FormErrorMessage>}
              </FormControl>
            ))}

            <FormControl my={2} isInvalid={!!errors.year?.message}>
              <FormLabel htmlFor='year'>Ano de publicação</FormLabel>
              <Input id="year" {...register('year')} type="number" placeholder="Ex.: 1882" />
              {!!errors.year?.message && <FormErrorMessage>{errors.year.message}</FormErrorMessage>}
            </FormControl>

            <FormControl my={2} isInvalid={!!errors.publishingCompany?.message}>
              <FormLabel htmlFor='publishingCompany'>Editora</FormLabel>
              <Input id="publishingCompany" {...register('publishingCompany')} placeholder="Ex.: Editora Ática" />
              {!!errors.publishingCompany?.message && <FormErrorMessage>{errors.publishingCompany.message}</FormErrorMessage>}
            </FormControl>

            <Button colorScheme="teal" size="md" w="100%" type="submit">
              Cadastrar livro
            </Button>
          </form>
        </Stack>
      </Box>
    </Page>
  );
};

export default Register;
