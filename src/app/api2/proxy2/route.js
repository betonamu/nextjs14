import { createProxyMiddleware } from "http-proxy-middleware";
import { NextResponse } from "next/server";

const createProxyMiddlewareEduhome = (baseUrl, queryParams) => {
    return {
        target: process.env.NEXT_PUBLIC_INTERACTIVE_APP_URL,
        pathRewrite: {
            [baseUrl]: `/app`,
        },
        changeOrigin: true,
    };
};

export async function GET(req) {
    const url = req.url;
    const { ...queryParams } = req.nextUrl.searchParams;
    const [baseUrl] = url.split("?");
    const res = NextResponse;

    try {
        const proxy = createProxyMiddleware({
            changeOrigin: true,
            ...createProxyMiddlewareEduhome(baseUrl, queryParams),
        });

        return new Promise((resolve, reject) => {
            proxy(req, res, (err) => {
                if (err) {
                    console.log({ err });
                    resolve(new NextResponse(JSON.stringify({ error: 'Proxy error' }), { status: 500 }));
                }
            });
        })
    } catch (err) {
        console.log({ err });
        return res.redirect("/500");
    }
}
