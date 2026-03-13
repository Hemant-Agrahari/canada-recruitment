import React from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Banner from "@/components/Banner";
import CustomHead from "@/components/Head";
import { Properties } from "csstype";
import meta from "../meta/meta.json";
interface NoticeProps { }
const Notice: React.FC<NoticeProps> = () => {
  const hiddenStyle: Properties = {
    display: "none",
    visibility: "hidden",
  };

  const schema = `{
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
}`;
  return (
    <div>
      <CustomHead {...meta["notice"]} />
      <>
        {/* <!-- main-banner start --> */}
        <Banner
          backgroundImage="/assets/images/fraud-notice.webp"
          title="NOTICE RECRUITMENT FRAUD ALERT"
          alt="Notice Recruitment Fraud Alert - Safeguard Your Career Against Fraudulent Practices"
        />
        {/* <!-- main-banner End --> */}

        <section className="accounting-section">
          <div className="container">
            <div className="row gy-4">
              <div className="notice-pg col-lg-12">
                <h2 className="com-title text-align-left">
                  Official Statement: Alliance Recruitment Agency Canada – Zero
                  Fee Policy for Candidates
                </h2>
                <p className="com-text">
                  A Legal Disclaimer: Zero Fee Policy for Candidates
                </p>
                <p className="com-text">
                  At Alliance, we believe your talent is your currency. So,
                  there are no fees for job seekers. It is only the recruiters
                  who are charged for the services. We always follow this policy
                  carefully in every industry and field we work in.
                </p>
                <p className="com-text">
                  This document is a legal declaration to confirm that the
                  services find use for both job seekers and recruiters.
                  However, only recruiters are charged. Alliance Recruitment
                  Agency Canada does not ask or collect any sum from any
                  candidate. This policy is constant for everyone, whether it is
                  for offer letters or interviews. We strictly do not support
                  any unfair methods or practices.
                </p>
                <h3 className="com-title text-align-left">
                  Legal Terms and Conditions
                </h3>
                <h4
                  className="com-title text-align-left s-title"
                  style={{ fontSize: "16px" }}
                >
                  No Monetary Transactions with Candidates:
                </h4>
                <p className="com-text">
                  Alliance Recruitment Agency Canada has never made any
                  transaction with the candidates who have been employed through
                  our agency. None of our services, such as job placement
                  offers, interviews, and others, are chargeable for candidates.
                </p>
                <p className="com-text">
                  If any candidate gets such messages, please know that our team
                  is not part of it. We do not support such actions by others.
                  Always check carefully before making any payment, and report
                  these act
                </p>
                <h4
                  className="com-title text-align-left s-title"
                  style={{ fontSize: "16px" }}
                >
                  Fraud and Scams:
                </h4>
                <p className="com-text">
                  Any such written message or telephonic conversation is illicit
                  and fraudulent. Alliance Recruitment Agency Canada will not be
                  held responsible for any such payments.
                </p>
                <p className="com-text">
                  Alliance Recruitment Agency Canada will not be responsible if
                  any candidate faces damages after making a monetary payment
                  for any recruitment activity. Kindly be vigilant while
                  receiving any offers.
                </p>
                <h4
                  className="com-title text-align-left s-title"
                  style={{ fontSize: "16px" }}
                >
                  Offer Letters and Communications:
                </h4>
                <p className="com-text">
                  All communication from us will come only through the official
                  email address and phone number listed on the Alliance
                  Recruitment Agency Canada website.
                </p>
                <p className="com-text">
                  If you receive an offer letter or interview notice without our
                  official brand logo, it is not genuine and should be ignored.
                </p>
                <p className="com-text">
                  Alliance Recruitment Agency Canada is not responsible for any
                  documents or communication sent by other parties pretending to
                  represent us. Always verify through our official channels
                  before responding.
                </p>
                <h4
                  className="com-title text-align-left s-title"
                  style={{ fontSize: "16px" }}
                >
                  Acknowledgement for Candidates:
                </h4>
                <p className="com-text">
                  Job seekers acknowledge not receiving any payment request for
                  our recruitment services during their engagement with Alliance
                  Recruitment Agency Canada.
                </p>
                <p className="com-text">
                  Alliance Recruitment Agency Canada will not be held
                  responsible for any dispute between a candidate and any other
                  entity after such payment.
                </p>
                <h4
                  className="com-title text-align-left s-title"
                  style={{ fontSize: "16px" }}
                >
                  Alliance.au’s Official Communication Channels:
                </h4>
                <p className="com-text">
                  All official communication from Alliance Recruitment Agency
                  Canada will only be sent from our official email address and
                  phone number. If you or someone you know receives a
                  communication from any other channel, kindly report it to our
                  team as soon as possible.
                </p>
                <p className="com-text">
                  Any communication from Alliance Recruitment Agency Canada will
                  have our visible brand logo, signatures, and identifiable
                  markers.
                </p>
                <h4
                  className="com-title text-align-left s-title"
                  style={{ fontSize: "16px" }}
                >
                  No Guarantees or Job Commitments:
                </h4>
                <p className="com-text">
                  Your association with Alliance Recruitment Agency Canada does
                  not guarantee you any job placement. If any entity claims
                  otherwise, it is fake and must be ignored.
                </p>
                <p className="com-text">
                  We at Alliance Recruitment Agency Canada do not make you sign
                  contracts regarding offer letters and placements or ask for
                  any fee. Such claims are fraudulent and must be ignored.
                </p>
                <h4
                  className="com-title text-align-left s-title"
                  style={{ fontSize: "16px" }}
                >
                  Reporting Fraudulent Activity:
                </h4>
                <p className="com-text">
                  If a job seeker receives any communication from an entity
                  claiming to be affiliated with us and is charged a fee, kindly
                  ignore it.
                </p>
                <p className="com-text">
                  We at Alliance Recruitment Agency Canada take any scam or
                  fraud very seriously. We ensure complete cooperation in any
                  legal investigations.
                </p>
                <h4
                  className="com-title text-align-left s-title"
                  style={{ fontSize: "16px" }}
                >
                  Legal Protections for Alliance Recruitment Agency Canada:
                </h4>
                <p className="com-text">
                  If any person or entity misuses our identity, Alliance
                  Recruitment Agency Canada reserves the right to take action.
                </p>
                <p className="com-text">
                  Alliance Recruitment Agency Canada isn't responsible if you
                  lose money because of these kinds of payments. This legal
                  document is just to make sure our agency is protected from any
                  claims for money. All candidates are advised to record any
                  communication regarding job placements and verify its
                  authenticity with us.
                </p>
                <h5>Job seekers should ensure the following:</h5>
                <p className="com-text ms-3">
                  They should maintain a record of all documents received from
                  Alliance Recruitment Agency Canada.
                </p>
                <p className="com-text ms-3">
                  They should cross-check that all the communications are
                  received from the official channels of Alliance Recruitment
                  Agency Canada.
                </p>
                <h4 className="com-title text-align-left">
                  Conclusion and Candidate Responsibility:
                </h4>
                <p className="com-text">
                  Alliance Recruitment Agency Canada protects all the interests and rights of all individuals and entities associated with us. We maintain complete transparency in the recruitment process to ensure we comply with the legalities and involve no monetary payment from either party.

                </p>
                <p className="com-text">
                  With this declaration, we confirm that Alliance Recruitment Agency Canada never asks for any kind of payment in exchange for job opportunities. Any such request is fraudulent. This remains our official stance and will be used as a proof in any investigation or legal situation to confirm our zero-fee policy for candidates.

                </p>
                <p className="com-text">
                  If you have any questions, concerns, or doubts about suspicious activities or job offers, we strongly advise you to reach out to our team through the official contact details provided on our website.

                </p>
                <p className="com-text">
                  Alliance Recruitment Agency Canada

                  <br />
                  <Link href="https://www.alliancerecruitmentagency.ca/">
                    https://www.alliancerecruitmentagency.ca/
                  </Link>
                  <br />
                  Date: 6/18/2025
                </p>
              </div>
              {/* <div className="col-lg-6 align-self-center">
                            <picture>
                                <source srcSet="/assets/images/indus-1.webp" type="image/webp" />
                                <source srcSet="/assets/images/indus-1.png" type="image/png" />
                                <Image width={100} height={100} data-src="/assets/images/indus-1.webp" src="/assets/images/indus-1.webp" alt="Notice Recruitment Fraud Alert - Alliance Recruitment Agency" title="Notice Recruitment Fraud Alert - Alliance Recruitment Agency" className="w-100 h-100" loading="lazy" />
                            </picture>
                        </div> */}
            </div>
          </div>
        </section>

        {/* <noscript dangerouslySetInnerHTML={{ __html: tagmanager }} /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema }}
        />
      </>
    </div>
  );
};
export default Notice;
