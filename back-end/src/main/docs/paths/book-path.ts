export const registerBookPath = {
  post: {
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
}

export const listBooksPath = {
  get: {
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
}
