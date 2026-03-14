import { useLazyTawk } from "@/utils/useLazyTawk";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import React from "react";
interface metaFaq {
  question: string;
  answer: string;
}
interface CustomHeadProps {
  title?: string;
  robotindex?: string;
  description?: string;
  keywords?: string;
  canonicalURL?: string;
  ogImage?: {
    url: string;
    width: number;
    height: number;
    type: string;
  } | null;
  author?: string;
  twitterCard?: string;
  twitterdescription?: string;
  twittertitle?: string;
  sitename?: string;
  Ogdescription?: string;
  Ogtitle?: string;
  ogLocale?: string;
  OgUrl?: string;
  ogType?: string;
  ogModifiedTime?: string;
  metaFaq?: metaFaq[];
  articlePublisher?: string;
  articlePublishedTime?: string,
  articleModifiedTime?: string,
  twitterLable1?: string;
  twitterLable2?: string;
  twitterData1?: string;
  twitterData2?: string;
  schema?: any;

}
const CustomHead: React.FC<CustomHeadProps> = ({
  title,
  description,
  canonicalURL,
  author,
  twitterCard,
  twittertitle,
  twitterdescription,
  sitename,
  Ogdescription,
  Ogtitle,
  OgUrl,
  metaFaq,
  ogModifiedTime,
  ogType,
  ogLocale,
  keywords,
  ogImage,
  robotindex,
  articlePublisher,
  articlePublishedTime,
  articleModifiedTime,
  twitterData1,
  twitterData2,
  twitterLable1,
  twitterLable2,
  schema,


}) => {
  // const scripttawk = `
  // setTimeout(() => {
  //   tawkCall();
  // }, 2000);
  // function tawkCall(){
  //   var Tawk_API = Tawk_API || {},
  //   Tawk_LoadStart = new Date();
  //   (function() {
  //     var s1 = document.createElement("script"),
  //     s0 = document.getElementsByTagName("script")[0];
  //     s1.async = true;
  //     s1.src = 'https://embed.tawk.to/586380cfddb8373fd2b4a378/default';
  //     s1.charset = 'UTF-8';
  //     s1.setAttribute('crossorigin', '*');
  //     s0.parentNode.insertBefore(s1, s0);
  //   })();
  // }
  // `;

  useLazyTawk();


  const faqScriptSchema =
    metaFaq && metaFaq.every((x) => x.answer != '' && x.question != '') &&
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: metaFaq.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    });

  const router = useRouter();
  const isArabic = router.asPath.includes("/ar")
  const path = router.asPath;
  const headLinks = [
    {
      pathId: "/ar/hospitality-recruitment-agency-dubai",
      href: "hospitality-recruitment-agency-dubai",
    },
    {
      pathId: "/ar/nursing-recruitment-agency-dubai",
      href: "nursing-recruitment-agency-dubai",
    },
    {
      pathId: "/ar/cruise-ship-recruitment-agency-in-dubai",
      href: "cruise-ship-recruitment-agency-in-dubai",
    },
    {
      pathId: "/ar/teacher-recruitment-agencies-in-dubai",
      href: "teacher-recruitment-agencies-in-dubai",
    },
    {
      pathId: "/ar/philippine-recruitment-agency-in-dubai",
      href: "philippine-recruitment-agency-in-dubai",
    },
    {
      pathId: "/ar/manpower-agency-dubai",
      href: "manpower-agency-dubai",
    },
  ]
  const filteredPath = headLinks.filter((item) => item.pathId === path);
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="profile" href="https://gmpg.org/xfn/11" />
      <link rel="preconnect" href="https://allianceae-10072.kxcdn.com" />
      <link rel='dns-prefetch' href='//www.googletagmanager.com' />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link
        rel="icon"
        href="/favicon.png"
        type="image/x-icon"
      />
      <meta name="robots" content={robotindex} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {canonicalURL && <link rel="canonical" href={canonicalURL} />}
      {ogType && <meta property="og:type" content={ogType} />}
      {ogModifiedTime && (
        <meta property="article:modified_time" content={ogModifiedTime} />
      )}
      {ogImage?.url && <meta property="og:image" content={ogImage?.url} />}
      {ogImage?.width && <meta property="og:image:width" content={ogImage?.width.toString()} />}
      {ogImage?.height && <meta property="og:image:height" content={ogImage?.height.toString()} />}
      {ogImage?.type && <meta property="og:image:type" content={ogImage?.type} />}
      <meta property="og:url" content={OgUrl} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:title" content={Ogtitle} />
      <meta property="og:description" content={Ogdescription} />
      <meta property="og:site_name" content={sitename} />
      <meta name="twitter:title" content={twittertitle} />
      <meta name="twitter:description" content={twitterdescription}></meta>
      <meta name="author" content={author} />
      <meta name="twitter:card" content="summary_large_image" />
      {twitterLable1 && <meta name="twitter:label1" content={twitterLable1} />}
      {twitterData1 && <meta name="twitter:data1" content={twitterData1} />}
      {twitterLable2 && <meta name="twitter:label2" content={twitterLable2} />}
      {twitterData2 && <meta name="twitter:data2" content={twitterData2} />}
      {articlePublisher && <meta property="article:publisher" content={articlePublisher} />}
      {articlePublishedTime && <meta property="article:published_time" content={articlePublishedTime} />}
      {articleModifiedTime && <meta property="article:modified_time" content={articleModifiedTime} />}

      {isArabic && (
        <>

          <link rel="alternate" hrefLang="x-default" href={`https://www.alliancerecruitmentagency.ae/${filteredPath[0]?.href}`} />
          <link rel="alternate" hrefLang="ar-AE" href={`https://www.alliancerecruitmentagency.ae/ar/${filteredPath[0]?.href}`} />
        </>
      )}
      {/* <Script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W4SGHZMC');`,
          }}
        /> */}

      {/* <Script
            defer
            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
            type="text/javascript"
          />

      <Script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXXXXX');
              `,
            }}
          /> */}


      <Script
        strategy="lazyOnload"
        type="text/javascript"
        src="https://cdn.callrail.com/companies/796523789/224d94edc35e55312468/12/swap.js"
        async
      />
      {faqScriptSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqScriptSchema }}
        />
      )}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {/* <script type="text/javascript" src="../assets/scripts/jQuery.js" async />
      <script src="../assets/scripts/bootstrap5.js" async />
      <script src="../assets/scripts/owl.carousel.min.js" async /> */}

    </Head>
  );
};

export default CustomHead;
