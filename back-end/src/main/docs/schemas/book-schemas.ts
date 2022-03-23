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
  }
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
