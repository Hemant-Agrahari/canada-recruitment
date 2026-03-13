import React from "react";

interface BlogLayoutProps {
    children: React.ReactNode;
}

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
    return <div className="inner-wrapper">{children}</div>;
};

export default BlogLayout;
