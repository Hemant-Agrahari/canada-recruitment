
import ServiceTemplate3 from "@/components/Template/Service/service-template-3";
import ServiceTemplate4 from "@/components/Template/Service/service-template-4";
import AboutUsTemplate from "@/components/Template/AboutUs/about-us";
import React from "react";
import Loading from "@/components/Loading";
import CustomHead from "@/components/Head";
import { generateDynamicMeta } from "@/meta/DynamicMeta";
import ServiceTemplate5 from "@/components/Template/Service/service-template-5";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import DigitalMarketingServices from "../../components/Template/Marketing/digital-marketing-services";

// Function to generate About Us page schema
const generateAboutUsPageSchema = (blogData: any, metadata: any) => {
  const baseUrl = "https://www.alliancerecruitmentagency.ca";
  const pageUrl = `${baseUrl}/about-us`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EmploymentAgency",
        "@id": `${baseUrl}/#employmentagency`,
        "name": "Alliance Recruitment Agency Canada",
        "url": `${baseUrl}/`,
        "logo": {
          "@type": "ImageObject",
          "@id": `${baseUrl}/#logo`,
          "url": `${baseUrl}/assets/images/header/alliance-new-logo.png`,
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
        "@id": `${baseUrl}/#website`,
        "url": `${baseUrl}/`,
        "name": "Alliance Recruitment Agency Canada",
        "publisher": {
          "@id": `${baseUrl}/#employmentagency`
        },
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/?s={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        "url": pageUrl,
        "name": metadata?.title || "About Alliance Recruitment Agency Canada | Trusted Hiring Experts",
        "isPartOf": {
          "@id": `${baseUrl}/#website`
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": `${baseUrl}/assets/images/header/alliance-new-logo.png`
        },
        "inLanguage": "en-US",
        "datePublished": blogData?.createdAt || "2025-03-03T08:51:30.924Z",
        "dateModified": blogData?.updatedAt || new Date().toISOString(),
        "author": {
          "@id": `${baseUrl}/author/anish-malek/#author`
        }
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/author/anish-malek/#author`,
        "name": "Anish Malek",
        "url": `${baseUrl}/author/anish-malek`,
        "worksFor": {
          "@id": `${baseUrl}/#employmentagency`
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${baseUrl}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About Us",
            "item": pageUrl
          }
        ]
      }
    ]
  };
};

// Function to generate dynamic service page schema
const generateServicePageSchema = (blogData: any, metadata: any) => {
  const baseUrl = "https://www.alliancerecruitmentagency.ca";
  const pageUrl = `${baseUrl}/${blogData?.slug}`;
  const bannerImage = blogData?.bannerImage
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${blogData.bannerImage}`
    : `${baseUrl}/assets/images/header/alliance-new-logo.png`;

  // Build the graph array
  const graphArray: any[] = [
    {
      "@type": "EmploymentAgency",
      "@id": `${baseUrl}/#employmentagency`,
      "name": "Alliance Recruitment Agency Canada",
      "url": `${baseUrl}/`,
      "logo": {
        "@type": "ImageObject",
        "@id": `${baseUrl}/#logo`,
        "url": `${baseUrl}/assets/images/header/alliance-new-logo.png`,
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
      "@type": "Service",
      "@id": `${pageUrl}/#service`,
      "serviceType": blogData?.bannerTitle || "Recruitment Services",
      "name": blogData?.bannerTitle || "Recruitment Services",
      "provider": {
        "@id": `${baseUrl}/#employmentagency`
      },
      "description": metadata?.description || blogData?.seoDescription || ""
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": `${baseUrl}/`,
      "name": "Alliance Recruitment Agency Canada",
      "publisher": {
        "@id": `${baseUrl}/#employmentagency`
      },
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/?s={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}/#webpage`,
      "url": pageUrl,
      "name": metadata?.title || blogData?.seoTitle || "",
      "isPartOf": {
        "@id": `${baseUrl}/#website`
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": bannerImage
      },
      "inLanguage": "en-US",
      "datePublished": blogData?.createdAt || new Date().toISOString(),
      "dateModified": blogData?.updatedAt || new Date().toISOString(),
      "author": {
        "@id": `${baseUrl}/author/anish-malek/#author`
      }
    },
    {
      "@type": "Person",
      "@id": `${baseUrl}/author/anish-malek/#author`,
      "name": "Anish Malek",
      "url": `${baseUrl}/author/anish-malek`,
      "worksFor": {
        "@id": `${baseUrl}/#employmentagency`
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${baseUrl}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": blogData?.bannerTitle || metadata?.title || "",
          "item": pageUrl
        }
      ]
    }
  ];

  return {
    "@context": "https://schema.org",
    "@graph": graphArray
  };
};


