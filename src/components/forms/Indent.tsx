import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { usePathname } from "next/navigation";

const welcomeFormValidationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    phone_number: Yup.string()
        .min(9, "Must be at least 9 digits")
        .required("Phone number is required"),
    job_option: Yup.string().required("Please select how we can help you"),
});

interface WelcomeFormValues {
    fullName: string;
    email: string;
    phone_number: string;
    company_name: string;
    job_option: string;
    role: string;
    experience: string;
    hiringTime: string;
    budget: string;
    hiringDecision: string;
    message: string;
}

interface WelcomeModalProps {
    show: boolean;
    handleClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ show, handleClose }) => {
    const router = useRouter();
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const currentUrl = usePathname();
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
        if (show) {
            getGeoInfo();
        }
    }, [show]);

    const formik = useFormik<WelcomeFormValues>({
        initialValues: {
            fullName: "",
            email: "",
            phone_number: "",
            company_name: "",
            job_option: "",
            role: "",
            experience: "",
            hiringTime: "",
            budget: "",
            hiringDecision: "",
            message: "",
        },
        validationSchema: welcomeFormValidationSchema,
        onSubmit: (values) => {
            handleSubmitForm(values);
        },
    });

    const handleSubmitForm = async (values: WelcomeFormValues) => {
        if (!window.grecaptcha) {
            toast.error("reCAPTCHA not available yet");
            return;
        }

        setIsSubmitting(true);
        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string, {
                    action: "submit",
                })
                .then((gReCaptchaToken: string) => {
                    submitForm(values, gReCaptchaToken);
                })
                .catch((error: any) => {
                    console.error("Error executing reCAPTCHA:", error);
                    setIsSubmitting(false);
                });
        });
    };

    const submitForm = async (values: WelcomeFormValues, token: string) => {
        try {
            const formData = new FormData();
            formData.append("fullName", values.fullName);
            formData.append("email", values.email);
            formData.append("phone_number", values.phone_number);
            formData.append("company_name", values.company_name);
            formData.append("job_option", values.job_option);
            formData.append("role", values.role);
            formData.append("experience", values.experience);
            formData.append("hiringTime", values.hiringTime);
            formData.append("budget", values.budget);
            formData.append("hiringDecision", values.hiringDecision);
            formData.append("message", values.message);
            formData.append("captcha_response", token);
            formData.append("form_url", `${process.env.NEXT_PUBLIC_FRONTEND_URL}${currentUrl}`);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/exitIntentPopUp`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                },
            );

            if (response.status === 200 && response.data.status !== "error") {
                setIsSubmitting(false);
                handleClose();
                router.push("/thank-you");
            } else {
                toast.error(response.data.message || "Failed to submit form");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("Error submitting form", error);
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            className="welcome-modal"
            backdrop="static"
        >
            <Modal.Body>
                <div className="welcome-modal-container">
                    <div className="welcome-modal-left">
                        <h2>
                            Hey, <br />
                            Hold On A Moment!
                        </h2>

                        <p className="urgent-hiring">
                            Urgent Hiring? Get Vetted Candidates in <span>48 Hours!</span>
                        </p>

                        <ul className="welcome-modal-points">
                            <li>
                                <span className="check-icon">✓</span>
                                Streamlined Hiring for Your Most Challenging Roles.
                            </li>
                            <li>
                                <span className="check-icon">✓</span>
                                Work with a dedicated industry recruiter.
                            </li>
                            <li>
                                <span className="check-icon">✓</span>
                                Enjoy a 90 Days Replacement Guarantee.
                            </li>
                        </ul>
                    </div>

                    <div className="welcome-modal-right">
                        <button
                            type="button"
                            className="btn-close"
                            onClick={handleClose}
                        ></button>
                        <div className="welcome-modal-form-wrapper">
                            <form
                                onSubmit={formik.handleSubmit}
                                className="welcome-modal-form"
                                id="popup-form"
                            >
                                <div className="row g-3">
                                    <div className="col-md-6 form-group">
                                        <label className="form-label">Full Name*</label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            className="form-control"
                                            placeholder="Full Name*"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.fullName}
                                        />
                                        {formik.touched.fullName && formik.errors.fullName && (
                                            <FormErrorMessage formik={formik.errors.fullName} />
                                        )}
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="form-label">Email address*</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Email address*"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <FormErrorMessage formik={formik.errors.email} />
                                        )}
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="form-label">Company Name</label>
                                        <input
                                            type="text"
                                            name="company_name"
                                            className="form-control"
                                            placeholder="Company Name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.company_name}
                                        />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="form-label">
                                            Contact Number (With Area Code)*
                                        </label>
                                        <div className="phone-input-wrapper">
                                            <PhoneInput
                                                country={
                                                    selectedCountry?.countryCode?.toLowerCase() || "in"
                                                }
                                                value={formik.values.phone_number}
                                                onChange={(value) =>
                                                    formik.setFieldValue("phone_number", value)
                                                }
                                                onBlur={formik.handleBlur("phone_number")}
                                                inputProps={{
                                                    ref: inputRef,
                                                    name: "phone_number",
                                                    placeholder: "Contact Number (With Area Code)*",
                                                    required: true,
                                                }}
                                                containerClass="welcome-phone-container"
                                                inputClass="welcome-phone-input"
                                                buttonClass="welcome-phone-button"
                                            />
                                        </div>
                                        {formik.touched.phone_number &&
                                            formik.errors.phone_number && (
                                                <FormErrorMessage formik={formik.errors.phone_number} />
                                            )}
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="form-label">How Can We Help You?*</label>
                                        <select
                                            name="job_option"
                                            className="form-select"
                                            onChange={(e) => {
                                                formik.handleChange(e);
                                                if (e.target.value === "I Am Looking for Job") {
                                                    router.push("/job-seekers");
                                                }
                                            }}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.job_option}
                                        >
                                            <option value="">Please Select Option</option>
                                            <option value="I Am Looking to Hire">
                                                I Am Looking to Hire
                                            </option>
                                            <option value="I Am Looking for RPO Solutions">
                                                I Am Looking for RPO Solutions
                                            </option>
                                            <option value="I Am Looking to Buy Recruitment Franchise">
                                                I Am Looking to Buy Recruitment Franchise
                                            </option>
                                            <option value="I Am Looking for Job">
                                                I Am Looking for Job
                                            </option>
                                        </select>
                                        {formik.touched.job_option && formik.errors.job_option && (
                                            <FormErrorMessage formik={formik.errors.job_option} />
                                        )}
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="form-label">
                                            What Role Are You Looking to Hire?
                                        </label>
                                        <input
                                            type="text"
                                            name="role"
                                            className="form-control"
                                            placeholder="What Role Are You Looking to Hire?"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.role}
                                        />
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="form-label">
                                            Who Will Take the Final Decision?
                                        </label>
                                        <select
                                            name="hiringDecision"
                                            className="form-select"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.hiringDecision}
                                        >
                                            <option value="">Please Select Option</option>
                                            <option value="Me">Me</option>
                                            <option value="Me + Another Stakeholder">
                                                Me + Another Stakeholder
                                            </option>
                                            <option value="HR / Management Team">
                                                HR / Management Team
                                            </option>
                                            <option value="Not Sure Yet">Not Sure Yet</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="form-label">
                                            How Urgent Is This Hire?
                                        </label>
                                        <select
                                            name="hiringTime"
                                            className="form-select"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.hiringTime}
                                        >
                                            <option value="">Please Select Option</option>
                                            <option value="Immediate / Critical">
                                                Immediate / Critical
                                            </option>
                                            <option value="Within 30 Days">Within 30 Days</option>
                                            <option value="Exploring / Pipeline">
                                                Exploring / Pipeline
                                            </option>
                                            <option value="Not Urgent">Not Urgent</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="form-label">
                                            How Are You Planning to Budget?
                                        </label>
                                        <select
                                            name="budget"
                                            className="form-select"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.budget}
                                        >
                                            <option value="">Please Select Option</option>
                                            <option value="Per Hire / Placement Based">
                                                Per Hire / Placement Based
                                            </option>
                                            <option value="Ongoing / Multiple Hires">
                                                Ongoing / Multiple Hires
                                            </option>
                                            <option value="Project Based">Project Based</option>
                                            <option value="Not Decided Yet">Not Decided Yet</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 form-group">
                                        <label className="form-label">
                                            How much experience is required?
                                        </label>
                                        <select
                                            name="experience"
                                            className="form-select"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.experience}
                                        >
                                            <option value="">Please Select Option</option>
                                            <option value="Entry Level / Junior">
                                                Entry Level / Junior
                                            </option>
                                            <option value="Mid Level">Mid Level</option>
                                            <option value="Senior Level">Senior Level</option>
                                            <option value="Leadership / Head Role">
                                                Leadership / Head Role
                                            </option>
                                        </select>
                                    </div>

                                    <div className="col-12 form-group">
                                        <label className="form-label">Your Message</label>
                                        <textarea
                                            name="message"
                                            className="form-control"
                                            placeholder="Your Message (Optional)"
                                            rows={2}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.message}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <button
                                            type="submit"
                                            className="submit-btn"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Processing..." : "Start Hiring Now"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="welcome-modal-footer-stats">
                            16+ Years Experience | 4.8 rating | 95% repeat clients
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default WelcomeModal;
