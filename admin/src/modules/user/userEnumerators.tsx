import Roles from 'src/security/roles';

const userEnumerators = {
  status: ['active','empty-permissions'],
  genre: ['male', 'female'],
  roles: Object.keys(Roles.values),
  accountType: ['real', 'demo'],
};

export default userEnumerators;
