"use client";

import Home from "@/components/Home";
import useQueryParams from "@/hooks/useQueryParams";

function Page() {
    const [queryParams] = useQueryParams();
    console.log({ queryParams });

    return (
        <>
            <h1>Hello, World!</h1>
            <Home />
            <iframe src="http://localhost:3000/app?id=1&series=series"/>
        </>
    );
}

export default Page;
