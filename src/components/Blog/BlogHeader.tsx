import React from "react";
import Link from "next/link";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import ShareTopic from "@/components/ShareTopic/ShareTopic";

interface BlogHeaderProps {
    bannerTitle: string;
    views: number | string;
    formattedDate: string;
    authorBannerTitle: string;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
    bannerTitle,
    views,
    formattedDate,
    authorBannerTitle,
}) => {
    return (
        <>
            <h1
                className="post-heading"
                dangerouslySetInnerHTML={{
                    __html: bannerTitle || "",
                }}
            ></h1>
            <div className="tag-list d-flex align-items-center justify-content-between">
                <div>
                    <p className="post-meta">
                        <span className="spvc_area">
                            <MdOutlineRemoveRedEye />
                            <span className="spvc_views">{views}</span>
                        </span>
                        <span>|</span>
                        {formattedDate}
                        <Link href={`/author/anish-malek`}>
                            <span>|</span>by {authorBannerTitle || ""}
                        </Link>
                    </p>
                </div>
                <div className="d-flex align-items-center">
                    <div className="d-none d-md-block">
                        <p className="fw-semibold mb-2">Share this topic on</p>
                    </div>
                    <div>
                        <ShareTopic />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogHeader;
