import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import GoogleCaptchaWrapper from "../captcha/google-captcha-wrapper";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Image from "next/image";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import { toast } from "react-toastify";
const NEXT_PUBLIC_FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const HireACandidate = ({ id }: { id?: string }) => {
  return (
    <GoogleCaptchaWrapper>
      <HireACandidateChild id={id} />
    </GoogleCaptchaWrapper>
  );
};
export default HireACandidate;
const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone_number: Yup.string()
    .min(9, " Must be 4 digits required")
    .required("Mobile Number is required"),
  job_option: Yup.string().required("This field is required"),
});

interface FormValues {
  fullName: string;
  email: string;
  phone_number: string;
  company_name: string;
  role: string;
  job_option: string;
  experience: string;
  hiringTime: string;
  message: string;
  budget?: string;
  hiringDecision?: string;
}
declare global {
  interface Window {
    grecaptcha: any; // You can specify more precise types if known
  }
}
const HireACandidateChild = ({ id }: { id?: string }) => {
  const router = useRouter();
  const [selectedPhone, setSelectedPhone] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [countryName, setCountryName] = useState<any>(null);
  const [countryCode, setCountryCode] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [shouldRenderComponent, setShouldRenderComponent] = useState(true);
  const [notification, setNotification] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();
  const currentUrl = router.asPath;
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCancelSave = () => {
    setShowModal(false);
  };

  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        // console.log(data, "data")
        // console.log(data.ip, "data")
        setCountryName(data.country_name);
        setCountryCode(data.country_calling_code);
        setSelectedCountry({
          name: data.country_name,
          dialCode: data.country_calling_code,
          countryCode: data.country_code,
        });
      })
      .catch((error) => {
        // console.error(error);
      });
  };
  useEffect(() => {
    const delayedFetch = setTimeout(() => {
      getGeoInfo();
    }, 1000);
    // Clear the timeout if the component unmounts before the delay
    return () => clearTimeout(delayedFetch);
  }, []);
  useEffect(() => {
    // console.log(countryCode, "1", countryName, "2", selectedCountry, "4");
  }, [countryCode, countryName, selectedCountry]);
  const handleComponentRender = () => {
    setShouldRenderComponent(!shouldRenderComponent);
  };
  const handleClose = () => {
    setShow(false);
  };
  const [isSubmitted, setIsSubmitted] = useState(false);
  const initialValues = {
    fullName: "",
    email: "",
    phone_number: "",
    company_name: "",
    role: "",
    job_option: "",
    experience: "",
    hiringTime: "",
    message: "",
    budget: "",
    hiringDecision: "",
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCountryChange = (
    value: any,
    country: any,
    e: any,
    formattedValue: any
  ) => {
    formik.setFieldValue("phone_number", formattedValue);

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

    window.grecaptcha.ready((e: any) => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
          action: "submit",
        })
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

  const handleSubmitClick = async () => {
    const errors = await formik.validateForm();
    formik.setTouched({
      fullName: true,
      email: true,
      phone_number: true,
      company_name: true,
      role: true,
      job_option: true,
    });

    if (Object.keys(errors).length === 0) {
      setShowModal(true);
    } else {
      formik.setErrors(errors);
    }
  };

  const submitHireTalentForm = async (
    values: FormValues,
    gReCaptchaToken: string
  ) => {
    try {
      const requestdata = {
        fullName: values.fullName,
        email: values.email,
        phone_number: values.phone_number,
        company_name: values.company_name,
        role: values.role,
        job_option: values.job_option,
        experience: values.experience,
        hiringTime: values.hiringTime,
        message: values.message,
        captcha_response: gReCaptchaToken,
        budget: values.budget,
        hiringDecision: values.hiringDecision,
        form_url: `${NEXT_PUBLIC_FRONTEND_URL}${currentUrl}`,
      };
      // console.log(requestdata)
      setIsSubmitted(true);
      const response = await axios.post(
        `${NEXT_PUBLIC_BACKEND_URL}/forHireCandidate`,
        requestdata
      );
      if (response.status === 200 && response.data.status !== "error") {
        handleComponentRender();
        formik.setFieldValue("phone_number", "");
        setShowModal(false);
        setSelectedPhone("");
        setShow(true);
        formik.resetForm();

        // e.preventDefault()
        // resetForm({
        //     values: {
        //         username: '',
        //         email: '',
        //         phone_number: '',
        //         skype_id: '',
        //         subjects: '',
        //         details: '',
        //         // recaptcha: ''
        //     },
        // });
      } else {
        toast.error(response.data.error || "Failed to submit form");
      }
    } catch (error: any) {
      setIsSubmitted(false);
      toast.error(error.response.data.error || "Failed to submit form");
    }
  };

  const routers = useRouter();
  const isArabic = routers.asPath.includes("/ar");
  return (
    <>
      <h3 className="com-title text-center hire-candidate-s-title mb-3">
        {isArabic ? "توظيف مرشح" : "Hire a Candidate"}
      </h3>
      <form id="contactUsSubmit" className="row" data-form-type={id}>
        <div className="col-lg-6">
          <div className="form-white-wrapper form-group">
            <span className="drop-zone__prompt mb-2 d-block">Your Name*</span>
            <input
              type="text"
              name="fullName"
              className="c-form-control"
              id="fullName"
              placeholder="Your Name*"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.fullName && formik.touched.fullName ? (
              <div className="invalid-feedback-error">
                {formik.errors.fullName}
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-white-wrapper form-group">
            <span className="drop-zone__prompt mb-2 d-block">Your Email*</span>
            <input
              type="email"
              name="email"
              className="c-form-control"
              id="email"
              placeholder="Your Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="invalid-feedback-error">
                {formik.errors.email}
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-white-wrapper form-group">
            <span className="drop-zone__prompt mb-2 d-block">Mobile Number*</span>
            <div
              className="input-group"
              style={{ position: "relative", display: "inline-block" }}
            >
              <PhoneInput
                country={
                  selectedCountry
                    ? selectedCountry.countryCode.toLowerCase()
                    : "us"
                }
                placeholder="Mobile Number"
                countryCodeEditable={false}
                enableSearch={true}
                value={formik.values.phone_number}
                // onChange={(value, country, e, formattedValue) => {
                //     formik.setFieldValue('phone_number', formattedValue);
                // }}
                onChange={handleCountryChange}
                inputProps={{ ref: inputRef }}
                onBlur={formik.handleBlur("phone_number")}
                inputStyle={{ width: "100%", paddingLeft: "45px" }}
              />
              {formik.errors.phone_number && formik.touched.phone_number ? (
                <div className="invalid-feedback-error">
                  {formik.errors.phone_number}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-white-wrapper form-group">
            <label htmlFor="companyName" className="mb-2 d-block">Company Name</label>
            <input
              type="text"
              name="company_name"
              className="c-form-control"
              id="company_name"
              placeholder="Company Name"
              value={formik.values.company_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-white-wrapper form-group">
            <span className="drop-zone__prompt mb-2 d-block">
              <span className="mt-2">Are You Looking to Hire Staff for Your Company?*</span>
            </span>
            <select
              name="job_option"
              className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required c-form-control"
              id="job_option"
              aria-required="true"
              aria-invalid="false"
              value={formik.values.job_option}
              onChange={(e) => {
                formik.handleChange(e);
                if (e.target.value === "No, I Am Looking for a Job") {
                  router.push("/job-seekers");
                }
              }}
              onBlur={formik.handleBlur}
            >
              <option value="">Please select</option>
              <option value="Yes, I Want to Hire">Yes, I Want to Hire</option>
              <option value="No, I Am Looking for a Job">
                No, I Am Looking for a Job
              </option>
            </select>
            {formik.errors.job_option && formik.touched.job_option ? (
              <div className="invalid-feedback-error">
                {formik.errors.job_option}
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-white-wrapper form-group">
            <label htmlFor="role" className="mb-2 d-block">What Role Are You Looking to Hire?</label>
            <input
              type="text"
              className="c-form-control"
              id="role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
            />
          </div>
        </div>
       
        <div className="col-lg-6">
          <div className="form-white-wrapper form-group">
            <span className="drop-zone__prompt mb-2 d-block">
              <span className="mt-2">How Experienced Should the Talent Be?</span>
            </span>
            <select
              name="experience"
              className="wpcf7-form-control wpcf7-select c-form-control"
              id="experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Please select</option>
              <option value="Entry Level / Junior">Entry Level / Junior</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
              <option value="Leadership / Head Role">Leadership / Head Role</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-white-wrapper form-group">
            <span className="drop-zone__prompt mb-2 d-block">
              <span className="mt-2">How Urgent Is This Hire?</span>
            </span>
            <select
              name="hiringTime"
              className="wpcf7-form-control wpcf7-select c-form-control"
              id="hiringTime"
              value={formik.values.hiringTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Please select</option>
              <option value="Immediate / Critical">Immediate / Critical</option>
              <option value="Within 30 Days">Within 30 Days</option>
              <option value="Exploring / Pipeline">Exploring / Pipeline</option>
              <option value="Not Urgent">Not Urgent</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-white-wrapper form-group">
            <span className="drop-zone__prompt mb-2 d-block">
              How Are You Planning to Budget for This Hire?
            </span>
            <select
              name="budget"
              className="wpcf7-form-control wpcf7-select c-form-control"
              id="budget"
              value={formik.values.budget}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Please select</option>
              <option value="Per Hire / Placement Based">Per Hire / Placement Based</option>
              <option value="Ongoing / Multiple Hires">Ongoing / Multiple Hires</option>
              <option value="Project Based">Project Based</option>
              <option value="Not Decided Yet">Not Decided Yet</option>
            </select>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-white-wrapper form-group">
            <span className="drop-zone__prompt mb-2 d-block">
              Who Will Take the Final Hiring Decision?
            </span>
            <select
              name="hiringDecision"
              className="wpcf7-form-control wpcf7-select c-form-control"
              id="hiringDecision"
              value={formik.values.hiringDecision}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Please select</option>
              <option value="Me">Me</option>
              <option value="Me + Another Stakeholder">Me + Another Stakeholder</option>
              <option value="HR / Management Team">HR / Management Team</option>
              <option value="Not Sure Yet">Not Sure Yet</option>
            </select>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-white-wrapper form-group">
            <span className="drop-zone__prompt mb-2 d-block">Your Message</span>
            <textarea
              name="message"
              className="c-form-control"
              placeholder="Your Message (Optional)"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={4}
            ></textarea>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="form-white-wrapper">
            <button
              className="hireCandidate btn btn-primary"
              name="submit"
              id="submit3"
              onClick={(e) => {
                e.preventDefault();
                handleSubmitClick();
              }}
            >
              Send Now
            </button>
          </div>
        </div>
      </form>

      <Modal className="thank-you-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-css">
          <div className="modal-inner-con">
            <div className="row gy-4">
              <div className="col-lg-5">
                <img
                  src="/assets/images/thankyou-logo.svg"
                  alt="thankyou-logo"
                  title="Thank You"
                />
              </div>
              <div className="col-lg-7 d-flex justify-content-center flex-column align-items-center text-center">
                <h2 className="com-title">
                  Thank you for providing the information!
                </h2>
                <div className="thank-you text-center">
                  <p className="com-text mx-3">
                    Please review your email for the upcoming instructions.
                  </p>

                  <p className="com-text mx-3 my-3">
                    Rest assured, we will ensure the security of your details.
                    If you have any inquiries,don't hesitate to reach out to us
                    at{" "}
                    <Link href="mailto:sales@aistalent.com" prefetch={false}>
                      {" "}
                      <strong>sales@aistalent.com</strong>
                    </Link>
                    .
                  </p>
                  <p className="com-text mx-3">
                    Kindly verify your email for the subsequent instructions
                    provided by Alex.
                  </p>
                </div>
                <Link
                  prefetch={false}
                  href="https://calendly.com/allianceinternationalservices/global"
                  className="com-btn"
                  target="_blank"
                >
                  Schedule a Discovery Call
                </Link>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <ConfirmationPopup
        showModal={showModal}
        onConfirm={formik.handleSubmit}
        onCancel={handleCancelSave}
      />
    </>
  );
};
