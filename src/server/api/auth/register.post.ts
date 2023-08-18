import { genSalt, hash } from 'bcrypt';
import { readBody } from 'h3';

export const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        hash(password, salt, (err, encrypted) => {
          if (err) {
            reject(err);
          } else {
            resolve(encrypted);
          }
        });
      }
    });
  });
};

export default eventHandler(async (event) => {
  const body = await readBody(event);
  const hashedPassword = await hashPassword(body.password);

  // create account
  const newAccount = { pass: hashedPassword };

  // TODO: implement 2FA

  return newAccount;
});
