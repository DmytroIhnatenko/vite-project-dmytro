import { User } from '../types';

const users: User[] = [
  { id: '1', firstName: 'Admin', lastName: 'User', role: 'admin' },
  { id: '2', firstName: 'Devops', lastName: 'User', role: 'devops' },
  { id: '3', firstName: 'Developer', lastName: 'User', role: 'developer' }
];

class UserService {
  static getAllUsers(): User[] {
    return users;
  }

  static getUserById(id: string): User | undefined {
    return users.find(user => user.id === id);
  }

  static getLoggedUser(): User {
    return users[0]; // Zalogowany użytkownik jest adminem
  }
}

export default UserService;