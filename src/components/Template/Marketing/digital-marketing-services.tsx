import Image from "next/image";
const SlickSlider2 = dynamic(() => import("@/components/Slider/OwlCarouselSlider").then((mod) => mod.SlickSlider2), {
  ssr: true,
});
import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";
import {
  MarketingTemplateFormData,
} from "../../../utils/interfaces";
import { getRandomRatingValue, getRandomReviewCount } from "../../../helper/functions";
import { dynamicMetaProductScript } from "../../../meta/metaScript";
import Head from "next/head";
import RecruitmentJourneySection from "./RecruitmentJourneySection";

const ServiceContactForm = dynamic(() => import("@/components/forms/ServiceContactForm"), {
  ssr: false,
});
const BlogContactForm = dynamic(() => import("@/components/forms/BlogContactForm"), {
  ssr: false,
});
const WhyChooseUs = dynamic(() => import("./WhyChooseUs"), { ssr: true });
const MarketingServices = dynamic(() => import("./MarketingServices"), { ssr: true });
const MarketingFaq = dynamic(() => import("./MarketingFaq"), { ssr: true });
const MarketingSuccessStories = dynamic(() => import("./MarketingSuccessStories"), { ssr: false });
const MarketingReviews = dynamic(() => import("./MarketingReviews"), { ssr: false });
import MarketingStats from "./MarketingStats";
import MarketingAwards from "./MarketingAwards";

const ContactFormModal = dynamic(() => import("@/components/forms/ContactFormModal"), {
  ssr: false,
});
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


