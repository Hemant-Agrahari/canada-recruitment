import React from "react";
import Image from "next/image";
import Link from "next/link";
import ExploreWithAI from "@/components/ExploreWithAI/ExploreWithAi";
import TableOfContents from "@/components/TableOfContents";

// Helper function to strip <p> tags from HTML content
const stripPTags = (html: string): string => {
    if (!html) return "";
    return html
        .replace(/<p[^>]*>/gi, "")
        .replace(/<\/p>/gi, "")
        .trim();
};

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

interface BlogContentProps {
    blogData: any;
    bannerImagedetails: any;
    conclusion: any;
}

const BlogContent: React.FC<BlogContentProps> = ({
    blogData,
    bannerImagedetails,
    conclusion,
}) => {
    const faq = blogData?.faq;

    return (
        <>
            <div>
                <Image
                    className="layout-1-bnr "
                    src={
                        blogData?.bannerImage instanceof File
                            ? URL.createObjectURL(blogData?.bannerImage)
                            : `${process.env.NEXT_PUBLIC_BACKEND_URL}${blogData?.bannerImage}`
                    }
                    width="971"
                    height="547"
                    fetchPriority="high"
                    alt={bannerImagedetails?.alt}
                    title={bannerImagedetails?.title}
                />
                <ExploreWithAI
                    postUrl={blogData?.slug}
                    postTitle={blogData?.bannerTitle}
                />
                <TableOfContents
                    content={blogData?.content || []}
                    conclusion={conclusion}
                    hasFaq={faq && faq[0]?.question?.length > 2}
                />
            </div>
            {blogData?.bannerDesp && (
                <p
                    dangerouslySetInnerHTML={{
                        __html: blogData?.bannerDesp || "",
                    }}
                />
            )}

            {blogData?.content.map((item: any, index: any) => (
                <div key={index}>
                    <h2
                        id={generateSlug(item?.contentTitle || "")}
                        className="heading_style"
                        dangerouslySetInnerHTML={{
                            __html: item?.contentTitle || "",
                        }}
                    ></h2>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: item?.contentDescription,
                        }}
                    ></p>
                    {item?.contentCtaButton.state === true && (
                        <div className="cst-cta">
                            <h4 className="d-flex align-items-center gap-2">
                                <span
                                    className="fw-300 fs-20"
                                    dangerouslySetInnerHTML={{
                                        __html: stripPTags(
                                            item?.contentCtaButton.btnText || ""
                                        ),
                                    }}
                                />
                                <Link
                                    href={item?.contentCtaButton.link}
                                    dangerouslySetInnerHTML={{
                                        __html: item?.contentCtaButton.boldtxt,
                                    }}
                                ></Link>
                            </h4>
                        </div>
                    )}
                    {item?.subContent &&
                        item.subContent.map((subItem: any, subIndex: any) => (
                            <div key={subIndex}>
                                <h3 className="h3-blog-heading">
                                    {subItem?.subContentTitle}
                                </h3>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: subItem?.subContentDescription,
                                    }}
                                ></p>
                                {subItem?.subContentCtaButton.state === true && (
                                    <div className="cst-cta">
                                        <h4>
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: stripPTags(
                                                        subItem?.subContentCtaButton.btnText ||
                                                        ""
                                                    ),
                                                }}
                                            />
                                            <Link
                                                href={subItem?.subContentCtaButton.link}
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        subItem?.subContentCtaButton.boldtxt,
                                                }}
                                            />
                                        </h4>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            ))}
        </>
    );
};

export default BlogContent;
