import React from "react";
import Image from "next/image";
import Banner from "@/components/Banner";
import CustomHead from "@/components/Head";
import { Properties } from "csstype";
import meta from "../meta/meta.json";
import FranchiseEnquiryForm from "@/components/forms/franchiseEnquiry";
const FranchiseEnquiry: React.FC = () => {
  const hiddenStyle: Properties = {
    display: "none",
    visibility: "hidden",
  };
  
  const script1 = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.alliancerecruitmentagency.ae/#organization",
      "name": "Alliance Recruitment Agency",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.alliancerecruitmentagency.ae/#logo",
        "url": "https://allianceae-10072.kxcdn.com/wp-content/uploads/2023/02/Alliance.ae_.png",
        "caption": "Alliance Recruitment Agency",
        "inLanguage": "en-US"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.alliancerecruitmentagency.ae/#website",
      "url": "https://www.alliancerecruitmentagency.ae/",
      "name": "Alliance Recruitment Agency",
      "publisher": {
        "@id": "https://www.alliancerecruitmentagency.ae/#organization"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "Person",
      "@id": "https://www.alliancerecruitmentagency.ae/author/allianceadmin/",
      "name": "Pallavi Chawla",
      "image": {
        "@type": "ImageObject",
        "@id": "https://allianceae-10072.kxcdn.com/wp-content/uploads/2021/05/aut-avtar.jpg",
        "url": "https://allianceae-10072.kxcdn.com/wp-content/uploads/2021/05/aut-avtar.jpg",
        "caption": "Pallavi Chawla",
        "inLanguage": "en-US"
      },
      "sameAs": [
        "https://www.alliancerecruitmentagency.ae/"
      ],
      "worksFor": {
        "@id": "https://www.alliancerecruitmentagency.ae/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.alliancerecruitmentagency.ae/thank-you-franchise/#webpage",
      "url": "https://www.alliancerecruitmentagency.ae/thank-you-franchise/",
      "name": "Thank you Franchise",
      "datePublished": "2020-12-31T11:43:00Z",
      "dateModified": "2021-07-08T11:27:00Z",
      "author": {
        "@id": "https://www.alliancerecruitmentagency.ae/author/allianceadmin/"
      },
      "isPartOf": {
        "@id": "https://www.alliancerecruitmentagency.ae/#website"
      },
      "primaryImageOfPage": {
        "@id": "https://allianceae-10072.kxcdn.com/wp-content/uploads/2023/02/Alliance.ae_.png"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "Article",
      "headline": "Thank you Franchise",
      "datePublished": "2020-12-31T11:43:00Z",
      "dateModified": "2021-07-08T11:27:00Z",
      "author": {
        "@type": "Person",
        "name": "Pallavi Chawla",
        "url": "https://www.alliancerecruitmentagency.ae/author/allianceadmin/"
      },
      "description": "",
      "name": "Thank you Franchise",
      "@id": "https://www.alliancerecruitmentagency.ae/thank-you-franchise/#schema-5710",
      "isPartOf": {
        "@id": "https://www.alliancerecruitmentagency.ae/thank-you-franchise/#webpage"
      },
      "publisher": {
        "@id": "https://www.alliancerecruitmentagency.ae/#organization"
      },
      "image": {
        "@id": "https://allianceae-10072.kxcdn.com/wp-content/uploads/2023/02/Alliance.ae_.png"
      },
      "inLanguage": "en-US",
      "mainEntityOfPage": {
        "@id": "https://www.alliancerecruitmentagency.ae/thank-you-franchise/#webpage"
      }
    }
  ]
}
`;
  const script2 = `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Alliance Recruitment Agency",
  "image": "https://allianceae-10072.kxcdn.com/wp-content/uploads/2023/02/Alliance.ae_.png",
  "@id": "https://www.alliancerecruitmentagency.ae/#organization",
  "url": "https://www.alliancerecruitmentagency.ae/",
  "telephone": "+918980018741",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "B-707 MONDEAL SQUARE Sarkhej - Gandhinagar Hwy, Prahlad Nagar",
    "addressLocality": "Ahmedabad",
    "addressRegion": "Gujarat",
    "postalCode": "380015",
    "addressCountry": "India"
  },
  "sameAs": [
    "https://www.facebook.com/Alliancerecruitmentagency/",
    "https://www.youtube.com/channel/UCTWg4i7ZXx1NTJ59SP8Nxrw",
    "https://www.linkedin.com/company/alliance-recruitment-agency/",
    "https://twitter.com/career_alliance"
  ]
}
`;
  const script3 = `{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.alliancerecruitmentagency.ae/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Thank you Franchise",
      "item": "https://www.alliancerecruitmentagency.ae/thank-you-franchise/"
    }
  ]
}
`;

  return (
    <>
      <CustomHead {...meta["franchise-enquiry"]} />
      <>
        <Banner
          backgroundImage="/assets/images/recruitment-agency-franchise.webp"
          title="Franchise Enquiry"
          alt="Franchise Enquiry - Alliance Recruitment Agency UAE: Explore Business Opportunities"
        />
        {/* <!-- Accountant Hiring start --> */}
        <section className="accountant-hiring">
          <div className="container-fluid c-pad-x">
            <div className="row">
              <div className="col-lg-12">
                <h2 className="com-title text-align-left">FRANCHISE INQUIRY</h2>
                <p className="com-text">
                  We are looking forward to expand our business in other
                  locations Globaly by allotting franchises. Interested
                  parties/persons are requested to fill up the form below after
                  checking the prerequisites.
                </p>
                <h3 className="com-title s-title">PRE-REQUISITES:</h3>
                <ul className="fe-ul">
                  <li>
                    Considerable Experience in the same or similar service
                    industry.
                  </li>
                  <li>Should have contacts in relevant client industries.</li>
                  <li>
                    Willingness to grow along with the company and grow the
                    Brand.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Accountant Hiring End --> */}

        {/* {apiResponse && (
                    <div>
                        <h2>API Response:</h2>
                        <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                    </div>
                )} */}
        {/* <!-- two-text-section start--> */}
        <section className="mid-text-section">
          <div className="container-fluid c-pad-x">
            <div className="text-wrapper row gx-lg-5">
              <div className="right-side  align-self-center">
                <div className="hire-a-candidate-form">
                  <div className="hire-cad-bg">
                    <Image
                      src="/assets/images/form-bg.svg"
                      alt="cadidate image"
                      title="cadidate image"
                      width={100}
                      height={100}
                      loading="lazy"
                      className="w-100 h-100"
                    />
                  </div>
                  <h3 className="com-title text-center s-title mb-3">
                    FRANCHISE INQUIRY
                  </h3>
                  <p className="com-para text-center">
                    We are looking forward to expand our business in other
                    locations Globaly by allotting franchises. Interested
                    parties/persons are requested to fill up the form below
                    after checking the prerequisites.
                  </p>
                  <FranchiseEnquiryForm />
                </div>
                {/* <script src="../common/js/intlTelInput.js"></script>
                                        <link rel="stylesheet" href="../common/css/intlTelInput.css">
                                            <script>
                                                var input = document.querySelector("#mobilenumber");
                                                window.intlTelInput(input, {
                                                    geoIpLookup: function(callback) {
                                                    fetch("https://ipapi.co/json")
                                                        .then(function (res) { return res.json(); })
                                                        .then(function (data) { callback(data.country_code); })
                                                        .catch(function () { callback("us"); });
                        },
                                                initialCountry: "auto",
                                                hiddenInput: "phone_number",
                                                separateDialCode: true,
                                                utilsScript: "../common/js/utils.js",
                    });
                                            </script> */}
              </div>
            </div>
          </div>
        </section>
        {/* <!-- two-text-section End--> */}

        {/* <!-- Hire talent start --> */}
        <section className="hire-talent pt-0">
          <h3 className="com-title text-center s-title mb-1">
            Our Branches in UAE, USA, Europe, Australia, Africa India
          </h3>
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/dubai.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/dubai.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/dubai.webp"
                      src="/assets/images/contact-us-images/dubai.webp"
                      loading="lazy"
                      alt=" Alliance Global Presence with Branches in Dubai
                                        "
                      title=" Alliance Global Presence with Branches in Dubai
                                        "
                      className="img-fluid w-100 h-100"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">DUBAI</h3>
                  <p className="com-text">Silicon Oasis, Dubai, UAE</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/houston.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/houston.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/houston.webp"
                      src="/assets/images/contact-us-images/houston.webp"
                      loading="lazy"
                      alt="Alliance Global Presence: Houston Branch - Contact Us for International Services"
                      title="Alliance Global Presence: Houston Branch - Contact Us for International Services"
                      className="img-fluid w-100 h-100"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">HOUSTON</h3>
                  <p className="com-text">77429, Texas, USA</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/poland.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/poland.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/poland.webp"
                      src="/assets/images/contact-us-images/poland.webp"
                      loading="lazy"
                      alt="Alliance's International Reach: Branches Across the Globe, Including Poland"
                      title="Alliance's International Reach: Branches Across the Globe, Including Poland"
                      className="img-fluid w-100 h-100"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">POLAND</h3>
                  <p className="com-text">Opole, Poland</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/australia.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/australia.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/australia.webp"
                      src="/assets/images/contact-us-images/australia.webp"
                      loading="lazy"
                      alt="Alliance Worldwide Network: Expanding Reach with Branches in Australia"
                      title="Alliance Worldwide Network: Expanding Reach with Branches in Australia"
                      className="img-fluid w-100 h-100"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">AUSTRALIA</h3>
                  <p className="com-text">Sydney, Australia</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/mauritius.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/mauritius.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/mauritius.webp"
                      src="/assets/images/contact-us-images/mauritius.webp"
                      loading="lazy"
                      alt="Alliance Branch in Mauritius"
                      title="Alliance Branch in Mauritius"
                      className="img-fluid w-100 h-100"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">MAURITIUS</h3>
                  <p className="com-text">
                    City of Phoenix, Republic of Mauritius
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/africa.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/africa.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/africa.webp"
                      src="/assets/images/contact-us-images/africa.webp"
                      loading="lazy"
                      alt="Alliance Africa Branch Location
"
                      title="Alliance Africa Branch Location
"
                      className="img-fluid w-100 h-100"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">AFRICA</h3>
                  <p className="com-text">Angola, Africa</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/pune-img.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/pune-img.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/pune-img.webp"
                      src="/assets/images/contact-us-images/pune-img.webp"
                      loading="lazy"
                      alt="Alliance Global Reach: Pune Branch - Extending Our Presence in India and Beyond"
                      title="Alliance Global Reach: Pune Branch - Extending Our Presence in India and Beyond"
                      className="img-fluid w-100 h-100"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">PUNE</h3>
                  <p className="com-text">Chikhali, Pune - 412114</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/vadodara-img.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/vadodara-img.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/vadodara-img.webp"
                      src="/assets/images/contact-us-images/vadodara-img.webp"
                      loading="lazy"
                      alt="Alliance's Vadodara Branch - Part of Our Global Presence"
                      title="Alliance's Vadodara Branch - Part of Our Global Presence"
                      className="img-fluid w-100 h-100"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">VADODARA</h3>
                  <p className="com-text">
                    Karelibaug, Vadodara - 390018, Gujarat
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/haridwar-img.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/haridwar-img.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/haridwar-img.webp"
                      src="/assets/images/contact-us-images/haridwar-img.webp"
                      loading="lazy"
                      alt="Alliance Global Presence - Branches in Haridwar, India"
                      title="Alliance Global Presence - Branches in Haridwar, India"
                      className="img-fluid w-100 h-100"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">HARIDWAR</h3>
                  <p className="com-text">Jamuna Lane Haridwar - 249401</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/kolkata.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/kolkata.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/kolkata.webp"
                      src="/assets/images/contact-us-images/kolkata.webp"
                      loading="lazy"
                      alt="Alliance Global Presence: Branches in Kolkata and Worldwide"
                      title="Alliance Global Presence: Branches in Kolkata and Worldwide"
                      className="img-fluid w-100 h-100"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">KOLKATA</h3>
                  <p className="com-text">
                    Howrah, Kolkata, West Bengal - 711104
                    <br />
                    Webel IT park, Kolkata - 741235
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/hyderabad.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/hyderabad.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/hyderabad.webp"
                      src="/assets/images/contact-us-images/hyderabad.webp"
                      loading="lazy"
                      alt="Alliance Global Presence: Hyderabad Branch – Connecting Worlds, Creating Solutions"
                      className="img-fluid w-100 h-100"
                      title="Alliance Global Presence: Hyderabad Branch – Connecting Worlds, Creating Solutions

"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">HYDERABAD</h3>
                  <p className="com-text">
                    502032, Telangana
                    <br />
                    500082, Telangana
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/delhi.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/delhi.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/delhi.webp"
                      src="/assets/images/contact-us-images/delhi.webp"
                      loading="lazy"
                      alt="Contact Alliance: Delhi Office - Reach Us for Collaborative Solutions"
                      title="Contact Alliance: Delhi Office - Reach Us for Collaborative Solutions"
                      className="img-fluid w-100 h-100"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">DELHI</h3>
                  <p className="com-text">110001, Delhi/NCR</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/chandigarh.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/chandigarh.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/chandigarh.webp"
                      src="/assets/images/contact-us-images/chandigarh.webp"
                      loading="lazy"
                      alt="Alliance Contact Us - Chandigarh Branch Location"
                      title="Alliance Contact Us - Chandigarh Branch Location"
                      className="img-fluid w-100 h-100"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">CHANDIGARH</h3>
                  <p className="com-text">160047, Chandigarh</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/tamil-nadu.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/tamil-nadu.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/tamil-nadu.webp"
                      src="/assets/images/contact-us-images/tamil-nadu.webp"
                      loading="lazy"
                      alt="Contact Us - Alliance Chennai Office: Seamless Solutions and Support"
                      title="Contact Us - Alliance Chennai Office: Seamless Solutions and Support"
                      className=" img-fluid w-100 h-100"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">CHENNAI</h3>
                  <p className="com-text">
                    Tamil Nadu, 600130 <br />
                    Chennai, 600062
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/rourkela-odisha.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/rourkela-odisha.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/rourkela-odisha.webp"
                      src="/assets/images/contact-us-images/rourkela-odisha.webp"
                      loading="lazy"
                      alt="Alliance Contact Us - Rourkela, Odisha Branch: Navigating Excellence in Services and Solutions"
                      title="Alliance Contact Us - Rourkela, Odisha Branch: Navigating Excellence in Services and Solutions"
                      className="img-fluid w-100 h-100"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">ODISHA</h3>
                  <p className="com-text">Rourkela, Odisha - 769015</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/maharastra.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/maharastra.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/maharastra.webp"
                      src="/assets/images/contact-us-images/maharastra.webp"
                      loading="lazy"
                      alt="Contact Alliance in Maharashtra - Reach Out for Expert Solutions and Services
"
                      title="Contact Alliance in Maharashtra - Reach Out for Expert Solutions and Services
"
                      className="img-fluid w-100 h-100"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">MAHARASHTRA</h3>
                  <p className="com-text">Kalyan - 421301, Thane</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 hire-card-col">
                <div className="hire-card">
                  <picture>
                    <source
                      srcSet="/assets/images/contact-us-images/agra.webp"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/contact-us-images/agra.png"
                      type="image/png"
                    />
                    <Image
                      width={200}
                      height={200}
                      data-src="/assets/images/contact-us-images/agra.webp"
                      src="/assets/images/contact-us-images/agra.webp"
                      loading="lazy"
                      alt="Alliance Contact Us - Agra Branch Location Image"
                      title="Alliance Contact Us - Agra Branch Location Image"
                      className="img-fluid w-100 h-100"
                    />
                  </picture>
                  <h3 className="hire-title mb-1">AGRA</h3>
                  <p className="com-text">Agra, 282007</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        <script
          type="application/ld+json"
          className="rank-math-schema"
          dangerouslySetInnerHTML={{ __html: script1 }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: script2 }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: script3 }}
        />
      </>
    </>
  );
};
export default FranchiseEnquiry;
