import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import GoogleCaptchaWrapper from "../captcha/google-captcha-wrapper";
import { toast } from "react-toastify";
const NEXT_PUBLIC_FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const HireTalent = ({ show, setShowModal, title }: any) => {
  return (
    <GoogleCaptchaWrapper>
      <HireTalentFormChild
        show={show}
        setShowModal={setShowModal}
        title={title}
      />
    </GoogleCaptchaWrapper>
  );
};

interface FormValues {
  name: string,
  email: string,
  phone_number: string,
  role_hire: string,
  experience_level: string,
  budget: string,
  custom_budget: string,
  captcha_response: string,



}
declare global {
  interface Window {
    grecaptcha: any; // You can specify more precise types if known
  }
}


const HireTalentFormChild = ({ show, setShowModal, title }: any) => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isOtherBudget, setIsOtherBudget] = useState(false);
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isFormActive, setIsFormActive] = useState(false); // New state to manage form activation
  const currentUrl = router.asPath;
  //   const context = useContext(SelectedCountryContext);
  //   const selectedCountry = context ? context.toLowerCase() : null;
  const handleClose = () => setShowModal(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Full Name is required")
      .min(2, "Name is too short"),
    email: Yup.string()
      .required("Work Email is required")
      .email("Invalid email format"),
    // phone_number: Yup.string()
    //   .required("Mobile Number is required")
    //   .test("isValidLength", "Invalid phone number length", function (value) {
    //     const { path, createError } = this;
    //     if (!value) return true;

    //     const countryCode = value.match(/^\+(\d+)/);
    //     if (countryCode) {
    //       const digits = countryCode[1].length;
    //       let minLength;
    //       if (digits === 1) {
    //         minLength = 8;
    //         const phoneNumber = value.replace(/^\+\d+/, "");
    //         if (phoneNumber.length < minLength) {
    //           return createError({
    //             path,
    //             message: `Phone number must be at least 4 digits long`,
    //           });
    //         }
    //       } else if (digits === 2) {
    //         minLength = 5;
    //         const phoneNumber = value.replace(/^\+\d+/, "");
    //         if (phoneNumber.length < minLength) {
    //           return createError({
    //             path,
    //             message: `Phone number must be at least 4 digits long`,
    //           });
    //         }
    //       } else if (digits === 3) {
    //         minLength = 5;
    //         const phoneNumber = value.replace(/^\+\d+/, "");
    //         if (phoneNumber.length < minLength) {
    //           return createError({
    //             path,
    //             message: `Phone number must be at least 4 digits long`,
    //           });
    //         }
    //       } else {
    //         minLength = 8;
    //         const phoneNumber = value.replace(/^\+\d+/, "");
    //         if (phoneNumber.length < minLength) {
    //           return createError({
    //             path,
    //             message: `Phone number must be at least 4 digits long`,
    //           });
    //         }
    //       }
    //     }
    //     return true;
    //   }),
    // role_hire: Yup.string()
    //   .required("Role to hire is required")
    //   .min(2, "Role is too short"),
    // experience_level: Yup.string().required("Experience level is required"),
    // budget: Yup.string().required("Budget is required"),
    // custom_budget:("Budget is required"),
  });
 
  const initialValues = ({
    name: "",
    email: "",
    phone_number: "",
    role_hire: "",
    experience_level: "",
    budget: "",
    custom_budget: "",
    captcha_response: "",
  })

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCountryChange = (value: any, country: any, e: any, formattedValue: any) => {
    formik.setFieldValue('phone_number', formattedValue);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  

  const handleSubmitForm = (values: FormValues) => {
    if (!window.grecaptcha) {
      console.log("reCAPTCHA not available yet");
      // setNotification("reCAPTCHA not available yet, likely meaning key not set");
      return;
    }
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" })
        .then((gReCaptchaToken: string) => {
          submitHireTalentForm(values, gReCaptchaToken);
        })
        .catch((error: any) => {
          console.error("Error executing reCAPTCHA:", error);
        });
    });
  };
 

  const formik: any = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmitForm(values);
    },
  });

  const submitHireTalentForm = async (values: FormValues, gReCaptchaToken: string) => {
    try {
      const requestdata = {
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
        role_hire: values.role_hire,
        budget: values.budget,
        custom_budget: values.custom_budget,
        experience_level: values.experience_level,
        captcha_response: gReCaptchaToken,
        currentFormUrl: `${NEXT_PUBLIC_FRONTEND_URL}/${currentUrl}`,
      };
      console.log(requestdata);

      const response = await axios.post(
        `${NEXT_PUBLIC_BACKEND_URL}/hireTelanteForm`,
        requestdata
      );
      if (response.status === 200 && response.data.status !== "error") {
        router.push("/thank-you");
        formik.resetForm();
      } else {
        toast.error(response.data.error || "Failed to submit form");
      }
    } catch (error: any) {
      toast.error(error.response.data.error || "Failed to submit form");
    }
  }
  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     email: "",
  //     phone_number: "",
  //     role_hire: "",
  //     experience_level: "",
  //     budget: "",
  //     custom_budget: "",
  //     captcha_response: "",
  //   },
  //   validationSchema,
  //   onSubmit: async (values, { resetForm }) => {
  //     // console.log("executeRecaptcha====>", executeRecaptcha);

  //     if (!executeRecaptcha) {
  //       // console.log("Execute recaptcha not available yet");
  //       return;
  //     }
  //     executeRecaptcha("enquiryFormSubmit").then(
  //       async (gReCaptchaToken: any) => {
  //         try {
  //           const requestdata = {
  //             name: values.name,
  //             email: values.email,
  //             phone_number: values.phone_number,
  //             role_hire: values.role_hire,
  //             budget: values.budget,
  //             custom_budget: values.custom_budget,
  //             experience_level: values.experience_level,
  //             captcha_response: gReCaptchaToken,
  //             currentFormUrl: `${NEXT_PUBLIC_FRONTEND_URL}/${currentUrl}`,
  //           };
  //           console.log(requestdata);

  //           const { status, data } = await axios.post(
