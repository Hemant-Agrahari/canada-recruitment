import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PhoneInput from "react-phone-input-2";
import ReCAPTCHA from "react-google-recaptcha";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import GoogleCaptchaWrapper from '../captcha/google-captcha-wrapper';

export const HandbookButton = () => {
    return (
        <GoogleCaptchaWrapper>
            <HandbookButtonChild />
        </GoogleCaptchaWrapper>
    )
}

const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(10).required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone_number: Yup.string().min(9," Must be 4 digits required").required('Mobile Number is required'),
    // investmentrang: Yup.string().required('Please select an option'),
});


function HandbookButtonChild() {
    const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    const handleClose = () => {
        formik.resetForm();  // Reset the form values
        setShow(false) // Close the modal
      };
    const handleShow = () => setShow(true);
    const [captcha, setCaptcha] = useState(null);
    const [countryName, setCountryName] = useState<any>(null);
    const [countryCode, setCountryCode] = useState<any>(null);
    const router = useRouter();
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
    const currentUrl = router.asPath;
    const [notification, setNotification] = useState('');
    const { executeRecaptcha } = useGoogleReCaptcha();



    const initialValues = ({
        name: '',
        email: '',
        phone_number: '',
        investmentrang: ""
        // recaptcha: ''
    });

    const formik: any = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (!executeRecaptcha) {
                // console.log("Execute recaptcha not available yet");
                setNotification(
                    "Execute recaptcha not available yet likely meaning key not recaptcha key not set"
                );
                return;
            }
            executeRecaptcha("enquiryFormSubmit").then(async (gReCaptchaToken: any) => {
                try {
                    const requestdata = {
                        name: values.name,
                        email: values.email,
                        phone_number: values.phone_number,
                        investmentrang: values.investmentrang,
                        // captcha_response: gReCaptchaToken,
                        currentFormUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${currentUrl}`
                    }
                    console.log("requestdata", requestdata)
                    const { statusText, status, data } = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/handbook_enquiryForm`, requestdata);
                    // console.log("status",statusText)
                    // console.log("requestdata", requestdata)

                    if (status === 200) {
                        console.log('Form submitted successfully:', data);
                        // toast.success('Form submission Success.');
                        showPdf()

                        formik.setFieldValue('phone_number', '');
                        setShow(true);
                        resetForm({
                            values: {
                                name: '',
                                email: '',
                                phone_number: '',
                                investmentrang: ''
                                // recaptcha: ''
                            },
                        });

                    } else {
                        // toast.error('Form submission failed. Please try again later.');
                        console.error('Form submission failed:', statusText);
                    }
                } catch (error: any) {
                    toast.error('Form submission failed. Please try again later.');
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
            })
            setShow(true);
            resetForm({
                values: {
                    name: '',
                    email: '',
                    phone_number: '',
                    investmentrang: '',
                },
            });
        },
    });

    console.log("formik.errors",formik.errors)


    const getGeoInfo = () => {
        axios.get('https://ipapi.co/json/').then((response) => {
            let data = response.data;
            // console.log( "data", data)
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
        }, 1000);
        // Clear the timeout if the component unmounts before the delay
        return () => clearTimeout(delayedFetch);
    }, []);
    useEffect(() => {
        // console.log(countryCode, "1", countryName, "2", selectedCountry, "4");
    }, [countryCode, countryName, selectedCountry]);

    const showPdf = () => {
        router.push("https://www.alliancerecruitmentagency.ae/wp-content/uploads/2024/03/Strategic_Talent_sourcing.pdf")
    }

    const inputRef = useRef<HTMLInputElement | null>(null);
    
    const handleCountryChange = (value: any, country: any, e: any, formattedValue: any) => {
        formik.setFieldValue('phone_number', formattedValue);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <>
            <div id='handbook'>
                <button className="right-sidebar-btn" onClick={handleShow}>
                    <noscript>
                        <Image src="../wp-content/themes/alliancerecruitmentagency-child/assets/images/get-your-handbook.svg" alt="get your handbook" width={65} height={190}
                           priority={false} />
                    </noscript>
                    <Image className=" ls-is-cached lazyloaded" src="../wp-content/themes/alliancerecruitmentagency-child/assets/images/get-your-handbook.svg" alt="get your handbook" width={65} height={176}  priority={false} />
                </button>
                <>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        keyboard={false}
                        centered
                        center-model className=' mx-auto modal-hanbook'
                    >
                        <Modal.Body  >
                            <>
                                <section className="ebook-form-wrapper ">
                                    <h2 className="e-book-com-title-mod">Discover handpicked, vetted talents.</h2>

                                    <form onSubmit={formik.handleSubmit} >

                                        <div className="form-group mb-4" >
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                id="name"
                                                placeholder="Name*"
                                                value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                            />
                                            {formik.errors.name && formik.touched.name ? (
                                                <div className="invalid-feedback-error">{formik.errors.name}</div>
                                            ) : null}

                                        </div>

                                        <div className="form-group mb-4">
                                            <input
                                                type="email"
                                                name="email"
                                                size={40}
                                                className="form-control"
                                                id="email"
                                                placeholder='email address'
                                                value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                            />
                                            {formik.errors.email && formik.touched.email ? (
                                                <div className="invalid-feedback-error">{formik.errors.email}</div>
                                            ) : null}
                                        </div>

                                        <div className="form-group mb-4">
                                            <PhoneInput
                                                country={selectedCountry ? selectedCountry.countryCode.toLowerCase() : ''}
                                                countryCodeEditable={false}
                                                enableSearch={true}
                                                // country={selectedCountry}
                                                placeholder="Mobile Number"
                                                inputStyle={{ width: '100%', paddingLeft: '45px' }}
                                                value={formik.values.phone_number}
                                                // onChange={(value, country, e, formattedValue) => {
                                                //     formik.setFieldValue('phone_number', formattedValue);
                                                // }}
                                                onChange={handleCountryChange}
                                                inputProps={{ ref: inputRef }}

                                            />
                                            {formik.errors.phone_number && formik.touched.phone_number ? (
                                                <div className="invalid-feedback-error">{formik.errors.phone_number}</div>
                                            ) : null}
                                        </div>

                                        <div className="form-group mb-4">
                                            <span className="investmentrang">
                                                <select
                                                    name="investmentrang"
                                                    className=" form-control"
                                                    id="select"
                                                    value={formik.values.investmentrang}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}

                                                >
                                                    <option value=''>Are you interested for any services?</option>
                                                    <option value="Hiring Freelancers/Contractors">
                                                        Hiring Freelancers/Contractors
                                                    </option>
                                                    <option value="Hiring Permanent/Full time talents">
                                                        Hiring Permanent/Full time talents
                                                    </option>
                                                    <option value="Looking for Digital Marketing/Web Development services">
                                                        Looking for Digital Marketing/Web Development services
                                                    </option>
                                                    <option value="Career opportunities">Career opportunities</option>
                                                </select>
                                                {/* {formik.errors.investmentrang && formik.touched.investmentrang ? (
                                                    <div className="invalid-feedback-error">{formik.errors.investmentrang}</div>
                                                ) : null} */}
                                            </span>
                                        </div>

                                        {/* <div className="col-lg-8 pb-4">
                                            <ReCAPTCHA
                                                size="normal"
                                                sitekey="6LftC6EpAAAAAEtZasyH2J6b4XfQMG2MA5XSp9fU"
                                                onChange={(value: any) => setCaptcha(value)}
                                            />
                                        </div> */}

                                        <div className="form-group">
                                            <input

                                                type="submit"
                                                defaultValue="Get Your Handbook"
                                                className="form-control ebook-submit-btn"
                                            />
                                        </div>

                                    </form>
                                </section>

                            </>


                        </Modal.Body>

                    </Modal>
                </>

            </div>

        </>
    )
}

export default HandbookButton