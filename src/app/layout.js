import { Toaster } from "sonner";

import { FONT_FAMILY } from "@/styles/fonts";
import { QueryProvider } from "@/contexts";

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={FONT_FAMILY.className}>
            <body style={{ height: "100vh" }}>
                <QueryProvider>{children}</QueryProvider>

                <Toaster richColors closeButton position="top-center" />
            </body>
        </html>
    );
}

export async function generateMetadata({ params, searchParams }) {
    return {
        title: "My app metadata",
        description: "Generated by create next app",
    };
}
