import { User } from '../types/index';

const mockUser: User = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe'
};

class AuthService {
  static getLoggedInUser(): User {
    return mockUser;
  }
}

export default AuthService;