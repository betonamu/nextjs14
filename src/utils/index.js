import ssrMode from "@/constants";
import { redirect } from "next/navigation";

export const forbidden = () => {
    if (ssrMode) {
        redirect("/403");
    } else {
        location.assign("/403");
    }
};

export const removeAccents = (str) => {
    if (str)
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
    return str;
};

export function cleanObject(obj = {}, { clear = [undefined] } = {}) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (isObject(value) && !Array.isArray(value)) {
            acc[key] = cleanObject(value, { clear });
        } else if (!clear.includes(value) || (!Array.isArray(value) && value.length > 0)) {
            acc[key] = value;
        }

        return acc;
    }, {});
}

export const isObject = (value) => {
    if (typeof value !== "object" || value === null) return false;

    if (Object.prototype.toString.call(value) !== "[object Object]") return false;

    const proto = Object.getPrototypeOf(value);
    if (proto === null) return true;

    const Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return (
        typeof Ctor === "function" &&
        Ctor instanceof Ctor &&
        Function.prototype.call(Ctor) === Function.prototype.call(value)
    );
};

export const castArray = (arr) => {
    return Array.isArray(arr) ? arr : [arr];
};
