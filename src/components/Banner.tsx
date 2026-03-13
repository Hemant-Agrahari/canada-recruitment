import React, { memo, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

interface BannerProps {
  backgroundImage: string;
  title: string;
  alt: string;
}
interface BannerData {
  [key:string]:{

    postYourVacancy: string;
    jobSeekers: string;
    franchiseInquiry: string;
  }
}
const bannerData: BannerData = {
  en: {
    "postYourVacancy": "Post Your Vacancy",
    "jobSeekers": "Job Seekers",
    "franchiseInquiry": "Franchise Inquiry",
  },
  ar: {
    "postYourVacancy": "أعلن عن وظيفتك",
    "jobSeekers": "الباحثون عن عمل",
    "franchiseInquiry": "استفسار عن الامتياز",
  },
};

// Memoize the Banner component to prevent unnecessary re-renders
const Banner: React.FC<BannerProps> = memo(
  ({ backgroundImage, title, alt, }) => {
    const routers = useRouter();  
    const isArabic = routers.asPath.includes("/ar");
    const selectedLanguage = isArabic ? bannerData.ar : bannerData.en
    return (
      <>
        <section className="main-banner">
          {/* Background image section */}
          <div className="background-image-container">
            <Image
              src={backgroundImage}
              alt={alt || "Banner Background"}
              fill
              priority
              quality={90}
            />
          </div>

          {title && (
            <div className="container-fluid c-pad-x">
              <div className="banner-content">
                <h1>{title}</h1>

                <div className="banner-bottom-content">
                  <div className="left-side">
                    <ul className="number-ul">
                      {phoneNumbers.map((phoneNumber:any, index:any) => (
                        <li key={phoneNumber.number}>
                          <Link
                            prefetch={false}
                            href={`tel:${phoneNumber.number}`}
                            aria-label={phoneNumber.label}
                          >
                            {/* <span
                              className={`flag-img c-banner-icon${index + 1}`}
                              aria-label={phoneNumber.alt}
                            ></span> */}
                           <span style={{marginRight: 15}}>
                      <Image
                     
                        width={40}
                        height={40}
                        src={phoneNumber.img}
                        alt="Call Now"
                        loading="eager"
                      />
                    </span>
                            <span
                              className="phone-icon"
                              aria-label={phoneNumber.label}
                            >
                              <Image
                                loading="eager"
                                width={100}
                                height={100}
                                src="/assets/images/phone-icon.svg"
                                alt={phoneNumber.alt}
                                title={phoneNumber.alt}
                                className="w-100 h-100"
                              />
                            </span>
                            <h4 className="number">{phoneNumber.number}</h4>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <div className="social-mediaa">
                      <ul className="d-flex gap-2 flex-column flex-md-row">
                        {socialLinks.map((socialLink) => (
                          <li key={socialLink.href}>
                            <Link
                              href={socialLink.href}
                              target="_blank"
                              aria-label={socialLink.label}
                              prefetch={false}
                            >
                              <span className="mx-1" style={{width:30, height:30}}>
                            <Image
                              width={32}
                              height={32}
                              src={socialLink.icon}
                              alt={socialLink.alt}
                              title={socialLink.alt}
                              loading="eager"
                            />
                          </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="right-side">
                    <ul>
                      <li>
                        <Link prefetch={false} href="/contact-us">
                        {selectedLanguage?.postYourVacancy}
                        </Link>
                      </li>
                      <li>
                        <Link
                          prefetch={false}
                          href="https://www.alliancerecruitmentagency.ca/job-seekers"
                          target="_blank"
                        >
                            {selectedLanguage?.jobSeekers}
                        </Link>
                      </li>
                      <li>
                        <Link prefetch={false} href="/franchise-enquiry/">
                        {selectedLanguage?.franchiseInquiry}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <style jsx>{`
          .main-banner {
            position: relative;
            width: 100%;
            height: 100%; /* Full height of the viewport */
            overflow: hidden;
          }

          .background-image-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1; /* Ensures the background image stays behind the content */
          }

          .banner-content {
            position: relative;
            z-index: 1;
            color: white; /* White text color for the title */
            padding: 20px;
          }

          .banner-content h1 {
            font-size: 2rem;
            margin-bottom: 0;
          }
            @media(max-width:767px){
              .banner-content {
            
            padding: 16px 0 0 0  !important;
          }
            }
        `}</style>
      </>
    );
  }
);

// Declare phoneNumbers and socialLinks outside of the component to avoid re-declaring on every render
const phoneNumbers = [
  {
    number: "+1 (780) 9004752",
    label: "phone number canada",
    alt: "Call Alliance Recruitment Agency",
    img:"/assets/images/header/canada-flag.svg"
  },
  {
    number: "+1 (917) 9009072",
    label: "phone number united",
    alt: "Get In Touch With Alliance",
    img:"/assets/images/header/united-states-flag.svg"
  },
  {
    number: "+61 8 5122 5015",
    label: "phone number australia",
    alt: "Get In Touch With Alliance",
    img:"/assets/images/header/australia-flag.svg"
  }
];

const socialLinks = [
  {
    href: "https://wa.me/918980018741?text=Hi",
    icon: "/assets/header_images/whatsapp 2(24).svg",
    alt: "whatsapp icon",
    label: "whatsapp link",
  },

  {
    href: "https://m.me/Alliancerecruitmentagency/",
    icon: "/assets/header_images/facebook 1(24) (1).svg",
    alt: "facebook icon",
    label: "facebook link",
  },
  {
    href: "mailto:sales@alliancerecruitmentagency.com",
    icon: "/assets/header_images/gmail 1(24).svg",
    alt: "email icon",
    label: "email id",
  },
  {
    href: "https://t.me/officialARA",
    icon: "/assets/header_images/telegram 1(24).svg",
    alt: "telegram icon",
    label: "telegram icon",
  },
];

export default Banner;
