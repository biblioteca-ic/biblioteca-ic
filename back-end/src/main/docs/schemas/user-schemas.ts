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
    id: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    cpf: {
      type: 'string'
    },
    registration_number: {
      type: 'string'
    },
    admin: {
      type: 'boolean'
    },
    accessToken: {
      type: 'string'
    }
  }
}

export const createUserRequestSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    registration_number: {
      type: 'string'
    },
    cpf: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    }
  }
}

export const createUserResponseSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    cpf: {
      type: 'string'
    },
    registration_number: {
      type: 'string'
    },
    admin: {
      type: 'boolean'
    }
  }
}

export const editUserRequestSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    registration_number: {
      type: 'string'
    }
  }
}

export const editUserResponseSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    cpf: {
      type: 'string'
    },
    registration_number: {
      type: 'string'
    },
    admin: {
      type: 'boolean'
    }
  }
}

export const changePasswordRequestSchema = {
  type: 'object',
  properties: {
    oldPassword: {
      type: 'string'
    },
    newPassword: {
      type: 'string'
    },
    newPasswordConfirmation: {
      type: 'string'
    }
  },
  required: ['oldPassword', 'newPassword', 'newPasswordConfirmation']
}

export const changePasswordResponseSchema = {
  type: 'object'
}

export const changeAdminRequestSchema = {
  type: 'object',
  properties: {
    admin: {
      type: 'boolean'
    }
  }
}

export const changeAdminResponseSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    cpf: {
      type: 'string'
    },
    registration_number: {
      type: 'string'
    },
    admin: {
      type: 'boolean'
    }
  }
}

export const listUsersResponseSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    cpf: {
      type: 'string'
    },
    registration_number: {
      type: 'string'
    },
    admin: {
      type: 'boolean'
    }
  }
}
