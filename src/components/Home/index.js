"use client";

import useDebounceValue from "@/hooks/useDebounceValue";
import { cookies } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Home = () => {
    const router = useRouter();
    const onclick = () => {
        cookies.set("key", "value", { maxAge: 10000000000000 });
        toast.success("Home");
    };

    const [value, setValue] = useDebounceValue("");
    console.log({ value });

    return (
        <div>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            <button onClick={onclick}>Home</button>
        </div>
    );
};
export default Home;
