import { useEffect, useRef } from "react";

export function useViewportWidth() {
    const viewportWidth = useRef(0);

    useEffect(() => {
        const updateViewportWidth = () => {
            viewportWidth.current = window.innerWidth;
        };

        updateViewportWidth();

        window.addEventListener("resize", updateViewportWidth);
    }, []);

    return viewportWidth;
}
