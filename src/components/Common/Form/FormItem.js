import React from "react";
import { Field } from "rc-field-form";

const FormItem = ({ name = "", children, ...props }) => {
    return (
        <Field name={name} {...props} validateTrigger={["onBlur", "onChange"]}>
            {(control, meta, form) => {
                console.log({ meta });
                return (
                    <div>
                        {React.cloneElement(children, {
                            ...control,
                        })}

                        {meta.errors && meta.errors.map((error, i) => <div key={i}>{error}</div>)}
                    </div>
                );
            }}
        </Field>
    );
};

export default FormItem;
