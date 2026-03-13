import React, { useEffect, useState } from "react";
import meta from "../../meta/meta.json";
import Link from "next/link";
import Head from "next/head";
import CustomHead from "@/components/Head";
import Image from "next/image";
import Loading from "@/components/Loading";
import { formatDate } from "@/utils/dateFormat";

interface BlogI {
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

const caseStudy = () => {
  const [loading, setLoading] = useState(false);
  const [cases, setCases] = useState<null | BlogI[]>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchHandler = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/caseStudy/list?pageIndex=${page}`
      );
      const data = await response.json();
      if (data.status === 200) {
        setCases(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.log("error in fetching case", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHandler(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return !loading ? (
    <>
      <CustomHead {...meta["case-studies"]} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "EmploymentAgency",
                  "@id": "https://www.alliancerecruitmentagency.ca/#employmentagency",
                  "name": "Alliance Recruitment Agency Canada",
                  "url": "https://www.alliancerecruitmentagency.ca",
                  "logo": {
                    "@type": "ImageObject",
                    "@id": "https://www.alliancerecruitmentagency.ca/#logo",
                    "url": "https://www.alliancerecruitmentagency.ca/assets/images/header/alliance-new-logo.png",
                    "caption": "Alliance Recruitment Agency Canada"
                  },
                  "telephone": "+17809004752",
                  "email": "sales@alliancerecruitmentagency.com",
                  "contactPoint": [
                    {
                      "@type": "ContactPoint",
                      "telephone": "+17809004752",
                      "contactType": "customer service",
                      "email": "sales@alliancerecruitmentagency.com",
                      "areaServed": "CA",
                      "availableLanguage": ["en"]
                    },
                    {
                      "@type": "ContactPoint",
                      "telephone": "+918980018741",
                      "contactType": "customer service",
                      "email": "sales@alliancerecruitmentagency.com",
                      "areaServed": "IN",
                      "availableLanguage": ["en"]
                    },
                    {
                      "@type": "ContactPoint",
                      "telephone": "+19179009072",
                      "contactType": "customer service",
                      "email": "sales@alliancerecruitmentagency.com",
                      "areaServed": "US",
                      "availableLanguage": ["en"]
                    },
                    {
                      "@type": "ContactPoint",
                      "telephone": "+442038380743",
                      "contactType": "customer service",
                      "email": "sales@alliancerecruitmentagency.com",
                      "areaServed": "GB",
                      "availableLanguage": ["en"]
                    }
                  ],
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "2920 Highway 7, unit 2101",
                    "addressLocality": "Vaughan",
                    "addressRegion": "Ontario",
                    "postalCode": "L4KOP4",
                    "addressCountry": "CA"
                  },
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday"
                      ],
                      "opens": "09:00",
                      "closes": "20:00"
                    }
                  ],
                  "sameAs": [
                    "https://www.facebook.com/Alliancerecruitmentagency/",
                    "https://youtube.com/channel/UCTWg4i7ZXx1NTJ59SP8Nxrw",
                    "https://www.linkedin.com/company/alliance-recruitment-agency/",
                    "https://twitter.com/career_alliance"
                  ],
                  "foundingDate": "2010",
                  "description": "Top Canadian employment agency helping businesses hire skilled staff fast. Trusted staffing agency in Canada for IT, healthcare, engineering & more."
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.alliancerecruitmentagency.ca/#website",
                  "url": "https://www.alliancerecruitmentagency.ca",
                  "name": "Alliance Recruitment Agency Canada",
                  "publisher": {
                    "@id": "https://www.alliancerecruitmentagency.ca/#employmentagency"
                  },
                  "inLanguage": "en-US",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.alliancerecruitmentagency.ca/?s={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "Person",
                  "@id": "https://www.alliancerecruitmentagency.ca/author/anish-malek/#author",
                  "name": "Anish Malek",
                  "url": "https://www.alliancerecruitmentagency.ca/author/anish-malek",
                  "worksFor": {
                    "@id": "https://www.alliancerecruitmentagency.ca/#employmentagency"
                  }
                }
              ]
            })
          }}
        />
      </Head>
      <div className="inner-wrapper">
        <section className="breadcrumb p07">
          <div>
            <ul className="br-crumb">
              <li>
                <Link href="/">
                  <span>Home</span>
                </Link>
                <meta content="1" />
              </li>
            </ul>
            <span className="delimiter">›</span>Case Studies
          </div>
        </section>
        {!loading && cases && (
          <section className="content fancy-borders-disabled">
            <section className="main postlist blog-section single-all">
              <div className="row">
                <div className="col-md-12">
                  <h1>Case Study</h1>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    {Array.isArray(cases) &&
                      cases.map((blog, index: any) => (
                        <div className="col-md-4" key={index}>
                          <Case blog={blog} />
                        </div>
                      ))}
                  </div>
                  <div className="col-12">
                    <nav className="project-nav blog-nav">
                      <span className="prev">
                        <Link
                          href="#"
                          className="page-numbers previous-page"
                          onClick={handlePrevPage}
                        // disabled={currentPage === 1}
                        >
                          Previous Posts
                        </Link>
                      </span>
                      <span className="next">
                        <Link
                          href="#"
                          className="page-numbers next-page"
                          onClick={handleNextPage}
                        // disabled={currentPage === totalPages}
                        >
                          Next Posts
                        </Link>
                      </span>
                    </nav>
                  </div>
                </div>

              </div>
            </section>
          </section>
        )}
      </div>
    </>
  ) : /* (
    <Loading />
  ); */ null
};

const Case = ({ blog }: { blog: BlogI }) => {
  console.log("case studies", blog);

  return (
    <article className="post-8656 post type-post status-publish format-standard has-post-thumbnail hentry category-hiring-tips category-recruitment-tips entry">
      <span className="post-title">
        <Link
          href={`/case-studies/${blog.slug}`}
          rel="bookmark"
          title={blog.bannerImagedetails.title}
        >
          {blog.bannerTitle}
        </Link>
      </span>
      <div className="tag-list">
        <p className="post-meta">
          {/* <span className="spvc_area">
            <span className="spvc_icon"></span>
            <span className="spvc_views">{blog.views}</span>
          </span>
          <span>|</span> */}
          {formatDate(blog.date)}
          <span>|</span> {blog.author.bannerTitle}
          <span></span>
        </p>
      </div>
      <Link href={`/blog/${blog.slug}`}>
        <Image
          width="3000"
          height="1090"
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.bannerImage}`}
          title={blog.bannerImagedetails.title}
          alt={blog.bannerImagedetails.alt}
          className="attachment-medium size-medium wp-post-image"
          decoding="async"
          sizes="(max-width: 34.9rem) calc(100vw - 2rem), (max-width: 53rem) calc(8 * (100vw / 12)), (min-width: 53rem) calc(6 * (100vw / 12)), 100vw"
        />
      </Link>
      <div className="blog-post-content">
        <p dangerouslySetInnerHTML={{ __html: blog.bannerDesp }} />
      </div>
      <p className="more more-icon">
        <Link href={`/case-studies/${blog.slug}`}>Read more</Link>
      </p>
    </article>
  );
};

export default caseStudy;
