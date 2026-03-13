import React, { useState, useRef, ChangeEvent } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import { useRouter } from "next/router";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import { toast } from "react-toastify";
const NEXT_PUBLIC_FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
interface FormFields {
  username: string;
  email: string;
  phone_number: string;
  skype_id: string;
  city: string;
  country: string;
  interest: string;
  keyskills: string;
  filenames: string;
}

export const StartProject = () => {
  return <StartProjectChild />;
};

const StartProjectChild = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedPhone, setSelectedPhone] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [notification, setNotification] = useState("");
  const [formData, setFormData] = useState<FormFields>({
    username: "",
    email: "",
    phone_number: "",
    skype_id: "",
    city: "",
    country: "",
    interest: "",
    keyskills: "",
    filenames: "",
  });
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const currentUrl = router.asPath;
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCancelSave = () => {
    setShowModal(false);
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormFields> = {};

    if (!formData.username.trim()) {
      errors.username = "Name is required";
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
    } else if (formData.phone_number.length < 4) {
      errors.phone_number = "Phone number must be at least 4 digits";
    }
    // Validate requirements (either keyskills OR filenames must be provided)
    if (!formData.keyskills.trim() && !formData.filenames) {
      errors.keyskills = "Requirements or file upload is required";
    }

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

  const handleCountryChange = (
    value: any,
    country: any,
    e: any,
    formattedValue: any
  ) => {
    handlePhoneChange(formattedValue, country);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files: any = e.target.files;
    setFormData({
      ...formData,
      filenames: files[0],
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHireTalentForm = async (
    values: FormFields,
    gReCaptchaToken: string
  ) => {
    try {
      if (validateForm()) {
        let formDataToSend = new FormData();
        const baseUrl =
          NEXT_PUBLIC_FRONTEND_URL ||
          (typeof window !== "undefined" ? window.location.origin : "");
        const fullFormUrl = `${baseUrl}${currentUrl}`;
        formDataToSend.append("username", formData.username);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone_number", formData.phone_number);
        formDataToSend.append("skype_id", formData.skype_id);
        formDataToSend.append("city", formData.city);
        formDataToSend.append("country", formData.country);
        formDataToSend.append("interest", formData.interest);
        formDataToSend.append("filenames", formData.filenames);
        formDataToSend.append("captcha_response", `${gReCaptchaToken}`);
        formDataToSend.append("currentFormUrl", fullFormUrl);
        formDataToSend.append("keyskills", formData.keyskills);

        const response = await axios.post(
          `${NEXT_PUBLIC_BACKEND_URL}/forStartAProject`,
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200 && response.data.status !== "error") {
          setShow(true);
          setShowModal(false);
          setFormData({
            username: "",
            email: "",
            phone_number: "",
            skype_id: "",
            city: "",
            country: "",
            interest: "",
            keyskills: "",
            filenames: "",
          });
          setSelectedPhone("");
          setSelectedCountry(null);
          setFile(null);
          setIsLoading(false);
          setErrors({});
        }else{
            toast.error(response.data.error || "Failed to submit form");
            setIsLoading(false);
            setErrors({});
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.error || "Failed to submit form");
    }
  };

  const handleSubmit = () => {
    if (!window.grecaptcha) {
      setNotification(
        "reCAPTCHA not available yet, likely meaning key not set"
      );
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string, {
          action: "submit",
        })
        .then((gReCaptchaToken: string) => {
          submitHireTalentForm(formData, gReCaptchaToken);
        })
        .catch((error: any) => {
         toast.error("Error executing reCAPTCHA");
        });
    });
  };

  return (
    <>
      <form className="row start_project" id="start_project" data-form-type="start-a-project-form">
        <div className="col-lg-4">
          <div className="form-white-wrapper form-group">
            <input
              type="text"
              className={`c-form-control ${
                errors.username ? "is-invalid" : ""
              }`}
              name="username"
              id="username2"
              placeholder="Name*"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && (
              <span className="invalid-feedback-error">{errors.username}</span>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-white-wrapper form-group">
            <input
              type="email"
              className={`c-form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              id="email2"
              placeholder="Your Email*"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.username && (
              <span className="invalid-feedback-error">{errors.email}</span>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-white-wrapper form-group">
            <PhoneInput
              country={"in"}
              inputClass="form-control form-phone-num"
              placeholder="Mobile Number*"
              value={formData.phone_number}
              countryCodeEditable={false}
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
            <input
              type="text"
              className="c-form-control"
              name="skype_id"
              id="skype_id2"
              placeholder="Whatsapp / Telegram / MS Teams"
              value={formData.skype_id}
              onChange={handleInputChange}
            />
            {/* {errors.skype_id && (
                            <span className="invalid-feedback-error">{errors.skype_id}</span>
                        )} */}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="form-white-wrapper form-group">
            <input
              type="text"
              className="c-form-control"
              name="city"
              id="city2"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
            />
            {/* {errors.city && (
                            <span className="invalid-feedback-error">{errors.city}</span>
                        )} */}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-white-wrapper form-group">
            <input
              type="text"
              className="c-form-control"
              name="country"
              id="country2"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
            />
            {/* {errors.country && (
                            <span className="invalid-feedback-error">{errors.country}</span>
                        )} */}
          </div>
        </div>
        <div className="col-lg-12 mb-1">
          <span className="drop-zone__prompt">
            Which services are you looking for?
          </span>
        </div>
        <div className="col-lg-12">
          <div className="form-white-wrapper form-group">
            <select
              name="interest"
              className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required"
              id="interest2"
              aria-required="true"
              aria-invalid="false"
              value={formData.interest}
              onChange={handleInputChange}
            >
              <option value="">Please select</option>
              <option value="Website Design">Website Design</option>
              <option value="Website Development">Website Development</option>
              <option value="Mobile App Development">
                Mobile App Development
              </option>
              <option value="Hire Developers">Hire Developers</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Other">Other</option>
            </select>
            {/* {errors.interest && (
                            <span className="invalid-feedback-error">{errors.interest}</span>
                        )} */}
          </div>
        </div>
        <div className="col-lg-12 mb-1">
          <span className="drop-zone__prompt">Share Your Requirements*</span>
        </div>
        <div className="col-lg-6 pe-4 c-remove-space">
          <div className="form-white-wrapper form-group">
            <span className="wpcf7-form-control-wrap filename">
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
                  className={`wpcf7-form-control-1 wpcf7-file drop-zone__input  ${
                    formData.keyskills.trim() ? "disabled-field" : ""
                  }`}
                  id="myFile_start_project"
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                  aria-invalid="false"
                  onChange={(e) => handleFileChange(e)}
                  disabled={!!formData.keyskills.trim()} // Disable if keyskills is not empty
                />
                {errors.filenames && (
                  <span className="invalid-feedback-error">{errors.filenames}</span>
                )}
              </div>
            </span>
          </div>
        </div>
        <div className="col-lg-6 ps-4 c-remove-space">
          <div className="form-white-wrapper form-group">
            <span className="or-text">OR</span>
            <span className="wpcf7-form-control-wrap KeySkills">
              {/* <textarea
                                name="keyskills"
                                cols={40}
                                rows={2}
                                className="wpcf7-form-control wpcf7-textarea tabing-textarea"
                                id="KeySkills_start_project"
                                aria-invalid="false"
                                placeholder="Add links to the job posts or a brief description of the roles and responsibilities"
                                value={formData.keyskills}
                                onChange={handleInputChange}
                            ></textarea> */}
              <textarea
                name="keyskills"
                cols={40}
                rows={2}
                className={`wpcf7-form-control wpcf7-textarea tabing-textarea ${
                  formData.filenames ? "disabled-field" : ""
                }`}
                id="KeySkills_start_project"
                aria-invalid="false"
                placeholder="Add links to the job posts or a brief description of the roles and responsibilities"
                value={formData.keyskills}
                onChange={handleInputChange}
                disabled={!!formData.filenames} // Disable if filenames is selected
              ></textarea>
              {errors.keyskills && (
                <span className="invalid-feedback-error">{errors.keyskills}</span>
              )}
            </span>
          </div>
        </div>
        {/* <input type="hidden" id="captcha" name="captcha_response" />
                <input name="url" id="url" type="hidden" /> */}

        <input
          name="subject"
          id="subject"
          type="hidden"
          value="ARG.AE - C.U - Hire a Candidate"
        />
        <div className="col-lg-12 ">
          <div className="form-white-wrapper ">
            {/* <!-- <Link href="#" className="hireCandidate submit-btn">Submit</Li> --> */}
            {/* <button className="hireCandidate submit-btn" name="submit" id="submit">Submit</button> */}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="form-white-wrapper">
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
export default StartProject;
