import Link from "next/link";
import { FC } from "react";

interface DisabledLinkProps {
    href: string;
    children: React.ReactNode;
    prefetch?: boolean;
    ariaLabel?: string;
}

export const DisabledLink: FC<DisabledLinkProps> = ({
    href,
    children,
    prefetch,
    ariaLabel,
}) => {
    if (!href) {
        return <>{children}</>;
    }
    return (
        <Link aria-label={ariaLabel} prefetch={prefetch} href={href}>
            {children}
        </Link>
    );
};
