export const URL = import.meta.env.MODE === "production"
    ? `${import.meta.env.VITE_SERVER_URL}`
    : `${import.meta.env.VITE_DEV_URL}`;
