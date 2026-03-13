import React from "react";
import Head from "next/head";

const baseUrl = "https://www.alliancerecruitmentagency.ca";

// Function to generate comprehensive blog page schema
const generateBlogPageSchema = (
    blogData: any,
    metadata: any,
    bannerImagedetails: any
) => {
    const blogUrl = `${baseUrl}/blog/${blogData?.slug}`;
    const bannerImageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${blogData?.bannerImage}`;
    const optimizedImageUrl = `${baseUrl}/_next/image?url=${encodeURIComponent(
        bannerImageUrl
    )}&w=1080&q=75`;

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "EmploymentAgency",
                "@id": `${baseUrl}/#employmentagency`,
                name: "Alliance Recruitment Agency Canada",
                url: `${baseUrl}/`,
                logo: {
                    "@type": "ImageObject",
                    "@id": `${baseUrl}/#logo`,
                    url: `${baseUrl}/assets/images/header/alliance-new-logo.png`,
                    caption: "Alliance Recruitment Agency Canada",
                },
                telephone: "+17809004752",
                email: "sales@alliancerecruitmentagency.com",
                contactPoint: [
                    {
                        "@type": "ContactPoint",
                        telephone: "+17809004752",
                        contactType: "customer service",
                        email: "sales@alliancerecruitmentagency.com",
                        areaServed: "CA",
                        availableLanguage: ["en"],
                    },
                    {
                        "@type": "ContactPoint",
                        telephone: "+918980018741",
                        contactType: "customer service",
                        email: "sales@alliancerecruitmentagency.com",
                        areaServed: "IN",
                        availableLanguage: ["en"],
                    },
                    {
                        "@type": "ContactPoint",
                        telephone: "+19179009072",
                        contactType: "customer service",
                        email: "sales@alliancerecruitmentagency.com",
                        areaServed: "US",
                        availableLanguage: ["en"],
                    },
                    {
                        "@type": "ContactPoint",
                        telephone: "+442038380743",
                        contactType: "customer service",
                        email: "sales@alliancerecruitmentagency.com",
                        areaServed: "GB",
                        availableLanguage: ["en"],
                    },
                ],
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "2920 Highway 7, unit 2101",
                    addressLocality: "Vaughan",
                    addressRegion: "Ontario",
                    postalCode: "L4KOP4",
                    addressCountry: "CA",
                },
                openingHoursSpecification: [
                    {
                        "@type": "OpeningHoursSpecification",
                        dayOfWeek: [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                            "Sunday",
                        ],
                        opens: "09:00",
                        closes: "20:00",
                    },
                ],
                sameAs: [
                    "https://www.facebook.com/Alliancerecruitmentagency/",
                    "https://youtube.com/channel/UCTWg4i7ZXx1NTJ59SP8Nxrw",
                    "https://www.linkedin.com/company/alliance-recruitment-agency/",
                    "https://twitter.com/career_alliance",
                ],
                foundingDate: "2010",
                description:
                    "Top Canadian employment agency helping businesses hire skilled staff fast. Trusted staffing agency in Canada for IT, healthcare, engineering & more.",
            },
            {
                "@type": "WebSite",
                "@id": `${baseUrl}/#website`,
                url: `${baseUrl}/`,
                name: "Alliance Recruitment Agency Canada",
                publisher: {
                    "@id": `${baseUrl}/#employmentagency`,
                },
                inLanguage: "en-US",
                potentialAction: {
                    "@type": "SearchAction",
                    target: `${baseUrl}/?s={search_term_string}`,
                    "query-input": "required name=search_term_string",
                },
            },
            {
                "@type": "WebPage",
                "@id": `${blogUrl}/#webpage`,
                url: blogUrl,
                name: metadata?.title || blogData?.seoTitle || "",
                isPartOf: {
                    "@id": `${baseUrl}/#website`,
                },
                primaryImageOfPage: {
                    "@id": `${baseUrl}/#primaryimage`,
                },
                inLanguage: "en-US",
                datePublished: blogData?.createdAt || new Date().toISOString(),
                dateModified: blogData?.updatedAt || new Date().toISOString(),
                author: {
                    "@id": `${baseUrl}/author/anish-malek/#author`,
                },
            },
            {
                "@type": "Article",
                "@id": `${blogUrl}/#article`,
                headline: blogData?.bannerTitle || metadata?.title || "",
                description: metadata?.description || blogData?.seoDescription || "",
                image: {
                    "@type": "ImageObject",
                    "@id": `${baseUrl}/#primaryimage`,
                },
                author: {
                    "@id": `${baseUrl}/author/anish-malek/#author`,
                },
                publisher: {
                    "@id": `${baseUrl}/#employmentagency`,
                },
                datePublished: blogData?.createdAt || new Date().toISOString(),
                dateModified: blogData?.updatedAt || new Date().toISOString(),
                url: blogUrl,
                mainEntityOfPage: {
                    "@id": `${blogUrl}/#webpage`,
                },
            },
            {
                "@type": "Person",
                "@id": `${baseUrl}/author/anish-malek/#author`,
                name: "Anish Malek",
                url: `${baseUrl}/author/anish-malek`,
                worksFor: {
                    "@id": `${baseUrl}/#employmentagency`,
                },
            },
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: `${baseUrl}/`,
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "Webblog",
                        item: `${baseUrl}/webblog`,
                    },
                    {
                        "@type": "ListItem",
                        position: 3,
                        name:
                            blogData?.breadcrumbTitle ||
                            blogData?.bannerTitle ||
                            metadata?.title ||
                            "",
                        item: blogUrl,
                    },
                ],
            },
            {
                "@type": "ImageObject",
                "@id": `${baseUrl}/#primaryimage`,
                url: optimizedImageUrl,
                width: "1080",
                height: "608",
            },
        ],
    };
};

interface BlogSchemaProps {
    blogData: any;
    metadata: any;
    bannerImagedetails: any;
}

const BlogSchema: React.FC<BlogSchemaProps> = ({
    blogData,
    metadata,
    bannerImagedetails
}) => {
    const blogPageSchema = generateBlogPageSchema(blogData, metadata, bannerImagedetails);

    return (
        <Head>
            <script
                id="blog-page-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageSchema) }}
            />
        </Head>
    );
};

export default BlogSchema;
