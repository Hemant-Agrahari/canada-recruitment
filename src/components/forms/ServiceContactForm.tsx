import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";

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

const ServiceContactForm: React.FC<{ id: string }> = ({ id }) => {
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

export default ServiceContactForm;
