const baseURL = import.meta.env.VITE_API_URL;

const urls = {
    users: '/users',
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: "/auth/refreshToken",
    chats: '/chats',
};

export default baseURL;

export { urls };
