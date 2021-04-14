import { useEffect, useState } from "react";

export default function useOnScreen(ref, rootMargin = "0px") {
    const [onScreen, setOnScreen] = useState(false);
    const [enteredScreen, setEnteredScreen] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            function ([entry]) {
                setOnScreen(entry.isIntersecting);
                if (entry.isIntersecting) setEnteredScreen(true);
            },
            { rootMargin }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.unobserve(ref.current);
    }, []); // Empty array ensures that effect is only run on mount and unmount
    return { onScreen, enteredScreen };
}
