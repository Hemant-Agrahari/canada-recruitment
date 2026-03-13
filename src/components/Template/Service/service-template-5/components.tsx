import HireACandidate from "@/components/forms/hireACandidate";

export interface ServiceI {
  title: string;
  description?: string;
  image?: string | File;
  imageAlt?: string;
  imageLink?: string;
  buttonName?: string;
  buttonLink?: string;
  sectionType: string;
  contentDirection: string;
  backgroundColor: string;
}
export interface FaqI {
  question: string;
  answer: string;
}
export type sectionTypesT =
  | "blue-banner"
  | "form-banner"
  | "image-card-banner"
  | "success-story";

export interface Service5FormI {
  slug: string;
  bannerTitle: string;
  bannerImage: string;
  sections: ServiceI[];
  seoTitle: string;
  seoDescription: string;
  faq: FaqI[];
  template: string;
}

import Image from "next/image";
import Link from "next/link";
import ytIcon from "@/../public/assets/images/homepage/yt-icon.png";

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL || "";
const frontend_url = process.env.NEXT_PUBLIC_FRONTEND_URL || "";
export const getSectionContentStyle = (direction: string) => {
  return direction == "row"
    ? "row"
    : direction == "row-reverse"
      ? "flex-row-reverse"
      : direction == "column"
        ? "row flex-column"
        : direction == "column-reverse"
          ? "row flex-column-reverse"
          : "row";
};

