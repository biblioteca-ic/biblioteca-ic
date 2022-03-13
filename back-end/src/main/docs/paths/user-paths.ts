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

export const createUserPath = {
  tags: ['Users'],
  summary: 'Criação de usuário',
  security: [{ apiKeyAuth: [] }],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/createUserRequest'
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
            $ref: '#/schemas/createUserResponse'
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

export const listUsersPath = {
  tags: ['Users'],
  summary: 'Listagem de usuários',
  security: [{ apiKeyAuth: [] }],
  parameters: [
    {
      name: 'name',
      in: 'query',
      description: 'Nome ou parte do nome de um usuário',
      required: false,
      type: 'string'
    },
    {
      name: 'admin',
      in: 'query',
      description: 'Valor pode ser true ou false',
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
            $ref: '#/schemas/listUsersResponse'
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

export const editUserPath = {
  patch: {
    tags: ['Users'],
    summary: 'Edição de usuário',
    security: [{ apiKeyAuth: [] }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/editUserRequest'
          }
        }
      },
      required: true
    },
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID do usuário que será editado',
      schema: {
        type: 'string'
      },
      required: true
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/editUserResponse'
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

export const changePasswordPath = {
  patch: {
    tags: ['Users'],
    summary: 'Alteração da senha',
    security: [{ apiKeyAuth: [] }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/changePasswordRequest'
          }
        }
      },
      required: true
    },
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID do usuário que será editado',
      schema: {
        type: 'string'
      },
      required: true
    }],
    responses: {
      204: {
        description: 'No Content'
      },
      400: {
        description: 'Bad Request'
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

export const changeAdminPath = {
  patch: {
    tags: ['Users'],
    summary: 'Alteração do status de admin',
    security: [{
      apiKeyAuth: []
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/changeAdminRequest'
          }
        }
      },
      required: true
    },
    parameters: [{
      in: 'path',
      name: 'id',
      description: 'ID do usuário que será editado',
      schema: {
        type: 'string'
      },
      required: true
    }],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/changeAdminResponse'
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
