import { promises as fs } from 'fs';

export default class DB {
  static async readFile(path) {
    return fs
      .readFile(path, 'utf8')
      .then((data) => {
        let newData = data;
        if (!newData) newData = '[]';
        return JSON.parse(newData);
      })
      .catch((err) => err);
  }

  static async writeFile(path, data) {
    return fs
      .writeFile(path, JSON.stringify(data))
      .then((done) => done)
      .catch((err) => err);
  }
}
