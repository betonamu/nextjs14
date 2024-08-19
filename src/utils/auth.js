import ssrMode from "@/constants";
import { deleteCookie } from "./cookies";
import { redirect } from "next/dist/server/api-utils";

export const logout = () => {
    deleteCookie("accessToken");
    if (ssrMode) {
        redirect("/");
    } else {
        location.replace("/");
    }
};