const FranchisePreview = dynamic(() => import("@/components/Template/Franchise/Franchise1"));
const LifeAtAllianceDetailsTemplate = dynamic(() => import("@/components/Template/LifeAtAlliance/life-at-alliance-details"));
const LifeAtAllianceTemplate = dynamic(() => import("@/components/Template/LifeAtAlliance/life-at-alliance-international"));
const ServiceTemplate1 = dynamic(() => import("@/components/Template/Service/ServiceTemplate1/Index"));
const ServiceTemplate2 = dynamic(() => import("@/components/Template/Service/service-template-2"));


export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const params = context.params || {};

    let newSlug =
      !params.slug || params.slug.length < 1
        ? params.page
        : `${params.page}/${params.slug}`;

    // Filter out common bot scan patterns (e.g., .php, .js, .sql, .env, etc.)
    const botPatterns = /\.(php|js|sql|env|txt|xml|config|bak|phtml|asp|aspx|jsp|cgi|py|pl|sh|yml|yaml|old|swp)$/i;
    if (typeof newSlug === 'string' && botPatterns.test(newSlug)) {
      return {
        notFound: true,
      };
    }

    // Convert underscores to hyphens for backend compatibility
    // newSlug = newSlug.replace(/_/g, '-');

    let endpoint = params.page === 'life-at-alliance-international' ? 'lifeAtService' : 'getService'
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}?slug=${newSlug}`
    );

    const post = await response.json();

    if (!post || post.status !== 200) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        result: post.data,
        params
      },
    };
  } catch (error) {
    return {
      props: {
        result: null,
      },
    };
  }
};

const Hello = ({ result, params = null }: { result: any, params: string | null }) => {
  const templateMap: any = {
    // franchise_1: FranchisePreview,
    services_1: ServiceTemplate1,
    services_2: ServiceTemplate2,
    services_3: ServiceTemplate3,
    services_4: ServiceTemplate4,
    life_at_alliance_international: LifeAtAllianceTemplate,
    life_at_alliance_international_Details: LifeAtAllianceDetailsTemplate,
    about: AboutUsTemplate,
    services_5: ServiceTemplate5,
    marketing_template: DigitalMarketingServices
  };
  const blogData = result ? result?.blogData : null;
  const authorData = result ? result?.author : null;
  const relatedBlogData = result ? result?.relatedBlog : null;
  const TemplateComponent = templateMap[blogData?.template] || null;
  let slug = blogData?.slug;
  let metadata = generateDynamicMeta({
    meta: {
      title:
        blogData?.template == "life_at_alliance_international_Details"
          ? blogData?.content?.[0].contentTitle
          : blogData?.seoTitle || "",
      description:
        blogData?.template == "life_at_alliance_international_Details"
          ? blogData?.content?.[0].contentTitle
          : blogData?.seoDescription || "",
      slug:
        blogData?.template == "life_at_alliance_international_Details"
          ? blogData?.content?.[0].contentSlug
          : slug || "",
      metaFaq: blogData?.faq,
      articlePublishedTime: blogData?.createdAt,
      articleModifiedTime: blogData?.updatedAt,
      robotindex: `${blogData?.allowIndexing === false ? "noindex" : "index"
        }, ${blogData?.allowSearchEngines === false ? "nofollow" : "follow"
        }`

      // Commented out to prevent duplicate OG image tags - causing 2 times appearance with wrong dimensions (2560x1280)
      // ogImage: {
      //   url: `${process.env.NEXT_PUBLIC_BACKEND_URL}${blogData?.bannerImage || blogData?.content?.[0].contentImage}`,
      //   height: 2560,
      //   width: 1280,
      //   type: 'image/webp',
      // }
    },
  });


  // Check if current page is a service page
  const isServicePage = blogData?.template && (
    blogData.template.startsWith('services_') ||
    blogData.template === 'marketing_template'
  );

  // Check if current page is the About Us page
  const isAboutPage = blogData?.template === 'about';

  // Generate schema for service pages
  const servicePageSchema = isServicePage ? generateServicePageSchema(blogData, metadata) : null;

  // Generate schema for About Us page
  const aboutUsPageSchema = isAboutPage ? generateAboutUsPageSchema(blogData, metadata) : null;

  return (
    <>
      {TemplateComponent ? (
        <>
          <CustomHead {...metadata} />

          {/* Dynamic Service Page Schema */}
          <Head>
            {servicePageSchema && (
              <script
                id="service-page-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageSchema) }}
              />
            )}

            {/* About Us Page Schema */}
            {aboutUsPageSchema && (
              <script
                id="about-us-page-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutUsPageSchema) }}
              />
            )}
          </Head>

          <TemplateComponent
            params={params}
            data={blogData}
            relatedBlogData={relatedBlogData}
            authorData={authorData}
          />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Hello;
