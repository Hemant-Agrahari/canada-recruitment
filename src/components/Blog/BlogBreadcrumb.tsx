import React from "react";
import Link from "next/link";

interface BlogBreadcrumbProps {
    breadcrumbTitle?: string;
}

const BlogBreadcrumb: React.FC<BlogBreadcrumbProps> = ({ breadcrumbTitle }) => {
    return (
        <section className="breadcrumb p07">
            <div className="container">
                <ul className="br-crumb">
                    <li>
                        <Link href="/">
                            <span>Home</span>
                        </Link>
                        <meta content="1" />
                    </li>
                </ul>
                <span className="delimiter">›</span>
                <Link href="/webblog">
                    <span>Webblog</span>
                </Link>
                <span className="delimiter">›</span>
                {breadcrumbTitle || ""}
            </div>
        </section>
    );
};

export default BlogBreadcrumb;
