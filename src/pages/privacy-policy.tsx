import React from "react";

import Banner from "@/components/Banner";
import CustomHead from "@/components/Head";
import { Properties } from "csstype";
import meta from "../meta/meta.json";
import Image from "next/image";

interface PrivacyPolicyProps { }
const PrivacyPolicy: React.FC<PrivacyPolicyProps> = () => {
  const hiddenStyle: Properties = {
    display: "none",
    visibility: "hidden",
  };

  const schemaData = `{
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
      <CustomHead {...meta["privacy-policy"]} />
      <>
        {/* <!-- main-banner start --> */}
        <Banner
          backgroundImage="/assets/images/privacy-policy.png"
          title="Privacy Policy"
          alt="Privacy Policy"
        />
        {/* <!-- main-banner End --> */}

        <section className="mid-text-section" id="ContactForm">
          <div className="container-fluid c-pad-x">

            {/* TITLE */}
            <div className="text-wrapper row gx-lg-5">
              <div className="left-side col-lg-12 align-self-center">
                <h2 className="com-title text-start fw-bold">Privacy Policy</h2>
                <p className="com-text">
                  <strong>Last updated:</strong> 01 January 2026
                </p>
                <p className="com-text">
                  Alliance Recruitment Agency Canada ("Company", "we", "our", "us") is committed
                  to protecting the privacy and personal information of visitors, candidates,
                  clients, and partners who access our website{" "}
                  <a
                    href="https://www.alliancerecruitmentagency.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                  >
                    https://www.alliancerecruitmentagency.ca
                  </a>{" "}
                  (the "Website").
                </p>
                <p className="com-text">
                  This Privacy Policy explains how we collect, use, disclose, store, and protect
                  personal information in accordance with applicable Canadian privacy laws,
                  including the Personal Information Protection and Electronic Documents Act
                  (PIPEDA) and applicable provincial privacy legislation.
                </p>
              </div>
            </div>

            {/* 1 */}
            <div className="text-wrapper row gx-lg-5">
              <div className="left-side col-lg-12 align-self-center">
                <h2 className="com-title text-start">
                  1. Accountability and Organization Information
                </h2>
                <p className="com-text">
                  Alliance Recruitment Agency Canada is part of the Alliance Recruitment Agency
                  global group and provides recruitment, staffing, RPO, executive search, and HR
                  services across Canada and internationally.
                </p>
                <p className="com-text">
                  For privacy-related enquiries or requests, you may contact us at:
                  <br />
                  Email:{" "}
                  <a
                    href="mailto:sales@alliancerecruitmentagency.com"
                    className="text-primary"
                  >
                    sales@alliancerecruitmentagency.com
                  </a>
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="text-wrapper row gx-lg-5">
              <div className="left-side col-lg-12 align-self-center">
                <h2 className="com-title text-start">
                  2. Personal Information We Collect
                </h2>
                <p className="com-text">
                  We may collect the following types of personal information:
                </p>

                <p className="com-text fw-bold">a) Information You Provide Directly</p>
                <ul className="list-unstyled">
                  <li className="d-flex mb-2"><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Name, email address, telephone number</li>
                  <li className="d-flex mb-2"><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Company name, job title, and business contact details</li>
                  <li className="d-flex mb-2"><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Resumes/CVs, employment history, education, skills, and references</li>
                  <li className="d-flex mb-2"><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Enquiry details submitted via forms, email, or business communications</li>
                  <li className="d-flex mb-2"><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Any other information you voluntarily provide</li>
                </ul>

                <p className="com-text fw-bold">b) Information Collected Automatically</p>
                <ul className="list-unstyled">
                  <li className="d-flex mb-2"><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> IP address and approximate location</li>
                  <li className="d-flex mb-2"><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Browser type, device information, and operating system</li>
                  <li className="d-flex mb-2"><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Website usage data, pages visited, and referral sources</li>
                  <li className="d-flex mb-2"><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Cookies and similar tracking technologies (see Section 6)</li>
                </ul>
              </div>
            </div>

            {/* 3 */}
            <div className="text-wrapper row gx-lg-5">
              <div className="left-side col-lg-12 align-self-center">
                <h2 className="com-title text-start">
                  3. Purposes for Collecting Personal Information
                </h2>
                <p className="com-text">We collect personal information for the following purposes:
                </p>
                <ul className="list-unstyled">
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Providing recruitment, staffing, and HR-related services</li>
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Assessing, shortlisting, and placing candidates with employers</li>
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Communicating with clients, candidates, and business partners</li>
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Managing enquiries, agreements, and professional relationships</li>
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Improving website functionality, services, and user experience</li>
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Complying with legal, regulatory, and contractual obligations</li>
                </ul>
              </div>
            </div>

            {/* 4 */}
            <div className="text-wrapper row gx-lg-5">
              <div className="left-side col-lg-12 align-self-center">
                <h2 className="com-title text-start">4. Consent</h2>
                <p className="com-text">
                  We obtain consent for the collection, use, and disclosure of personal
                  information, except where otherwise permitted or required by law.
                  Consent may be expressed or implied depending on the nature of the
                  information and purpose of collection. You may withdraw consent at
                  any time, subject to legal or contractual restrictions and reasonable notice.
                </p>
              </div>
            </div>

            {/* 5 */}
            <div className="text-wrapper row gx-lg-5">
              <div className="left-side col-lg-12 align-self-center">
                <h2 className="com-title text-start">
                  5. Disclosure of Personal Information
                </h2>
                <p className="com-text">We do not sell personal information .Personal information may be disclosed to:
                </p>
                <ul className="list-unstyled">
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Clients and employers for recruitment and placement purposes</li>
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Group companies within the Alliance Recruitment Agency network</li>
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Trusted third-party service providers (IT systems, CRM, analytics, communication platforms)</li>
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Government or regulatory authorities, where required by law</li>
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> All third parties are required to safeguard personal information and use it only for authorised purposes</li>
                </ul>
              </div>
            </div>

            {/* 6 */}
            <div className="text-wrapper row gx-lg-5">
              <div className="left-side col-lg-12 align-self-center">
                <h2 className="com-title text-start">
                  6 .Cookies and Tracking Technologies
                </h2>
                <ul className="list-unstyled">
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Making the website work properly</li>
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Analyse traffic and performance</li>
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Improving user experience</li>
                </ul>
                <p className="com-text">
                  You can manage or disable cookies, but some website features may not work.
                </p>
              </div>
            </div>

            {/* 7 */}
            <div className="text-wrapper row gx-lg-5">
              <div className="left-side col-lg-12 align-self-center">
                <h2 className="com-title text-start">
                  7. Retention of Personal Information
                </h2>
                <p className="com-text">
                  We keep personal information only as long as needed for stated purposes
                  or legal requirements. Candidate information may be retained for future
                  opportunities unless a deletion request is made.
                </p>
              </div>
            </div>

            {/* 8 */}
            <div className="text-wrapper row gx-lg-5">
              <div className="left-side col-lg-12 align-self-center">
                <h2 className="com-title text-start">8. Safeguards</h2>
                <p className="com-text">
                  We use appropriate administrative, technical, and physical safeguards
                  to protect personal information against loss, theft, unauthorised access,
                  disclosure, copying, use, or modification. Despite these measures, no
                  method of electronic transmission or storage is completely secure.
                </p>
              </div>
            </div>

            {/* 9 */}
            <div className="text-wrapper row gx-lg-5">
              <div className="left-side col-lg-12 align-self-center">
                <h2 className="com-title text-start">9. Cross-Border Transfers</h2>
                <p className="com-text">
                  As part of our global recruitment network, personal information may be
                  transferred to countries outside Canada. Your information may also be
                  processed in those countries. We protect these transfers by using
                  safeguards that comply with Canadian privacy laws.
                </p>
              </div>
            </div>

            {/* 10 */}
            <div className="text-wrapper row gx-lg-5">
              <div className="left-side col-lg-12 align-self-center">
                <h2 className="com-title text-start">10. Access and Correction Rights</h2>
                <p className="com-text">You have the right to:</p>
                <ul className="list-unstyled">
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Request access to the personal information we hold about you</li>
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Request correction of inaccurate or incomplete information</li>
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Withdraw consent, subject to legal limitations</li>
                  <li><Image width={20} height={20} src="/assets/tick-blue.png" alt="tick" className="me-2 mt-1" /> Challenge our compliance with applicable privacy laws</li>
                </ul>
                <p className="com-text">
                  Requests may be submitted by contacting{" "}
                  <a href="mailto:sales@alliancerecruitmentagency.com" className="text-primary">
                    sales@alliancerecruitmentagency.com
                  </a>.
                </p>
              </div>
            </div>

            {/* 11 */}
            <div className="text-wrapper row gx-lg-5">
              <div className="left-side col-lg-12 align-self-center">
                <h2 className="com-title text-start">11. Third-Party Websites</h2>
                <p className="com-text">
                  We are not responsible for the privacy practices or the content of any
                  third-party websites linked from our platform.
                </p>
              </div>
            </div>

            {/* 12 */}
            <div className="text-wrapper row gx-lg-5">
              <div className="left-side col-lg-12 align-self-center">
                <h2 className="com-title text-start">12. Children’s Privacy</h2>
                <p className="com-text">
                  Our services are not intended for individuals under the age of 16.
                  We do not knowingly collect personal information from children.
                </p>
              </div>
            </div>

            {/* 13 */}
            <div className="text-wrapper row gx-lg-5">
              <div className="left-side col-lg-12 align-self-center">
                <h2 className="com-title text-start">13. Changes to This Privacy Policy</h2>
                <p className="com-text">
                  Our Privacy Policy is subject to change to meet the changes in legal
                  requirements or data practices. We will publish the new updates on
                  this page with a revised "Last updated" date.
                </p>
              </div>
            </div>

            {/* 14 */}
            <div className="text-wrapper row gx-lg-5">
              <div className="left-side col-lg-12 align-self-center">
                <h2 className="com-title text-start">14. Contact Information</h2>
                <p className="com-text"> Please direct any inquiries or requests concerning our privacy practices to:</p>
                <p className="com-text">
                  Alliance Recruitment Agency Canada
                  <br />
                  Email:{" "}
                  <a href="mailto:sales@alliancerecruitmentagency.com" className="text-primary">
                    sales@alliancerecruitmentagency.com
                  </a>
                </p>
                <p className="com-text">
                  By using this Website, you acknowledge that you have read and understood
                  this Privacy Policy.
                </p>
              </div>
            </div>

          </div>
        </section>


        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaData }}
        />
      </>
    </div>
  );
};
export default PrivacyPolicy;
