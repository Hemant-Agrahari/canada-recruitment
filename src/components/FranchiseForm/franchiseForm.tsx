"use client";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import GoogleCaptchaWrapper from "../captcha/google-captcha-wrapper";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
const NEXT_PUBLIC_FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Country {
  id: string;
  name: string;
  code: string;
  dial_code: string;
}

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .min(10, "Invalid phone number")
    .required("Contact number is required"),
  Primary_Motivation_for_Franchise_Exploration: Yup.string().required("This field is required"),

});

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const FranchiseForm = () => {
  return (
    <GoogleCaptchaWrapper>
      <FranchiseFormChild />
    </GoogleCaptchaWrapper>
  );
};

const FranchiseFormChild = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string>(
    "/assets/images/common/attach-file.png"
  );
  const [countries, setCountries] = useState<Country[]>([]);
  const [isINR, setIsINR] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch countries from API
  const fetchCountries = async () => {
    try {
      const apiUrl = `${NEXT_PUBLIC_BACKEND_URL}/getCountries`;

      const response = await axios.get(apiUrl);
      if (response.data && response.data.data) {
        setCountries(response.data.data);
      } else {
        toast.error("No countries data in response");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Error fetching countries");
      } else {
        toast.error("Error fetching countries");
      }
    }
  };

  // Fetch countries on mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch user's country by IP
  const fetchCountryByIP = async () => {
    const API_URL = `https://freeipapi.com/api/json`;
    let retryCount = 3;

    const retryRequest = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (data && data.countryCode) {
          setIsINR(data.countryCode === 'IN');
          const selectedCountry = countries.find(
            (country) => country.code === data.countryCode
          );
          if (selectedCountry) {
            formik.setFieldValue("country", selectedCountry.name);
            formik.setFieldValue("countryCode", selectedCountry.dial_code);
          }
        }
      } catch (error) {
        if (retryCount > 0) {
          retryCount--;
          setTimeout(() => retryRequest(), 2000);
        }
      }
    };

    retryRequest();
  };
  const router = useRouter();

  // Fetch user's country by IP after countries are loaded
  useEffect(() => {
    if (countries.length > 0) {
      fetchCountryByIP();
    }
  }, [countries]);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      country: "",
      countryCode: "",
      phoneNumber: "",
      email: "",
      investment_range: "",
      Primary_Motivation_for_Franchise_Exploration: "",
      Recruitment_Industry_Experience_Level: "",
      business_start_timeline: "",
      Planned_Level_of_Business_Involvement: "",
      Key_Expectations_from_Franchise_Partner: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmitForm(values, resetForm);
    },
  });

  const handleSubmitForm = async (values: any, resetForm: any) => {
    setIsSubmitting(true);
    if (!window.grecaptcha) {
      toast.error("reCAPTCHA not available yet");
      return;
    }
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
          action: "submit",
        })
        .then((gReCaptchaToken: string) => {
          submitFranchiseForm(values, gReCaptchaToken, resetForm);
        })
        .catch((error: any) => {
          toast.error("Error executing reCAPTCHA");
          setIsSubmitting(false);
        });
    });
  };

  const submitFranchiseForm = async (
    values: any,
    gReCaptchaToken: string,
    resetForm: any
  ) => {
    try {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("phone_number", values.phoneNumber);
      formData.append("email", values.email);
      formData.append("investment_range", values.investment_range);
      formData.append("Primary_Motivation_for_Franchise_Exploration", values.Primary_Motivation_for_Franchise_Exploration);
      formData.append("Recruitment_Industry_Experience_Level", values.Recruitment_Industry_Experience_Level);
      formData.append("business_start_timeline", values.business_start_timeline);
      formData.append("Planned_Level_of_Business_Involvement", values.Planned_Level_of_Business_Involvement);
      formData.append("Key_Expectations_from_Franchise_Partner", values.Key_Expectations_from_Franchise_Partner);

      formData.append("form_url", `${NEXT_PUBLIC_FRONTEND_URL}${router.pathname}`);
      formData.append("captcha_response", gReCaptchaToken);

      const response = await axios.post(
        `${NEXT_PUBLIC_BACKEND_URL}/forFranchinseInquiry`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 && response.data.status !== "error") {
        resetForm();
        router.push("/thank-you");
        setIsSubmitting(false);
      } else {
        toast.error(response.data.error || "Failed to submit form");
        setIsSubmitting(false);
      }
    } catch (error: any) {
      toast.error(error.response.data.error || "Failed to submit form");
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const uploadButton = document.getElementById("uploadButton");
      if (uploadButton) {
        uploadButton.textContent = fileName;
      }

      // Create a preview URL for the selected file
      const previewUrl = URL.createObjectURL(file);
      setPreviewSrc(previewUrl); // Update the preview image
    }
  };

  return (
    <div className="container px-0">
      <div className="row justify-content-center py-4">
        <div className="col-12">
          <div className="start-hiring-form">
            <div className="form-wrapper">
              <form onSubmit={formik.handleSubmit} id="franchise-enquiry-form">
                <div className="row g-3 g-md-4 justify-content-center">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name*"
                        className="form-control"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.fullName &&
                        formik.touched.fullName && (
                          <div className="invalid-feedback-error error">
                            {formik.errors.fullName}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email Id *</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Id*"
                        className="form-control"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.email && formik.touched.email && (
                        <div className="invalid-feedback-error error">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Phone Number Field */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="phoneNumber" className="form-label">Contact Number *</label>
                      <div className="row g-0 contact-input">
                        <div className="col-3">
                          <div className="form-group county-code">
                            <input
                              type="text"
                              className="form-control border-0"
                              value={formik.values.countryCode || "+91"} // Default to +91 or selected country code
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="col-9 border-0">
                          <div className="form-group">
                            <input
                              type="text"
                              id="phoneNumber"
                              name="phoneNumber"
                              placeholder="Contact Number*"
                              className="form-control border-0"
                              value={formik.values.phoneNumber}
                              onChange={formik.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      {formik.errors.phoneNumber &&
                        formik.touched.phoneNumber && (
                          <div className="invalid-feedback-error error">
                            {formik.errors.phoneNumber}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="investment_range" className="form-label">Investment Range *</label>
                      <select
                        name="investment_range"
                        className="form-control"
                        value={formik.values.investment_range}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="">Investment Range*</option>
                        {isINR ? (
                          <>
                            <option value="Rs.2,00,000 to Rs.5,00,000">
                              Rs.2,00,000 to Rs.5,00,000
                            </option>
                            <option value="Rs.5,00,001 to Rs.10,00,000">
                              Rs.5,00,001 to Rs.10,00,000
                            </option>
                            <option value="Rs.10,00,001 to Rs.20,00,000">
                              Rs.10,00,001 to Rs.20,00,000
                            </option>
                            <option value="Rs.20,00,001 to Rs.30,00,000">
                              Rs.20,00,001 to Rs.30,00,000
                            </option>
                            <option value="Rs.30,00,001 to Rs.50,00,000">
                              Rs.30,00,001 to Rs.50,00,000
                            </option>
                            <option value="Rs.50,00,000 & above">
                              Rs.50,00,000 & above
                            </option>
                          </>
                        ) : (
                          <>
                            <option value="USD 5000 to USD 10000">
                              5000 to 10000 USD
                            </option>
                            <option value="USD 10001 to USD 20000">
                              10001 to 20000 USD
                            </option>
                            <option value="USD 20001 to USD 30000">
                              20001 to 30000 USD
                            </option>
                            <option value="USD 30001 to USD 40000">
                              30001 to 40000 USD
                            </option>
                          </>
                        )}
                      </select>
                      {formik.errors.investment_range &&
                        formik.touched.investment_range && (
                          <div className="invalid-feedback-error error">
                            {formik.errors.investment_range}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="Recruitment_Industry_Experience_Level" className="form-label">How Familiar Are You with Recruitment or Staffing Services?</label>
                      <select
                        name="Recruitment_Industry_Experience_Level"
                        className="form-control"
                        value={formik.values.Recruitment_Industry_Experience_Level}
                        onChange={formik.handleChange}
                      >
                        <option value="">
                          Please select an option
                        </option>
                        <option value="Very Familiar (Worked in Recruitment/ HR / Sales)">
                          Very Familiar (Worked in Recruitment/ HR / Sales)
                        </option>
                        <option value="Some Exposure (Clients / Hiring / HR Support)">
                          Some Exposure (Clients / Hiring / HR Support)
                        </option>
                        <option value="New to Recruitment but Keen to Learn">
                          New to Recruitment but Keen to Learn
                        </option>
                        <option value="Just Researching at This Stage">
                          Just Researching at This Stage
                        </option>
                      </select>

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="business_start_timeline" className="form-label">How Soon Are You Looking to Start a Business Like This?</label>
                      <select
                        name="business_start_timeline"
                        className="form-control"
                        value={formik.values.business_start_timeline}
                        onChange={formik.handleChange}
                      >
                        <option value="">
                          Please select an option
                        </option>
                        <option value="Immediately / Within 30 Days">
                          Immediately / Within 30 Days
                        </option>
                        <option value="In the Next 2 - 3 Months">
                          In the Next 2 - 3 Months
                        </option>
                        <option value="In 3 - 6 Months">In 3 - 6 Months</option>
                        <option value="Not Sure Yet">Not Sure Yet</option>
                      </select>

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="Planned_Level_of_Business_Involvement" className="form-label">How Involved Do You Plan to Be in the Business Initially? </label>
                      <select
                        name="Planned_Level_of_Business_Involvement"
                        className="form-control"
                        value={formik.values.Planned_Level_of_Business_Involvement}
                        onChange={formik.handleChange}
                      >
                        <option value="">
                          Please select an option
                        </option>
                        <option value="Full Time - Hands On">
                          Full Time - Hands On
                        </option>
                        <option value="Part Time but Actively Involved">
                          Part Time but Actively Involved
                        </option>
                        <option value="Strategic / Investor Level">
                          Strategic / Investor Level
                        </option>
                        <option value="Still Evaluating Involvement">
                          Still Evaluating Involvement
                        </option>
                      </select>

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="Key_Expectations_from_Franchise_Partner" className="form-label">What Are You Primarily Looking for From a Franchise Partner? </label>
                      <select
                        name="Key_Expectations_from_Franchise_Partner"
                        className="form-control"
                        value={formik.values.Key_Expectations_from_Franchise_Partner}
                        onChange={formik.handleChange}
                      >
                        <option value="">
                          Please select an option
                        </option>
                        <option value="Proven Brand & Credibility">
                          Proven Brand & Credibility
                        </option>
                        <option value="Training & Handholding">
                          Training & Handholding
                        </option>
                        <option value="Ready Processes and System">
                          Ready Processes and System
                        </option>
                        <option value="Lead Generation & Sales Support">
                          Lead Generation & Sales Support
                        </option>
                        <option value="All of the Above">All of the Above</option>
                      </select>

                    </div>
                  </div>

                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        className="form-control"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.address && formik.touched.address && (
                        <div className="invalid-feedback-error error">
                          {formik.errors.address}
                        </div>
                      )}
                    </div>
                  </div> */}
                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="form-control"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.city && formik.touched.city && (
                        <div className="invalid-feedback-error error">
                          {formik.errors.city}
                        </div>
                      )}
                    </div>
                  </div> */}
                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        className="form-control"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.state && formik.touched.state && (
                        <div className="invalid-feedback-error error">
                          {formik.errors.state}
                        </div>
                      )}
                    </div>
                  </div> */}

                  {/* Country Field */}
                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <select
                        name="country"
                        value={formik.values.country}
                        onChange={(e) => {
                          const selectedCountry = countries.find(
                            (country) => country.name === e.target.value
                          );
                          formik.setFieldValue("country", e.target.value);
                          formik.setFieldValue(
                            "countryCode",
                            selectedCountry ? selectedCountry.dial_code : "+"
                          );
                        }}
                        className="form-control"
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option key={country.id} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      {formik.errors.country && formik.touched.country && (
                        <div className="invalid-feedback-error">
                          {formik.errors.country}
                        </div>
                      )}
                    </div>
                  </div> */}


                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="Primary_Motivation_for_Franchise_Exploration" className="form-label">What Is Your Primary Reason for Exploring a Recruitment Franchise?</label>
                      <select
                        name="Primary_Motivation_for_Franchise_Exploration"
                        className="form-control"
                        value={formik.values.Primary_Motivation_for_Franchise_Exploration}
                        onChange={formik.handleChange}
                      >
                        <option value="">
                          What Is Your Primary Reason for Exploring a Recruitment Franchise?*
                        </option>
                        <option value="I Want to Start My Own Recruitment Business">
                          I Want to Start My Own Recruitment Business
                        </option>
                        <option value="I Want an Additional Income Stream">
                          I Want an Additional Income Stream
                        </option>
                        <option value="I Already Work in HR / Recruitment">
                          I Already Work in HR / Recruitment
                        </option>
                        <option value="I Am Exploring Opportunity for the Future">
                          I Am Exploring Opportunity for the Future
                        </option>
                      </select>
                    </div>
                  </div>


                  <div className="col-12">
                    <div className="row justify-content-center">
                      <div className="col-md-5">
                        <button type="submit" className="submit-button" disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranchiseForm;
