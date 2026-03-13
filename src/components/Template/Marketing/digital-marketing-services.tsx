import Image from "next/image";
import { SlickSlider2 } from "@/components/Slider/OwlCarouselSlider";
import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState, useRef } from "react";
import meta from "../../../meta/meta.json";
// import CustomHead from "../../Head"; // Commented out to prevent duplicate canonical tags - handled by parent page
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Card,
  MarketingTemplateFormData,
  ServiceApiResponse,
  SubImage,
} from "../../../utils/interfaces";
import { getRandomRatingValue, getRandomReviewCount, splitArray } from "../../../helper/functions";
// import { generateDynamicMeta } from "../../../meta/DynamicMeta"; // Commented out to prevent duplicate canonical tags - handled by parent page
import { dynamicMetaProductScript } from "../../../meta/metaScript";
import Head from "next/head";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import RecruitmentJourneySection from "./RecruitmentJourneySection";
import BlogContactForm from "@/components/forms/BlogContactForm";

const ContactFormModal = dynamic(() => import("@/components/forms/ContactFormModal"), {
  ssr: false,
});
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Form Validation Schema
const contactFormValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .min(9, "Must be at least 9 digits")
    .required("Phone number is required"),
  message: Yup.string(),
  jobOption: Yup.string().required("Please select an option"),
});

interface ContactFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  jobOption: string;
  role: string;
  experience: string;
  hiringTime: string;
  budget: string;
  hiringDecision: string;
  message: string;
}