const DigitalMarketingServices = ({
  data,
}: {
  data: MarketingTemplateFormData | null;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCTAModalOpen, setIsCTAModalOpen] = useState(false);
  const [currentFormId, setCurrentFormId] = useState("servicepage-header-form");
  const result = data;
  return (
    <>
      <div className="breadcrum-bar">
        <div className="container">
          <Link className="link-home" href="/">
          </Link>
          <span>
            <span>
              <Link className="link-home" href="/">
                <span className="breadmain">
                  {" "}
                  Home <span className="slash-home">/</span>{" "}
                </span>
              </Link>
            </span>
            <span className="breadcrumb_last" aria-current="page">
              {result?.breadcrumbTitle || "Digital Marketing Services"}
            </span>
          </span>
        </div>
      </div>
      <section className="main-banner">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6 align-self-center me-auto order-2-991">
              <h1>
                {result?.bannerTitle ||
                  "Digital Marketing Services That Delivers A World-Class Digital Experience"}
              </h1>
              <p
                className="com-para service-section-3"
                dangerouslySetInnerHTML={{
                  __html: result?.bannerContent.replace(
                    /<\/?p[^>]*>/gi,
                    ""
                  ) || " Amplify your online presence with our innovative digital marketing services. Enhance brand visibility, drive targeted traffic, and boost conversions with our advanced strategies.From SEO and SME to social media management, we deliver results that matter. Our data-driven approach ensures maximum ROI while our seasoned professionals craft tailored campaigns for your unique goal."
                }}
              />

              <div className="bottom-link d-flex gap-3">
                <button
                  onClick={() => {
                    setCurrentFormId("servicepage-header-form");
                    setIsModalOpen(true);
                  }}
                  className="btn text-end"
                >
                  {result?.bannerBtnTitle || "Get A Quote"}
                </button>
                {result?.bannerBtnTitle2 && result?.bannerBtnLink2 && (
                  <Link
                    href={result?.bannerBtnLink2}
                    className="btn text-end"
                  >
                    {result?.bannerBtnTitle2}
                  </Link>
                )}
              </div>
            </div>
            <div className="col-lg-6 text-center order-1-991">
              <Image
                src={
                  result?.bannerImage
                    ? `${NEXT_PUBLIC_BACKEND_URL}${result?.bannerImage}`
                    : "/assets/images/digital-marketing-services.webp"
                }
                alt={result?.bannerImageName || "digital marketing"}
                title={result?.bannerImageName || "digital marketing"}
                width={627}
                height={504}
                className="img-fluid mx-auto"
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="brand-slider-section">
        <div className="container">
          <h2 className="com-title text-center mb-2">Who's Hiring With Us</h2>
        </div>
      </section>
      <SlickSlider2 />
      <WhyChooseUs content={result?.content || []} NEXT_PUBLIC_BACKEND_URL={NEXT_PUBLIC_BACKEND_URL} />
      {result?.content && Array.isArray(result.content) && result.content.length > 0 && (
        <RecruitmentJourneySection
          setIsModalOpen={setIsModalOpen}
          setIsCTAModalOpen={setIsCTAModalOpen}
          setFormId={setCurrentFormId}
        />
      )}

      <MarketingStats />
      <MarketingServices cardSection={result?.cardSection || { title: "", content: "" }} card={result?.card || []} NEXT_PUBLIC_BACKEND_URL={NEXT_PUBLIC_BACKEND_URL} />
      <MarketingAwards />
      <MarketingSuccessStories successStory={result?.successStory || []} NEXT_PUBLIC_BACKEND_URL={NEXT_PUBLIC_BACKEND_URL} />
      <MarketingReviews />
      <MarketingFaq faq={result?.faq || []} />
      <ServiceContactForm id="servicepage-footer-form" />
      {isModalOpen && (
        <div
          className="modal-overlay blog-contact-form-modal"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="modal-content "
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              maxWidth: "800px",
              width: "100%",
              height: "initial",
              overflow: "auto",
              position: "relative",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="blog-close-modal"
              aria-label="Close modal"
            >
              ×
            </button>

            <div
              className="hire-a-candidate-form"
              style={{ position: "relative", padding: "40px" }}
            >
              <div
                className="hire-cad-bg"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 0,
                  opacity: 0.05,
                }}
              >
                <Image
                  src="/assets/images/form-bg.svg"
                  width={1092}
                  height={696}
                  alt="form background"
                  title="form background"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <ContactFormModal onSuccess={() => setIsModalOpen(false)} id={currentFormId} />
              </div>
            </div>
          </div>
        </div>
      )}

      {
        isCTAModalOpen && (
          <div
            className="modal-overlay blog-contact-form-modal"
            onClick={() => setIsCTAModalOpen(false)}
          >
            <div
              className="modal-content"
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                maxWidth: "800px",
                width: "100%",
                height: "initial",
                overflow: "auto",
                position: "relative",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                padding: "30px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsCTAModalOpen(false)}
                className="blog-close-modal"
                aria-label="Close modal"
              >
                ×
              </button>

              <BlogContactForm id="servicepage-cta-form"
                apiEndpoint="serviceCtaFormApi"
                onSuccess={() => setIsCTAModalOpen(false)}
              />
            </div>
          </div>
        )
      }

      <Head>
        <link rel="preconnect" href="https://cmsapi.alliancerecruitmentagency.ca" crossOrigin="anonymous" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:type" content="article" />
        {result?.bannerImage && (
          <>
            <meta property="og:image" content={`${NEXT_PUBLIC_BACKEND_URL}${result.bannerImage}`} />
            <meta property="og:image:width" content="627" />
            <meta property="og:image:height" content="504" />
            <meta property="og:image:type" content="image/webp" />
          </>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              dynamicMetaProductScript({
                meta: {
                  name: result?.bannerTitle || "",
                  description: result?.seoDescription || "",
                  image: result?.bannerImage ? `${NEXT_PUBLIC_BACKEND_URL}${result.bannerImage}` : "",
                  aggregateRating: {
                    ratingValue: getRandomRatingValue().toString(),
                    reviewCount: getRandomReviewCount().toString(),
                  },
                  robotindex: `${result?.allowIndexing ? "index" : "noindex"}, ${result?.allowSearchEngines ? "follow" : "nofollow"
                    }`,
                },
              })
            ),
          }}
        />
      </Head>
    </>
  );
};

export default DigitalMarketingServices;
