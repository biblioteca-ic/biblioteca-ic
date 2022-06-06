export const renewBookCopyPath = {
  post: {
    tags: ['BookCopy'],
    summary: 'Renova o empréstimo de uma cópia',
    security: [{ apiKeyAuth: [] }],
    parameters: [{
      in: 'path',
      name: 'copyId',
      description: 'ID da cópia',
      schema: {
        type: 'string'
      },
      required: true
    }],
    responses: {
      204: {
        description: 'Sucesso',
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

