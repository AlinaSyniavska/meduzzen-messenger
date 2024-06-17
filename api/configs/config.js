export const config = {
    PORT: process.env.PORT || 5001,
    NODE_ENV: process.env.NODE_ENV,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN || 'access_token',
    REFRESH_TOKEN: process.env.REFRESH_TOKEN || 'refresh_token',
    AUTHORIZATION: process.env.AUTHORIZATION,
    CORS_WHITE_LIST: process.env.CORS_WHITE_LIST || '',
};
