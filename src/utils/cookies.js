import { setCookie, getCookie, deleteCookie, hasCookie } from "cookies-next";

const get = async (key) => {
    return getCookie(key);
};

const set = async (key, value, options) => {
    setCookie(key, value, {
        domain: "localhost",
        path: "/",
        ...options,
    });
};

const remove = async (key) => {
    deleteCookie(key);
};

const has = async (key) => {
    return hasCookie(key);
};

export const cookies = {
    get,
    set,
    remove,
    has,
};
