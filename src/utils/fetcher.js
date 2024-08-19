import axios from "axios";
import { redirect } from "next/navigation";

import { getCookie } from "./cookies";
import { logout } from "./auth";
import ssrMode from "@/constants";

const defaultConfig = {
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: (params) => queryString.stringify(params, { arrayFormat: "comma" }),
};

const instance = axios.create(defaultConfig);

instance.interceptors.request.use(
    (config) => {
        const accessToken = getCookie("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    },
);

const fetcher = async (
    { method, url, headers } = {},
    { data, params, pathParams, context = {}, signal, ...rest } = {},
) => {
    try {
        return await instance.request({
            method,
            url: generatePath(url, pathParams),
            headers,
            data,
            params,
            signal,
            context,
            ...rest,
        });
    } catch (error) {
        const { req, res } = context;

        if (error?.response?.status === 401) {
            console.log("fetcher 401 logout", error.config.url);
            logout();
        } else if (error?.response?.status === 403) {
            console.log("fetcher 403 redirect forbidden", error.config.url);
            if (ssrMode) {
                location.assign("/403");
            } else {
                redirect("/403");
            }
        }

        throw error;
    }
};

export default { fetcher };
