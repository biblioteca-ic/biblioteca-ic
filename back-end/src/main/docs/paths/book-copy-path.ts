export const registerBookCopyPath = {
  post: {
    tags: ['BookCopy'],
    summary: 'Registro da cópia de um livro',
    security: [{ apiKeyAuth: [] }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/registerBookCopyRequestSchema'
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
              $ref: '#/schemas/registerBookCopyResponseSchema'
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
}
