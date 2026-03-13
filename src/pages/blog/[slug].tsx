import React, { useState, useEffect, useRef } from "react";
import { GetServerSideProps } from "next";
import { formatDate } from "@/utils/dateFormat";
import ErrorLoading from "../404";
import CustomHead from "@/components/Head";
import { generateDynamicMeta } from "@/meta/DynamicMeta";
import Head from "next/head";
import dynamic from "next/dynamic";
import Author from "@/components/Author/Author";
import BlogBreadcrumb from "@/components/Blog/BlogBreadcrumb";
import BlogHeader from "@/components/Blog/BlogHeader";
import BlogFixedCTA from "@/components/Blog/BlogFixedCTA";
import BlogContent from "@/components/Blog/BlogContent";
import BlogConclusion from "@/components/Blog/BlogConclusion";
import BlogFAQ from "@/components/Blog/BlogFAQ";
import BlogBottomCTA from "@/components/Blog/BlogBottomCTA";
import BlogSchema from "@/components/Blog/BlogSchema";
import BlogLayout from "@/components/Blog/BlogLayout";
import BlogArticle from "@/components/Blog/BlogArticle";
import BlogFooterForm from "@/components/Blog/BlogFooterForm";
import BlogContactModal from "@/components/Blog/BlogContactModal";

const LatestUpdates = dynamic(() => import("@/components/LatestUpdates"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

const HeadHunterExecutiveJobSearch: React.FC = ({ post }: any) => {
  if (post?.status === 404) {
    return <ErrorLoading />;
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const formRef = useRef<HTMLElement>(null);
  const { author, relatedBlog, blogData, prevBlog, nextBlog } = post?.data;
  const formattedDate = formatDate(blogData?.date);
  const conclusion = JSON.parse(blogData?.conclusion);
  const faq = blogData?.faq;
  const categories = blogData?.categories;
  let bannerImagedetails;
  if (blogData.bannerImagedetails) {
    bannerImagedetails = JSON.parse(blogData.bannerImagedetails);
  }
  let slug = `blog/${blogData?.slug}`;

  let metadata = generateDynamicMeta({
    meta: {
      title: blogData?.seoTitle || "",
      description: blogData?.seoDescription || "",
      slug: slug || "",
      metaFaq: blogData?.faq,
      ogType: "article",
      ogLocale: "en_US",
      articlePublishedTime: blogData?.createdAt || "",
      articleModifiedTime: blogData?.updatedAt || "",
      twitterLable1: "Written by",
      twitterData1: "Alliance Recruitment Team",
      twitterLable2: "Est. reading time",
      twitterData2: "7 minutes",
      robotindex: `${blogData?.allowIndexing === false ? "noindex" : "index"}, ${blogData?.allowSearchEngines === false ? "nofollow" : "follow"}`,
      ogImage: {
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${blogData?.bannerImage}`,
        height: 1200,
        width: 644,
        type: "image/webp",
      },
    },
  });


  useEffect(() => {
    const handleScroll = () => {
      if (formRef.current) {
        const rect = formRef.current.getBoundingClientRect();
        const isReached = rect.top <= window.innerHeight;
        setIsFormVisible(isReached);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return blogData ? (
    <>
      <CustomHead {...metadata} />

      <BlogSchema
        blogData={blogData}
        metadata={metadata}
        bannerImagedetails={bannerImagedetails}
      />

      <BlogLayout>
        <BlogFixedCTA
          isFormVisible={isFormVisible}
          setIsModalOpen={setIsModalOpen}
        />

        <BlogBreadcrumb breadcrumbTitle={blogData?.breadcrumbTitle} />
        <section className="content blog-page color-blue fancy-borders-disabled">
          <div className="single blog-section">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-10 col-md-9 ">
                <BlogArticle>
                  <BlogHeader
                    bannerTitle={blogData?.bannerTitle || ""}
                    views={blogData?.views || 0}
                    formattedDate={formattedDate}
                    authorBannerTitle={author?.bannerTitle || ""}
                  />

                  <BlogContent
                    blogData={blogData}
                    bannerImagedetails={bannerImagedetails}
                    conclusion={conclusion}
                  />

                  <BlogConclusion conclusion={conclusion} />

                  <BlogFAQ faq={faq} />
                </BlogArticle>
                <Head>
                  <title>{blogData?.seoTitle || ""}</title>
                  <link href="https://www.alliancerecruitmentagency.ca/author/anish-malek" />
                  <meta
                    name="description"
                    content={blogData?.seoDescription || ""}
                  />
                  <meta name="robots" content="index, follow" />
                </Head>
                <section>
                  <Author
                    name="Anish Malek"
                    title="Recruitment Expert"
                    company="Alliance Recruitment Agency Canada"
                    bio="Anish Malek is a recruitment expert at Alliance Recruitment Agency Canada, dedicated to helping businesses find the right talent. With years of experience in the recruitment industry, they are passionate about connecting employers with qualified candidates and supporting job seekers in their career journeys. Their focus is on building strong teams that contribute to business growth and success."
                    imageUrl="/assets/author.png"
                    imageAlt="Anish Malek profile picture"
                    linkedinUrl="https://www.linkedin.com/in/anish-malek-19ba9721b/"
                    showTitle={false}
                    showIcon={true}
                    className="pt-1"
                  />
                </section>
                <section>
                  <LatestUpdates />
                </section>
                <BlogFooterForm ref={formRef} />
              </div>
            </div>
          </div>
        </section>
      </BlogLayout>

      <BlogBottomCTA />

      <BlogContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  ) : null;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { slug } = context.params || {};
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/getService?slug=${slug}`,
    );
    const post = await response.json();

    if (!post || post.status !== 200) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    return {
      props: {
        post: null,
      },
    };
  }
};
export default HeadHunterExecutiveJobSearch;
