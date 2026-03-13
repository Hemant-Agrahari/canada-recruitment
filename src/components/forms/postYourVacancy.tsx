import React, {
  useState,
  ChangeEvent,
  useEffect,
  FormEvent,
  useRef,
} from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import GoogleCaptchaWrapper from "../captcha/google-captcha-wrapper";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import Script from "next/script";
import { toast } from "react-toastify";
const NEXT_PUBLIC_FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
interface FormFields {
  fullName: string;
  email: string;
  phone_number: string;
  company_name: string;
  experience: string;
  message: string;
  role: string;
  job_option: string;
  hiringTime: string;
  budget: string;
  hiringDecision: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone_number: Yup.string()
    .min(15, " Must be 10 digits required")
    .required("Phone number is required"),
  experience: Yup.string().required("Experience is required"),
});
export const PostYourVacancy = () => {
  return (
    <GoogleCaptchaWrapper>
      <PostYourVacancyChild />
    </GoogleCaptchaWrapper>
  );
};
const PostYourVacancyChild = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [captcha, setCaptcha] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [isINR, setIsINR] = useState(false);
  const handleClose = () => setShow(false);
  const [countryName, setCountryName] = useState<any>(null);
  const [countryCode, setCountryCode] = useState<any>(null);
  const handleShow = () => setShow(true);
  const [selectedPhone, setSelectedPhone] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isOtherSelected, setIsOtherSelected] = useState<boolean>(false);
  const [notification, setNotification] = useState("");

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState<FormFields>({
    fullName: "",
    company_name: "",
    phone_number: "",
    role: "",
    email: "",
    experience: "",
    job_option: "",
    hiringTime: "",
    budget: "",
    hiringDecision: "",
    message: ""
  });
  const router = useRouter();
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
        setIsINR(data.country_code === "IN");
        setCountryName(data.country_name);
        setCountryCode(data.country_calling_code);
        setSelectedCountry({
          name: data.country_name,
          dialCode: data.country_calling_code,
          countryCode: data.country_code,
        });
      })
      .catch((error) => {
        toast.error(error.response?.data.message || "Error fetching geo info");
      });
  };

  useEffect(() => {
    const delayedFetch = setTimeout(() => {
      getGeoInfo();
    }, 3000);
    // Clear the timeout if the component unmounts before the delay
    return () => clearTimeout(delayedFetch);
  }, []);
  useEffect(() => { }, [countryCode, countryName, selectedCountry]);
  const [errors, setErrors] = useState<Partial<FormFields>>({});

  const validateForm = (): boolean => {
    const errors: Partial<FormFields> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.phone_number.trim()) {
      errors.phone_number = "Phone number is required";
    } else if (!/\S/.test(formData.phone_number)) {
      errors.phone_number = "Phone number cannot be empty";
    }
    // Validate job description (either keyskills OR filenames must be provided)
    // if (!formData.keyskills.trim() && !formData.filenames) {
    //   errors.keyskills = "Job description or file upload is required";
    // }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handlePhoneChange = (value: string, data: any) => {
    setSelectedPhone(value);
    setFormData((prevData) => ({
      ...prevData,
      phone_number: value,
    }));
    setSelectedCountry(data);
  };
  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const files: any = e.target.files;

  //   setFormData({
  //     ...formData,
  //     filenames: files[0],
  //   });
  // };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ): void => {
    const { name, value } = e.target;

    if (
      name === "job_option" &&
      value.trim() === "No, I Am Looking for a Job"
    ) {
      router.push("/job-seekers");
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCountryChange = (
    value: any,
    country: any,
    e: any,
    formattedValue: any,
  ) => {
    // formik.setFieldValue('phone_number', formattedValue);
    handlePhoneChange(formattedValue, country);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const submitHireTalentForm = async (
    values: FormFields,
    gReCaptchaToken: string,
  ) => {
    try {
      if (validateForm()) {
        let formDataToSend = new FormData();
        formDataToSend.append("fullName", formData.fullName);
        formDataToSend.append("company_name", formData.company_name);
        formDataToSend.append("phone_number", formData.phone_number);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("experience", formData.experience);
        formDataToSend.append("role", formData.role);
        formDataToSend.append("job_option", formData.job_option);
        formDataToSend.append("hiringTime", formData.hiringTime);
        formDataToSend.append("message", formData.message);
        formDataToSend.append("budget", formData.budget);
        formDataToSend.append("captcha_response", `${gReCaptchaToken}`);
        formDataToSend.append("hiringDecision", formData.hiringDecision);
        formDataToSend.append(
          "form_url",
          `${NEXT_PUBLIC_FRONTEND_URL}${currentUrl}`,
        );
        const response = await axios.post(
          `${NEXT_PUBLIC_BACKEND_URL}/forPostYourVacancy`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        if (response.status === 200 && response.data.status !== "error") {
          setShow(true);
          setShowModal(false);
          setFormData({
            fullName: "",
            company_name: "",
            phone_number: "",
            email: "",
            experience: "",
            message: "",
            role: "",
            job_option: "",
            hiringTime: "",
            budget: "",
            hiringDecision: "",
          });
        } else {
          toast.error(response.data.message || "Failed to submit form");
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to submit form");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      toast.error("reCAPTCHA not loaded yet");
      return;
    }

    try {
      const token = await executeRecaptcha("submit");
      submitHireTalentForm(formData, token);
    } catch (error: any) {
      console.error("Error executing reCAPTCHA:", error);
      toast.error("Error executing reCAPTCHA");
    }
  };
 
  return (
    <>
      <form className="row start_project" id="start_project" data-form-type="hire-a-candidate-form">
        <div className="col-lg-4">
          <div className="form-white-wrapper form-group">
            <span className="drop-zone__prompt">Full Name</span>
            <input
              type="text"
              name="fullName"
              placeholder="full Name"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName && (
              <span className="invalid-feedback-error">{errors.fullName}</span>
            )}
          </div>
        </div>
        {/* <div className="col-lg-4">
          <div className="form-white-wrapper form-group">
            <input
              type="text"
              name="designation"
              placeholder="What Role Are You Looking to Hire"
              value={formData.designation}
              onChange={handleInputChange}
            />
            {errors.designation && (
                            <span className="invalid-feedback-error">{errors.designation}</span>
                        )}
          </div>
        </div> */}
        <div className="col-lg-4">
          <div className="form-white-wrapper form-group">
            <span className="drop-zone__prompt">Company Name*</span>
            <input
              type="text"
              className="c-form-control"
              name="company_name"
              id="company_name1"
              placeholder="Company Name"
              value={formData.company_name}
              onChange={handleInputChange}
            />
            {errors.company_name && (
              <span className="invalid-feedback-error">
                {errors.company_name}
              </span>
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="form-white-wrapper form-group">
            <span className="drop-zone__prompt">Phone Number*</span>
            <PhoneInput
              country={
                selectedCountry
                  ? selectedCountry.countryCode.toLowerCase()
                  : "us"
              }
              placeholder="Mobile Number*"
              countryCodeEditable={false}
              value={formData.phone_number}
              enableSearch={true}
              inputStyle={{ width: "100%", paddingLeft: "45px" }}
              // onChange={(value, country, e, formattedValue) => {
              //     handlePhoneChange(formattedValue, country);
              // }}
              onChange={handleCountryChange}
              inputProps={{ ref: inputRef }}
            />
            {errors.phone_number && (
              <div className="invalid-feedback-error">
                {errors.phone_number}
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="form-white-wrapper form-group">
            <span className="drop-zone__prompt">Your Email*</span>
            <input
              type="email"
              className="c-form-control"
              name="email"
              id="email1"
              placeholder="Your Email*"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <div className="invalid-feedback-error">{errors.email}</div>
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <span className="drop-zone__prompt">
            Are You Looking to Hire Staff for Your Company?
          </span>
          <div className="form-white-wrapper form-group">
            <select
              name="job_option"
              className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required"
              id="job_option1"
              aria-required="true"
              aria-invalid="false"
              value={formData.job_option}
              onChange={handleInputChange}
            >
              <option value="">Please select</option>
              <option value="Yes, I Want to Hire">Yes, I Want to Hire</option>
              <option value="No, I Am Looking for a Job">
                No, I Am Looking for a Job
              </option>
            </select>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="form-white-wrapper form-group">
            <span className="drop-zone__prompt">
              What Role Are You Looking to Hire?
            </span>
            <input
              type="text"
              className="c-form-control"
              name="role"
              id="role1"
              placeholder="What Role Are You Looking to Hire?"
              value={formData.role}
              onChange={handleInputChange}
            />
            {errors.role && (
              <span className="invalid-feedback-error">{errors.role}</span>
            )}
          </div>
        </div>

        {/* <div className="col-lg-4">
          <div className="form-white-wrapper form-group">
            <input
              type="text"
              className="c-form-control"
              name="skype_id"
              id="skype_id1"
              placeholder="Whatsapp / Telegram / MS Teams"
              value={formData.skype_id}
              onChange={handleInputChange}
            />
            {errors.skype_id && (
              <div className="invalid-feedback-error">{errors.skype_id}</div>
            )}
          </div>
        </div> */}
        {/* <div className="col-lg-4 d-flex align-items-end">
          <span className="drop-zone__prompt"></span>
          <div className="form-white-wrapper form-group w-100">
            <input
              type="text"
              className="c-form-control"
              name="country"
              id="Country1"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
            />
            {errors.country && (
                            <div className="invalid-feedback-error">{errors.country}</div>
                        )}
          </div>
        </div> */}
        {/* <div className="col-lg-4">
          <span className="drop-zone__prompt">
            How experienced should the talent be?*
          </span>
          <div className="form-white-wrapper form-group">
            <select
              name="experience"
              className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required"
              id="Experience1"
              aria-required="true"
              aria-invalid="false"
              value={formData.experience}
              onChange={handleInputChange}
            >
              <option value="">Please select</option>
              <option value="Intermediate/Junior Level (1-3 Years of experience)">
                Intermediate/Junior Level (1-3 Years of experience)
              </option>
              <option value="Mid Level (3-8 Years of experience)">
                Mid Level (3-8 Years of experience)
              </option>
              <option value="Senior/Executive Level (8+ Years of experience)">
                Senior/Executive Level (8+ Years of experience)
              </option>
            </select>
            {errors.experience && (
                            <div className="invalid-feedback-error">{errors.experience}</div>
                        )}
          </div>
        </div> */}
        
        <div className="col-lg-4">
          <span className="drop-zone__prompt">
            How Experienced Should the Talent Be?
          </span>
          <div className="form-white-wrapper form-group">
            <select
              name="experience"
              className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required"
              id="experience2"
              aria-required="true"
              aria-invalid="false"
              value={formData.experience}
              onChange={handleInputChange}
            >
              <option value="">Please select</option>
              <option
                value="Entry Level / Junior

"
              >
                Entry Level / Junior
              </option>
              <option
                value="Senior Level

"
              >
                Senior Level
              </option>
              <option value="Leadership / Head Role">
                Leadership / Head Role
              </option>
            </select>
            {/* {errors.experience && (
                            <div className="invalid-feedback-error">{errors.experience}</div>
                        )} */}
          </div>
        </div>

        <div className="col-lg-4">
          <span className="drop-zone__prompt">How Urgent Is This Hire?</span>
          <div className="form-white-wrapper form-group">
            <select
              name="hiringTime"
              className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required"
              id="hiringTime1"
              aria-required="true"
              aria-invalid="false"
              value={formData.hiringTime}
              onChange={handleInputChange}
            >
              <option value="">Please select</option>
              <option
                value="Immediate / Critical

"
              >
                Immediate / Critical
              </option>
              <option
                value=" Within 30 Days

"
              >
                Within 30 Days
              </option>
              <option value="Exploring / Pipeline">Exploring / Pipeline</option>
              <option value="Not Urgent">Not Urgent</option>
            </select>
            {/* {errors.experience && (
                            <div className="invalid-feedback-error">{errors.experience}</div>
                        )} */}
          </div>
        </div>
        <div className="col-lg-4">
          <span className="drop-zone__prompt">
            How Are You Planning to Budget for This Hire?
          </span>
          <div className="form-white-wrapper form-group">
            <select
              name="budget"
              className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required"
              id="budget1"
              aria-required="true"
              aria-invalid="false"
              value={formData.budget}
              onChange={handleInputChange}
            >
              <option value="">Please select</option>
              <option
                value="Per Hire / Placement Based

        "
              >
                Per Hire / Placement Based
              </option>
              <option
                value="  Ongoing / Multiple Hires


"
              >
                Ongoing / Multiple Hires
              </option>
              <option
                value="Project Based
"
              >
                Project Based
              </option>
              <option value=" Not Decided Yet">Not Decided Yet</option>
            </select >
            {/* {errors.experience && (
                            <div className="invalid-feedback-error">{errors.experience}</div>
                        )} */}
          </div>
        </div >
        <div className="col-lg-4">
          <span className="drop-zone__prompt">
            Who Will Take the Final Hiring Decision?
          </span>
          <div className="form-white-wrapper form-group">
            <select
              name="hiringDecision"
              className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required"
              id="hiring_decision1"
              aria-required="true"
              aria-invalid="false"
              value={formData.hiringDecision}
              onChange={handleInputChange}
            >
              <option value="">Please select</option>
              <option
                value="Me

      "
              >
                Me
              </option >
              <option
                value="  Me + Another Stakeholder


"
              >
                Me + Another Stakeholder
              </option>
              <option
                value=" HR / Management Team

"
              >
                HR / Management Team
              </option>
              <option value=" Not Sure Yet">Not Sure Yet</option>
            </select >
          </div >
        </div >

        {/* <div className="col-lg-4">
          <div className="form-white-wrapper form-group">
            <input type="text" name="jobtitle" value="" size="" className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" id="role" aria-required="true" aria-invalid="false" placeholder="What Role are you looking to hire?*" />
          </div>
          <div className="form-white-wrapper form-group">
            <span className="drop-zone__prompt">
              What role are you looking to hire?*
            </span>
            <select
              name="jobtitle"
              className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required"
              id="role"
              aria-required="true"
              aria-invalid="false"
              data-gtm-form-interact-field-id="18"
              value={formData.jobtitle}
              onChange={handleInputChange}
            >
              <option value="">Select Role</option>
              <option value="Manager Director(MD)">Manager Director(MD)</option>
              <option value="Director">Director</option>
              <option value="Partner">Partner</option>
              <option value="HR Manager/Head">HR Manager/Head</option>
              <option value="HR Executive">HR Executive</option>
              <option value="Admin">Admin</option>
              <option value="Purchase manager/ Executive">
                Purchase manager/ Executive
              </option>
              <option value="others">others</option>
            </select>
            {errors.jobtitle && (
              <div className="invalid-feedback-error">{errors.jobtitle}</div>
            )}
          </div>
        </div> */}
        {/* <div className="col-lg-12 mb-1">
          <div className="form-white-wrapper form-group">
            {isOtherSelected && (
              <>
                <input
                  type="text"
                  className="c-form-control col-lg-12"
                  id="other_jobtitle"
                  name="other_jobtitle"
                  placeholder="Enter Role*"
                  value={formData.other_jobtitle}
                  onChange={handleInputChange}
                />
                {errors.other_jobtitle && (
                  <span className="invalid-feedback-error">{errors.other_jobtitle}</span>
                )}
              </>
            )}
          </div>
        </div> */}

        {/* <div className="col-lg-12 mb-1">
          <span className="drop-zone__prompt">Share the job description*</span>
        </div> */}

        {/* <div className="col-lg-6 pe-4 c-remove-space">
          <div className="form-white-wrapper form-group">
            <span className="wpcf7-form-control-wrap KeySkills">
              <textarea
                name="keyskills"
                cols={40}
                rows={2}
                className="wpcf7-form-control wpcf7-textarea tabing-textarea no-resize"
                id="KeySkills"
                aria-invalid="false"
                placeholder="Add links to the job posts or a bried description of the roles and responsibilites"
                value={formData.keyskills}
                onChange={handleInputChange}
                disabled={!!formData.filenames}
              ></textarea>
              {errors.keyskills && (
                <div className="invalid-feedback-error">{errors.keyskills}</div>
              )}
            </span>
          </div>
        </div> */}
        {/* <div className="col-lg-6 ps-4 c-remove-space">
          <div className="form-white-wrapper form-group">
            <span className="or-text">OR</span>
            <div className="drop-zone">
              <button
                className="file-btn"
                id="mubuttons"
                disabled={!!formData.keyskills.trim()}
              >
                Upload a file
              </button>
              <input
                style={{ padding: "40px !important" }}
                type="file"
                name="filenames"
                className={`wpcf7-form-control-1 wpcf7-file drop-zone__input ${formData.keyskills.trim() ? "disabled-field" : ""
                  }`}
                id="myFile_start_project"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                aria-invalid="false"
                onChange={(e) => handleFileChange(e)}
                disabled={!!formData.keyskills.trim()}
              />
              {errors.filenames && (
                <span className="invalid-feedback-error">{errors.filenames}</span>
              )}
            </div>
          </div>
        </div> */}
        {/* <input name="url" id="url" type="hidden" /> */}

        <input
          name="subject"
          id="subject"
          type="hidden"
          value="ARG.AE - C.U - Hire a Candidate"
        />
        <div className="col-lg-12">
          <div className="form-white-wrapper form-group">
            <span className="drop-zone__prompt">Your Message</span>
            <textarea
              name="message"
              className="c-form-control"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        <div className="col-lg-12 ">
          <div className="form-white-wrapper ">
            {/* <!-- <Link href="#" className="hireCandidate submit-btn">Submit</Link> --> */}
            <button
              className="hireCandidate submit-btn"
              name="submit"
              id="submit"
              type="button"
              // onClick={handleSubmit}
              onClick={(e) => {
                e.preventDefault();
                if (validateForm()) {
                  setShowModal(true);
                }
              }}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form >
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
                    <Link href="mailto:sales@aistalent.com">
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
        onConfirm={handleSubmit}
        onCancel={handleCancelSave}
      />
    </>
  );
};
export default PostYourVacancy;
