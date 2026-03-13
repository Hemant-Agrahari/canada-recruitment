import React from "react";

// Helper function to generate slug from title for anchor links
const generateSlug = (title: string): string => {
    if (!title) return "";
    const text = title.replace(/<[^>]*>/g, "");
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};

interface BlogConclusionProps {
    conclusion: any;
}

const BlogConclusion: React.FC<BlogConclusionProps> = ({ conclusion }) => {
    return (
        <div>
            <h2
                id={generateSlug(conclusion?.title || "")}
                className="heading_style"
                dangerouslySetInnerHTML={{ __html: conclusion?.title }}
            ></h2>
            <div>
                <p
                    dangerouslySetInnerHTML={{
                        __html: conclusion?.description,
                    }}
                ></p>
            </div>
        </div>
    );
};

export default BlogConclusion;
