export const ssrMode = () =>
    !!(
        typeof window !== "undefined" &&
        typeof document !== "undefined" &&
        window.document &&
        window.document.createElement
    );

export default ssrMode;