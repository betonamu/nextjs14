import { createProxyMiddleware } from "http-proxy-middleware";

export default async function handler(req, res) {
    const url = req.url;
    const [baseUrl] = url.split("?");

    try {
        const proxy = createProxyMiddleware({
            changeOrigin: true,
            target: process.env.NEXT_PUBLIC_INTERACTIVE_APP_URL,
            pathRewrite: {
                [baseUrl]: `/app`,
            },
        });

        proxy(req, res, (err) => {
            if (err) {
                console.log({ err });
                res.status(500).json({ error: "Proxy error" });
            }
        });
    } catch (err) {
        console.log({ err });
        res.writeHead(307, { Location: "/403" }).end();
    }
}