// Contact Form Component
const ContactForm: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryName, setCountryName] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const NEXT_PUBLIC_FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const currentUrl = router.asPath;


  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setCountryName(data.country_name);
        setCountryCode(data.country_calling_code);
        setSelectedCountry({
          name: data.country_name,
          dialCode: data.country_calling_code,
          countryCode: data.country_code,
        });
      })
      .catch((error) => {
        console.error("Error fetching geo info:", error);
      });
  };

  useEffect(() => {
    const delayedFetch = setTimeout(() => {
      getGeoInfo();
    }, 1000);
    return () => clearTimeout(delayedFetch);
  }, []);

  const formik = useFormik<ContactFormValues>({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      jobOption: "",
      role: "",
      experience: "",
      hiringTime: "",
      budget: "",
      hiringDecision: "",
      message: "",
      companyName: "",
    },
    validationSchema: contactFormValidationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmitForm(values, resetForm);
    },
  });

  const handleCountryChange = (
    value: any,
    country: any,
    e: any,
    formattedValue: any
  ) => {
    formik.setFieldValue("phoneNumber", formattedValue);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleJobOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    // Redirect immediately if user selects "No, I am looking for a job"
    if (selectedValue === "No, I am looking for a job") {
      router.push("/job-seekers");
      return;
    }

    // Otherwise, update formik value normally
    formik.handleChange(e);
  };


  const handleSubmitForm = async (
    values: ContactFormValues,
    resetForm: () => void
  ) => {
    if (!window.grecaptcha) {
      toast.error("reCAPTCHA not available yet");
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string, {
          action: "submit",
        })
        .then((gReCaptchaToken: string) => {
          submitContactForm(values, gReCaptchaToken, resetForm);
        })
        .catch((error: any) => {
          console.error("Error executing reCAPTCHA:", error);
        });
    });
  };

  const submitContactForm = async (
    values: ContactFormValues,
    gReCaptchaToken: string,
    resetForm: () => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("fullName", values.name);
      formData.append("email", values.email);
      formData.append("phone_number", values.phoneNumber);
      formData.append("company_name", values.companyName);
      formData.append("job_option", values.jobOption);
      formData.append("role", values.role);
      formData.append("experience", values.experience);
      formData.append("hiringTime", values.hiringTime);
      formData.append("budget", values.budget);
      formData.append("hiringDecision", values.hiringDecision);
      formData.append("message", values.message);
      formData.append("captcha_response", gReCaptchaToken);
      formData.append("type", "Footer Service Form");
      formData.append("form_url", `${NEXT_PUBLIC_FRONTEND_URL}${currentUrl}`);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/servicesFormApi`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 && response.data.status !== "error") {
        resetForm();
        formik.setFieldValue("phoneNumber", "");
        router.push("/thank-you");
      } else {
        toast.error(response.data.message || "Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <section className="contact-form-section mb-4" id="ContactForm">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="start-hiring-form">
              <h2 className="com-title text-center mb-4">Get in Touch with Our Experts</h2>
              <div className="form-wrapper">
                <form id="contactForm"
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                  }}
                  data-form-type={id}
                >
                  <div className="row g-3 g-md-4">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">Full Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Name*"
                          className="form-control"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.name && formik.touched.name && (
                          <div className="invalid-feedback-error error">
                            {formik.errors.name}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email*"
                          className="form-control"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.touched.email && (
                          <div className="invalid-feedback-error error">
                            {formik.errors.email}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number *</label>
                        <PhoneInput
                          country={
                            selectedCountry
                              ? selectedCountry.countryCode.toLowerCase()
                              : "us"
                          }
                          placeholder="Phone Number*"
                          countryCodeEditable={false}
                          enableSearch={true}
                          value={formik.values.phoneNumber}
                          onChange={handleCountryChange}
                          onBlur={formik.handleBlur("phoneNumber")}
                          inputProps={{
                            ref: inputRef,
                            id: "phoneNumber",
                            name: "phoneNumber",
                            required: true,
                          }}
                          inputStyle={{
                            width: "100%",
                            height: "50px",
                            fontSize: "16px",
                            paddingLeft: "50px",
                            borderRadius: "5px",
                          }}
                          buttonStyle={{
                            borderRadius: "5px 0 0 5px",
                          }}
                          containerClass="phone-input-container"
                        />
                        {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                          <div className="invalid-feedback-error error">
                            {formik.errors.phoneNumber}
                          </div>
                        )}
                      </div>
                    </div>


                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="companyName" className="form-label">Company Name</label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          placeholder="Company Name"
                          className="form-control"
                          value={formik.values.companyName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="jobOption" className="form-label">Are You Looking To Hire Staff For Your Company? *</label>
                        <select
                          id="jobOption"
                          name="jobOption"
                          className="form-control"
                          value={formik.values.jobOption}
                          onChange={handleJobOptionChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Please select an option</option>
                          <option value="Yes, I want to hire">
                            Yes, I want to hire
                          </option>
                          <option value="No, I am looking for a job">
                            No, I am looking for a job
                          </option>
                        </select>
                        {formik.errors.jobOption && formik.touched.jobOption && (
                          <div className="invalid-feedback-error error">
                            {formik.errors.jobOption}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="role" className="form-label">What Role Are You Looking To Hire?</label>
                        <input
                          type="text"
                          id="role"
                          name="role"
                          placeholder="What role are you looking to hire?"
                          className="form-control"
                          value={formik.values.role}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="experience" className="form-label">How Experienced Should The Talent Be?</label>
                        <select
                          id="experience"
                          name="experience"
                          className="form-control"
                          value={formik.values.experience}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Please select an option</option>
                          <option value="Entry level / Junior">
                            Entry level / Junior
                          </option>
                          <option value="Mid-level">
                            Mid-level
                          </option>
                          <option value="Senior Level">
                            Senior Level
                          </option>
                          <option value="Leadership / Head Role">
                            Leadership / Head Role
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="hiringTime" className="form-label">How Urgent Is This Hire?</label>
                        <select
                          id="hiringTime"
                          name="hiringTime"
                          className="form-control"
                          value={formik.values.hiringTime}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Please select an option</option>
                          <option value="Immediate / Critical">
                            Immediate / Critical
                          </option>
                          <option value="Within 30 Days">
                            Within 30 Days
                          </option>
                          <option value="Exploring / Pipeline">
                            Exploring / Pipeline
                          </option>
                          <option value="Not Urgent">
                            Not Urgent
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="budget" className="form-label">How Are you Planning To Budget For This Hire?</label>
                        <select
                          id="budget"
                          name="budget"
                          className="form-control"
                          value={formik.values.budget}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Please select an option</option>
                          <option value="Per hire / Placement based">
                            Per hire / Placement based
                          </option>
                          <option value="Ongoing / Multiple hires">
                            Ongoing / Multiple hires
                          </option>
                          <option value="Project based">
                            Project based
                          </option>
                          <option value="Not decided yet">
                            Not decided yet
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="hiringDecision" className="form-label">Who Will Take The Final Hiring Decision?</label>
                        <select
                          id="hiringDecision"
                          name="hiringDecision"
                          className="form-control"
                          value={formik.values.hiringDecision}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option value="">Please select an option</option>
                          <option value="Me">
                            Me
                          </option>
                          <option value="Me + Another stack holder">
                            Me + Another stack holder
                          </option>
                          <option value="HR / Management Team">
                            HR / Management Team
                          </option>
                          <option value="Not sure yet">
                            Not sure yet
                          </option>
                        </select>
                      </div>
                    </div>


                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="message" className="form-label">Your Message</label>
                        <textarea
                          id="message"
                          name="message"
                          className="form-control"
                          placeholder="Your Message"
                          rows={5}
                          value={formik.values.message}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-12 text-center">
                      <button type="submit" className="submit-button">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DigitalMarketingServices = ({
  data,
}: {
  data: MarketingTemplateFormData | null;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCTAModalOpen, setIsCTAModalOpen] = useState(false);
  const [currentFormId, setCurrentFormId] = useState("servicepage-header-form");
  const result = data;
  const options = {
    loop: false,
    margin: 100,
    autoplay: false,
    nav: true,
    navText: ["<i class='left-arrow'></i>", "<i class='right-arrow'></i>"],
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 2,
      },
    },
  };
  const options2 = {
    infinite: false,
    items: 1,
    loop: false,
    nav: true,
    margin: 20,
    dots: false,
    navText: [
      "<Image src='/assets/review-left.svg' >",
      "<Image src='/assets/review-right.svg' >",
    ], // Customize navigation text/icons
  };
  const [workImages, setWorkImages] = useState<{
    left: null | React.JSX.Element[];
    right: null | SubImage[];
  }>({
    left: null,
    right: null,
  });

  const updateTabContent = useCallback(() => {
    try {
      if (!result?.workImage) return;
      if (result?.workImage) {
        let filteredData = result?.workImage.subImage
        const { firstArray: objFirstArray, secondArray: objSecondArray } =
          splitArray(filteredData);

        //left side images
        let leftElements: React.JSX.Element[] = [];
        for (let i = 0; i < objFirstArray.length; i = i + 3) {
          objFirstArray[i] &&
            leftElements.push(
              <div className="col-lg-12 p-0 " key={i}>
                <Link href={objFirstArray[i].workLinkSlug || '#'}>
                  <div className="inner-image small-images">
                    <Image
                      width={500}
                      height={100}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${objFirstArray[i].subContentImage}`}
                      className="w-100 h-100"
                      alt="wipol branding"
                    />
                    <div className="image-content">
                      <div className="img-wrapper">
                        <span className="img-title">
                          {objFirstArray[i].subImageTxt}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>{" "}
              </div>
            );
          objFirstArray[i + 1] &&
            leftElements.push(
              <div className="col-6 p-0 " key={i + 1}>
                {" "}
                <Link href={objFirstArray[i].workLinkSlug || '#'}>
                  <div className="inner-image small-images">
                    <Image
                      width={500}
                      height={100}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${objFirstArray[i + 1].subContentImage
                        }`}
                      className="w-100 h-100"
                      alt="wipol branding"
                    />
                    <div className="image-content">
                      <div className="img-wrapper">
                        <span className="img-title">
                          {objFirstArray[i + 1].subImageTxt}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>{" "}
              </div>
            );
          objFirstArray[i + 2] &&
            leftElements.push(
              <div className="col-6 p-0 " key={i + 2}>
                {" "}
                <Link href={objFirstArray[i].workLinkSlug || '#'}>
                  <div className="inner-image small-images">
                    <Image
                      width={500}
                      height={100}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${objFirstArray[i + 2].subContentImage
                        }`}
                      className="w-100 h-100"
                      alt="wipol branding"
                    />
                    <div className="image-content">
                      <div className="img-wrapper">
                        <span className="img-title">
                          {objFirstArray[i + 2].subImageTxt}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>{" "}
              </div>
            );
        }

        leftElements &&
          setWorkImages((prev) => ({
            ...prev,
            left: leftElements,
          }));

        objSecondArray &&
          setWorkImages((prev) => ({
            ...prev,
            right: objSecondArray,
          }));
      }
    } catch (error) {
      console.log("updateTabContent", error);
    }
  }, [result])
  useEffect(() => {
    updateTabContent();
  }, [updateTabContent]);
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
      {/* Main Banner Start From Here  */}
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
              />
            </div>
          </div>
        </div>
      </section>
      {/* Main Banner End Here  */}

      {/* Brand Slider Start From Here  */}
      <section className="brand-slider-section">
        <div className="container">
          <h2 className="com-title text-center mb-2">Who's Hiring With Us</h2>
        </div>
      </section>
      <SlickSlider2 />
      {/* Brand Slider End Here  */}

      {/* Why Choose Use Section Start From Here */}
      {result?.content && Array.isArray(result.content) && result.content.length > 0 ? (
        result.content.map((contentItem, index) => (
          <React.Fragment key={index}>
            <section className="main-banner branding-agency">
              <div className="container">
                <div className="row g-4">
                  {/* For even index (0,2,4...): Image left, Text right */}
                  {/* For odd index (1,3,5...): Text left, Image right */}
                  {index % 2 === 0 ? (
                    <>
                      {/* Image on Left */}
                      <div className="col-lg-6 text-center">
                        <picture>
                          <source
                            srcSet={
                              contentItem?.contentImage
                                ? `${NEXT_PUBLIC_BACKEND_URL}${contentItem?.contentImage}`
                                : "/assets/images/full-service-white-label.png"
                            }
                            type="image/webp"
                          />
                          <source
                            srcSet={
                              contentItem?.contentImage
                                ? `${NEXT_PUBLIC_BACKEND_URL}${contentItem?.contentImage}`
                                : "/assets/images/full-service-white-label.png"
                            }
                            type="image/png"
                          />
                          <Image
                            src={
                              contentItem?.contentImage
                                ? `${NEXT_PUBLIC_BACKEND_URL}${contentItem?.contentImage}`
                                : "/assets/images/full-service-white-label.png"
                            }
                            alt={contentItem?.contentImageName || "Content Image"}
                            title={contentItem?.contentImageName || "Content Image"}
                            width="606"
                            height="431"
                            className="img-fluid mx-auto"
                          />
                        </picture>
                      </div>
                      {/* Text on Right */}
                      <div className="col-lg-6 align-self-center branding-txt-box">
                        <h2 className="com-title">
                          {contentItem?.title || "Why Choose Us?"}
                        </h2>
                        {contentItem?.content ? (
                          <p
                            className="com-para service-section-3"
                            dangerouslySetInnerHTML={{
                              __html: contentItem.content.replace(
                                /<\/?p[^>]*>/gi,
                                ""
                              )
                            }}
                          />
                        ) : (
                          <>
                            <p className="com-para">
                              Our online marketing agency drives your business to new
                              heights through our award-winning advanced marketing
                              services. Living in a digital generation, we have
                              multi-device and multi-channel approaches ingrained in our
                              DNA. We believe in more traffic, more leads, more sales, and
                              more revenue. Hence, our custom strategies and a full-funnel
                              marketing approach help your business achieve desired
                              results with increased ROI.
                            </p>
                            <p className="com-para">
                              Our digital marketing company has the industry's best
                              experts to solve your company's bandwidth and capacity
                              issues with our White Lable services. We facilitate you with
                              different marketing services such as SEO, SME, SMM, on-page
                              SEO, Technical SEO, etc.
                            </p>
                          </>
                        )}
                        {contentItem?.contentBtnTitle && contentItem?.contentBtnLink && (
                          <div className="bottom-link">
                            <Link
                              href="#ContactForm"
                              className="bottom-link text-end"
                              onClick={(e) => {
                                e.preventDefault();
                                const formSection = document.getElementById('ContactForm');
                                if (formSection) {
                                  formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }}
                            >
                              {contentItem.contentBtnTitle}
                            </Link>
                          </div>
                        )}
                      </div>

                    </>
                  ) : (
                    <>
                      {/* Text on Left */}
                      <div className="col-lg-6 align-self-center branding-txt-box order-lg-1 order-2">
                        <h2 className="com-title">
                          {contentItem?.title || "Why Choose Us?"}
                        </h2>
                        {contentItem?.content ? (
                          <p
                            className="com-para service-section-3"
                            dangerouslySetInnerHTML={{
                              __html: contentItem.content.replace(
                                /<\/?p[^>]*>/gi,
                                ""
                              )
                            }}


                          />
                        ) : (
                          <>
                            <p className="com-para">
                              Our online marketing agency drives your business to new
                              heights through our award-winning advanced marketing
                              services. Living in a digital generation, we have
                              multi-device and multi-channel approaches ingrained in our
                              DNA. We believe in more traffic, more leads, more sales, and
                              more revenue. Hence, our custom strategies and a full-funnel
                              marketing approach help your business achieve desired
                              results with increased ROI.
                            </p>
                            <p className="com-para">
                              Our digital marketing company has the industry's best
                              experts to solve your company's bandwidth and capacity
                              issues with our White Lable services. We facilitate you with
                              different marketing services such as SEO, SME, SMM, on-page
                              SEO, Technical SEO, etc.
                            </p>

                          </>
                        )}
                        {contentItem?.contentBtnTitle && contentItem?.contentBtnLink && (
                          <div className="bottom-link">
                            <Link
                              href={contentItem.contentBtnLink}
                              className="bottom-link text-end"
                            >
                              {contentItem.contentBtnTitle}
                            </Link>
                          </div>
                        )}
                      </div>
                      {/* Image on Right */}
                      <div className="col-lg-6 text-center order-lg-2 order-1">
                        <picture>
                          <source
                            srcSet={
                              contentItem?.contentImage
                                ? `${NEXT_PUBLIC_BACKEND_URL}${contentItem?.contentImage}`
                                : "/assets/images/full-service-white-label.png"
                            }
                            type="image/webp"
                          />
                          <source
                            srcSet={
                              contentItem?.contentImage
                                ? `${NEXT_PUBLIC_BACKEND_URL}${contentItem?.contentImage}`
                                : "/assets/images/full-service-white-label.png"
                            }
                            type="image/png"
                          />
                          <Image
                            src={
                              contentItem?.contentImage
                                ? `${NEXT_PUBLIC_BACKEND_URL}${contentItem?.contentImage}`
                                : "/assets/images/full-service-white-label.png"
                            }
                            alt={contentItem?.contentImageName || "Content Image"}
                            title={contentItem?.contentImageName || "Content Image"}
                            width="606"
                            height="431"
                            className="img-fluid mx-auto"
                          />
                        </picture>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
            {index === 0 && (
              <RecruitmentJourneySection
                setIsModalOpen={setIsModalOpen}
                setIsCTAModalOpen={setIsCTAModalOpen}
                setFormId={setCurrentFormId}
              />
            )}
          </React.Fragment>
        ))
      ) : (
        <>
          <section className="main-banner branding-agency">
            <div className="container">
              <div className="row g-4">
                <div className="col-lg-6 text-center order-1-991">
                  <picture>
                    <source
                      srcSet="/assets/images/full-service-white-label.png"
                      type="image/webp"
                    />
                    <source
                      srcSet="/assets/images/full-service-white-label.png"
                      type="image/png"
                    />
                    <Image
                      src="/assets/images/full-service-white-label.png"
                      alt="full service white label"
                      title="Full Service White Label"
                      width="606"
                      height="431"
                      className="img-fluid mx-auto"
                    />
                  </picture>
                </div>
                <div className="col-lg-6 align-self-center ms-auto order-2-991 branding-txt-box">
                  <h2 className="com-title">Why Choose Us?</h2>
                  <p className="com-para">
                    Our online marketing agency drives your business to new
                    heights through our award-winning advanced marketing
                    services. Living in a digital generation, we have
                    multi-device and multi-channel approaches ingrained in our
                    DNA. We believe in more traffic, more leads, more sales, and
                    more revenue. Hence, our custom strategies and a full-funnel
                    marketing approach help your business achieve desired
                    results with increased ROI.
                  </p>
                  <p className="com-para">
                    Our digital marketing company has the industry's best
                    experts to solve your company's bandwidth and capacity
                    issues with our White Lable services. We facilitate you with
                    different marketing services such as SEO, SME, SMM, on-page
                    SEO, Technical SEO, etc.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <RecruitmentJourneySection
            setIsModalOpen={setIsModalOpen}
            setIsCTAModalOpen={setIsCTAModalOpen}
            setFormId={setCurrentFormId}
          />
        </>
      )}
      {/* Why Choose Use Section End Here */}

      {/* Stats Section Start From Here  */}
      <section className="scroll-text-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg col-md-4 col-sm-6">
              <div className="text-center">
                <div className="main-text">
                  <span className="black-text">16+</span>
                  <span className="red-text">Experience</span>
                </div>
              </div>
            </div>
            <div className="col-lg col-md-4 col-sm-6">
              <div className="text-center">
                <div className="main-text">
                  <span className="black-text">550000+</span>
                  <span className="red-text">Promises Delivered</span>
                </div>
              </div>
            </div>
            <div className="col-lg col-md-4 col-sm-6">
              <div className="text-center">
                <div className="main-text">
                  <span className="black-text">36+</span>
                  <span className="red-text">Countries Served</span>
                </div>
              </div>
            </div>
            <div className="col-lg col-md-4 col-sm-6">
              <div className="text-center">
                <div className="main-text">
                  <span className="black-text">350+</span>
                  <span className="red-text">Terms</span>
                </div>
              </div>
            </div>
            <div className="col-lg col-md-4 col-sm-6">
              <div className="text-center">
                <div className="main-text">
                  <span className="black-text">50+</span>
                  <span className="red-text">Top Level Positions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section End Here  */}



      {/* Service Section Start From Here  */}
      <section className="service">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-12 col-md-12 me-auto  ">
              <h2 className="com-titles">
                {result?.cardSection.title ||
                  "End-to-End Digital Marketing Services"}
              </h2>
              <p
                className="com-para service-section-3"
                dangerouslySetInnerHTML={{
                  __html: result?.cardSection?.content.replace(
                    /<\/?p[^>]*>/gi,
                    ""
                  ) || " Grow your brand's digital presence and reach new heights with our tailored digital marketing services. Our expert team incorporates cutting-edge strategies to get innovative and stand out from competitors in this crowded marketplace. We understand the evolving online landscape and craft result-oriented approaches that drive traffic, boost conversions, and enhance Return on Investment (ROI). Whether you're a startup or an established enterprise, our proven expertise ensures your message resonates in the digital realm."
                }}
              />
            </div>
            {Array.isArray(result?.card) &&
              result?.card.map((card: Card) => (
                <div className="col-lg-4 col-md-6 " key={card.title}>
                  <div className="service-card">
                    <div className="service-img">
                      <Image
                        width={64}
                        height={64}
                        src={`${NEXT_PUBLIC_BACKEND_URL}${card.cardImage}`}
                        alt={card?.cardImageName || "Card Image"}
                        title={card?.cardImageName || "Card Image"}
                      />
                    </div>
                    <h3 className="service-title">{card.title}</h3>
                    <p
                      className="com-para service-section-3"
                      dangerouslySetInnerHTML={{
                        __html: card.content.replace(
                          /<\/?p[^>]*>/gi,
                          ""
                        )
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* Service Section End Here  */}

      {/* Awards Section Start From Here  */}
      <section className="awards-section">
        <div className="container">
          <h2 className="com-title text-center mb-5">Award-Winning Excellence</h2>
          <div className="awards-logos d-flex flex-wrap justify-content-center align-items-center gap-4">
            <div className="award-logo">
              <Image
                src="/assets/awards/brand-logo-1.webp"
                alt="ISO 9001 Certified"
                width={120}
                height={120}
                className="img-fluid"
              />
            </div>
            <div className="award-logo">
              <Image
                src="/assets/awards/brand-logo-2.webp"
                alt="Canada's Most Reliable Solution Award"
                width={120}
                height={120}
                className="img-fluid"
              />
            </div>
            <div className="award-logo">
              <Image
                src="/assets/awards/brand-logo-3.webp"
                alt="Hall of Fame 2020"
                width={120}
                height={120}
                className="img-fluid"
              />
            </div>
            <div className="award-logo">
              <Image
                src="https://cmsapi.alliancerecruitmentagency.ca/anniversary-logo-16-years.webp"
                alt="16 Years"
                width={120}
                height={120}
                className="img-fluid"
              />
            </div>
            <div className="award-logo">
              <Image
                src="/assets/awards/brand-logo-5.webp"
                alt="GoodFirms Top Recruiting Firm"
                width={120}
                height={120}
                className="img-fluid"
              />
            </div>
            <div className="award-logo">
              <Image
                src="/assets/awards/brand-logo-6.webp"
                alt="HRMAsia Rising Choice 2023"
                width={120}
                height={120}
                className="img-fluid"
              />
            </div>
            <div className="award-logo">
              <Image
                src="/assets/awards/brand-logo-7.webp"
                alt="Recruiter Awards 2023 Highly Commended"
                width={120}
                height={120}
                className="img-fluid"
              />
            </div>
            <div className="award-logo">
              <Image
                src="/assets/awards/brand-logo-8.webp"
                alt="IAF International Accreditation Forum"
                width={120}
                height={120}
                className="img-fluid"
              />
            </div>
            <div className="award-logo">
              <Image
                src="/assets/awards/brand-logo-9.webp"
                alt="ISO 27001"
                width={120}
                height={120}
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Awards Section End Here  */}

      {/* Our Success Story Section Start From Here  */}
      {result?.successStory && result?.successStory.length > 0 && (
        <section className="our-success-story">
          <div className="container">
            <h2 className="com-title mb-0">Client Success Stories</h2>
            <OwlCarousel {...options2}>
              {result.successStory.map((story, index) => (
                <div className="" key={index}>
                  <div className="our-success-story-content">
                    <div className="row flex-row-reverse">
                      <div className="col-lg-6 align-self-center">
                        <picture>
                          <source
                            srcSet={`${NEXT_PUBLIC_BACKEND_URL}${story.image}`}
                            type="image/webp"
                          />
                          <source
                            srcSet={`${NEXT_PUBLIC_BACKEND_URL}${story.image}`}
                            type="image/png"
                          />
                          <Image
                            src={`${NEXT_PUBLIC_BACKEND_URL}${story.image}`}
                            alt={story?.imageName || "Success Story Image"}
                            title={story?.imageName || "Success Story Image"}
                            width="626"
                            height="437"
                            className="img-fluid"
                            loading="lazy"
                          />
                        </picture>
                      </div>
                      <div className="col-lg-6">
                        <div className="our-success-story-content-left">
                          <h3>{story?.title}</h3>
                          <p
                            className="service-section-3"
                            dangerouslySetInnerHTML={{
                              __html: story.content.replace(
                                /<\/?p[^>]*>/gi,
                                ""
                              )
                            }}
                          />
                          <ul className="description-info">
                            <li>
                              <span>Category</span> {story.category}
                            </li>
                            <li>
                              <span>Industry</span> {story.industry}
                            </li>
                          </ul>
                          <div className="bottom-link">
                            <Link
                              href={story.buttonLink || "#"}
                              className="bottom-link text-end"
                            >
                              {story.buttonTitle || "Know More"}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        </section>
      )}
      {/* Our Success Story Section End Here  */}
      {/* Review Section Start From Here  */}
      <section className="review">
        <div className="container">
          <div className="container-inner">
            <h2 className="com-titles">Reviews</h2>
            <p className="com-para">
              Alliance Recruitment Agency has achieved significant recognition in the sector owing to its successful track record in providing top-notch recruitment services. Our proficiency is clearly reflected in the feedbacks given by our clients.
            </p>
            <div className="review-slider">
              <OwlCarousel {...options}>
                <div className="review-box">
                  <p className="review-text">
                    The whole process of working with Alliance was really enjoyable and easy. They quickly found the right people for our team. The hiring staff listened carefully to what we asked for, went through all the applications very thoroughly, and made it sure that the chosen ones were compatible with our company’s values. The great employees who are just right for the job and help our business grow are, in a sense, thanks to Alliance. We are very happy to have them working with us and will definitely recommend their services to any company looking for good people.
                  </p>
                  <div className="rivew-footer">
                    <div className="left-img">
                      <Image
                        src="/assets/images/digital-marketing-services/images/Matthew-Lee.png"
                        alt="matthew lee"
                        height="64"
                        width="64"
                      />
                    </div>
                    <div className="right-content">
                      <h4 className="right-title m-0">Matthew Lee</h4>
                      <h5 className="text-deg">MD, Optivectorshift innovations</h5>
                    </div>
                  </div>
                </div>

                <div className="review-box">
                  <p className="review-text">
                    Eventually, the new personnel recruiting process went through the whole easily and without any glitches, all because of the Alliance. They were quite clear about what we needed and got the right match who could easily merge with us. The team was supporting us from interviews to integration and even troubleshooting our queries. The new employees were competent and diligent and won the team over in no time. Their professional know-how and being present with us at all stages have given us a very positive impression and that's why we will definitely consider them when there are partnerships in the future.
                  </p>
                  <div className="rivew-footer">
                    <div className="left-img">
                      <Image
                        src="/assets/images/digital-marketing-services/images/Olivia-Chen.png"
                        alt="olivia chen"
                        height="64"
                        width="64"
                      />
                    </div>
                    <div className="right-content">
                      <h4 className="right-title m-0">Olivia Chen</h4>
                      <h5 className="text-deg">CMO, inshiftpro tech</h5>
                    </div>
                  </div>
                </div>

                <div className="review-box">
                  <p className="review-text">
                    Choosing the right leader for our organization became a difficult task, and it was suggested that the people from Alliance should help us. They searched every corner of the country, held detailed interviews, and finally suggested to us the best candidates. The new hires matched our company’s culture perfectly and had a very positive impact on the company from the very beginning. The Alliance team is nice, trustworthy, and talented. We are very happy with their service and would recommend them to anyone.
                  </p>
                  <div className="rivew-footer">
                    <div className="left-img">
                      <Image
                        src="/assets/images/digital-marketing-services/images/Isabelle-Dubois.png"
                        alt="isabelle dubois"
                        height="64"
                        width="64"
                      />
                    </div>
                    <div className="right-content">
                      <h4 className="right-title m-0">Isabelle Dubois</h4>
                      <h5 className="text-deg">MD, Hexzenwave Pvt Ltd</h5>
                    </div>
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>
      {/* Review Section End Here  */}

      {/* Faq Section Start From Here  */}
      {result?.faq && result?.faq.length > 0 && <section className="faq-section">
        <div className="container">
          <h2 className="com-title mb-4">Frequently Asked Questions</h2>

          <div className="accordion" id="accordionFaq">
            {Array.isArray(result?.faq) &&
              result?.faq.map((item: any, index: any) => {
                return (
                  <>
                    <div className="accordion-item" key={index}>
                      <h3 className="accordion-header">
                        <button
                          className={`accordion-button ${index === 0 ? "" : "collapsed"
                            }`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded={index === 0 ? "true" : "false"}
                          aria-controls={`collapse${index}`}
                        >
                          {item.question || ""}
                        </button>
                      </h3>
                      <div
                        id={`collapse${index}`}
                        className={`accordion-collapse collapse ${index === 0 ? "show" : ""
                          }`}
                        data-bs-parent="#accordionFaq"
                      >
                        <div className="accordion-body">
                          {item.answer || ""}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </section>}
      {/* Faq Section End Here  */}

      {/* Contact Form Section Start From Here  */}
      <ContactForm id="servicepage-footer-form" />
      {/* Contact Form Section End Here  */}

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

      {/* Blog Contact Form Modal */}
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
        {/* OpenGraph Meta Tags for Service Pages */}
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

const WorkImageLink = ({ work }: { work: SubImage }) => (
  <Link href={`portfolio/${work.workLinkSlug}` || "#"}>
    <div className="inner-image small-images">
      <Image
        width={500}
        height={100}
        src={`${NEXT_PUBLIC_BACKEND_URL}/${work.subContentImage}`}
        className="w-100 h-100"
        alt={work.subImageTxt}
      />
      <div className="image-content">
        <div className="img-wrapper">
          <span className="img-title">{work.subImageTxt}</span>
        </div>
      </div>
    </div>
  </Link>
);