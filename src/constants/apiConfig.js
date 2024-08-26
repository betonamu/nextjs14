export const METHOD = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT",
    PATCH: "PATCH",
};

export const HEADERS = {
    JSON: {
        "Content-Type": "application/json",
    },
    MULTIPART: {
        "Content-Type": "multipart/form-data",
    },
    FORM_URLENCODED: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
};

export const apiConfig = {
    account: {
        refreshToken: {
            url: "/auth/refresh-token",
            method: METHOD.POST,
            headers: HEADERS.JSON,
        },
    },
    user: {
        getList: {
            url: "/users",
            method: METHOD.GET,
            headers: HEADERS.JSON,
        },
    },
};
