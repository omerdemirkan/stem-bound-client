import Link from "next/link";

interface Props {
    text: string;
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    iconPath?: string;
    path: string;
}

const NavigationButton: React.FC<Props> = ({ path, text, iconPath, Icon }) => {
    return (
        <Link href={path}>
            <a>
                <button>
                    {Icon ? <Icon height={20} width={20} /> : null}
                    {text}
                </button>
            </a>
            <style jsx>{``}</style>
        </Link>
    );
};

export default NavigationButton;
