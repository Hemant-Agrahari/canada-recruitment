import React from "react";

interface BlogArticleProps {
    children: React.ReactNode;
}

const BlogArticle: React.FC<BlogArticleProps> = ({ children }) => {
    return <article className="post">{children}</article>;
};

export default BlogArticle;
