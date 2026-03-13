import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import PhoneInput from 'react-phone-input-2';
import { Formik, Field, ErrorMessage, Form, FormikHelpers } from 'formik';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import ReCAPTCHA from 'react-google-recaptcha';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import GoogleCaptchaWrapper from '../captcha/google-captcha-wrapper';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import { toast } from 'react-toastify';
const NEXT_PUBLIC_FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const ForTraining = () => {
    return (
        <GoogleCaptchaWrapper>
            <ForTrainingChild />
        </GoogleCaptchaWrapper>
    )
}
const validationSchema = Yup.object().shape({
    username: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone_number: Yup.string().min(9, " Must be 4 digits required")
        .required('Mobile Number is required'),
    project_details: Yup.string().required('Project Details is required'),
});

interface FormValues {
    username: string,
    email: string,
    phone_number: string,
    company_name: string,
    city: string,
    num_of_participants: string,
    interest: string,
    project_details: string,

}
declare global {
    interface Window {
        grecaptcha: any; // You can specify more precise types if known
    }
}

const ForTrainingChild: React.FC = () => {
    const [selectedPhone, setSelectedPhone] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const [countryName, setCountryName] = useState<any>(null);
    const [countryCode, setCountryCode] = useState<any>(null);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [show, setShow] = useState(false);
    const [shouldRenderComponent, setShouldRenderComponent] = useState(true);
    const router = useRouter();
    const currentUrl = router.asPath;
    const [notification, setNotification] = useState('');
    const { executeRecaptcha } = useGoogleReCaptcha();
    // console.log(currentUrl,"currentUrl")
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleCancelSave = () => {
        setShowModal(false);
    };



    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleCountryChange = (value: any, country: any, e: any, formattedValue: any) => {
        formik.setFieldValue('phone_number', formattedValue);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };


    const getGeoInfo = () => {
        axios.get('https://ipapi.co/json/').then((response) => {
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
        }).catch((error) => {
            // console.error(error);
        });
    };
    useEffect(() => {
        const delayedFetch = setTimeout(() => {
            getGeoInfo();
        }, 5000);
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
        setShow(false)
    };
    const [isSubmitted, setIsSubmitted] = useState(false);

    const initialValues = ({
        username: '',
        email: '',
        phone_number: '',
        company_name: '',
        city: '',
        num_of_participants: '',
        interest: '',
        project_details: '',
    });

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
    //                     company_name: values.company_name,
    //                     city: values.city,
    //                     num_of_participants: values.num_of_participants,
    //                     interest: values.interest,
    //                     project_details: values.project_details,
    //                     captcha_response: gReCaptchaToken,
    //                     currentFormUrl: `${NEXT_PUBLIC_FRONTEND_URL}${currentUrl}`
    //                 }
    //                 // console.log(requestdata)
    //                 setIsSubmitted(true);
    //                 const { statusText, status, data } = await axios.post(`${NEXT_PUBLIC_BACKEND_URL}/forTraning`, requestdata);
    //                 if (status === 200) {
    //                     // toast.success('Form submission Success.');

    //                     // console.log('Form submitted successfully:', data);
    //                     handleComponentRender()
    //                     formik.setFieldValue('phone_number', '');
    //                     setSelectedPhone('');
    //                     setShow(true);
    //                     resetForm({
    //                         values: {
    //                             username: '',
    //                             email: '',
    //                             phone_number: '',
    //                             company_name: '',
    //                             city: '',
    //                             num_of_participants: '',
    //                             interest: '',
    //                             project_details: '',
    //                         },
    //                     });

    //                 } else {
    //                     // console.error('Form submission failed:', statusText);
    //                     // toast.error('Form submission failed. Please try again later.');

    //                 }
    //             } catch (error: any) {
    //                 setIsSubmitted(false);
    //                 // toast.error('Form submission failed. Please try again later.');
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

    // const handleSubmitForm = (values: FormValues) => {
    //     if (!window.grecaptcha) {
    //         console.log("reCAPTCHA not available yet");
    //         // setNotification("reCAPTCHA not available yet, likely meaning key not set");
    //         return;
    //     }
    //     window.grecaptcha.ready(() => {
    //         window.grecaptcha.execute(process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "submit" }).then((gReCaptchaToken: any) => {
    //             submitHireTalentForm(values, gReCaptchaToken);
    //         });
    //     });
    // };

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
    

    const handleSubmitClick = async () => {
        const errors = await formik.validateForm(); 
        formik.setTouched({
            username: true,
            email: true,
            phone_number: true,
            company_name: true,
            city: true,
            num_of_participants: true,
            interest: true,
            project_details: true,
        }); 

        if (Object.keys(errors).length === 0) {
            setShowModal(true); 
        } else {
            formik.setErrors(errors); 
        }
    };


    const submitHireTalentForm = async (values: FormValues, gReCaptchaToken: string) => {
        try {
            const requestdata = {
                username: values.username,
                email: values.email,
                phone_number: values.phone_number,
                company_name: values.company_name,
                city: values.city,
                num_of_participants: values.num_of_participants,
                interest: values.interest,
                project_details: values.project_details,
                captcha_response: gReCaptchaToken,
                currentFormUrl: `${NEXT_PUBLIC_FRONTEND_URL}/${currentUrl}`
            }
            // console.log(requestdata)
            setIsSubmitted(true);
            const response = await axios.post(`${NEXT_PUBLIC_BACKEND_URL}/forTraning`, requestdata);
            if (response.status === 200 && response.data.status !== "error") {
                // toast.success('Form submission Success.');
                formik.resetForm();
                // console.log('Form submitted successfully:', data);
                handleComponentRender()
                formik.setFieldValue('phone_number', '');
                setSelectedPhone('');
                setShowModal(false)
                setShow(true);
                // resetForm({
                //     values: {
                //         username: '',
                //         email: '',
                //         phone_number: '',
                //         company_name: '',
                //         city: '',
                //         num_of_participants: '',
                //         interest: '',
                //         project_details: '',
                //     },
                // });

            } else {
                toast.error(response.data.error || "Failed to submit form");

            }
        } catch (error: any) {
            setIsSubmitted(false);
            // toast.error('Form submission failed. Please try again later.');
            let msg = error;
            if (error.response) {
                if (typeof error.response.data.message === 'string') {
                    msg = error.response.data.message;
                } else {
                    if (error.response.data.message.length > 0) {
                        msg = error.response.data.message[0].message;
                    }
                }
            }
        }
    }
    return (
        <>
            <form className="row" id="for_traning" data-form-type="for-training-form" >
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">

                        <input type="text" name="username" className="c-form-control" id="username3" placeholder="Name*" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.username && formik.touched.username ? (
                            <div className="invalid-feedback-error">{formik.errors.username}</div>
                        ) : null}
                        
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">

                        <input type="email" className="c-form-control" name="email" id="email3" placeholder="Work Email*" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {formik.errors.email && formik.touched.email ? (
                            <div className="invalid-feedback-error">{formik.errors.email}</div>
                        ) : null}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">
                        <PhoneInput
                            country={selectedCountry ? selectedCountry.countryCode.toLowerCase() : 'us'}
                            placeholder="Mobile Number*"
                            countryCodeEditable={false}
                            enableSearch={true}
                            value={formik.values.phone_number}
                            // onChange={(value, country, e, formattedValue) => {
                            //     formik.setFieldValue('phone_number', formattedValue);
                            //     // Other logic if needed
                            // }}
                            onChange={handleCountryChange}
                            onBlur={formik.handleBlur('phone_number')}
                            inputStyle={{ width: '100%', paddingLeft: '45px' }}
                            // Attach the ref to the input field
                            inputProps={{ ref: inputRef }}
                        />
                        {formik.errors.phone_number && formik.touched.phone_number ? (
                            <div className="invalid-feedback-error">{formik.errors.phone_number}</div>
                        ) : null}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">

                        <input type="text" className="c-form-control" name="company_name" id="company_name3" placeholder="Your Company" value={formik.values.company_name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {/* {formik.errors.company_name && formik.touched.company_name ? (
                            <div className="invalid-feedback-error">{formik.errors.company_name}</div>
                        ) : null} */}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">

                        <input type="text" className="c-form-control" name="city" id="city3" placeholder="City" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {/* {formik.errors.city && formik.touched.city ? (
                            <div className="invalid-feedback-error">{formik.errors.city}</div>
                        ) : null} */}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-white-wrapper form-group">

                        <input type="text" className="c-form-control" name="num_of_participants" id="num_of_participants3" placeholder="Number of Participants" value={formik.values.num_of_participants} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        {/* {formik.errors.num_of_participants && formik.touched.num_of_participants ? (
                            <div className="invalid-feedback-error">{formik.errors.num_of_participants}</div>
                        ) : null} */}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-white-wrapper form-group">

                        <select name="interest" className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required" id="experience2" aria-required="true" aria-invalid="false" value={formik.values.interest} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                            <option value="">Select Interest</option>
                            <option value="Soft Skill Training">Soft Skill Training</option>
                            <option value="Leadership Training">Leadership Training</option>
                            <option value="E-Learning Training">E-Learning Training</option>
                            <option value="Communication Skill Training">Communication Skill Training</option>
                            <option value="Team Building Training">Team Building Training</option>
                            <option value="Outbound Training">Outbound Training</option>
                            <option value="Executive Coaching Training">Executive Coaching Training</option>
                            <option value="Self &amp; Personal Development Training">Self &amp; Personal Development Training</option>
                            <option value="Other Trainings or Skill Solutions">Other Trainings or Skill Solutions</option>
                            <option value="SEO Training">SEO Training</option>
                            <option value="Technical Training">Technical Training</option>
                        </select>
                        {/* {formik.errors.interest && formik.touched.interest ? (
                            <div className="invalid-feedback-error">{formik.errors.interest}</div>
                        ) : null} */}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-white-wrapper form-group">

                        <textarea className="wpcf7-form-control wpcf7-textarea tabing-textarea" aria-invalid="false" placeholder="Project Details*" id="keyskills2" name="project_details" rows={40} cols={2} value={formik.values.project_details} onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea>
                        {formik.errors.project_details && formik.touched.project_details ? (
                            <div className="invalid-feedback-error">{formik.errors.project_details}</div>
                        ) : null}
                    </div>
                </div>
                {/* <div className="col-lg-8 pb-4">
    <ReCAPTCHA
                        size="normal"
                        sitekey="6LdQUaYpAAAAAJaf3bfQPQny_6jxU2YY0bQ_QlZz"
                        onChange={(value: any) => setCaptcha(value)}
                    />
                </div> */}
                {/* <div className="g-recaptcha" data-sitekey="6LckSV0lAAAAAMaWgEVhUOa9mfxsD9vA9saSl90C" data-size="normal" data-callback="setResponse"></div>
                <input type="hidden" id="captcha-response2" name="captcha_response" /> */}
                <input name="url" id="url" type="hidden" />
                <input name="subject" id="subject2" type="hidden" value="ARG.AE - C.U - For Training" />

                <div className="col-lg-12 ">
                    <div className="form-white-wrapper ">
                        <button className="hireCandidate submit-btn" name="submit" type='submit' id="submit3" onClick={(e)=>{
                            e.preventDefault()
                            handleSubmitClick()
                    
                        }}>
                            Submit
                        </button>
                    </div>
                </div>
            </form>

            <Modal className='thank-you-modal' show={show} onHide={handleClose}>
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

            <ConfirmationPopup
                showModal={showModal}
                onConfirm={formik.handleSubmit}
                onCancel={handleCancelSave}
                
            />
        </>
    );
};
export default ForTraining;
