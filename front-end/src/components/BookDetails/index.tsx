import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { BookType } from '../../types/Book';

export const BookDetails = ({ book }: { book: BookType }) => (
  <>
    <Box mt={2} textAlign="left">
      <Text fontSize="18px">
        <b>Título: </b>
        {book.title}
      </Text>
    </Box>

    <Box mt={3} textAlign="left">
      <Text fontSize="18px">
        <b>Autores: </b>
        {book.authors.map((item, i) => {
          return (i ? ', ' : '') + item;
        })}
      </Text>
    </Box>

    <Box mt={3} textAlign="left">
      <Text fontSize="18px">
        <b>Data de publicação: </b>
        {book.publishedIn}
      </Text>
    </Box>

    <Box mt={3} textAlign="left">
      <Text fontSize="18px">
        <b>Categorias: </b>
        {book.categories.map((item, i) => {
          return (i ? ', ' : '') + item;
        })}
      </Text>
    </Box>

    <Box mt={3} textAlign="left">
      <Text fontSize="18px">
        <b>Editora: </b>
        {book.publishingHouse}
      </Text>
    </Box>

    <Box mt={3} textAlign="left">
      <Text fontSize="18px">
        <b>Código do livro: </b>
        {book.code}
      </Text>
    </Box>
    <Box mt={3} textAlign="left">
      <Text fontSize="18px">
        <b>Número total de cópias: </b>
        {book.copies}
      </Text>
    </Box>
    <Box mt={3} textAlign="left">
      <Text fontSize="18px">
        <b>Número de cópias disponíveis: </b>
        {book.availableCopies}
      </Text>
    </Box>
    <Box mt={3} textAlign="left">
      <Text fontSize="18px">
        <b>Número de cópias emprestadas: </b>
        {book.borrowedCopies}
      </Text>
    </Box>
    <Box mt={3} textAlign="left">
      <Text fontSize="18px">
        <b>Número de cópias extraviadas: </b>
        {book.lostCopies}
      </Text>
    </Box>
  </>
);
