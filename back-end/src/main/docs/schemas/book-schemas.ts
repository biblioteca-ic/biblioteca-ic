export const registerBookRequestSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    publishingHouse: {
      type: 'string'
    },
    publishedIn: {
      type: 'string'
    },
    createdBy: {
      type: 'string'
    },
    authors: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    categories: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  },
  required: ['title', 'publishingHouse', 'publishedIn', 'createdBy', 'authors', 'categories']
}

export const registerBookResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    code: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    authors: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    categories: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    publishingHouse: {
      type: 'string'
    },
    createdBy: {
      type: 'string'
    },
    publishedIn: {
      type: 'string'
    },
    createdAt: {
      type: 'string'
    }
  }
}

export const listBooksRequestSchema = {

}

export const listBooksResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    code: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    authors: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    categories: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    publishingHouse: {
      type: 'string'
    },
    createdBy: {
      type: 'string'
    },
    publishedIn: {
      type: 'string'
    },
    createdAt: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    copies: {
      type: 'number'
    },
    borrowedCopies: {
      type: 'number'
    },
    lostCopies: {
      type: 'number'
    },
    availableCopies: {
      type: 'number'
    }
  }
}

export const updateBookRequestSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string'
    },
    publishingHouse: {
      type: 'string'
    },
    publishedIn: {
      type: 'string'
    },
    authors: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    categories: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
}

export const updateBookResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    code: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    authors: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    categories: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    publishingHouse: {
      type: 'string'
    },
    createdBy: {
      type: 'string'
    },
    publishedIn: {
      type: 'string'
    },
    createdAt: {
      type: 'string'
    }
  }
}
