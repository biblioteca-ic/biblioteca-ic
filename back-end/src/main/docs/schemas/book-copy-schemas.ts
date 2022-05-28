export const registerBookCopyRequestSchema = {
  type: 'object',
  properties: {
    book_code: {
      type: 'string'
    },
    created_by: {
      type: 'string'
    }
  }
}

export const registerBookCopyResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    code: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    book_id: {
      type: 'string'
    },
    located_by: {
      type: 'string'
    },
    createdBy: {
      type: 'string'
    },
    lease_date: {
      type: 'string'
    },
    createdAt: {
      type: 'string'
    }
  }
}

export const listBookCopiesRequestSchema = {

}

export const listBookCopiesResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    code: {
      type: 'string'
    },
    book_id: {
      type: 'string'
    },
    lease_date: {
      type: 'string',
    },
    createdBy: {
      type: 'string'
    },
    createdAt: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    located_by: {
      type: 'string'
    }
  }
}

export const listBookCopyDetailsRequestSchema = {

}

export const listBookCopyDetailsResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    code: {
      type: 'string'
    },
    book_id: {
      type: 'string'
    },
    lease_date: {
      type: 'string',
    },
    createdBy: {
      type: 'string'
    },
    createdAt: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    located_by: {
      type: 'string'
    },
    user_rented: {
      id: 'string',
      name: 'string',
      email: 'string',
      cpf: 'number',
      registration_number: 'number',
      admin: 'boolean',
      active: 'boolean'
    }
  }
}

export const borrowBookCopyRequestSchema = {
  type: 'object',
  properties: {
    bookId: {
      type: 'string'
    },
    copyId: {
      type: 'string'
    },
    userId: {
      type: 'string'
    }
  }
}

export const borrowBookCopyResponseSchema = {
  type: 'object'
}


export const giveBackBookCopyRequestSchema = {
  type: 'object',
  properties: {
    copyId: {
      type: 'string'
    }
  }
}

export const giveBackBookCopyResponseSchema = {
  type: 'object'
}


export const listRentedCopiesByUserIdRequestSchema = {
}


export const listRentedCopiesByUserIdResponseSchema = {
  type: 'object',
  properties: {
    copyCode: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    authors: {
      type: {
        array: {
          type: 'string'
        }
      }
    },
    status: {
      type: 'string',
    },
    leaseDate: {
      type: 'string',
    },
    devolutionDate: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    userId: {
      type: 'string'
    },
    copyId: {
      type: 'string'
    },
    bookId: {
      type: 'string'
    }
  }
}