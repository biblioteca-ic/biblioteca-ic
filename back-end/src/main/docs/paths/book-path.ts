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