export const loginRequestSchema = {
  type: 'object',
  properties: {
    cpf: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['cpf', 'password']
}

export const loginResponseSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string'
    }
  }
}
