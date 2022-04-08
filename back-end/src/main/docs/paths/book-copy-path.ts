export const registerBookCopyPath = {
  post: {
    tags: ['BookCopy'],
    summary: 'Registro da cópia de um livro',
    security: [{ apiKeyAuth: [] }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/registerBookCopyRequest'
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
              $ref: '#/schemas/registerBookCopyResponse'
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
}

export const deleteBookCopyPath = {
  delete: {
    tags: ['BookCopy'],
    summary: 'Exclusão da cópia de um livro',
    security: [{ apiKeyAuth: [] }],
    parameters: [{
      in: 'path',
      name: 'book_id',
      description: 'ID da cópia do livro a ser excluído',
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
}

export const listBookCopiesPath = {
  tags: ['BookCopy'],
  summary: 'Listagem de cópias',
  security: [{ apiKeyAuth: [] }],
  responses: {
    200: {
      description: 'Sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/listBookCopiesResponseSchema'
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

export const listBookCopyDetailsPath = {
  tags: ['BookCopy'],
  summary: 'Listagem de detalhes de uma cópia',
  security: [{ apiKeyAuth: [] }],
  responses: {
    200: {
      description: 'Sucesso',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/listBookCopyDetailsResponseSchema'
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
