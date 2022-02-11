import { loginPath } from './paths/user-paths'
import { loginRequestSchema, loginResponseSchema } from './schemas/login-schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Biblioteca Setorial IC API',
    description: '',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Users'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    loginRequest: loginRequestSchema,
    loginResponse: loginResponseSchema
  }
}
