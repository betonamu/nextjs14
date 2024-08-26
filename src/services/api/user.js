import { apiConfig } from "@/constants/apiConfig";
import fetcher from "@/utils/fetcher";

export async function getUsers({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.user.getList, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}
