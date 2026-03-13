import React, { useEffect, useRef, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Formik, Field, Form, FormikHelpers, useFormik } from "formik";
import Link from "next/link";
import PhoneInputComponent from "@/utils/phoneInput/phoneInputComponent";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import * as Yup from 'yup';
import PhoneInput from "react-phone-input-2";
import { useRouter } from "next/router";
import GoogleCaptchaWrapper from "../captcha/google-captcha-wrapper";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "react-toastify";
const NEXT_PUBLIC_FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const FranchiseEnquiryForm = () => {
    return (
        <GoogleCaptchaWrapper>
            <FranchiseEnquiryFormChild />
        </GoogleCaptchaWrapper>
    )
}
const validationSchema = Yup.object().shape({
    contact_person: Yup.string().required('Contact Person is required'),
    // address: Yup.string().required('Address is required'),
    // city: Yup.string().required('City is required'),
    // state: Yup.string().required('State is required'),
    // country: Yup.string().required('Country is required'),
    phone_number: Yup.string().min(9, " Must be 4 digits required")
        .required('Mobile Number is required'),
    // skype_id: Yup.string().required('Skype ID is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    // industry: Yup.string().required('Industry is required'),
    // dob: Yup.string().required('Date of Birth is required'),
    // qualification: Yup.string().required('Qualification is required'),
    // occupation: Yup.string().required('Occupation is required'),
    investment_range: Yup.string().required('Investment Range is required'),
});

