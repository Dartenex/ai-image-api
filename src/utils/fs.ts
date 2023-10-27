import { resolve } from 'path';

export const rootDir = resolve(process.cwd());
export const mailTemplatesDir = resolve(`${rootDir}/mail/templates`);

export const publicImgUrl = (name: string): string => {
  const awsS3Bucket: string = process.env.AWS_S3_BUCKET as string;
  return `https://${awsS3Bucket}.s3.amazonaws.com/images/${name}`;
};
