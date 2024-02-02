import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

/*
Note:
  This turns callback-based scrypt and turn it into an
  promise-based implementation
*/
const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const tempStorage = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${tempStorage.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const tempStorage = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return tempStorage.toString('hex') === hashedPassword;
  }
}