"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import "./looking-for.css";
import { FaUser } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { FaGlobe } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaSkype } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { RiUserSearchFill } from "react-icons/ri";
import {  usePathname, useRouter } from "next/navigation";

const LookingFor = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState(false);
  const [contact, setContact] = useState(false);
  const [jobsheekhar, setJobsheekhar] = useState(false);

  const dispForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(true);
  };

  const pushcontactpage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setContact(true);
      if (pathname !== "/contact-us") {
        router.push("/contact-us");
      }
    }
  };
  const pushcjobpage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setJobsheekhar(true);
      if (pathname !== "/job-seekers") {
        router.push("/job-seekers");
      }
    }
  };
  return (
    <>
      <div className="looking-for-form-wrapper">
        <ul className="content-list">
          <li className="img-row">
            <Link href="">
              <Image
                src="/assets/images/common/looking_for_img.png"
                className="img-fluid"
                width={343}
                height={278}
                alt=""
              />
            </Link>
          </li>
          <li className="radio-row">
            <div className="radio-box">
              <label
                // for="contactChoice1"
                className="custom-radio openPostForm radio"
              >
                <input
                  type="radio"
                  name="post"
                  id="contactChoice1"
                  value="post"
                  className="emp-contact"
                  onChange={dispForm}
                />
                Yes, I'm Employer{" "}
                <span className="yes_outsource checkmark"></span>
              </label>
              <label
                // for="contactChoice2"
                className="custom-radio radio"
              >
                {" "}
                <input
                  type="radio"
                  name="post"
                  id="contactChoice2"
                  value="job"
                  className="aplyjob-contactsidebar"
                  checked={jobsheekhar}
                />
                No, I'm Job Seeker{" "}
                <span className="yes_outsource checkmark"></span>
              </label>

              <label
                // for="contactChoice3"
                className="custom-radio radio"
              >
                <input
                  type="radio"
                  name="post"
                  id="contactChoice3"
                  value="job"
                  className="jb-contact"
                  onChange={pushcontactpage}
                  checked={contact}
                />{" "}
                Yes, I'm looking to outsource my IT Project/Hire Developer /
                Virtual Assistant.
                <span className="yes_outsource checkmark"></span>
              </label>
            </div>
          </li>
          <li className={`form-row ${selected ? "d-block" : ""}`}>
            <div>
              {/* onSubmit={formik.handleSubmit} */}
              <form className="form-box-wrapper">
                <div className="w-100">
                  <div className="row g-2 justify-content-center">
                    <div className="col-12">
                      <div className="input-box">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="Name*"
                          // onChange={formik.handleChange}
                          // onBlur={formik.handleBlur}
                          // value={formik.values.firstName}
                        />
                        {/* {formik.touched.firstName && formik.errors.firstName ? (
                        <div
                          className={styles.errorMessage}
                          style={{ color: "red" }}
                        >
                          {formik.errors.firstName}
                        </div>
                      ) : null} */}
                        <span className="icon-box">
                          {" "}
                          <FaUser />
                        </span>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="input-box">
                        <input
                          type="text"
                          name="email"
                          placeholder="Email*"
                          // onChange={formik.handleChange}
                          // onBlur={formik.handleBlur}
                          // value={formik.values.lastName}
                        />
                        {/* {formik.touched.lastName && formik.errors.lastName ? (
                        <div
                          className={styles.errorMessage}
                          style={{ color: "red" }}
                        >
                          {formik.errors.lastName}
                        </div>
                      ) : null} */}
                        <span className="icon-box">
                          {" "}
                          <AiOutlineMail />
                        </span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="input-box">
                        <input
                          type="text"
                          name="Country"
                          placeholder="Country"
                          // onChange={formik.handleChange}
                          // onBlur={formik.handleBlur}
                          // value={formik.values.firstName}
                        />
                        {/* {formik.touched.firstName && formik.errors.firstName ? (
                        <div
                          className={styles.errorMessage}
                          style={{ color: "red" }}
                        >
                          {formik.errors.firstName}
                        </div>
                      ) : null} */}
                        <span className="icon-box">
                          {" "}
                          <FaGlobe />
                        </span>
                      </div>
                    </div>

                    <div className="col-5">
                      <div className="input-box">
                        <input
                          type="text"
                          name=""
                          placeholder=""
                          // onChange={formik.handleChange}
                          // onBlur={formik.handleBlur}
                          // value={formik.values.lastName}
                        />
                        {/* {formik.touched.lastName && formik.errors.lastName ? (
                        <div
                          className={styles.errorMessage}
                          style={{ color: "red" }}
                        >
                          {formik.errors.lastName}
                        </div>
                      ) : null} */}
                        <span className="icon-box">
                          {" "}
                          <FaPhoneAlt />
                        </span>
                      </div>
                    </div>
                    <div className="col-7">
                      <div className="input-box num">
                        <input
                          type="text"
                          name="phonenumber"
                          placeholder="Number"
                          // onChange={formik.handleChange}
                          // onBlur={formik.handleBlur}
                          // value={formik.values.lastName}
                        />
                        {/* {formik.touched.lastName && formik.errors.lastName ? (
                        <div
                          className={styles.errorMessage}
                          style={{ color: "red" }}
                        >
                          {formik.errors.lastName}
                        </div>
                      ) : null} */}
                        <span className="icon-box"> </span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="input-box">
                        <input
                          type="text"
                          name="skype"
                          placeholder="Skype"
                          // onChange={formik.handleChange}
                          // onBlur={formik.handleBlur}
                          // value={formik.values.firstName}
                        />
                        {/* {formik.touched.firstName && formik.errors.firstName ? (
                        <div
                          className={styles.errorMessage}
                          style={{ color: "red" }}
                        >
                          {formik.errors.firstName}
                        </div>
                      ) : null} */}
                        <span className="icon-box">
                          {" "}
                          <FaSkype />
                        </span>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="input-box">
                        <input
                          type="text"
                          name="subject"
                          placeholder="Subject"
                          // onChange={formik.handleChange}
                          // onBlur={formik.handleBlur}
                          // value={formik.values.lastName}
                        />
                        {/* {formik.touched.lastName && formik.errors.lastName ? (
                        <div
                          className={styles.errorMessage}
                          style={{ color: "red" }}
                        >
                          {formik.errors.lastName}
                        </div>
                      ) : null} */}
                        <span className="icon-box">
                          {" "}
                          <FaBook />
                        </span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="input-box">
                        <input
                          type="text"
                          name="requirement"
                          placeholder="Requirement"
                          // onChange={formik.handleChange}
                          // onBlur={formik.handleBlur}
                          // value={formik.values.firstName}
                        />
                        {/* {formik.touched.firstName && formik.errors.firstName ? (
                        <div
                          className={styles.errorMessage}
                          style={{ color: "red" }}
                        >
                          {formik.errors.firstName}
                        </div>
                      ) : null} */}
                        <span className="icon-box">
                          {" "}
                          <RiUserSearchFill />
                        </span>
                      </div>
                    </div>

                    <div className="col-10 sbmt-box">
                      <input type="submit" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </li>
          <li className="desciption-row">
            <div className="job_seeker_listing">
              <ul>
                <li>Large database of CV’s</li>
                <li>Hire Candidate Online</li>
                <li>Easiest recruitment process</li>
                <li>Reasonable Fees</li>
              </ul>
            </div>
          </li>
          <li className="btn-row">
            <div className="job-seeker-title">Job Seeker</div>
            <Link href="https://www.alliancerecruitmentagency.com/job-seekers/">
              Apply For Job
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LookingFor;
