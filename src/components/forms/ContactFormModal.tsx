import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import { toast } from 'react-toastify';
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
// import { usePathname } from "next/navigation";

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

interface ModalContactFormProps {
  onSuccess?: () => void;
  id: string;
}

// Modal Contact Form Component
const ContactFormModal: React.FC<ModalContactFormProps> = ({ onSuccess, id }) => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const NEXT_PUBLIC_FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const currentUrl = router.asPath;

  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
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
    }, 500);
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

  const handleHelpOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formik.handleChange(e);
    const selectedValue = e.target.value;
    if (selectedValue === "I am Looking for job") {
      router.push("/job-seekers");
      return;
    }
  };

  const handleJobOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue === "No, I am looking for a job") {
      router.push("/job-seekers");
      return;
    }
    formik.handleChange(e);
  };


  const handleSubmitForm = async (
    values: ContactFormValues,
    resetForm: () => void
  ) => {
    if (!window.grecaptcha) {
      console.log("reCAPTCHA not available yet");
      return;
    }

    setIsSubmitting(true);
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
          setIsSubmitting(false);
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
      formData.append("type", "Header Service Form");
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

      if (response.status === 200 && response.data.status !== 'error') {
        resetForm();
        formik.setFieldValue("phoneNumber", "");
        setIsSubmitting(false);
        if (onSuccess) onSuccess();
        router.push("/thank-you");
      } else {
        toast.error(response.data.error || "form submit error")
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-wrapper" style={{ padding: '0', maxHeight: '80vh', overflowY: 'auto', overflowX: 'hidden' }}>
      <h2
        className="text-center mb-4 contact-form-modal-heading"
      >
        Contact Our Expert Team
      </h2>
      <form id={id}
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div className="row g-3">
          <div className="col-md-6">
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="name" className="form-label">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="FullName*"
                className="form-control blog-contact-form-input"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && (
                <FormErrorMessage formik={formik.errors.name} />
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="email" className="form-label">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email*"
                className="form-control blog-contact-form-input"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <FormErrorMessage formik={formik.errors.email} />
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="phoneNumber" className="form-label">Phone Number *</label>
              <PhoneInput
                country={
                  selectedCountry
                    ? selectedCountry.countryCode.toLowerCase()
                    : "ca"
                }
                placeholder="Phone Number*"
                countryCodeEditable={false}
                enableSearch={true}
                value={formik.values.phoneNumber}
                onChange={handleCountryChange}
                onBlur={formik.handleBlur("phoneNumber")}
                inputProps={{
                  ref: inputRef,
                  name: "phoneNumber",
                  id: "phoneNumber",
                  required: true,
                }}
                inputStyle={{
                  width: "100%",
                  height: "50px",
                  fontSize: "16px",
                  paddingLeft: "50px",
                  borderRadius: "5px",
                  fontFamily: "'Epilogue', sans-serif",
                  outline: "none",
                  boxShadow: "none"
                }}
                buttonStyle={{
                  borderRadius: "5px 0 0 5px",
                }}
                containerClass="phone-input-container"
              />
              {formik.errors.phoneNumber &&
                formik.touched.phoneNumber && (
                  <FormErrorMessage formik={formik.errors.phoneNumber} />
                )}
            </div>
          </div>


          <div className="col-md-6">
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="companyName" className="form-label">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                placeholder="Company Name"
                className="form-control blog-contact-form-input"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="jobOption" className="form-label">Are You Looking To Hire Staff For Your Company? *</label>
              <select
                id="jobOption"
                name="jobOption"
                className="form-control blog-contact-form-select-dropdown"
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
                <FormErrorMessage formik={formik.errors.jobOption} />
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="role" className="form-label">What Role Are You Looking To Hire?</label>
              <input
                type="text"
                id="role"
                name="role"
                placeholder="What role are you looking to hire?"
                className="form-control blog-contact-form-input"
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.role && formik.touched.role && (
                <FormErrorMessage formik={formik.errors.role} />
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="experience" className="form-label">How Experienced Should The Talent Be?</label>
              <select
                id="experience"
                name="experience"
                className="form-control blog-contact-form-select-dropdown"
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
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="hiringTime" className="form-label">How Urgent Is This Hire?</label>
              <select
                id="hiringTime"
                name="hiringTime"
                className="form-control blog-contact-form-select-dropdown"
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
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="budget" className="form-label">How Are You Planning To Budget For This Hire?</label>
              <select
                id="budget"
                name="budget"
                className="form-control blog-contact-form-select-dropdown"
                value={formik.values.budget}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Please select an option</option>
                <option value="Per hire / Placement based">
                  Per hire / Placement based
                </option>
                <option value="   Ongoing / Multiple hires
">
                  Ongoing / Multiple hires
                </option>
                <option value="Project based">
                  Project based
                </option>
                <option value="   Not decided yet
">
                  Not decided yet
                </option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="hiringDecision" className="form-label">Who Will Take The Final Hiring Decision?</label>
              <select
                id="hiringDecision"
                name="hiringDecision"
                className="form-control blog-contact-form-select-dropdown"
                value={formik.values.hiringDecision}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">Please select an option</option>
                <option value="   Me
">
                  Me
                </option>
                <option value="Me + Another stack holder">
                  Me + Another stack holder
                </option>
                <option value="HR / Management Team
">
                  HR / Management Team
                </option>
                <option value="Not sure yet">
                  Not sure yet
                </option>
              </select>
            </div>
          </div>

          <div className="col-12">
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="message" className="form-label">Your Message</label>
              <textarea
                id="message"
                name="message"
                className="form-control blog-contact-form-text-area"
                placeholder="Your Message"
                rows={3}
                value={formik.values.message}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="col-12 text-center">
            <button
              type="submit"
              className="blog blog-contact-form-submit-btn"
              disabled={isSubmitting}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(57, 49, 133, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactFormModal;

