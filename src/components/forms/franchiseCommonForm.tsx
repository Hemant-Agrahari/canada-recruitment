import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useRef, useState } from 'react'
import PhoneInput from 'react-phone-input-2';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import GoogleCaptchaWrapper from '../captcha/google-captcha-wrapper';
import { toast } from 'react-toastify';
const NEXT_PUBLIC_FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const validationSchema = Yup.object().shape({
    username: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone_number: Yup.string().min(9, " Must be 4 digits required").required('Mobile Number is required'),
    // // skype_id: Yup.string().required('Skype ID is required'),
    // occupation: Yup.string().required('Occupation is required'),
    // investmentrang: Yup.string().required('Investment range is required'),
    // // subjects: Yup.string().required('Subject is required'),
    // details: Yup.string().required('Details is required'),
});
export const FranchiseCommonForm = () => {
    return (
        <GoogleCaptchaWrapper>
            <FranchiseCommonFormChild />
        </GoogleCaptchaWrapper>
    )
}


interface FormValues {
    username: string,
    email: string,
    phone_number: string,
    skype_id: string,
    occupation: string,
    investmentrang: string,
    details: string,


}
declare global {
    interface Window {
        grecaptcha: any; // You can specify more precise types if known
    }
}
const FranchiseCommonFormChild = () => {
    const [isINR, setIsINR] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [file, setFile] = useState<File | null>(null);
    const [countryName, setCountryName] = useState<any>(null);
    const [countryCode, setCountryCode] = useState<any>(null);
    const [captcha, setCaptcha] = useState(null);
    const [show, setShow] = useState(false);
    const router = useRouter();
    const currentUrl = router.asPath;
    const [notification, setNotification] = useState('');
    const { executeRecaptcha } = useGoogleReCaptcha();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://ipapi.co/json/');
                const { country } = response.data;
                let data = response.data;
                setIsINR(country === 'IN');
                setCountryName(data.country_name);
                setCountryCode(data.country_calling_code);
                setSelectedCountry({
                    name: data.country_name,
                    dialCode: data.country_calling_code,
                    countryCode: data.country_code,
                });
            } catch (error) {
                // console.error('Error fetching IP information:', error);
            }
        };

        fetchData();
    }, []);


    const handleClose = () => {
        setShow(false)
    };
    const initialValues = ({
        username: '',
        email: '',
        phone_number: '',
        skype_id: '',
        occupation: '',
        investmentrang: '',
        details: '',
    });

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
                username: values.username,
                email: values.email,
                phone_number: values.phone_number,
                skype_id: values.skype_id,
                occupation: values.occupation,
                investmentrang: values.investmentrang,
                details: values.details,
                captcha_response: gReCaptchaToken,
                currentFormUrl: `${NEXT_PUBLIC_FRONTEND_URL}${currentUrl}`
            }
            // console.log(requestdata, "aaaa")
            // setIsSubmitted(true);
            const response = await axios.post(`${NEXT_PUBLIC_BACKEND_URL}/franchiseCommonForm`, requestdata);
            if (response.status === 200 && response.data.status !== "error") {
                formik.setFieldValue('phone_number', '');
                // setSelectedPhone('');
                setShow(true);
                toast.success(response.data.message || "Form submitted successfully!");

            } else {
                toast.error(response.data.error || "Failed to submit form");
            }
        } catch (error: any) {
            toast.error(error.response.data.error || "Failed to submit form");
            // setIsSubmitted(false);
            
        }
    }

    // const formik: any = useFormik({
    //     initialValues: initialValues,
    //     validationSchema: validationSchema,
    //     onSubmit: async (values, { resetForm }) => {
    //         if (!executeRecaptcha) {
    //             // console.log("Execute recaptcha not available yet");
    //             setNotification(
    //                 "Execute recaptcha not available yet likely meaning key not recaptcha key not set"
    //             );
    //             return;
    //         }
    //         executeRecaptcha("enquiryFormSubmit").then(async (gReCaptchaToken: any) => {
    //             try {
    //                 const requestdata = {
    //                     username: values.username,
    //                     email: values.email,
    //                     phone_number: values.phone_number,
    //                     skype_id: values.skype_id,
    //                     occupation: values.occupation,
    //                     investmentrang: values.investmentrang,
    //                     details: values.details,
    //                     captcha_response: gReCaptchaToken,
    //                     currentFormUrl: `${NEXT_PUBLIC_FRONTEND_URL}${currentUrl}`
    //                 }
    //                 // console.log(requestdata, "aaaa")
    //                 // setIsSubmitted(true);
    //                 const { statusText, status, data } = await axios.post(`${NEXT_PUBLIC_BACKEND_URL}/franchiseCommonForm`, requestdata);
    //                 if (status === 200) {
    //                     // console.log('Form submitted successfully:', data);
    //                     // handleComponentRender()
    //                     formik.setFieldValue('phone_number', '');
    //                     // setSelectedPhone('');
    //                     setShow(true);
    //                     resetForm({
    //                         values: {
    //                             username: '',
    //                             email: '',
    //                             phone_number: '',
    //                             skype_id: '',
    //                             occupation: '',
    //                             // subjects: '',
    //                             investmentrang: '',
    //                             details: '',
    //                         },
    //                     });

    //                 } else {
    //                     // console.error('Form submission failed:', statusText);
    //                 }
    //             } catch (error: any) {
    //                 // setIsSubmitted(false);
    //                 let msg = error;
    //                 if (error.response) {
    //                     if (typeof error.response.data.message === 'string') {
    //                         msg = error.response.data.message;
    //                     } else {
    //                         if (error.response.data.message.length > 0) {
    //                             msg = error.response.data.message[0].message;
    //                         }
    //                     }
    //                 }
    //             }
    //         });
    //     },
    // });
    return (
        <>

            <section className="free-consultation-content-form my-60 mb-0" id="consultation-form">
                <div className="container">
                    <div className="consultation-form form-franchise-section">
                        <h2 className="com-title text-center pb-2 mb-2 mt-0"> Curious about how you can start your own <strong>Franchise Business?</strong> <br /> Get a Free Consultation.</h2>
                        <form className="wpcf7-form" onSubmit={formik.handleSubmit}>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <span className="wpcf7-form-control-wrap Name">
                                        <input
                                            type="text"
                                            name="username"
                                            className="wpcf7-form-control wpcf7-text form-control"
                                            id="username"
                                            placeholder="Your Name*"
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.username && formik.touched.username ? (
                                            <div className="invalid-feedback-error">{formik.errors.username}</div>
                                        ) : null}
                                    </span>
                                </div>
                                <div className="col-md-6">
                                    <span className="wpcf7-form-control-wrap email">
                                        <input
                                            type="email"
                                            name="email"
                                            className="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email form-control"
                                            id="email"
                                            placeholder="Your Email*"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.errors.email && formik.touched.email ? (
                                            <div className="invalid-feedback-error">{formik.errors.email}</div>
                                        ) : null}
                                    </span>
                                </div>
                                <div className="col-md-6">
                                    <span className="wpcf7-form-control-wrap phone">
                                        <PhoneInput
                                            country={selectedCountry ? selectedCountry.countryCode.toLowerCase() : 'us'}
                                            placeholder="Mobile Number"
                                            countryCodeEditable={false}
                                            value={formik.values.phone_number}
                                            enableSearch={true}
                                            // onChange={(value, country, e, formattedValue) => {
                                            //     formik.setFieldValue("phone_number", formattedValue);
                                            // }}
                                            onChange={handleCountryChange}
                                            onBlur={formik.handleBlur("phone_number")}
                                            inputStyle={{ width: "100%", paddingLeft: "45px" }}
                                            inputProps={{ ref: inputRef }}
                                        />
                                        {formik.errors.phone_number && formik.touched.phone_number ? (
                                            <div className="invalid-feedback-error">
                                                {formik.errors.phone_number}
                                            </div>
                                        ) : null}
                                    </span>
                                </div>
                                <div className="col-md-6">
                                    <span className="wpcf7-form-control-wrap Skype">
                                        <input
                                            type="text"
                                            name="skype_id"
                                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control"
                                            id="skype_id"
                                            placeholder="Skype Id"
                                            value={formik.values.skype_id}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {/* {formik.errors.skype_id && formik.touched.skype_id ? (
                                            <div className="invalid-feedback-error">{formik.errors.skype_id}</div>
                                        ) : null} */}
                                    </span>
                                </div>
                                <div className="col-md-6">
                                    <span className="wpcf7-form-control-wrap Occupation">
                                        <input
                                            type="text"
                                            name="occupation"
                                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required form-control"
                                            id="occupation"
                                            placeholder="Occupation"
                                            value={formik.values.occupation}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {/* {formik.errors.occupation && formik.touched.occupation ? (
                                            <div className="invalid-feedback-error">
                                                {formik.errors.occupation}
                                            </div>
                                        ) : null} */}
                                    </span>
                                </div>
                                <div className="col-md-6">
                                    <span className="wpcf7-form-control-wrap investmentrang">
                                        <select
                                            name="investmentrang"
                                            className="wpcf7-form-control wpcf7-select form-select investmentrang select-option"
                                            id="select"
                                            aria-invalid="false"
                                            value={formik.values.investmentrang}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option value="Investment Range">Investment Range</option>
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
                                                        Rs.50,00,000 &amp; above
                                                    </option>
                                                </>
                                            ) : (
                                                <>
                                                    <option value="USD 5000 to USD 10000">5000 to 10000 USD</option>
                                                    <option value="USD 10001 to USD 20000">10001 to 20000 USD</option>
                                                    <option value="USD 20001 to USD 30000">20001 to 30000 USD</option>
                                                    <option value="USD 30001 to USD 40000">30001 to 40000 USD</option>
                                                </>
                                            )}
                                        </select>
                                        {/* {formik.errors.investmentrang && formik.touched.investmentrang ? (
                                            <div className="invalid-feedback-error">
                                                {formik.errors.investmentrang}
                                            </div>
                                        ) : null} */}
                                    </span>
                                </div>
                                <div className="col-md-12">
                                    <span className="wpcf7-form-control-wrap textarea">
                                        <textarea
                                            cols={40}
                                            rows={10}
                                            className="wpcf7-form-control wpcf7-textarea form-control"
                                            id="details"
                                            name="details"
                                            placeholder="Message"
                                            value={formik.values.details}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {/* {formik.errors.details && formik.touched.details ? (
                                            <div className="invalid-feedback-error">{formik.errors.details}</div>
                                        ) : null} */}
                                    </span>
                                </div>

                                <div className="col-md-6">
                                    <input
                                        className="wpcf7-form-control wpcf7-submit form-button w-100 mt-0"
                                        name="submit"
                                        id="submit3"
                                        type="submit"
                                    />

                                    {/* <span className="ajax-loader" /> */}
                                </div>
                            </div>
                        </form>
                        <Modal show={show} onHide={handleClose}  >
                            <Modal.Header closeButton>
                                <Modal.Title> </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='modal-body-css'>
                                <div className="modal-inner-con">
                                    <div className="row gy-4">
                                        <div className="col-lg-5">
                                            <img src="/assets/images/thankyou-logo.svg" alt="thankyou-logo" title="Thank You" />
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
                                                    Rest assured, we will ensure the security of your details. If you have any inquiries,don't hesitate to reach out to us at <Link href="mailto:sales@aistalent.com"> <strong>sales@aistalent.com</strong></Link>.
                                                </p>
                                                <p className="com-text mx-3">
                                                    Kindly verify your email for the subsequent instructions provided by Alex.
                                                </p>
                                            </div>
                                            <Link href="https://calendly.com/allianceinternationalservices/global" className="com-btn" target="_blank">
                                                Schedule a Discovery Call
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div >
            </section >

        </>
    )
}

export default FranchiseCommonForm