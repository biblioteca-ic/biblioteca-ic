import * as React from 'react';
import {
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
import { CreatableSelect, GroupBase } from 'chakra-react-select';
import { useHistory, useParams } from 'react-router-dom';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import * as yup from 'yup';
import { Page } from '../../../components/Page';
import { api } from '../../../services/api';
import { useAuth } from '../../../providers/AuthProvider';
import { BookType } from '../../../types/Book';

const schema = yup.object().shape({
  bookName: yup.string().required('O nome do livro é obrigatório'),
  authors: yup.array().of(
    yup.object().shape({
      name: yup.string().required('O nome do autor é obrigatório').min(3, 'Autor inválido'),
    }),
  ),
  year: yup
    .number()
    .required('O ano de publicação é obrigatório')
    .typeError('O ano precisa ser um número')
    .max(2022, 'O ano não pode ser maior que o atual'),
  publishingCompany: yup.string().required('O nome da editora é obrigatório'),
  categories: yup.array().required('Selecione pelo menos uma categoria'),
});

type Author = {
  name: string;
};

type FormInputs = {
  bookName: string;
  authors: Array<Author>;
  year: number;
  publishingCompany: string;
  categories: Array<SelectOptionsType>;
  id?: string;
  createdBy?: string;
};

interface SelectOptionsType {
  value: string;
  label: string;
}

const categoriesOptions: SelectOptionsType[] = [
  { value: 'Computer Science and Engineering', label: 'Ciência da Computação e Engenharia' },
  { value: 'Physics and Math', label: 'Matemática e Física' },
  { value: 'Biology', label: 'Biologia' },
  { value: 'Sci-Fi', label: 'Ficção Científica' },
  { value: 'Fantasy', label: 'Fantasia' },
  { value: 'Romance', label: 'Romance' },
];

const createOption = (label: string) => ({
  label,
  value: label,
});

const Register = () => {
  const toast = useToast();
  const history = useHistory();

  const { id } = useParams<{ id?: string }>();
  // const [isLoading, setIsLoading] = React.useState(false);
  const [currentBook, setCurrentBook] = React.useState<BookType>();
  const [categories, setCategories] = React.useState<SelectOptionsType[]>([]);
  const [inputValueCategory, setInputValueCategory] = React.useState<string>('');
  const [valuesCategories, setValuesCategories] = React.useState<ReadonlyArray<SelectOptionsType>>([]);
  // const [authors, setAuthors] = React.useState<SelectOptionsType[]>([]);

  const getCategories = async () => {
    try {
      // const { data: categoriesResponse } = await api.get('categories');
      // setCategories(categoriesResponse);
      setCategories(categoriesOptions);
      // setValuesCategories(categoriesOptions);
    } catch (err) {
      console.error(err);
    }
  };

  // const getAuthors = async () => {
  //   try {
  //     // const { data: authorsResponse } = await api.get('authors');
  //     // setauthors(authorsResponse);
  //     // setauthors(authorsOptions);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  React.useEffect(() => {
    getCategories();
    // getAuthors();
  }, []);

  React.useEffect(() => {
    if (id) {
      getCurrentBook();
    }
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    reset,
    setValue,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      authors: [{ name: '' }],
    },
    // defaultValues: currentBook
    //   ? {
    //       bookName: currentBook.title,
    //       publishingCompany: currentBook.publishingHouse,
    //       year: Number(currentBook.publishedIn),
    //       categories: currentBook.categories.map(category => ({ label: category, value: category })),
    //       authors: currentBook.authors.map(author => ({ name: author })),
    //     }
    //   : {
    //       authors: [{ name: '' }],
    //     },
  });

  const getCurrentBook = async () => {
    // setIsLoading(true);
    try {
      const { data } = await api.get(`api/books?id=${id}`);
      reset({
        bookName: data.body[0]?.title,
        publishingCompany: data.body[0]?.publishingHouse,
        year: Number(data.body[0]?.publishedIn),
        categories: data.body[0]?.categories.map((category: string) => ({ label: category, value: category })),
        authors: data.body[0]?.authors.map((author: string) => ({ name: author })),
      });
      setCurrentBook(data.body[0]);

      setValuesCategories(data.body[0]?.categories.map((category: string) => ({ label: category, value: category })));
    } catch (err) {
      console.error(err);
    } finally {
      // setIsLoading(false);
    }
  };

  const { user } = useAuth();

  const {
    fields: authorsFields,
    append: authorsAppend,
    remove: authorsRemove,
  } = useFieldArray({
    control,
    name: 'authors',
  });

  const onSubmitRegister = async (data: FormInputs) => {
    try {
      const { bookName, year, publishingCompany, authors, categories: categoriesData } = data;
      const formattedData = {
        title: bookName,
        authors: authors.filter(author => author.name).map(author => author.name),
        publishedIn: String(year),
        publishingHouse: publishingCompany,
        categories: categoriesData.map(category => category.label),
        createdBy: id ? currentBook?.createdBy : user.id,
      };
      if (id) {
        const { data: responseSuccess } = await api.patch(`api/books/${id}`, { id, ...formattedData });
        toast({
          title: 'Livro editado com sucesso',
          // description: 'Agora é possível criar cópias desse livro',
          status: 'success',
          position: 'top-right',
          isClosable: true,
        });

        history.push(`/books/${responseSuccess.body.id}`);
      } else {
        const { data: responseSuccess } = await api.post('api/books', formattedData);
        toast({
          title: 'Livro cadastrado com sucesso',
          description: 'Agora é possível criar cópias desse livro',
          status: 'success',
          position: 'top-right',
          isClosable: true,
        });

        history.push(`/books/${responseSuccess.body.id}`);
      }
    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: `Ocorreu um erro ao ${id ? 'editar' : 'cadastrar'} o livro na plataforma`,
        description: err?.message ? err?.message : 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  const handleChange = (value: ReadonlyArray<SelectOptionsType>) => {
    setValuesCategories(value);
  };
  const handleInputChange = (inputValue: string) => {
    setInputValueCategory(inputValue);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!inputValueCategory) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setValuesCategories([...valuesCategories, createOption(inputValueCategory)]);
        setInputValueCategory('');
        setValue('categories', [...valuesCategories, createOption(inputValueCategory)]);
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  return (
    <Page>
      <Box textAlign="center" fontSize="xl" p={8} display="flex" justifyContent="center">
        <Stack spacing={3} display="flex" alignItems="center" w="80%" maxW={380} minW={320}>
          <Text>{id ? 'Editar livro' : 'Cadastrar Livro'}</Text>

          <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmitRegister)}>
            <FormControl my={2} isInvalid={!!errors.bookName?.message}>
              <FormLabel htmlFor="bookName">Nome do livro</FormLabel>
              <Input id="bookName" {...register('bookName')} placeholder="Ex.: O alienista" />
              {!!errors.bookName?.message && <FormErrorMessage>{errors.bookName.message}</FormErrorMessage>}
            </FormControl>

            <FormControl my={2} isInvalid={!!errors.authors?.length}>
              <FormLabel htmlFor="authors">Autores</FormLabel>

              <Stack>
                {authorsFields.map((field, index) => {
                  const qt = getValues('authors').length;
                  const multiples = qt > 1;

                  return (
                    <Stack key={field.id}>
                      <InputGroup size="md" maxW={380}>
                        <Input
                          key={field.id}
                          id={`authors-${index}`}
                          {...register(`authors.${index}.name`)}
                          placeholder="Ex.: Machado de Assis"
                          onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
                            switch (event.key) {
                              case 'Enter':
                              case 'Tab':
                                authorsAppend({ name: '' });
                                event.preventDefault();
                                break;
                              default:
                                break;
                            }
                          }}
                          // pr={multiples ? '6rem' : '4.5rem'}
                        />
                        <InputRightElement width={multiples ? '6rem' : '4.5rem'} justifyContent="space-around">
                          {/* {index === authorsFields.length - 1 && ( */}
                          <IconButton
                            aria-label="Adicionar autor"
                            icon={<AiOutlinePlus />}
                            size="sm"
                            onClick={() => {
                              if (getValues('authors').length < 4) authorsAppend({ name: '' });
                            }}
                          />
                          {/* )} */}
                          {multiples && index !== 0 && (
                            <IconButton
                              aria-label="Remover autor"
                              icon={<AiOutlineMinus />}
                              size="sm"
                              onClick={() => authorsRemove(index)}
                            />
                          )}
                        </InputRightElement>
                      </InputGroup>
                      {!!errors?.authors?.[index]?.name?.message && (
                        <FormErrorMessage>{errors?.authors?.[index]?.name?.message}</FormErrorMessage>
                      )}
                    </Stack>
                  );
                })}
              </Stack>
              {/* <Button
                aria-label="Adicionar autor"
                leftIcon={<AiOutlinePlus />}
                size="sm"
                onClick={() => {
                  if (getValues('authors').length < 4) authorsAppend({ name: '' });
                }}
              >
                Adicionar autor
              </Button> */}
            </FormControl>

            <FormControl my={2} isInvalid={!!errors.year?.message}>
              <FormLabel htmlFor="year">Ano de publicação</FormLabel>
              <Input id="year" {...register('year')} type="number" placeholder="Ex.: 1882" />
              {!!errors.year?.message && <FormErrorMessage>{errors.year.message}</FormErrorMessage>}
            </FormControl>

            <FormControl my={2} isInvalid={!!errors.publishingCompany?.message}>
              <FormLabel htmlFor="publishingCompany">Editora</FormLabel>
              <Input id="publishingCompany" {...register('publishingCompany')} placeholder="Ex.: Editora Ática" />
              {!!errors.publishingCompany?.message && (
                <FormErrorMessage>{errors.publishingCompany.message}</FormErrorMessage>
              )}
            </FormControl>

            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <FormControl
                  mb={4}
                  isInvalid={!!(errors.categories as any)?.message}
                  errortext={errors?.categories?.length}
                >
                  <FormLabel htmlFor="categories">Categorias</FormLabel>
                  <CreatableSelect<SelectOptionsType, true, GroupBase<SelectOptionsType>>
                    isMulti
                    options={categories}
                    value={valuesCategories}
                    inputValue={inputValueCategory}
                    onInputChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Adicione uma ou mais categorias"
                    formatCreateLabel={() => `Criar nova categoria`}
                    noOptionsMessage={() => 'Sem mais categorias'}
                    onChange={newValues => {
                      handleChange(newValues);
                      field.onChange(newValues);
                    }}
                  />
                  {!!(errors.categories as any)?.message && (
                    <FormErrorMessage>{(errors.categories as any)?.message}</FormErrorMessage>
                  )}
                </FormControl>
              )}
            />

            <Button colorScheme="teal" size="md" w="100%" type="submit">
              {id ? 'Editar livro' : 'Cadastrar Livro'}
            </Button>
          </form>
        </Stack>
      </Box>
    </Page>
  );
};

export default Register;
