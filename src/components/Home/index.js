"use client";

import { cookies } from "@/utils/cookies";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Home = () => {
    const router = useRouter();
    const onclick = () => {
        cookies.set("key", "value", { maxAge: 10000000000000 });
        toast.success("Home");
    };

    return (
        <div>
            <button onClick={onclick}>Home</button>
        </div>
    );
};
export default Home;
