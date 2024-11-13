const Flex = ({
    gap = [0, 0],
    align = "center",
    justify = "center",
    direction = "row",
    wrap,
    fullwidth,
    className,
    style,
    children,
    ...props
}) => {
    const baseStyle = {
        display: "flex",
        gap: Array.isArray(gap) ? `${gap[0]}px ${gap[1]}px` : (gap || 0) + "px",
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction,
        wrap: wrap,
        width: fullwidth ? "100%" : "auto",
    };

    return (
        <div style={{ ...baseStyle, ...style }} className={classNames(className)} {...props}>
            {children}
        </div>
    );
};

export default Flex;
