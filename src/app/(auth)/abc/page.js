import { cookies } from "@/utils/cookies";
import styles from "./page.module.scss";
import Home from "@/components/Home";
import { redirect } from "next/navigation";

async function Page() {
    return (
        <>
            <h1 style={{ color: styles.primaryColor }}>Hello, World!</h1>
            <Home />
        </>
    );
}

export default Page;
