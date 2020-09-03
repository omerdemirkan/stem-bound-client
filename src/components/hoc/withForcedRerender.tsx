import { useState, useEffect } from "react";

export default function withForcedRerender(
    Component: React.ComponentType<any> | React.FC<any>
) {
    return (props) => {
        const [render, setRender] = useState<boolean>(true);

        useEffect(
            function () {
                if (!render) setRender(true);
            },
            [render]
        );

        return render ? (
            <Component {...props} rerender={() => setRender(false)} />
        ) : null;
    };
}