//                    `/${NEXT_PUBLIC_BACKEND_URL}/hireTelanteForm`,
  //             requestdata
  //           );
  //           if (status === 200) {
  //             resetForm();
  //             router.push("/thank-you");
  //           } else {
  //             console.error("Form submission failed:", data);
  //           }
  //         } catch (error: any) {
  //           console.error("Form submission error:", error);
  //           let msg = "An error occurred";
  //           if (error.response) {
  //             msg =
  //               typeof error.response.data.message === "string"
  //                 ? error.response.data.message
  //                 : error.response.data.message[0].message;
  //           }
  //         }
  //       }
  //     );
  //   },
  // });

  const handleBudgetChange = (e: any) => {
    const { name, value } = e.target;
    formik.handleChange(e); // Invoke formik's handleChange to update form values
    setIsOtherBudget(value === "Other");
  };
  return (
    <>
      <React.Fragment>
        <Modal
          show={show}
          onHide={handleClose}
          centered
          size="xl"
          className="hiring-platform hire-talent-form p-0"
          scrollable
        >
          <div className="modal-header border-0 pb-1">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            />
          </div>
          <div className="modal-body">
            <h2 className="section-title text-center mb-5">
              Discover handpicked, vetted talents.
            </h2>

            <form onSubmit={formik.handleSubmit}>
              <div className="row gx-4 gy-md-4 gy-3">
                <div className="form-group col-md-6">
                  <input
                    className={`form-control ${!isFormActive ? "hidden-input" : ""
                      }`}
                    type="text"
                    name="name"
                    placeholder="Full Name*"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-danger">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="form-group col-md-6">
                  <input
                    className={`form-control ${!isFormActive ? "hidden-input" : ""
                      }`}
                    type="email"
                    name="email"
                    placeholder="Work Email*"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="form-group col-md-6">
                  <PhoneInput
                    placeholder="Mobile Number"
                    enableSearch={true}

                    inputClass={`form-control mobile-nav  ${!isFormActive ? "hidden-input" : ""
                      }`}
                    countryCodeEditable={false}
                    country={"us"}
                    value={formik.values.phone_number}
                    // onChange={(value, country, e, formattedValue) => {
                    //   formik.setFieldValue("phone_number", formattedValue);
                    // }}
                    onChange={handleCountryChange}
                    onBlur={formik.handleBlur("phone_number")}
                    inputStyle={{ width: "100%", paddingLeft: "45px" }}
                    inputProps={{ ref: inputRef }}
                  />
                  {/* {formik.errors.phone_number && formik.touched.phone_number ? (
                    <div className="invalid-feedback-error">
                      {formik.errors.phone_number}
                    </div>
                  ) : null} */}
                </div>
                <div className="form-group col-md-6">
                  <input
                    className={`form-control ${!isFormActive ? "hidden-input" : ""
                      }`}
                    type="text"
                    name="role_hire"
                    placeholder="What role are you looking to hire?*"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.role_hire}
                  />
                  {/* {formik.touched.role_hire && formik.errors.role_hire ? (
                    <div className="text-danger">{formik.errors.role_hire}</div>
                  ) : null} */}
                </div>
                <div className="form-group col-md-6">
                  <select
                    className={`form-control form-select ${!isFormActive ? "hidden-input" : ""
                      }`}
                    name="experience_level"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.experience_level}
                  >
                    <option
                      value=""
                      label="What level of experience do you need?*"
                    >
                      What level of experience do you need?*
                    </option>
                    <option value="Junior Level (1-3 years)">
                      Junior Level (1-3 years)
                    </option>
                    <option value="Mid-Level (3-5 years)">
                      Mid-Level (3-5 years)
                    </option>
                    <option value="Senior Level (5+ years)">
                      Senior Level (5+ years)
                    </option>
                  </select>
                  {/* {formik.touched.experience_level &&
                  formik.errors.experience_level ? (
                    <div className="text-danger">
                      {formik.errors.experience_level}
                    </div>
                  ) : null} */}
                </div>
                <div className="form-group col-md-6">
                  <select
                    className={`form-control form-select ${!isFormActive ? "hidden-input" : ""
                      }`}
                    name="budget"
                    onChange={handleBudgetChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.budget}
                  >
                    <option
                      value=""
                      label="What is your monthly budget for this role?*"
                    >
                      What is your monthly budget for this role?*
                    </option>
                    <option value="$1000 - $1500">$1000 - $1500</option>
                    <option value="$1500 - $2500">$1500 - $2500</option>
                    <option value="$2500 - $3500">$2500 - $3500</option>
                    <option value="$3500 and above">$3500 and above</option>
                    <option value="Other">
                      Do you have any specific budget?
                    </option>
                  </select>
                  {/* {formik.touched.budget && formik.errors.budget && (
                    <div className="text-danger">{formik.errors.budget}</div>
                  )} */}

                  {isOtherBudget && (
                    <div className="mt-2">
                      <input
                        className={`form-control ${!isFormActive ? "hidden-input" : ""
                          }`}
                        type="text"
                        name="custom_budget"
                        placeholder="What role are you looking to hire?*"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.custom_budget}
                      />
                      {/* Display specific error for custom_budget if any */}
                      {/* {formik.touched.custom_budget &&
                        formik.errors.custom_budget && (
                          <div className="text-danger">
                            {formik.errors.custom_budget}
                          </div>
                        )} */}
                    </div>
                  )}
                </div>
                <div className="col-12 text-center mt-0">
                  <button
                    type="submit"
                    className={`cta-button ${!isFormActive ? "hidden-input" : ""
                      }`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </React.Fragment>
    </>
  );
};
