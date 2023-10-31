export const offset = (page: number, perPage: number) => {
  return (page - 1) * perPage;
};

export const getAppName = (): string => process.env.APP_NAME;
export const getAppDomain = (): string => process.env.APP_DOMAIN;
