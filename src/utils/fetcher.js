import axios from "axios";
import { redirect } from "next/navigation";

import ssrMode, { API_BASE_URL, COOKIE_KEYS } from "@/constants";
import { apiConfig } from "@/constants/apiConfig";
import { logout } from "./auth";
import { cookies } from "./cookies";

const defaultConfig = {
    baseURL: API_BASE_URL,
    paramsSerializer: (params) => queryString.stringify(params, { arrayFormat: "comma" }),
};

const instance = axios.create(defaultConfig);
const refreshInstance = axios.create(instanceConfig);

// hàm này trong vòng 10s chỉ gọi một lần và trả về kết quả đầu tiên
const refreshToken = mem(
    async () => {
        const refreshToken = cookies.get(COOKIE_KEYS.refreshToken);

        if (!refreshToken) return null;

        try {
            const { data } = await refreshInstance.request({
                ...apiConfig.account.refreshToken,
                data: { refreshToken },
            });

            cookies.set(COOKIE_KEYS.accessToken, data.accessToken);

            return data.accessToken;
        } catch {
            return null;
        }
    },
    { maxAge: 10000 },
);

instance.interceptors.request.use(
    (config) => {
        const accessToken = cookies.get(COOKIE_KEYS.accessToken);

        if (accessToken && !config.headers["Authorization"]) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error?.config;

        if (error?.response?.status === 401 && !config.sent) {
            config.sent = true;

            const accessToken = await refreshToken();

            if (accessToken) {
                return instance.request(config);
            }
        }

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
