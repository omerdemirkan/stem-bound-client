import { IBreadCrumb } from "../../utils/types";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "next/link";
import Box from "@material-ui/core/Box";

export function paginateBreadCrumbs(breadCrumbs: IBreadCrumb[]) {
    return (
        <Breadcrumbs>
            {breadCrumbs?.map(function ({ label, href, shallow, as }, index) {
                const isLast = index === breadCrumbs.length - 1;
                let bc = (
                    <Typography
                        key={label + href}
                        variant="body1"
                        component="p"
                        color={isLast ? "textPrimary" : "textSecondary"}
                        gutterBottom
                    >
                        {label}
                    </Typography>
                );
                if (href) {
                    bc = (
                        <Link
                            href={href}
                            as={as}
                            shallow={shallow}
                            key={label + href}
                        >
                            <a>{bc}</a>
                        </Link>
                    );
                }
                return bc;
            })}
        </Breadcrumbs>
    );
}

export function paginateBreadcrumbsMinified(breadCrumbs: IBreadCrumb[]) {
    if (!breadCrumbs) return null;

    let elements = [];

    if (breadCrumbs.length >= 3) {
        elements.push(<span key="dots">...</span>);
    }

    let element;
    let elementKey;

    // Top two breadcrumbs
    const renderedBreadCrumbs = breadCrumbs.slice(
        Math.max(breadCrumbs.length - 2, 0),
        breadCrumbs.length
    );

    renderedBreadCrumbs.forEach(function (breadCrumb, index) {
        elementKey = breadCrumb.label + breadCrumb.href;
        element = (
            <Typography
                variant="body1"
                component="p"
                color={
                    index === breadCrumbs.length - 1
                        ? "textPrimary"
                        : "textSecondary"
                }
                key={elementKey}
                style={{ margin: "0" }}
            >
                <Box letterSpacing={0}>{breadCrumb.label}</Box>
            </Typography>
        );
        if (breadCrumb.href)
            element = (
                <Link
                    href={breadCrumb.href}
                    as={breadCrumb.as}
                    key={elementKey}
                    shallow={breadCrumb.shallow}
                >
                    <a>{element}</a>
                </Link>
            );

        elements.push(element);
    });
    return <Breadcrumbs>{elements}</Breadcrumbs>;
}
