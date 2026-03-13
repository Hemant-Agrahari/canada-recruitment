import React, { useEffect, useState } from "react";
import Head from "next/head";

import AuthorProfile from "@/components/AuthorProfile/AuthorProfile";
import AuthorBlogCard, { BlogI } from "@/components/AuthorBlogCard/AuthorBlogCard";
import styles from "./author-page.module.css";

const AuthorPage: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogI[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog/list?pageIndex=1`);
                const data = await response.json();
                if (data.status === 200) {
                    setBlogs(data.data);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <>
            <Head>
                {/* Open Graph Meta Tags */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content="https://www.alliancerecruitmentagency.ca/author/anish-malek" />
                <meta property="og:title" content="Anish Malek - Recruitment Expert at Alliance Recruitment Agency Canada" />
                <meta property="og:description" content="Anish Malek is a recruitment expert at Alliance Recruitment Agency Canada, helping employers find top talent and supporting job seekers in their career success." />
                <meta property="og:image" content="https://www.alliancerecruitmentagency.ca/_next/image?url=%2Fassets%2Fauthor.png&w=256&q=75" />
                <meta property="og:site_name" content="Alliance Recruitment Agency" />
                <meta property="og:locale" content="en" />

                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Anish Malek - Recruitment Expert at Alliance Recruitment Agency Canada" />
                <meta name="twitter:description" content="Anish Malek is a recruitment expert at Alliance Recruitment Agency Canada, helping employers find top talent and supporting job seekers in their career success." />
                <meta name="twitter:image" content="https://www.alliancerecruitmentagency.ca/_next/image?url=%2Fassets%2Fauthor.png&w=256&q=75" />
                <meta name="twitter:url" content="https://www.alliancerecruitmentagency.ca/author/anish-malek" />
            </Head>
            <div className="inner-wrapper">

                <div className="container py-5">
                    <h1 className="text-center mb-4">Anish Malek – Recruitment Expert</h1>
                    <AuthorProfile />

                    <section className={`${styles['author-blogs-section']} mt-5`}>
                        <h2 className={`${styles['section-title']} mb-4`}>Latest News & Blogs</h2>
                        {loading ? (
                            <div className={styles['loading-state']}>
                                <p>Loading blogs...</p>
                            </div>
                        ) : blogs.length > 0 ? (
                            <div className="row">
                                {blogs.map((blog, index) => (
                                    <div className="col-lg-4 col-md-6 mb-4" key={index}>
                                        <AuthorBlogCard blog={blog} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className={styles['no-blogs']}>
                                <p>No blogs found for this author currently.</p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
};

export default AuthorPage;