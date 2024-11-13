import ssrMode from "@/constants";
import { redirect } from "next/navigation";
import { deleteCookie } from "./cookies";

export const logout = () => {
    deleteCookie("accessToken");
    if (ssrMode) {
        redirect("/");
    } else {
        location.replace("/");
    }
};
