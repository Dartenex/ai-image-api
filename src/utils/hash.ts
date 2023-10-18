import { createHash } from 'crypto';

export const generateHash = (data: any) => {
  const hash = createHash('sha256');
  hash.update(`${new Date().getTime()} ${JSON.stringify(data)}`);
  return hash.digest('hex');
};
