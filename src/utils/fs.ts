import { resolve } from 'path';

export const rootDir = resolve(process.cwd());
export const storageDir = resolve(`${rootDir}/storage`);

export const mailTemplatesDir = resolve(`${rootDir}/mail/templates`);
