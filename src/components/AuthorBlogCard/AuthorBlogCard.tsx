import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/dateFormat";
import styles from "./AuthorBlogCard.module.css";

export interface BlogI {
    slug: string;
    bannerTitle: string;
    breadcrumbTitle: string;
    bannerImage: string;
    bannerDesp: string;
    author: {
        bannerTitle: string;
    };
    bannerImagedetails: {
        alt: string;
        title: string;
    };
    views: number;
    date: string;
}

interface AuthorBlogCardProps {
    blog: BlogI;
}

const AuthorBlogCard: React.FC<AuthorBlogCardProps> = ({ blog }) => {
    return (
        <div className={styles["blog-card"]}>
            <div className={`${styles["blog-body"]} p-4`}>
                <Link href={`/blog/${blog.slug}`} className={styles["title-link"]}>
                    <h3 className={`${styles["blog-card-title"]} mb-3`}>
                        {blog.bannerTitle}
                    </h3>
                </Link>

                <div className={`${styles["blog-meta-row"]} mb-4`}>
                    <span className={styles["views-badge"]}>
                        <svg
                            className="me-1"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        {blog.views}
                    </span>
                    <span className={styles["meta-sep"]}>|</span>
                    <span className={styles["meta-text"]}>{formatDate(blog.date)}</span>
                    <span className={styles["meta-sep"]}>|</span>
                    <span className={styles["meta-text"]}>
                        {blog.author?.bannerTitle}
                    </span>
                </div>

                <Link href={`/blog/${blog.slug}`} className={styles["blog-image-link"]}>
                    <div className={`${styles["blog-image-wrapper"]} mb-4`}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.bannerImage}`}
                            alt={blog.bannerImagedetails?.alt || "Blog image"}
                            title={blog.bannerImagedetails?.title || blog.bannerTitle}
                            width={600}
                            height={350}
                            className={styles["blog-img"]}
                        />
                    </div>
                </Link>

                <div
                    className={`${styles["blog-excerpt"]} mb-4`}
                    dangerouslySetInnerHTML={{
                        __html:
                            blog.bannerDesp.replace(/<[^>]*>?/gm, "").substring(0, 180) +
                            "...",
                    }}
                />

                <Link href={`/blog/${blog.slug}`} className={styles["read-more-link"]}>
                    <div className={`${styles["read-more-icon"]} me-2`}>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                    Read more
                </Link>
            </div>
        </div>
    );
};

export default AuthorBlogCard;
