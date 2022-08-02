const companies = ['Microsoft', 'Apple', 'Meta']
const USER_ROLES = { staff: 'staff', admin: 'admin' }

const RETURN_OBJECTS = {
  OK: { message: 'OK', statusCode: 200, slug: 'OK' },
  CREATED: { message: 'Created', statusCode: 201, slug: 'CREATED' },
  BAD_REQUEST: { message: 'Bad Request', statusCode: 400, slug: 'BAD_REQUEST' },
  UNAUTHORIZED: { message: 'Unauthorized', statusCode: 401, slug: 'UNAUTHORIZED' },
  FORBIDDEN: { message: 'Forbidden', statusCode: 403, slug: 'FORBIDDEN' },
  NOT_FOUND: { message: 'Not Found', statusCode: 404, slug: 'NOT_FOUND' }
}

module.exports = { companies, USER_ROLES, RETURN_OBJECTS }
