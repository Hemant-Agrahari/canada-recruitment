import React, { useState, ChangeEvent, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import Modal from 'react-bootstrap/Modal';
import Link from "next/link";
import axios from "axios";
import meta from "../meta/meta.json"
import * as Yup from 'yup';
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import CustomHead from "@/components/Head";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
   ssr: false,
});
const validationSchema = Yup.object().shape({
   username: Yup.string().required('Name is required'),
   email: Yup.string().email('Invalid email').required('Email is required'),
   phone_number: Yup.string().required('Mobile Number is required'),
   location: Yup.string().required('location   is required'),
   enquireFor: Yup.string().required('Field is required'),
   message: Yup.string().required('message is required'),
});
const LandingPage = () => {
   const [errorMessage, setErrorMessage] = useState('');
   const [show, setShow] = useState(false);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [selectedPhone, setSelectedPhone] = useState<string>('');
   const [selectedCountry, setSelectedCountry] = useState<any>(null);
   const [file, setFile] = useState<File | null>(null);
   const [countryName, setCountryName] = useState<any>(null);
   const [countryCode, setCountryCode] = useState<any>(null);
   const [acceptTerms, setAcceptTerms] = useState(false);
   const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
   const [shouldRenderComponent, setShouldRenderComponent] = useState(true);
   const options = {
      infinite: true,
      items: 3,
      loop: true,
      margin: 20,
      nav: true,
      autoplaySpeed: 3000,
      navText: ['<svg width="70%" height="70%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 2px;stroke: #3B71FE;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="70%" height="70%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 2px;stroke: #3B71FE;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
      responsive: {
         0: {
            items: 1, // Number of items for screens less than 600 pixels wide
         },
         600: {
            items: 2, // Number of items for screens between 600 and 992 pixels wide
         },
         992: {
            items: 2, // Number of items for screens between 992 and 1200 pixels wide
         },
         1200: {
            items: 3, // Number of items for screens 1200 pixels wide and above
         }
      }

   };
   const handleClose = () => {
      setShow(false)
   };
   const initialValues = ({
      username: '',
      email: '',
      phone_number: '',
      location: '',
      enquireFor: '',
      message: '',
   });
   const formik: any = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: async (values, { resetForm }) => {
         try {
            const requestdata = {
               username: values.username,
               email: values.email,
               phone_number: values.phone_number,
               enquireFor: values.enquireFor,
               location: values.location,
               message: values.message,
            }

            const { statusText, status, data } = await axios.post('https://alliancecomau.aistechnolabs.pro/contactUsNewForm', requestdata);
            // const { statusText, status, data } = await axios.post('https://allianceaeapi.alliancerecruitmentagency.ae/forHireCandidate', requestdata);
            if (status === 200) {
               console.log('Form submitted successfully:', data);
               setShow(true);
               formik.setFieldValue('phone_number', '');
               resetForm({
                  values: {
                     username: '',
                     email: '',
                     phone_number: '',
                     location: '',
                     enquireFor: '',
                     message: '',
                  },
               });

            } else {
               console.error('Form submission failed:', statusText);
               setErrorMessage('Form submission failed. Please try again.'); // Set user-friendly error message              
               resetForm({
                  values: {
                     username: '',
                     email: '',
                     phone_number: '',
                     location: '',
                     enquireFor: '',
                     message: '',
                  },
               });
            }
         } catch (error: any) {
            // ... your existing error handling logic
            setErrorMessage('An error occurred during form submission. Please try again.');
            resetForm({
               values: {
                  username: '',
                  email: '',
                  phone_number: '',
                  location: '',
                  enquireFor: '',
                  message: '',
               },
            });

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
      },
   });

   return (
      <>
         <CustomHead
            {...meta[
            "manpower-supply-company"
            ]} />
         <div className="inner-wrapper">
            {/* <!-- Man Power Suplier Section Start From Here  --> */}
            <section className="mps-wrapper">
               <div className="container">
                  <div className="row">
                     <div className="col-12">
                        <h1 className="main-sub-title">
                           No.1 Manpower Supplier in Middle East
                           <span className="icon-box ms-1">
                              <img
                                 src="/assets/images/landing-page/stars-plus-wink-filled.svg"
                                 alt="stars plus wink"
                              />
                           </span>
                        </h1>
                        <h1 className="main-title">
                           Your Trusted Source for Skilled Workforce
                        </h1>
                        <div className="res-spiral">
                           <p className="com-para main-para">
                              Transform your business dynamics with the unparalleled
                              expertise of the Middle East's foremost Manpower Supplier!
                              Elevate your workforce to new heights of productivity and
                              success with Alliance Recruitment Agency.
                           </p>
                           <div className="get-start">
                              <Link href="#c-form">Get Started Today</Link>
                           </div>
                        </div>
                        <div className="group-btn">
                           <span className="g-btn">
                              <span className="icon-box">
                                 <img
                                    src="/assets/images/landing-page/group-worker.svg"
                                    alt="Highly Skilled Workers"
                                 />
                              </span>
                              Access to a Pool of Highly Skilled Workers
                           </span>
                           <span className="g-btn">
                              <span className="icon-box">
                                 <img
                                    src="/assets/images/landing-page/staffing-solution.svg"
                                    alt="Staffing Solutions"
                                 />
                              </span>
                              Flexible Staffing Solutions
                           </span>
                           <span className="g-btn">
                              <span className="icon-box">
                                 <img
                                    src="/assets/images/landing-page/recruitment-process.svg"
                                    alt="Recruitment Process"
                                 />
                              </span>
                              Streamlined Recruitment Process
                           </span>
                        </div>
                        <div className="image-box">
                           <img
                              src="/assets/images/landing-page/skilled-workforce.png"
                              alt="skilled workforce"
                           />
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            {/* <!-- Man Power Suplier Section End  --> */}
            {/* <!-- Testimonial Section Start From Here  --> */}
            <section className="testimonial-wrapper">
               <h2 className="com-title">Testimonials</h2>
               <div className="container">
                  <div className="row">
                     <OwlCarousel {...options}>
                        {/* <div className="landing owl-carousel owl-theme"> */}
                        <div className="item">
                           <div className="item-content">
                              <div className="icon-box">
                                 <img src="/assets/images/landing-page/quote-up.svg" alt="Quote" />
                              </div>
                              <p className="com-para">
                                 Alliance International is an International recruitment
                                 agency, It provides top quality recruitment services to
                                 global businesses, startups, and entrepreneurs.
                              </p>
                              <div className="client-details">
                                 <span className="image-box">
                                    <img src="/assets/images/landing-page/gary-morris.svg" alt="gary morris" />
                                 </span>
                                 <span className="client-name">Gary Morris</span>
                                 <span className="client-review"
                                 ><img src="/assets/images/landing-page/star.svg" alt="star" /> 4.5</span
                                 >
                              </div>
                           </div>
                        </div>
                        <div className="item">
                           <div className="item-content">
                              <div className="icon-box">
                                 <img src="/assets/images/landing-page/quote-up.svg" alt="Quote" />
                              </div>
                              <p className="com-para">
                                 I have been using Alliance International for accountancy and
                                 finance recruitment. They are professional recruitment
                                 consultants and provide us highly qualified candidates
                                 across globe and all over seniority.
                              </p>
                              <div className="client-details">
                                 <div className="image-box">
                                    <img
                                       src="/assets/images/landing-page/martin-albinson.svg"
                                       alt="martin albinson"
                                    />
                                 </div>
                                 <span className="client-name">Martin Albinson</span>
                                 <span className="client-review"
                                 ><img src="/assets/images/landing-page/star.svg" alt="star" /> 4.3</span
                                 >
                              </div>
                           </div>
                        </div>
                        <div className="item">
                           <div className="item-content">
                              <div className="icon-box">
                                 <img src="/assets/images/landing-page/quote-up.svg" alt="Quote" />
                              </div>
                              <p className="com-para">
                                 We are extremely happy with Alliance International, and
                                 their dedicated recruitment team.
                              </p>
                              <div className="client-details">
                                 <div className="image-box">
                                    <img
                                       src="/assets/images/landing-page/matthew-anderson.svg"
                                       alt="matthew anderson"
                                    />
                                 </div>
                                 <span className="client-name">Matthew Anderson</span>
                                 <span className="client-review"
                                 ><img src="/assets/images/landing-page/star.svg" alt="star" /><span
                                    className="data"
                                 >
                                       4.4</span
                                    ></span
                                 >
                              </div>
                           </div>
                        </div>
                        <div className="item">
                           <div className="item-content">
                              <div className="icon-box">
                                 <img src="/assets/images/landing-page/quote-up.svg" alt="Quote" />
                              </div>
                              <p className="com-para">
                                 Alliance International is an International recruitment
                                 agency, It provides top quality recruitment services to
                                 global businesses, startups, and entrepreneurs.
                              </p>
                              <div className="client-details">
                                 <span className="image-box">
                                    <img src="/assets/images/landing-page/gary-morris.svg" alt="gary morris" />
                                 </span>
                                 <span className="client-name">Gary Morris</span>
                                 <span className="client-review"
                                 ><img src="/assets/images/landing-page/star.svg" alt="star" /> 4.5</span
                                 >
                              </div>
                           </div>
                        </div>
                        <div className="item">
                           <div className="item-content">
                              <div className="icon-box">
                                 <img src="/assets/images/landing-page/quote-up.svg" alt="Quote" />
                              </div>
                              <p className="com-para">
                                 I have been using Alliance International for accountancy and
                                 finance recruitment. They are professional recruitment
                                 consultants and provide us highly qualified candidates
                                 across globe and all over seniority.
                              </p>
                              <div className="client-details">
                                 <div className="image-box">
                                    <img
                                       src="/assets/images/landing-page/martin-albinson.svg"
                                       alt="martin albinson"
                                    />
                                 </div>
                                 <span className="client-name">Martin Albinson</span>
                                 <span className="client-review">
                                    <img src="/assets/images/landing-page/star.svg" alt="star" />
                                    <span className="data"> 4.3</span></span>
                              </div>
                           </div>
                        </div>
                        <div className="item">
                           <div className="item-content">
                              <div className="icon-box">
                                 <img src="/assets/images/landing-page/quote-up.svg" alt="Quote" />
                              </div>
                              <p className="com-para">
                                 We are extremely happy with Alliance International, and
                                 their dedicated recruitment team.
                              </p>
                              <div className="client-details">
                                 <div className="image-box">
                                    <img
                                       src="/assets/images/landing-page/matthew-anderson.svg"
                                       alt="matthew anderson"
                                    />
                                 </div>
                                 <span className="client-name">Matthew Anderson</span>
                                 <span className="client-review">
                                    <img src="/assets/images/landing-page/star.svg" alt="star" />
                                    <span className="data">4.4</span>
                                 </span>
                              </div>
                           </div>
                        </div>
                        {/* </div> */}
                     </OwlCarousel>
                  </div>
               </div>
            </section>
            {/* <!-- Testimonial Section End  --> */}
            {/* <!-- Form Section Start From Here  --> */}
            <section className="contact-form" id="c-form">
               <div className="container">
                  <div className="row">
                     <div className="col-12">
                        <div className="contact-form-wrapper" >
                           <div className="contact-fom-content">
                              <div className="left-image-box">
                                 <img src="/assets/images/landing-page/contact-form.png" alt="contact form" />
                              </div>
                           </div>
                           <div className="contact-fom-content right">
                              <h2 className="com-title">Contact Us</h2>
                              {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                              <form id="contactUsSubmit1" onSubmit={formik.handleSubmit}>
                                 <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                       <div className="form-group">
                                          <label htmlFor="name">Full Name</label>
                                          {/* <input type="text" name="name" className="form-control" required /> */}
                                          <input type="text" name="username" className=" form-control" required id="username" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                          {formik.errors.username && formik.touched.username ? (
                                             <div className="invalid-feedback-error">{formik.errors.username}</div>
                                          ) : null}
                                       </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                       <div className="form-group">
                                          <label htmlFor="mail">Email</label>

                                          <input type="text" name="email" className=" form-control" required id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                          {formik.errors.email && formik.touched.email ? (
                                             <div className="invalid-feedback-error">{formik.errors.email}</div>
                                          ) : null}
                                       </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                       <div className="form-group">
                                          <label htmlFor="tel">Phone Number</label>
                                          <input type="text" name="phone_number" className=" form-control" required id="phone_number" value={formik.values.phone_number} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                          {formik.errors.phone_number && formik.touched.phone_number ? (
                                             <div className="invalid-feedback-error">{formik.errors.phone_number}</div>
                                          ) : null}
                                       </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                       <div className="form-group">
                                          <label htmlFor="location">Location</label>
                                          <input
                                             type="text"
                                             name="location"
                                             className="form-control"
                                             required value={formik.values.location} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                          {formik.errors.location && formik.touched.location ? (
                                             <div className="invalid-feedback-error">{formik.errors.location}</div>
                                          ) : null}
                                       </div>
                                    </div>
                                    <div className="col-12">
                                       <div className="enquiry-optn">
                                          Enquiry For
                                          <select name="enquireFor" value={formik.values.enquireFor}
                                             onChange={formik.handleChange}
                                             onBlur={formik.handleBlur}>
                                             <option style={{ fontSize: "18px" }} value="">Choose Any Service</option>
                                             <option style={{ fontSize: "18px" }} value="hroutsourcing">HR Outsourcing</option>
                                             <option style={{ fontSize: "18px" }} value="manpowerservices">Manpower Services</option>
                                             <option style={{ fontSize: "18px" }} value="recruitment">Recruitment</option>
                                             <option style={{ fontSize: "18px" }} value="contractstaffing">Contract Staffing</option>
                                             <option style={{ fontSize: "18px" }} value="executivesearch">Executive Search</option>
                                             <option style={{ fontSize: "18px" }} value="hrcompliance">HR Compliance</option>

                                          </select>

                                          {formik.errors.enquireFor && formik.touched.enquireFor ? (
                                             <div className="invalid-feedback-error">{formik.errors.enquireFor}</div>
                                          ) : null}

                                       </div>
                                    </div>
                                    <div className="col-12 txtarea">
                                       <label htmlFor="message">Message</label>
                                       <textarea
                                          name="message"
                                          id=""
                                          className=" "
                                          cols={30}
                                          rows={1}
                                          placeholder="Write your message.."
                                          value={formik.values.message} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                          required></textarea>


                                       {formik.errors.message && formik.touched.message ? (
                                          <div className="invalid-feedback-error">{formik.errors.message}</div>
                                       ) : null}
                                    </div>
                                    <div className="col-12">
                                       <div className="form-group tnc">
                                          <input type="checkbox" name="tnc" id="" required />
                                          <p className="com-para">
                                             I have Read the terms of processing the data
                                             provided by me as per the
                                             <Link href="/privacy-policy" target="_blank" className="prvc">
                                                Privacy Notice
                                             </Link>
                                             and provide my consent for the same
                                          </p>
                                       </div>
                                    </div>
                                    <div className="col-12">
                                       <div className="btn-group">
                                          <input
                                             type="submit"
                                             className="form-btn"
                                             value="Submit"
                                          />
                                          <button className="form-btn">Reset</button>
                                       </div>
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
                        </div>
                     </div>
                  </div >
               </div >
            </section >
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
            {/* <!-- Form Section End  --> */}
         </div >
      </>
   )
}

export default LandingPage;