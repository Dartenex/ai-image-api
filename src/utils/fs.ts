import { resolve, dirname } from 'path';

export const rootDir = resolve(dirname('.'));
export const storageDir = resolve(`${rootDir}/storage`);
