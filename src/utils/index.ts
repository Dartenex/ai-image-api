const delayCallback = <T>(delay: number, callback: () => T) =>
  new Promise<T>((resolve) => {
    setTimeout(() => {
      const result: T = callback();
      resolve(result);
    }, delay);
  });

const randomMilliseconds = (min = 1, max = 4): number => {
  return Math.ceil(Math.random() * (max - min) + min);
};

export const logTime = (): string => {
  const now = new Date();
  return `[${now.toISOString()}]: `;
};

export { delayCallback, randomMilliseconds };
export * from './fs';
