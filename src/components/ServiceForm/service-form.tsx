"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface FormValues {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  country: string;
  serviceInterest: string;
  role: string;
  experienceLevel: string;
  monthlyBudget: string;
  message: string;
}

interface Country {
  id: number;
  name: string;
  code: string;
  dial_code: string;
}

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .min(10, "Invalid phone number")
    .required("Contact number is required"),
  message: Yup.string().required("Message is required"),
});

const ServiceForm: React.FC = () => {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);
  const [captchaResponse, setCaptchaResponse] = useState<string>("");
  const NEXT_PUBLIC_FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "https://aisapi.aistechnolabs.com/getAllCountry"
      );
      setCountries(response.data.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      country: "",
      serviceInterest: "",
      role: "",
      experienceLevel: "",
      monthlyBudget: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmitForm(values, resetForm);
    },
  });

  const handleSubmitForm = async (
    values: FormValues,
    resetForm: () => void
  ) => {
    if (!window.grecaptcha) {
      console.log("reCAPTCHA not available yet");
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string, {
          action: "submit",
        })
        .then((gReCaptchaToken: string) => {
          setCaptchaResponse(gReCaptchaToken); // Store the CAPTCHA response
          submitServiceForm(values, gReCaptchaToken, resetForm);
        })
        .catch((error: any) => {
          console.error("Error executing reCAPTCHA:", error);
        });
    });
  };

  const submitServiceForm = async (
    values: FormValues,
    gReCaptchaToken: string,
    resetForm: () => void
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.fullName);
      formData.append("email", values.email);
      formData.append("phone_number", values.phoneNumber);
      formData.append("country", values.country);
      formData.append("interest", values.serviceInterest);
      formData.append("role", values.role);
      formData.append("level", values.experienceLevel);
      formData.append("budget", values.monthlyBudget);
      formData.append("message", values.message);
      formData.append("captcha_response", gReCaptchaToken);
      formData.append("form_url", `${NEXT_PUBLIC_FRONTEND_URL}`);


      const { status, data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/servicesFormApi`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (status === 200) {
        console.log("Form submitted successfully!");
        resetForm(); // Reset form after successful submission
        router.push("/thank-you"); // Redirect after successful submission
      } else {
        console.log(
          `Form submission failed: ${data.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center py-4">
          <div className="col-md-10">
            <div className="start-hiring-form">
              <h2 className="com-title">
                Stop Searching. Start Hiring Talent Now
              </h2>
              <div className="button-box">
                <div className="l-button">
                  <div className="icon-box">
                    <Image
                      src="/assets/img/briefcase.png"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <span>𝐋𝐨𝐨𝐤𝐢𝐧𝐠 𝐭𝐨 𝐡𝐢𝐫𝐞</span>
                  <Link href="#reach-submit">Hire a Talent</Link>
                </div>
                <div className="r-button">
                  <div className="icon-box" id="reach-submit">
                    <Image
                      src="/assets/img/loupe.png"
                      width={24}
                      height={24}
                      alt=""
                    />
                  </div>
                  <span>𝐋𝐨𝐨𝐤𝐢𝐧𝐠 𝐟𝐨𝐫 𝐚 𝐣𝐨𝐛</span>
                  <Link href="/job-seekers">Apply as a Talent</Link>
                </div>
              </div>

              <div className="form-wrapper">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                  }}
                >
                  <div className="row g-3 g-md-4 justify-content-center">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Name*"
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
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address*"
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

                    {/* Country Field */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <select
                          name="country"
                          value={formik.values.country}
                          onClick={() => fetchCountries()}
                          onChange={(e) => {
                            const selectedCountry: any = countries.find(
                              (country: any) => country.name === e.target.value
                            );
                            formik.setFieldValue("country", e.target.value);
                            formik.setFieldValue(
                              "countryCode",
                              selectedCountry
                                ? selectedCountry.dial_code
                                : "+"
                            );
                          }}
                          className="form-control"
                        >
                          <option value="">Select Country</option>

                          {countries.length === 0 ? (
                            <option value="">Loading countries...</option>
                          ) : (
                            <>
                              {countries.map((country) => (
                                <option key={country.id} value={country.name}>
                                  {country.name}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                        {formik.errors.country && formik.touched.country && (
                          <div className="invalid-feedback-error">
                            {formik.errors.country}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Phone Number Field */}
                    <div className="col-md-6">
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
                              name="phoneNumber"
                              placeholder="Contact Number"
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

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="serviceInterest">
                          In which service you are interested?
                        </label>
                        <select
                          name="serviceInterest"
                          className="form-control"
                          value={formik.values.serviceInterest}
                          onChange={formik.handleChange}
                        >
                          <option value="">Select Interest</option>
                          <option value="Hiring Freelancers/Contractors">
                            Hiring Freelancers/Contractors
                          </option>
                          <option value="Hiring Permanent/Full time talents">
                            Hiring Permanent/Full time talents
                          </option>
                          <option value="Franchise Inquiry">
                            Franchise Inquiry
                          </option>
                          <option value="Looking for Digital Marketing/Web Development services">
                            Looking for Digital Marketing/Web Development
                            services
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="role">
                          What role are you looking to hire?
                        </label>
                        <select
                          name="role"
                          className="form-control"
                          value={formik.values.role}
                          onChange={formik.handleChange}
                        >
                          <option value="">Select Role</option>
                          <option value="MD">MD</option>
                          <option value="Director">Director</option>
                          <option value="HR Manager/Head">
                            HR Manager/Head
                          </option>
                          <option value="HR Executive">HR Executive</option>
                          <option value="Admin">Admin</option>
                          <option value="Purchase manager/ Executive">
                            Purchase manager/ Executive
                          </option>
                          <option value="others">Others</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="experienceLevel">
                          How experienced should the talent be?
                        </label>
                        <select
                          name="experienceLevel"
                          className="form-control"
                          value={formik.values.experienceLevel}
                          onChange={formik.handleChange}
                        >
                          <option value="">Select Level</option>
                          <option value="Intermediate/Junior Level (1-3 Years of experience)">
                            Intermediate/Junior Level (1-3 Years of
                            experience)
                          </option>
                          <option value="Mid Level (3-8 Years of experience)">
                            Mid Level (3-8 Years of experience)
                          </option>
                          <option value="Senior/Executive Level (8+ Years of experience)">
                            Senior/Executive Level (8+ Years of experience)
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="monthlyBudget">
                          What is your monthly budget for this role?
                        </label>
                        <input
                          type="text"
                          name="monthlyBudget"
                          placeholder="Monthly Budget"
                          className="form-control"
                          value={formik.values.monthlyBudget}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group">
                        <textarea
                          name="message"
                          className="form-control"
                          placeholder="Your Message"
                          rows={5}
                          value={formik.values.message}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.message && formik.touched.message && (
                          <div className="invalid-feedback-error error">
                            {formik.errors.message}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-8 col-md-5">
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
      {/* </GoogleCaptchaWrapper> */}
    </>
  );
};

export default ServiceForm;