export const registerBookPath = {
  tags: ['Books'],
  summary: 'Registro de um livro',
  security: [{ apiKeyAuth: [] }],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/registerBookRequest'
        }
      }
    },
    required: true
  },
  responses: {
    201: {
      description: 'Sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/registerBookResponse'
          }
        }
      }
    },
    401: {
      description: 'Unauthorized'
    },
    403: {
      description: 'Forbidden'
    },
    500: {
      description: 'ServerError'
    }
  }
}

export const listBookPath = {
  tags: ['Books'],
  summary: 'Listagem dos livros',
  security: [{ apiKeyAuth: [] }],
  responses: {
    200: {
      description: 'Sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/listBooksResponse'
          }
        }
      }
    },
    401: { description: 'Unauthorized' },
    404: { description: 'NotFound' },
    500: { description: 'ServerError' }
  }
}
/**
 *   id: string
  title: string
  publishingHouse: string
  authors: string[]
  categories: string[]
  createdBy: string
  code: string
  publishedIn: Date
  createdAt: Date
 */

export const listBooksPath = {
  tags: ['Books'],
  summary: 'Listagem de usuários',
  security: [{ apiKeyAuth: [] }],
  parameters: [
    {
      name: 'id',
      in: 'query',
      description: 'Id do livro',
      required: false,
      type: 'string'
    },
    {
      name: 'title',
      in: 'query',
      description: 'Título do livro',
      required: false,
      type: 'string'
    },
    {
      name: 'publishing_house',
      in: 'query',
      description: 'Nome da editora',
      required: false,
      type: 'string'
    },
    {
      name: 'code',
      in: 'query',
      description: 'Código do livro',
      required: false,
      type: 'string'
    },
    {
      name: 'categories',
      in: 'query',
      description: 'Código do livro',
      required: false,
      type: 'array',
      items: {
        type: 'string'
      }
    },
    {
      name: 'created_by',
      in: 'query',
      description: 'ID do usuário que criou o livro',
      required: false,
      type: 'string'
    },
    {
      name: 'published_in',
      in: 'query',
      description: 'Ano da publicação do livro',
      required: false,
      type: 'string'
    },
    {
      name: 'status',
      in: 'query',
      description: 'Status do livro - O valor pode ser AVAILABLE ou LOST',
      required: false,
      type: 'string'
    }
  ],
  responses: {
    200: {
      description: 'Sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/listBooksResponse'
          }
        }
      }
    },
    401: {
      description: 'Unauthorized'
    },
    403: {
      description: 'Forbidden'
    },
    500: {
      description: 'ServerError'
    }
  }
}
