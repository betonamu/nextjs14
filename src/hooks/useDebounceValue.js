import { useEffect, useMemo, useRef, useState } from "react";

import { useUnmount } from "./useUnmount";

export const useDebounceValue = (initialValue, delay = 100, options) => {
    const eq = options?.equalityFn ?? ((left, right) => left === right);
    const unwrappedInitialValue = initialValue instanceof Function ? initialValue() : initialValue;
    const [debouncedValue, setDebouncedValue] = useState(unwrappedInitialValue);
    const previousValueRef = useRef(unwrappedInitialValue);

    const updateDebouncedValue = debounce(setDebouncedValue, delay, options);

    // Update the debounced value if the initial value changes
    if (!eq(previousValueRef.current, unwrappedInitialValue)) {
        updateDebouncedValue(unwrappedInitialValue);
        previousValueRef.current = unwrappedInitialValue;
    }

    return [debouncedValue, updateDebouncedValue];
};

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        if (immediate && !timeout) func.apply(context, args);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
    };
}

export const useDebounceCallback = (func, delay = 500, options) => {
    const debouncedFunc = useRef();

    useUnmount(() => {
        if (debouncedFunc.current) {
            debouncedFunc.current.cancel?.();
        }
    });

    const debounced = useMemo(() => {
        const debouncedFuncInstance = debounce(func, delay, options);

        const wrappedFunc = (...args) => {
            return debouncedFuncInstance(...args);
        };

        wrappedFunc.cancel = () => {
            debouncedFuncInstance.cancel();
        };

        wrappedFunc.isPending = () => {
            return !!debouncedFunc.current;
        };

        wrappedFunc.flush = () => {
            return debouncedFuncInstance.flush();
        };

        return wrappedFunc;
    }, [func, delay, options]);

    // Update the debounced function ref whenever func, wait, or options change
    useEffect(() => {
        debouncedFunc.current = debounce(func, delay, options);
    }, [func, delay, options]);

    return debounced;
};

export default useDebounceValue;
