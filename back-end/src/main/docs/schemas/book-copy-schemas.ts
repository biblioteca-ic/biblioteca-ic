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
