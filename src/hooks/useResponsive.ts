
import {useEffect, useState } from "react";

export function useResponsive() {
    const [state, setState] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    });
    const onResizeHandler = () => {
        if (typeof window !== 'undefined') {
            const isMobile = window.innerWidth <= 768;
            const isTablet = window.innerWidth >= 768 && window.innerWidth <= 990;
            const isDesktop = window.innerWidth > 990;

            setState({ isMobile, isTablet, isDesktop });
        }

    };
    const debouncedCall = useDebounce(onResizeHandler, 500);
    useEffect(() => {
        onResizeHandler();

        window.addEventListener("resize", debouncedCall, false);

        return () => {
            window.removeEventListener("resize", debouncedCall, false);
        };
    }, [debouncedCall]);

    return state;
}


// Taken from https://usehooks.com/useDebounce/
// Hook
// T is a generic type for value parameter, our case this will be string
function useDebounce<T>(value: T, delay: number): T {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
}