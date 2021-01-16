import Link, { LinkProps } from "next/link";

const LinkNewTab: React.FC<LinkProps> = ({ children, ...linkProps }) => {
    return (
        <Link {...linkProps} passHref>
            <a target="_blank" rel="noreferrer">
                {children}
            </a>
        </Link>
    );
};

export default LinkNewTab;
