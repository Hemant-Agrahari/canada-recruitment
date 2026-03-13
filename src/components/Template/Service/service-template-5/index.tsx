import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Banner from "@/components/Banner";
import HireTalent from "@/components/HireTalent";
import LatestUpdates from "@/components/LatestUpdates";
import ServicesBanner, {
  BlueBannerImageSection,
  BlueBannerSection,
  Faq,
  FaqI,
  FormBannerSection,
  HeadhuntingIn,
  ImageCardSection,
  sectionTypesT,
  ServiceI,
  SuccessStory,
  SupportYou,
} from "./components";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const index = ({ data }: { data: any }) => {
  return (
    <>
      {/* BANNER */}
      {data?.bannerTitle && (
        <ServicesBanner
          backgroundImage={
            data?.bannerImage && data.bannerImage instanceof File
              ? URL.createObjectURL(data?.bannerImage)
              : typeof data?.bannerImage == "string" &&
                data?.bannerImage.includes("blob")
              ? data?.bannerImage
              : `${backend_url}${data?.bannerImage}`
          }
          title={data?.bannerTitle}
        />
      )}
      <HireTalent />

      {/* service sections */}
      {data?.sections &&
        data.sections.map((section: ServiceI, index: number) => {
          if ((section.sectionType as sectionTypesT) === "blue-banner") {
            if (section.image === "" || !section.image) {
              return <BlueBannerSection data={section} key={index} />;
            } else {
              return <BlueBannerImageSection data={section} key={index} />;
            }
          }
          if ((section.sectionType as sectionTypesT) === "form-banner") {
            return <FormBannerSection data={section} key={index} />;
          }
          if ((section.sectionType as sectionTypesT) === "image-card-banner") {
            return <ImageCardSection data={section} key={index} />;
          }
          if ((section.sectionType as sectionTypesT) === "success-story") {
            return <SuccessStory data={section} key={index} />;
          }
        })}

      {/* FAQ */}
      {data?.faq &&
        data?.faq.length > 0 &&
        data?.faq.every((x: FaqI) => x.answer != "" && x.question != "") && (
          <Faq data={data?.faq} />
        )}

      <HeadhuntingIn />

      <SupportYou />

      <LatestUpdates />

      {/* OpenGraph Meta Tags for Service Pages */}
      <Head>
        <meta property="og:type" content="article"/>
        {data?.bannerImage && (
          <>
            <meta property="og:image" content={`${backend_url}${data.bannerImage}`}/>
            <meta property="og:image:width" content="627"/>
            <meta property="og:image:height" content="504"/>
            <meta property="og:image:type" content="image/webp"/>
          </>
        )}
      </Head>
    </>
  );
};

export default index;
