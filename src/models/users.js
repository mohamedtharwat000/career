import bcrypt from 'bcrypt';
import DB from './db';

export default class UserModel {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async getUsers() {
    return DB.readFile('storage/users.json');
  }

  static async setUsers(users) {
    return DB.writeFile('storage/users.json', users);
  }

  static async getUserByEmail(email) {
    const users = await this.getUsers().catch(() => {});
    return users.find((user) => user.email === email);
  }

  static async addUser(username, email, password) {
    const users = await this.getUsers();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    users.push(newUser);
    await this.setUsers(users);
    return newUser;
  }

  static async compareUserPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}
