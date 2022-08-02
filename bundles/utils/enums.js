const companies = ['Microsoft', 'Apple', 'Meta']
const USER_ROLES = { staff: 'staff', admin: 'admin' }

const RETURN_OBJECTS = {
  OK: { message: 'OK' },
  UNAUTHORIZED: { message: 'Unauthorized' },
  NOT_FOUND: { message: 'Not Found' }
}

module.exports = { companies, USER_ROLES, RETURN_OBJECTS }
