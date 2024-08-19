/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"))

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: ["@svgr/webpack"],
            },
        )

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i


        //Convert kebab-case css to camel-case to use in js
        for (const rule of config.module.rules) {
            if (rule.oneOf && Array.isArray(rule.oneOf)) {
                for (const moduleLoader of rule.oneOf) {
                    if (Array.isArray(moduleLoader.use)) {
                        moduleLoader.use.forEach((loader) => {
                            const isCssLoader =
                                typeof loader.loader === "string" &&
                                loader.loader.includes("css-loader");
                            const isPostCssLoader =
                                typeof loader.loader === "string" &&
                                loader.loader.includes("postcss-loader");

                            if (isCssLoader && !isPostCssLoader) {
                                const loaderOptions = loader.options;
                                if (loaderOptions && loaderOptions.modules) {
                                    loaderOptions.modules = {
                                        ...loaderOptions.modules,
                                        exportLocalsConvention: "camelCaseOnly",
                                    };
                                }
                            }
                        });
                    }
                }
            }
        }

        return config
    },
    sassOptions: {
        // prependData: `@import "src/styles/variables.scss";`,
    },
}

export default nextConfig
