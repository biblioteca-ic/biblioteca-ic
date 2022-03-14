import React, { useState, useEffect } from 'react';
import {
  Select,
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
  useToast
} from '@chakra-ui/react';
import {
  AsyncCreatableSelect,
  AsyncSelect,
  CreatableSelect,
} from "chakra-react-select";
import { useHistory, useParams } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useForm, useFieldArray, NestedValue } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import * as yup from 'yup';
import { Page } from '../../components/Page';
import { api } from '../../services/api';
import { booksMock } from '../../services/mocks';
import { BookType } from '../../types/Book';

const schema = yup.object().shape({
  bookName: yup
    .string()
    .required('O nome do livro é obrigatório'),
  authors: yup
    .array()
    .of(
      yup.object().shape({
        name: yup
          .string()
          .required('O nome do autor é obrigatório')
          .min(3, 'Autor inválido')
      })
    ),
  year: yup
    .number()
    .typeError('O ano precisa ser um número')
    .max(2022, 'O ano não pode ser maior que o atual')
    .required('O ano de publicação é obrigatório'),
  publishingCompany: yup
    .string()
    .required('A editora é obrigatória'),
  categories: yup
    .array()
    .required('Selecione pelo menos uma categoria'),
});

type Author = {
  name: string;
};

type RegisterFormInputs = {
  bookName: string;
  authors: Array<Author>;
  year: number;
  publishingCompany: string;
  categories: Array<string>
};

interface CategoriesOptions {
  value: string,
  label: string,
}

type ItemParams = {
  id: string;
};

const categoriesOptions: CategoriesOptions[] = [
  { value: "Computer Science and Engineering", label: "Ciência da Computação e Engenharia" },
  { value: "Physics and Math", label: "Matemática e Física" },
  { value: "Biology", label: "Biologia" },
  { value: "Sci-Fi", label: "Ficção Científica" },
  { value: "Fantasy", label: "Fantasia" },
  { value: "Romance", label: "Romance" }
];

const EditBook = () => {
  const { id } = useParams<ItemParams>();
  const [bookData, setBookData] = useState<BookType>();
  const [formAuthors, setFormAuthors] = useState<Array<Author>>();

  const getBookData = async () => {
    try {
      // const { data } = await api.get(`/users/${id}`);

      const data = booksMock;
      setBookData(data[Number(id) - 1]);
      const { authors } = data[Number(id) - 1];
      
      // console.log(authors.reduce((a, v) => ({ ...a, []: v}), {}));

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBookData();
    
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      authors: [{ name: "" }],
    }
  });

  const { fields: authorsFields, append: authorsAppend, remove: authorsRemove } = useFieldArray({
    control,
    name: "authors"
  });

  const toast = useToast();
  const history = useHistory();

  const onSubmitRegister = async (data: RegisterFormInputs) => {
    console.log({ data });
    try {
      const { bookName, authors, year, publishingCompany } = data;
      console.log(data)
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
              <Input id="bookName" {...register('bookName')} placeholder="Ex.: O alienista" defaultValue={bookData?.title} />
              {!!errors.bookName?.message && <FormErrorMessage>{errors.bookName.message}</FormErrorMessage>}
            </FormControl>
            <FormLabel htmlFor="authors">Autores</FormLabel>

            {authorsFields.map((field, index) => {
              const qt = getValues("authors").length;
              const multiples = qt > 1;

              return (
                <FormControl my={2} isInvalid={!!errors?.authors?.[index]?.name?.message}>
                  <InputGroup size="md" maxW={380}>
                    <Input key={field.id} id={`authors-${index}`} {...register(`authors.${index}.name`)}
                      placeholder="Ex.: Machado de Assis" pr={multiples ? "6rem" : "4.5rem"} />
                    <InputRightElement width={multiples ? "6rem" : "4.5rem"} justifyContent="space-around" >
                      <IconButton aria-label="Adicionar autor" icon={<AiOutlinePlus />} size="sm" onClick={() => { if (getValues("authors").length < 4) authorsAppend({ name: "" }) }} />
                      {multiples ? (
                        <IconButton aria-label="Remover autor" icon={<AiOutlineMinus />} size="sm" onClick={() => authorsRemove(index)} />
                      ) : (<>
                      </>)}

                    </InputRightElement>
                  </InputGroup>
                  {!!errors?.authors?.[index]?.name?.message && <FormErrorMessage>{errors?.authors?.[index]?.name?.message}</FormErrorMessage>}
                </FormControl>
              )
            })}

            <FormControl my={2} isInvalid={!!errors.year?.message}>
              <FormLabel htmlFor='year'>Ano de publicação</FormLabel>
              <Input id="year" {...register('year')} type="number" placeholder="Ex.: 1882" defaultValue={bookData?.publishedIn} />
              {!!errors.year?.message && <FormErrorMessage>{errors.year.message}</FormErrorMessage>}
            </FormControl>

            <FormControl my={2} isInvalid={!!errors.publishingCompany?.message}>
              <FormLabel htmlFor='publishingCompany'>Editora</FormLabel>
              <Input id="publishingCompany" {...register('publishingCompany')} placeholder="Ex.: Editora Ática" defaultValue={bookData?.publishingHouse} />
              {!!errors.publishingCompany?.message && <FormErrorMessage>{errors.publishingCompany.message}</FormErrorMessage>}
            </FormControl>

            <FormLabel htmlFor="categories">Categorias</FormLabel>

            {/*
            {categoriesFields.map((field, index) => (
              <FormControl my={2} isInvalid={!!errors?.categories?.[index]?.name?.message}>
                <InputGroup size="md" maxW={380}>
                  <Select key={field.id} id="categories" {...register(`categories.${index}.name`)}
                    placeholder="Selecionar categoria" width={getValues("categories").length > 1 ? "70%" : "80%"}>
                    {categoriesOptions.map((category) => {
                      return <option value={category.value}>{category.label}</option>
                    })}
                  </Select>
                  <InputRightElement width={getValues("categories").length > 1 ? "6rem" : "4.5rem"} justifyContent="space-around" >
                    <IconButton aria-label="Adicionar categoria" icon={<AiOutlinePlus />} size="sm" onClick={() => { if (getValues("categories").length < 4) categoriesAppend({ name: "" }) }} />
                    {getValues("categories").length > 1 ? (
                      <IconButton aria-label="Remover categoria" icon={<AiOutlineMinus />} size="sm" onClick={() => categoriesRemove(index)} />
                    ) : (<>
                    </>)}

                  </InputRightElement>
                </InputGroup>
                {!!errors?.authors?.[index]?.name?.message && <FormErrorMessage>{errors?.authors?.[index]?.name?.message}</FormErrorMessage>}
              </FormControl>
            ))} */}

            <FormControl my={2} isInvalid={!!(errors?.categories as any)?.message}>
              <CreatableSelect
                // {...register('categories')} // fix the bug to uncomment this line
                isMulti
                options={categoriesOptions}
                placeholder="Adicione uma ou mais categorias"
                formatCreateLabel={() => `Criar nova categoria`}
                noOptionsMessage={() => "Sem mais categorias"}
              />
              {!!(errors?.categories as any)?.message && <FormErrorMessage>{(errors?.categories as any)?.message}</FormErrorMessage>}
            </FormControl>

            <Button colorScheme="teal" size="md" w="100%" type="submit">
              Cadastrar Livro
            </Button>
          </form>
        </Stack>
      </Box>
    </Page>
  );
};

export default EditBook;