export const BlueBannerSection = ({ data }: { data: ServiceI }) => {
  return (
    <section
      className="accountant-hiring"
      style={{ backgroundColor: data.backgroundColor || "var(--blue-color)" }}
    >
      <div className="container-fluid c-pad-x">
        <div className={`${getSectionContentStyle(data.contentDirection)}`}>
          <div className="col-lg-10">
            {data.title && (
              <h2
                className={`com-title ${data.contentDirection == "row" ? "text-align-left" : ""
                  }`}
              >
                {data.title}
              </h2>
            )}
            {data.description && (
              <p
                className="com-text"
                dangerouslySetInnerHTML={{ __html: data.description }} suppressHydrationWarning
              />
            )}
          </div>
          {data.buttonName && (
            <div className="col-lg-2">
              <Link
                className="a-h-btn text-decoration-none"
                href={data.buttonLink || "#"}
              >
                {data?.buttonName || ""}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const BlueBannerImageSection = ({ data }: { data: ServiceI }) => {
  return (
    <section
      className="looking-for-ac text-center"
      style={{
        backgroundImage: `url(${typeof data?.image == "string" && data?.image.includes("blob")
            ? data?.image
            : backend_url + data.image
          })`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {data.image && (
        <div className="looking-bg-img">
          <Image
            alt={data?.imageAlt || ""}
            loading="lazy"
            width={100}
            height={100}
            decoding="async"
            data-nimg={1}
            className="w-100 h-100"
            src={
              typeof data?.image == "string" && data?.image.includes("blob")
                ? data?.image
                : `${backend_url}${data?.image}`
            }
            style={{ color: "transparent", backgroundSize: "contain" }}
          />
        </div>
      )}
      <div
        className={`container-fluid c-pad-x ${getSectionContentStyle(
          data.contentDirection
        )}`}
      >
        {data.title && (
          <h2
            className={`com-title ${data.contentDirection == "row" ? "text-align-left" : ""
              }`}
          >
            {data.title}
          </h2>
        )}
        {data.description && (
          <p
            className="com-text"
            dangerouslySetInnerHTML={{ __html: data.description }} suppressHydrationWarning
          />
        )}
        {data.buttonName && (
          <Link className="com-btn" href={data.buttonLink || "#"}>
            {data.buttonName}
          </Link>
        )}
      </div>
    </section>
  );
};

export const FormBannerSection = ({ data }: { data: ServiceI }) => {
  return (
    <section
      className="mid-text-section"
      id="ContactForm"
      style={{ backgroundColor: data.backgroundColor || "#fff" }}
    >
      <div
        className={`container-fluid c-pad-x ${getSectionContentStyle(
          data.contentDirection
        )}`}
      >
        <div className="text-wrapper row gx-lg-5">
          <div className="left-side col-lg-6 ContactForm align-self-center">
            {data.title && (
              <h2
                className={`com-title ${data.contentDirection == "row" ? "text-align-left" : ""
                  }`}
              >
                {data.title}
              </h2>
            )}
            {data.description && (
              <p
                style={{ fontWeight: 400 }}
                className="com-text color-gray"
                dangerouslySetInnerHTML={{ __html: data.description }} suppressHydrationWarning
              ></p>
            )}
          </div>
          <div className="right-side col-lg-6 align-self-center">
            <HireACandidate />
          </div>
        </div>
      </div>
    </section>
  );
};


export const SuccessStory = ({ data }: { data: ServiceI }) => {
  return (
    <section className="industry-section">
      <div className="container-fluid c-pad-x ">
        <div className="inner-con">
          <div
            className={`row gy-4 ${getSectionContentStyle(
              data.contentDirection
            )}`}
            style={{ backgroundColor: data.backgroundColor || "#fff" }}
          >
            <div className="col-lg-7">
              {data.title && <h2 className="com-title">{data.title}</h2>}

              {data.description && (
                <p
                  className="com-text color-gray"
                  dangerouslySetInnerHTML={{ __html: data.description }} suppressHydrationWarning
                />
              )}
            </div>
            <div className="col-lg-5 align-self-start ms-auto text-end">
              {/* <p className="client-feed-title com-title s-title">
                  Client Feedback
                </p> */}
              <div className="story-img-c-level">
                <Image
                  id="youtube-icon-c-level"
                  alt={data.imageAlt || ""}
                  loading="lazy"
                  width={420}
                  height={200}
                  decoding="async"
                  data-nimg={1}
                  src={
                    typeof data?.image == "string" &&
                      data?.image.includes("blob")
                      ? data?.image
                      : `${backend_url}${data?.image}`
                  }
                  style={{ color: "transparent" }}
                />
                <Link target="_blank" href={data.imageLink || "#"}>
                  <Image
                    id="icon-youtube-c-level"
                    alt="icon-youtube"
                    loading="lazy"
                    width={140}
                    height={100}
                    decoding="async"
                    data-nimg={1}
                    src={ytIcon}
                    style={{ color: "transparent" }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ImageCardSection = ({ data }: { data: ServiceI }) => {
  return (
    <section
      className="accounting-section"
      style={{ backgroundColor: data.backgroundColor || "#fff" }}
    >
      <div className="container-fluid c-pad-x">
        <div
          className={`row g-5 ${getSectionContentStyle(data.contentDirection)}`}
        >
          <div className="col-lg-6 c-order-992-2 ">
            <Link href={data.imageLink || "#"}>
              <Image
                alt={data.imageAlt || ""}
                title={data.imageAlt || ""}
                loading="lazy"
                width={636}
                height={354}
                decoding="async"
                data-nimg={1}
                className="img-fluid"
                src={
                  typeof data?.image == "string" && data?.image.includes("blob")
                    ? data?.image
                    : `${backend_url}${data?.image}`
                }
                style={{ color: "transparent" }}
              />
            </Link>
          </div>
          <div className="col-lg-6 c-order-992-1">
            {data.title && (
              <h2
                className={`com-title ${data.contentDirection == "row" ? "text-align-left" : ""
                  }`}
              >
                {data.title}
              </h2>
            )}
            {data.description && (
              <p
                className="com-text color-gray"
                dangerouslySetInnerHTML={{ __html: data.description }} suppressHydrationWarning
              />
            )}
            {data.buttonName && (
              <Link href={data.buttonLink || "#"} className="com-btn">
                {data.buttonName}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Faq = ({ data }: { data: FaqI[] }) => {
  return (
    <section className="faq-section">
      <div className="container-fluid c-pad-x ">
        <div className="inner-con">
          <div className="row">
            <div className="col-lg-2">
              <h2 className="com-title text-align-left">FAQ</h2>
            </div>
            <div className="col-lg-10">
              <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
              >
                {data &&
                  data.map(({ answer, question }, index) => (
                    <div className="accordion-item" key={index}>
                      <h3
                        className="accordion-header"
                        id={`flush-heading${index}`}
                      >
                        <button
                          style={{ borderRadius: "5px" }}
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#flush-collapse${index}`}
                          aria-expanded="false"
                          aria-controls={`flush-collapse${index}`}
                        >
                          {question}
                        </button>
                      </h3>
                      <div
                        id={`flush-collapse${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`flush-heading${index}`}
                        data-bs-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body">
                          <p className="com-text color-gray">{answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HeadhuntingIn: React.FC = () => {
  return (
    <section className="headhunting pb-0">
      <div className="container-fluid c-pad-x ">
        <div className="row">
          <div className="col-lg-3">
            <h2 className="com-title text-align-left">Headhunting In</h2>
          </div>
          <div className="col-lg-9">
            <div className="row">
              <div className="col-lg-4 col-sm-6">
                <Link href="/c-level-recruitment-agency">
                  <div className="icon-des">
                    <span className="icons c-headhun-icon1" />
                    <h3>C - Level</h3>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-sm-6">
                <Link href="/healthcare-recruitment-agencies-in-dubai">
                  <div className="icon-des">
                    <span className="icons c-headhun-icon2" />
                    <h3>Healthcare &amp; Doctor</h3>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-sm-6">
                <Link href="/retail-recruitment-agencies-in-dubai">
                  <div className="icon-des">
                    <span className="icons c-headhun-icon3" />
                    <h3>Retail &amp; Marketing</h3>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-sm-6">
                <Link href="/teacher-recruitment-agencies-in-dubai">
                  <div className="icon-des">
                    <span className="icons c-headhun-icon4" />
                    <h3>Educational Industry</h3>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-sm-6">
                <Link href="/executive-chef-dubai">
                  <div className="icon-des">
                    <span className="icons c-headhun-icon5" />
                    <h3>All Chef</h3>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-sm-6">
                <Link href="/hotel-recruitment-agency-dubai">
                  <div className="icon-des">
                    <span className="icons c-headhun-icon6" />
                    <h3>Hotel &amp; Restaurant</h3>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-sm-6">
                <Link href="/it-recruitment-agency-dubai">
                  <div className="icon-des">
                    <span className="icons c-headhun-icon7" />
                    <h3>Information-Technology</h3>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-sm-6">
                <Link href="/engineering-recruitment-agencies-in-dubai">
                  <div className="icon-des">
                    <span className="icons c-headhun-icon8" />
                    <h3>Engineering</h3>
                  </div>
                </Link>
              </div>
              <div className="col-lg-4 col-sm-6">
                <Link href="/banking-recruitment-agencies-in-dubai">
                  <div className="icon-des">
                    <span className="icons c-headhun-icon9" />
                    <h3>Banking &amp; Finance</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const SupportYou: React.FC = () => {
  return (
    <section className="py-50">
      <div className="new-section">
        <div className="container">
          <div className="main-content">
            <h2 className="mb-4">
              Interested in finding out how Alliance can support you?
            </h2>
            <ul className="mb-3">
              <li>Utilize the extensive network of the finest 3.5% talent</li>
              <li>
                Achieve hiring speeds multiplied by 10 and enjoy cost benefits
                of up to 40%
              </li>
              <li>
                Achieving a remarkable 70% success rate from initial candidate
                interview to final selection
              </li>
            </ul>
            <h3 className="mb-4">Let’s talk!</h3>
            <Link
              target="_blank"
              className="cta-btn"
              id=""
              href="https://calendly.com/allianceinternationalservices/global"
            >
              Book Your Free Discovery Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ServicesBanner = ({
  backgroundImage,
  title,
  frontend_url = "/",
}: {
  frontend_url?: string;
  backgroundImage: string;
  title: string;
}) => {
  const phoneNumbers = [
    {
      number: "+44 20 3838 0743",
      label: "phone number united",
      alt: "Get In Touch With Alliance",
    },
    {
      number: "+19179009072",
      label: "phone number united",
      alt: "Get In Touch With Alliance",
    },
    {
      number: "+17809004752",
      label: "phone number canada",
      alt: "Call Alliance Recruitment Agency",
    },
    { number: "+918980018741", label: "phone number india", alt: "" },
  ];

  const socialLinks = [
    {
      href: "https://wa.me/918980018741?text=Hi",
      icon: `/assets/images/whatup.svg`,
      alt: "whatsapp icon",
      label: "whatsapp link",
    },
    {
      href: "skype:Ais.technolabs?chat",
      icon: `/assets/images/skype.svg`,
      alt: "skype icon",
      label: "skype id",
    },
    {
      href: "https://m.me/Alliancerecruitmentagency/",
      icon: `/assets/images/facebook.svg`,
      alt: "facebook icon",
      label: "facebook link",
    },
    {
      href: "mailto:sales@alliancerecruitmentagency.com",
      icon: `/assets/images/email.svg`,
      alt: "email icon",
      label: "email id",
    },
    {
      href: "https://t.me/officialARA",
      icon: `/assets/images/telegram-svg.svg`,
      alt: "telegram icon",
      label: "telegram icon",
    },
  ];

  return (
    <section
      className="main-banner"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container-fluid c-pad-x">
        <div className="banner-content">
          <h1>{title}</h1>

          <div className="banner-bottom-content">
            <div className="left-side">
              <ul className="number-ul">
                {phoneNumbers.map((phoneNumber, index) => (
                  <li key={index}>
                    <Link
                      href={`tel:${phoneNumber.number}`}
                      aria-label={phoneNumber.label}
                    >
                      <span
                        className={`flag-img c-banner-icon${index + 1}`}
                        aria-label={phoneNumber.alt}
                      ></span>
                      <span
                        className="phone-icon"
                        aria-label={phoneNumber.label}
                      >
                        <Image
                          priority
                          width={100}
                          height={100}
                          src={`/assets/images/phone-icon.svg`}
                          alt={phoneNumber.alt || "Phone icon"}
                          title={phoneNumber.alt || "Phone icon"}
                          className="w-100 h-100"
                        />
                      </span>
                      <h4 className="number">{phoneNumber.number}</h4>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="social-media">
                <ul>
                  {socialLinks.map((socialLink, index) => (
                    <li key={index}>
                      <Link
                        href={socialLink.href}
                        target="_blank"
                        aria-label={socialLink.label}
                      >
                        <Image
                          priority
                          width={100}
                          height={100}
                          src={socialLink.icon}
                          alt={socialLink.alt || "Social icon"}
                          title={socialLink.alt || "Social icon"}
                          className="w-100 h-100"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="right-side">
              <ul>
                <li>
                  <Link href="/contact-us">Post Your Vacancy</Link>
                </li>
                <li>
                  <Link
                    href="https://www.alliancerecruitmentagency.com/job-seekers/"
                    target="_blank"
                  >
                    Job Seekers
                  </Link>
                </li>
                <li>
                  <Link href="/franchise-enquiry/">Franchise Inquiry</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesBanner;
