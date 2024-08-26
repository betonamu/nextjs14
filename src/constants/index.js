export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const DATE_TIME_DISPLAY_FORMAT = "DD/MM/YYYY HH:mm";
export const DATE_VALUE_FORMAT = "YYYY-MM-DD HH:mm:ss";
export const DATE_MONTH_FORMAT = "MM/DD";
export const DATE_YEAR_FORMAT = "DD/MM/YYYY";
export const YEAR_DATE_FORMAT = "YYYY-MM-DD";
export const TIME_FORMAT = "HH:mm";
export const DEFAULT_TABLE_SIZE = 10;

export const COOKIE_KEYS = {
    accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY,
    refreshToken: process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY,
};

export const ssrMode = !!(
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    window.document &&
    window.document.createElement
);
