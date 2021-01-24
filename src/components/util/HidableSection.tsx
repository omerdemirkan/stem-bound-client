import { useState } from "react";
import Section, { ISectionProps } from "../ui/Section";
import Button from "@material-ui/core/Button";

interface Props extends ISectionProps {
    initial: "hidden" | "visible";
}

const HidableSection: React.FC<Props> = ({
    initial,
    children,
    actionEl,
    ...SectionProps
}) => {
    const [isHidden, setIsHidden] = useState<boolean>(initial === "hidden");
    return (
        <Section
            {...SectionProps}
            actionEl={
                <>
                    {actionEl}
                    <Button
                        onClick={() => setIsHidden((prev) => !prev)}
                        size="small"
                    >
                        {isHidden ? "Show" : "Hide"}
                    </Button>
                </>
            }
        >
            {!isHidden && children}
        </Section>
    );
};

export default HidableSection;