interface FormValues {
    contact_person: string,
    address: string,
    city: string,
    state: string,
    country: string,
    phone_number: string,
    skype_id: string,
    email: string,
    industry: string,
    dob: string,
    qualification: string,
    occupation: string,
    investment_range: string,



}
declare global {
    interface Window {
        grecaptcha: any; // You can specify more precise types if known
    }
}
const FranchiseEnquiryFormChild: React.FC = () => {
    const router = useRouter();
    const [isINR, setIsINR] = useState(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedPhone, setSelectedPhone] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [countryName, setCountryName] = useState<any>(null);
    const [countryCode, setCountryCode] = useState<any>(null);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [show, setShow] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [captcha, setCaptcha] = useState(null);
    const currentUrl = router.asPath;
    const [shouldRenderComponent, setShouldRenderComponent] = useState(true);
    const [notification, setNotification] = useState('');
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [formData, setFormData] = useState<any>({
        phone_number: '',
    })
    const getGeoInfo = () => {
        axios.get('https://ipapi.co/json/').then((response) => {
            let data = response.data;
            const { country } = response.data;
            setIsINR(country === 'IN');
            setCountryName(data.country_name);
            setCountryCode(data.country_calling_code);
            setSelectedCountry({
                name: data.country_name,
                dialCode: data.country_calling_code,
                countryCode: data.country_code,
            });
        }).catch((error) => {
            toast.error("Error fetching IP information");
        });
    };
    useEffect(() => {
        const delayedFetch = setTimeout(() => {
            getGeoInfo();
        }, 3000);
        // Clear the timeout if the component unmounts before the delay
        return () => clearTimeout(delayedFetch);
    }, []);
    useEffect(() => {
        // console.log(countryCode, "1", countryName, "2", selectedCountry, "4");
    }, [countryCode, countryName, selectedCountry]);
    const handleComponentRender = () => {
        // This function can be called to toggle the state and trigger a re-render
        setShouldRenderComponent(!shouldRenderComponent);
    };
    const handleClose = () => {
        setShow(false)
    };
    const initialValues = ({
        contact_person: '',
        address: '',
        city: '',
        state: '',
        country: '',
        phone_number: '',
        skype_id: '',
        email: '',
        industry: '',
        dob: '',
        qualification: '',
        occupation: '',
        investment_range: '',
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
                contact_person: values.contact_person,
                address: values.address,
                city: values.city,
                state: values.state,
                country: values.country,
                phone_number: values.phone_number,
                skype_id: values.skype_id,
                email: values.email,
                industry: values.industry,
                dob: values.dob,
                qualification: values.qualification,
                occupation: values.occupation,
                investment_range: values.investment_range,
                captcha_response: gReCaptchaToken,
                currentFormUrl: `${NEXT_PUBLIC_FRONTEND_URL}${currentUrl}`
            };

            // console.log(requestdata)
            setIsSubmitted(true);
            const response = await axios.post(`${NEXT_PUBLIC_BACKEND_URL}/forFranchinseInquiry`, requestdata);
            if (response.status === 200 && response.data.status !== "error") {
                // console.log('Form submitted successfully:', data);
                setShow(true);
                handleComponentRender()
                formik.setFieldValue('phone_number', '');
                setSelectedPhone('');
                formik.resetForm();
                // resetForm({
                //     values: {
                //         contact_person: '',
                //         address: '',
                //         city: '',
                //         state: '',
                //         country: '',
                //         phone_number: '',
                //         skype_id: '',
                //         email: '',
                //         industry: '',
                //         dob: '',
                //         qualification: '',
                //         occupation: '',
                //         investment_range: '',
                //     },
                // });

            } else {
                toast.error(response.data.error || "Failed to submit form");
            }

        } catch (error: any) {
            setIsSubmitted(false);
            toast.error(error.response.data.error || "Failed to submit form");

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
    //                     contact_person: values.contact_person,
    //                     address: values.address,
    //                     city: values.city,
    //                     state: values.state,
    //                     country: values.country,
    //                     phone_number: values.phone_number,
    //                     skype_id: values.skype_id,
    //                     email: values.email,
    //                     industry: values.industry,
    //                     dob: values.dob,
    //                     qualification: values.qualification,
    //                     occupation: values.occupation,
    //                     investment_range: values.investment_range,
    //                     captcha_response: gReCaptchaToken,
    //                     currentFormUrl: `${NEXT_PUBLIC_FRONTEND_URL}${currentUrl}`
    //                 };

    //                 // console.log(requestdata)
    //                 setIsSubmitted(true);
    //                 const { statusText, status, data } = await axios.post(`${NEXT_PUBLIC_BACKEND_URL}/forFranchinseInquiry`, requestdata);
    //                 if (status === 200) {
    //                     // console.log('Form submitted successfully:', data);
    //                     setShow(true);
    //                     // handleComponentRender()
    //                     formik.setFieldValue('phone_number', '');
    //                     setSelectedPhone('');
    //                     resetForm({
    //                         values: {
    //                             contact_person: '',
    //                             address: '',
    //                             city: '',
    //                             state: '',
    //                             country: '',
    //                             phone_number: '',
    //                             skype_id: '',
    //                             email: '',
    //                             industry: '',
    //                             dob: '',
    //                             qualification: '',
    //                             occupation: '',
    //                             investment_range: '',
    //                         },
    //                     });

    //                 } else {
    //                     // console.error('Form submission failed:', statusText);
    //                 }

    //             } catch (error: any) {
    //                 setIsSubmitted(false);

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

            <form className="row" id="for_traning" onSubmit={formik.handleSubmit}>
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">
                        <input type="text" name="contact_person" className="c-form-control" id="contact_person" placeholder="Contact Person*" value={formik.values.contact_person} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.contact_person && formik.touched.contact_person ? (
                            <div className="invalid-feedback-error">{formik.errors.contact_person}</div>
                        ) : null}
                    </div>
                </div>
                {/* // For 'address' */}
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">
                        <input
                            type="text"
                            name="address"
                            className="c-form-control"
                            id="address"
                            placeholder="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {/* {formik.errors.address && formik.touched.address ? (
                            <div className="invalid-feedback-error">{formik.errors.address}</div>
                        ) : null} */}
                    </div>
                </div>

                {/* // For 'city' */}
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">
                        <input
                            type="text"
                            name="city"
                            className="c-form-control"
                            id="city"
                            placeholder="City"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {/* {formik.errors.city && formik.touched.city ? (
                            <div className="invalid-feedback-error">{formik.errors.city}</div>
                        ) : null} */}
                    </div>
                </div>

                {/* // For 'state' */}
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">
                        <input
                            type="text"
                            name="state"
                            className="c-form-control"
                            id="state"
                            placeholder="State"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {/* {formik.errors.state && formik.touched.state ? (
                            <div className="invalid-feedback-error">{formik.errors.state}</div>
                        ) : null} */}
                    </div>
                </div>

                {/* // For 'country' */}
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">
                        <input
                            type="text"
                            name="country"
                            className="c-form-control"
                            id="country"
                            placeholder="Country"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {/* {formik.errors.country && formik.touched.country ? (
                            <div className="invalid-feedback-error">{formik.errors.country}</div>
                        ) : null} */}
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">
                        <div className="form-white-wrapper form-group">
                            <PhoneInput
                                country={selectedCountry ? selectedCountry.countryCode.toLowerCase() : 'us'}
                                placeholder="Mobile Number*"
                                value={formik.values.phone_number}
                                countryCodeEditable={false}
                                enableSearch={true}
                                // onChange={(value, country, e, formattedValue) => {
                                //     formik.setFieldValue('phone_number', formattedValue);
                                // }}
                                onChange={handleCountryChange}
                                inputProps={{ ref: inputRef }}
                                onBlur={formik.handleBlur('phone_number')}
                                inputStyle={{ width: '100%', paddingLeft: '45px' }}
                            />
                            {formik.errors.phone_number && formik.touched.phone_number ? (
                                <div className="invalid-feedback-error">{formik.errors.phone_number}</div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">
                        <input type="text" name="skype_id" className="c-form-control" id="skype_id"
                            placeholder="Skype Id" value={formik.values.skype_id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {/* {formik.errors.skype_id && formik.touched.skype_id ? (
                            <div className="invalid-feedback-error">{formik.errors.skype_id}</div>
                        ) : null} */}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">
                        <input type="email" name="email" className="c-form-control" id="email"
                            placeholder="Email ID*" value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {formik.errors.email && formik.touched.email ? (
                            <div className="invalid-feedback-error">{formik.errors.email}</div>
                        ) : null}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">
                        <input type="text" name="industry" className="c-form-control" id="industry"
                            placeholder="Industry" value={formik.values.industry}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {/* {formik.errors.industry && formik.touched.industry ? (
                            <div className="invalid-feedback-error">{formik.errors.industry}</div>
                        ) : null} */}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">

                        <input
                            type="text"
                            name="dob"
                            max={new Date().toISOString().split('T')[0]}

                            className="wpcf7-form-control wpcf7-date wpcf7-validates-as-required wpcf7-validates-as-date"
                            aria-required="true"
                            aria-invalid="false"
                            placeholder="Date Of Birth"
                            value={formik.values.dob}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {/* {formik.errors.dob && formik.touched.dob ? (
                            <div className="invalid-feedback-error">{formik.errors.dob}</div>
                        ) : null} */}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">
                        <input type="text" name="qualification" className="c-form-control" id="qualification"
                            placeholder="Qualification" value={formik.values.qualification}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {/* {formik.errors.qualification && formik.touched.qualification ? (
                            <div className="invalid-feedback-error">{formik.errors.qualification}</div>
                        ) : null} */}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">
                        <input type="text" name="occupation" className="c-form-control" id="occupation"
                            placeholder="Occupation" value={formik.values.occupation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

                        {/* {formik.errors.occupation && formik.touched.occupation ? (
                            <div className="invalid-feedback-error">{formik.errors.occupation}</div>
                        ) : null} */}
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">
                        <select

                            name="investment_range"
                            className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required"
                            id="Experience1"
                            aria-required="true"
                            aria-invalid="false"
                            value={formik.values.investment_range}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >

                            <option value="Investment Range">Investment Range*</option>
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

                        {formik.errors.investment_range && formik.touched.investment_range ? (
                            <div className="invalid-feedback-error">{formik.errors.investment_range}</div>
                        ) : null}
                    </div>
                </div>
                {/* <div className="col-lg-6">
                    <div className="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY" data-size="normal" data-callback="setResponse"></div>
                    <input type="hidden" id="captcha_response" name="captcha_response" />
                </div> */}

                {/* <input name="url" id="url" type="hidden" /> */}
                <input name="subject" id="subject" type="hidden" value="ARG.AE - F.I - franchise" />
                <div className="col-lg-12">
                    <div className="form-white-wrapper">
                        <button type="submit" className="hireCandidate btn btn-primary" name="submit" id="submit">
                            Send Now
                        </button>
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
        </>
    );
};
export default FranchiseEnquiryForm;
