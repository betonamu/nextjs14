import React, { useContext } from "react";
import { default as RCForm, FieldContext } from "rc-field-form";

import FormItem from "./FormItem";

const Form = ({
    form,
    initialValues,
    name,
    validateMessages,
    onFieldsChange,
    onFinish,
    onFinishFailed,
    onValuesChange,
    children,
    className,
    ...props
}) => {
    return (
        <RCForm
            className={className}
            name={name}
            form={form}
            initialValues={initialValues}
            validateMessages={validateMessages}
            onFieldsChange={onFieldsChange}
            onFinish={onFinish}
            onFinishFailed={(errorInfo) => {
                onFinishFailed?.(errorInfo);
            }}
            onValuesChange={onValuesChange}
            {...props}
        >
            {children}
        </RCForm>
    );
};

export const useFormInstance = () => {
    const ctx = useContext(FieldContext);

    return ctx;
};

Form.Item = FormItem;

export default Form;
