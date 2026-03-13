import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import { toast } from 'react-toastify';
// import { usePathname } from "next/navigation";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";

// Form Validation Schema
const contactFormValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    phoneNumber: Yup.string()
        .min(9, "Must be at least 9 digits")
        .required("Phone number is required"),
    helpOption: Yup.string().required("Please select an option"),
    message: Yup.string(),
});

interface ContactFormValues {
    name: string;
    email: string;
    phoneNumber: string;
    helpOption: string;
    message: string;
    pageLocation: string;
}

interface ModalContactFormProps {
    onSuccess?: () => void;
    apiEndpoint?: string;
    type?: string;
    id?: string;
}

// Modal Contact Form Component
const BlogContactForm: React.FC<ModalContactFormProps> = ({ onSuccess, apiEndpoint, type, id }) => {
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

    const pathname = router.asPath;

    useEffect(() => {
        if (!pathname) return;

        const slug = pathname.split("/").filter(Boolean).pop();

        formik.setFieldValue("pageLocation", slug || "home");
    }, [pathname]);

    const formik = useFormik<ContactFormValues>({
        initialValues: {
            name: "",
            email: "",
            phoneNumber: "",
            helpOption: "",
            message: "",
            pageLocation: "",
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
                    submitContactForm(values, resetForm);
                })
                .catch((error: any) => {
                    console.error("Error executing reCAPTCHA:", error);
                    setIsSubmitting(false);
                });
        });
    };

    const submitContactForm = async (
        values: ContactFormValues,
        resetForm: () => void
    ) => {
        try {
            const formData = new FormData();
            formData.append("username", values.name);
            formData.append("email", values.email);
            formData.append("phone_number", values.phoneNumber);
            formData.append("service", values.helpOption);
            formData.append("message", values.message);
            if (type) {
                formData.append("type", type);
            }
            formData.append("page_location", values.pageLocation);
            formData.append("currentFormUrl", `${NEXT_PUBLIC_FRONTEND_URL}${currentUrl}`);
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/${apiEndpoint}`,
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
        <div className="form-wrapper" style={{ padding: '0' }}>
            <h2
                className="text-center mb-4 blog-contact-form-heading"
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
                            <input
                                type="text"
                                name="name"
                                placeholder="Name*"
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
                            <input
                                type="email"
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
                            <select
                                name="helpOption"
                                className="form-control blog-contact-form-select-dropdown"
                                value={formik.values.helpOption}
                                onChange={handleHelpOptionChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">How We Can Help You*</option>
                                <option value="I am Looking to Hire">
                                    I am Looking to Hire
                                </option>
                                <option value="I am Looking for RPO Solutions">I am Looking for RPO Solutions</option>
                                <option value="I am Looking to Buy Recruitment Franchise">I am Looking to Buy Recruitment Franchise</option>
                                <option value="I am Looking for job">I am Looking for Job</option>
                            </select>
                            {formik.errors.helpOption &&
                                formik.touched.helpOption && (
                                    <FormErrorMessage formik={formik.errors.helpOption} />
                                )}
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="form-group" style={{ marginBottom: '16px' }}>
                            <textarea
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
                            disabled={isSubmitting}
                            className="blog-contact-form-submit-btn"
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

export default BlogContactForm;

