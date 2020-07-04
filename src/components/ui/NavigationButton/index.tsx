import classes from "./navigation-button.module.css";
import Link from "next/link";

interface Props {
    text: string;
    Icon?: React.FC;
    iconPath?: string;
    path: string;
}

const NavigationButton: React.FC<Props> = ({ path, text, iconPath, Icon }) => {
    return (
        <Link href={path}>
            <a>
                {Icon ? <Icon /> : null}
                {text}
            </a>
        </Link>
    );
};

export default NavigationButton;
