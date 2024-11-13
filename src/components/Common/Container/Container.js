import classNames from "classnames";
import styles from "./Container.module.scss";

const Container = ({ className, style, children, maxWidth, margin, ...props }) => {
    const combinedStyles = {
        ...style,
        "--max-width": maxWidth,
        "--margin": margin,
    };

    return (
        <div className={classNames(styles.root, className)} style={combinedStyles} {...props}>
            {children}
        </div>
    );
};

export default Container;
