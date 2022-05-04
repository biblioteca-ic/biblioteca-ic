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
  get: {
    tags: ['BookCopy'],
    summary: 'Listagem de cópias',
    security: [{ apiKeyAuth: [] }],
    parameters: [{
      in: 'path',
      name: 'book_code',
      description: 'Código do livro original',
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
              $ref: '#/schemas/listBookCopiesResponse'
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

export const listBookCopyDetailsPath = {
  get: {
    tags: ['BookCopy'],
    summary: 'Listagem de detalhes de uma cópia',
    security: [{ apiKeyAuth: [] }],
    parameters: [{
      in: 'path',
      name: 'book_copy_id',
      description: 'ID da cópia do livro',
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
              $ref: '#/schemas/listBookCopyDetailsResponse'
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

export const borrowBookCopyPath = {
  post: {
    tags: ['BookCopy'],
    summary: 'Empréstimo de uma cópia de um livro',
    security: [{ apiKeyAuth: [] }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/borrowBookCopyRequest'
          }
        }
      },
      required: true
    },
    responses: {
      204: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/borrowBookCopyResponse'
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


export const giveBackBookCopyPath = {
  post: {
    tags: ['BookCopy'],
    summary: 'Devolução de uma cópia de um livro',
    security: [{ apiKeyAuth: [] }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/giveBackBookCopyRequest'
          }
        }
      },
      required: true
    },
    responses: {
      204: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/giveBackBookCopyResponse'
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