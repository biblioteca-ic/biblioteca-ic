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

export const updateBookPath = {
  tags: ['Books'],
  summary: 'Atualização de um livro',
  security: [{ apiKeyAuth: [] }],
  parameters: [{
    in: 'path',
    name: 'id',
    description: 'ID do livro a ser atualizado',
    schema: {
      type: 'string'
    },
    required: true
  }],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/updateBookRequest'
        }
      }
    },
    required: true
  },
  responses: {
    200: {
      description: 'Sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updateBookResponse'
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

export const deleteBookPath = {
  tags: ['Books'],
  summary: 'Exclusão de um livro e todas as suas cópias',
  security: [{ apiKeyAuth: [] }],
  parameters: [{
    in: 'path',
    name: 'id',
    description: 'ID do livro a ser excluído',
    schema: {
      type: 'string'
    },
    required: true
  }],
  responses: {
    204: {
      description: 'Sucesso',
      content: {}
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
  },
  404: {
    description: 'NotFound'
  }
}