export const loginPath = {
  post: {
    tags: ['Users'],
    summary: 'Autenticação de usuário',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginRequest'
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
              $ref: '#/schemas/loginResponse'
            }
          }
        }
      },
      401: {
        description: 'Unauthorized'
      },
      500: {
        description: 'ServerError'
      }
    }
  }
}
