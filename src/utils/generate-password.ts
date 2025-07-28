import { randomBytes } from 'crypto';

export function generatePassword(length = 12): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz' +
    '0123456789' +
    '!@#$%^&*()-_=+[]{}|;:,.<>?';

  const random = randomBytes(length);
  const password = Array.from(random).map((byte) => {
    return chars[byte % chars.length];
  });

  return password.join('');
}
