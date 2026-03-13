// @ts-ignore
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
// import dynamic from "next/dynamic";
import Link from "next/link";
import axios from "axios";
import Head from "next/head";
import { format } from "date-fns";
// import Appnew from "@/components/MaindropDown/Appnew"

type PaginationType = {
  currentPage: number; // Optional property with number type
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

const index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [blogList, setBlogList] = useState<any>(null);
  const [jobData, setJobData] = useState<any>(null);
  const [meta, setMeta] = useState<any>(null);
  // const [options, setOptions] = useState<any[]>([]);
  // const [isFilter, setFilter] = useState<string>("all");
  // const [count, setCount] = useState<number>(10);
  // const [page, setPage] = useState<number>(1);
  const [selectedDateFilter, setSelectedDateFilter] = useState("");
  const [selectedExperienceFilter, setSelectedExperienceFilter] = useState("");
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  // JOB Filter Integration
  const [jobKey, setJobKey] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobCategories, setJobCategories] = useState("");
  const [jobDatePosted, setJobDatePosted] = useState("");
  const jobDatePostedRef = useRef("");
  const [jobExperience, setJobExperience] = useState("");
  const jobExperienceRef = useRef("");
  const [jobNumberOfItem, setJobNumberOfItem] = useState("10");
  const [jobDetails, setJobDetails] = useState("");
  const pageNumberRef = useRef(1);
  const [paginationNumber, setPaginationNumber] = useState<PaginationType>({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 2320,
    totalPages: 232,
  });

  const listRef = useRef<HTMLDivElement>(null);

  const [error, setError] = useState("");

  useEffect(() => {
    getAllJobsAction(true);
  }, []);

  const getItemRange = (
    currentPage = 1,
    itemsPerPage = 10,
    totalItems = 10
  ) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    return `${startItem}-${endItem}`;
  };

  const getAllJobsAction = async (
    apiCallFirst = false,
    itemPagePagesNumber = ""
  ) => {
    // let data = JSON.stringify({
    //   "job_keyword": jobKey,
    //   "location": jobLocation,
    //   "date_posted": jobDatePosted,
    //   "itemsPerPage": jobDatePosted,
    //   "page": Number(jobDetails?.pagination?.currentPage) + 1 || 1,
    // });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var pageNumber;
    if (apiCallFirst) {
      pageNumber = 1;
      pageNumberRef.current = 1;
    } else {
      pageNumber = pageNumberRef.current;
    }

    const raw = JSON.stringify({
      job_keyword: jobKey,
      location: jobLocation,
      date_posted: jobDatePostedRef.current,
      itemsPerPage: itemPagePagesNumber || jobNumberOfItem,
      page: pageNumber,
      experience: jobExperienceRef.current,
    });

    setIsLoading(true);
    setJobDetails("");
    scrollToTop();

    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getAllJobs`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false);
        setJobDetails(result?.data?.data || []);
        setPaginationNumber(
          result?.data?.pagination ?? {
            currentPage: 1,
            itemsPerPage: Number(jobNumberOfItem),
            totalItems: 0,
            totalPages: 1,
          }
        );

        pageNumberRef.current =
          Number(result?.data?.pagination?.currentPage || 1) + 1;

        if (result?.data?.data?.length == 0) {
          setError("No Data Found!");
        } else {
          setError("");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error?.message || "Server response failed!");

        console.error(error);
      });
  };


  const handleResponse = async (pageNumber: number, countNumber: number) => {
    const baseURL = "https://allianceaeapi.alliancerecruitmentagency.ae/";
    const url = `${baseURL}getAllJobs/${pageNumber}/${countNumber}`;

    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setBlogList(data);
      setIsLoading(false);
      setMeta(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleDateFilterChange = (event: any) => {
    setJobDatePosted(event.target.value);
    jobDatePostedRef.current = event.target.value;
    getAllJobsAction(true);
  };

  const handleExperienceFilterChange = (event: any) => {
    setJobExperience(event.target.value);
    jobExperienceRef.current = event.target.value;
    getAllJobsAction(true);
  };

  const getFilterData = async () => {
    try {
      const response = await axios.get(
        `https://allianceaeapi.alliancerecruitmentagency.ae/filterJobs?dateRange=${selectedDateFilter}&experience=${selectedExperienceFilter}&limit=${selectedValue}`
      );
      if (response.status === 200) {
        setData(response.data);
        setJobData(response.data.data);
      }
      // console.log("filterdata", response.data.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getFilterdatabyLocation = async () => {
    try {
      const response =
        await axios.get(`https://allianceaeapi.alliancerecruitmentagency.ae/getLocationJob/?
location=${selectedCountry}`);
      if (response.status === 200) {
        // console.log("mydtat",response.data.data)
        setData(response.data);
        setJobData(response.data.data);
      }
      // console.log("filterdata", response.data.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const scrollToTop = () => {
    try {
      listRef?.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) { }
  };

  return (
    <>
      <Head>
        <title>
          Discover Top Job Opportunities | Job Seekers | Alliance International
        </title>
        <meta
          name="description"
          content="Explore a wide range of job opportunities at Alliance International. Find your dream job today with our comprehensive job listings and career resources. Apply now!"
        />
        <meta name="publisher" content="Alliance Recruitment Agency Canada" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://www.alliancerecruitmentagency.ca/job-seekers"
        />
        <meta
          property="og:title"
          content="Discover Top Job Opportunities | Job Seekers | Alliance International"
        />
        <meta
          property="og:description"
          content="Explore a wide range of job opportunities at Alliance International. Find your dream job today with our comprehensive job listings and career resources. Apply now!"
        />
        <meta
          property="og:url"
          content="https://www.alliancerecruitmentagency.ca/job-seekers"
        />
        <meta property="og:locale" content="en_CA" />
        <meta property="og:type" content="article" />
        <meta
          property="og:site_name"
          content="Alliance International - International Recruitment Consultants in London, Dubai, USA, Canada, India"
        />
        <meta
          property="og:image"
          content="https://www.alliancerecruitmentagency.ca/assets/images/common-img/facebook-banner-og-image.webp"
        />
        {/* Commented out to prevent duplicate OG image dimensions - wrong dimensions (2560x1280) */}
        {/* <meta property="og:image:width" content="2560" /> */}
        {/* <meta property="og:image:height" content="1280" /> */}
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Discover Top Job Opportunities | Job Seekers | Alliance International"
        />
        <meta
          name="twitter:description"
          content="Explore a wide range of job opportunities at Alliance International. Find your dream job today with our comprehensive job listings and career resources. Apply now!"
        />
      </Head>
      <link rel="shortcut icon" href="images/favicon.ico" />
      <div id="preloader">
        <div id="status">
          <div className="spinner">
            <div className="double-bounce1" />
            <div className="double-bounce2" />
          </div>
        </div>
      </div>

      <section className="bg-half page-next-level">
        <div className="bg-overlay" />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="text-center text-white">
                <h4 className="text-uppercase title mb-4">Job List view</h4>
                <ul className="page-next d-inline-block mb-0 banner-text">
                  <li>
                    <a
                      href="/"
                      className="text-uppercase font-weight-bold"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <i className="fa-solid fa-angle-right" />
                  </li>
                  <li>
                    <a href="#" className="text-uppercase font-weight-bold">
                      Jobs
                    </a>
                  </li>
                  <li>
                    <i className="fa-solid fa-angle-right" />
                  </li>
                  <li>
                    <span className="text-uppercase text-white font-weight-bold">
                      Job Listing
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end home */}
      <div className="container">
        <div className="home-form-position">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="home-registration-form job-list-reg-form bg-light shadow p-4 mb-3">
                <form className="registration-form">
                  <div className="row">
                    <div className="col-lg-3 col-md-6">
                      <div className="registration-form-box">
                        <i className="fa fa-briefcase" />
                        <input
                          type="text"
                          id="exampleInputName1"
                          className="form-control rounded registration-input-box"
                          placeholder="Job keybords..."
                          value={jobKey}
                          onChange={(e) => {
                            setJobKey(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                      <div className="registration-form-box">
                        <i className="fa fa-location-arrow" />
                        <input
                          type="text"
                          id="exampleInputName1"
                          className="form-control rounded registration-input-box"
                          placeholder="Location"
                          value={jobLocation}
                          onChange={(e) => {
                            setJobLocation(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                      <div className="registration-form-box">
                        <i className="fa fa-list-alt" />
                        <input
                          type="text"
                          id="exampleInputName1"
                          className="form-control rounded registration-input-box"
                          placeholder="Categories..."
                          value={jobCategories}
                          onChange={(e) => {
                            setJobCategories(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    {/* <div className="col-lg-3 col-md-6">
                      <div className="registration-form-box">
                        <i className="fa fa-location-arrow" />

                        <select
                          id="select-country"
                          className="demo-default"
                          value={selectedCountry}
                          onChange={(event) => {
                            setSelectedCountry(event.target.value);
                          }}
                        >
                          <option value="">Location</option>
                          {jobData?.map((list: any) => {
                            // const location = list?.location_of_posting;
                            console.log(
                              "listof job",
                              list?.location_of_posting
                            );
                            return location ? (
                              <option
                                key={list.id}
                                value={list?.location_of_posting}
                              >
                                {list?.location_of_posting}
                              </option>
                            ) : null;
                          })}
                        </select>
                      </div>
                    </div> */}

                    {/* state */}

                    {/* <div className="col-lg-3 col-md-6">
                      <div className="registration-form-box">
                        <i className="fa fa-list-alt" />
                        <select id="select-category" className="demo-default">
                          <option value="">State</option>
                          <option value={4}>Accounting</option>
                          <option value={1}>IT &amp; Software</option>
                          <option value={3}>Marketing</option>
                          <option value={5}>Banking</option>
                        </select>
                      </div>
                    </div> */}

                    {/* city */}

                    {/* <div className="col-lg-3 col-md-6">
                      <div className="registration-form-box">
                        <i className="fa fa-list-alt" />
                        <select id="select-category" className="demo-default">
                          <option value="">city</option>
                          <option value={4}>Accounting</option>
                          <option value={1}>IT &amp; Software</option>
                          <option value={3}>Marketing</option>
                          <option value={5}>Banking</option>
                        </select>
                      </div>
                    </div> */}

                    {/* <div className="col-lg-3 col-md-6">
                      <div className="registration-form-box">
                        <i className="fa fa-list-alt" />
                        <select id="select-category" className="demo-default">
                          <option value="">Categories...</option>
                          <option value={4}>Accounting</option>
                          <option value={1}>IT &amp; Software</option>
                          <option value={3}>Marketing</option>
                          <option value={5}>Banking</option>
                        </select>
                      </div>
                    </div> */}

                    <div className="col-lg-3 col-md-6">
                      <div className="registration-form-box">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            // getFilterdatabyLocation();
                            getAllJobsAction(true);
                          }}
                          // type="submit"
                          // id="submit"
                          // name="send"
                          className="submitBnt btn btn-primary btn-block"
                          defaultValue="Submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JOB LIST START */}
      <section ref={listRef} className="section py-50">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="section-title text-center mb-4 pb-2">
                <h1 className="title title-line pb-5">Available job for you</h1>
                <p className="text-muted para-desc mx-auto mb-1">
                  Post a job to tell us about your project. We'll quickly match
                  you with the right freelancers.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <div className="left-sidebar">
                <div className="accordion" id="accordionExample">
                  <div className="card rounded mt-4">
                    <a
                      data-toggle="collapse"
                      href="#collapseOne"
                      className="job-list"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      <div className="card-header" id="headingOne">
                        <h6 className="mb-0 text-dark f-18">Date Posted</h6>
                      </div>
                    </a>
                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                    >
                      <div className="card-body p-0">
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customDateRadio5"
                            name="customDateRadio"
                            className="custom-control-input"
                            value=""
                            checked={
                              jobDatePosted === "all" || jobDatePosted === ""
                            }
                            onChange={handleDateFilterChange}
                          />
                          <label
                            className="custom-control-label ms-1 text-muted"
                            htmlFor="customDateRadio5"
                          >
                            All
                          </label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customDateRadio1"
                            name="customDateRadio"
                            className="custom-control-input"
                            value="last_hour"
                            checked={jobDatePosted === "last_hour"}
                            onChange={handleDateFilterChange}
                          />
                          <label
                            className="custom-control-label ms-1 text-muted"
                            htmlFor="customDateRadio1"
                          >
                            Last Hour
                          </label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customDateRadio2"
                            name="customDateRadio"
                            className="custom-control-input"
                            value="last_24_hours"
                            checked={jobDatePosted === "last_24_hours"}
                            onChange={handleDateFilterChange}
                          />
                          <label
                            className="custom-control-label ms-1 text-muted"
                            htmlFor="customDateRadio2"
                          >
                            Last 24 hours
                          </label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customDateRadio3"
                            name="customDateRadio"
                            className="custom-control-input"
                            value="last_7_days"
                            checked={jobDatePosted === "last_7_days"}
                            onChange={handleDateFilterChange}
                          />
                          <label
                            className="custom-control-label ms-1 text-muted"
                            htmlFor="customDateRadio3"
                          >
                            Last 7 days
                          </label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customDateRadio4"
                            name="customDateRadio"
                            className="custom-control-input"
                            value="last_14_days"
                            checked={jobDatePosted === "last_14_days"}
                            onChange={handleDateFilterChange}
                          />
                          <label
                            className="custom-control-label ms-1 text-muted"
                            htmlFor="customDateRadio4"
                          >
                            Last 14 days
                          </label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customDateRadio5"
                            name="customDateRadio"
                            className="custom-control-input"
                            value="last_30_days"
                            checked={jobDatePosted === "last_30_days"}
                            onChange={handleDateFilterChange}
                          />
                          <label
                            className="custom-control-label ms-1 text-muted"
                            htmlFor="customDateRadio5"
                          >
                            Last 30 days
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card rounded mt-4">
                    <a
                      data-toggle="collapse"
                      href="#collapseExperienceFilter"
                      className="job-list"
                      aria-expanded="true"
                      aria-controls="collapseExperienceFilter"
                    >
                      <div className="card-header" id="headingExperienceFilter">
                        <h6 className="mb-0 text-dark f-18">Experience</h6>
                      </div>
                    </a>
                    <div
                      id="collapseExperienceFilter"
                      className="collapse show"
                      aria-labelledby="headingExperienceFilter"
                    >
                      <div className="card-body p-0">
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customExperienceRadio5"
                            name="customExperienceRadio"
                            className="custom-control-input"
                            value=""
                            checked={jobExperience === ""}
                            onChange={handleExperienceFilterChange}
                          />
                          <label
                            className="custom-control-label ms-1 text-muted f-15"
                            htmlFor="customExperienceRadio5"
                          >
                            All
                          </label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customExperienceRadio1"
                            name="customExperienceRadio"
                            className="custom-control-input"
                            value="1_2_year"
                            checked={jobExperience === "1_2_year"}
                            onChange={handleExperienceFilterChange}
                          />
                          <label
                            className="custom-control-label ms-1 text-muted f-15"
                            htmlFor="customExperienceRadio1"
                          >
                            1 Year to 2 Years
                          </label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customExperienceRadio2"
                            name="customExperienceRadio"
                            className="custom-control-input"
                            value="2_3_year"
                            checked={jobExperience === "2_3_year"}
                            onChange={handleExperienceFilterChange}
                          />
                          <label
                            className="custom-control-label ms-1 text-muted f-15"
                            htmlFor="customExperienceRadio2"
                          >
                            2 Years to 3 Years
                          </label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customExperienceRadio3"
                            name="customExperienceRadio"
                            className="custom-control-input"
                            value="3_4_year"
                            checked={jobExperience === "3_4_year"}
                            onChange={handleExperienceFilterChange}
                          />
                          <label
                            className="custom-control-label ms-1 text-muted f-15"
                            htmlFor="customExperienceRadio3"
                          >
                            3 Years to 4 Years
                          </label>
                        </div>
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="customExperienceRadio4"
                            name="customExperienceRadio"
                            className="custom-control-input"
                            value="4_+_year"
                            checked={jobExperience === "4_+_year"}
                            onChange={handleExperienceFilterChange}
                          />
                          <label
                            className="custom-control-label ms-1 text-muted f-15"
                            htmlFor="customExperienceRadio4"
                          >
                            4 Years + Years
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 mt-4 pt-2">
              <div className="row align-items-center">
                <div className="col-lg-12">
                  <div className="show-results">
                    <div className="float-start">
                      <h5 className="text-dark mb-0 pt-2 f-18">
                        Showing results{" "}
                        {getItemRange(
                          paginationNumber?.currentPage,
                          paginationNumber?.itemsPerPage,
                          paginationNumber?.totalItems
                        )}
                      </h5>
                    </div>
                    <div className="sort-button float-end">
                      <h5>
                        <b> Jobs Per Page </b>
                      </h5>
                      <select
                        className="nice-select rounded"
                        value={jobNumberOfItem}
                        onChange={(event) => {
                          setJobNumberOfItem(event.target.value);
                          if (event.target.value != jobNumberOfItem) {
                            let numberValue = event.target.value;
                            getAllJobsAction(true, numberValue);
                          }
                        }}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {isLoading ? (
                  <div className="text-center job-seekers-container">
                    Loading...
                  </div>
                ) : error ? (
                  <div className="text-center job-seekers-container">
                    {error}
                  </div>
                ) : Array.isArray(jobDetails) && jobDetails.length === 0 ? (
                  <div className="text-center job-seekers-container">
                    No Data Found!
                  </div>
                ) : null}

                <div>
                  {Array.isArray(jobDetails) &&
                    jobDetails?.map((list: any, index: any) => (
                      <div key={index} className="col-lg-12 mt-4 pt-2">
                        <div className="job-list-box border rounded">
                          <div className="p-3">
                            <div className="row align-items-center">
                              <div className="col-lg-2">
                                <div className="company-logo-img">
                                  <Image
                                    src="/assets/images/header/alliance-new-logo.png"
                                    width={156}
                                    height={71}
                                    alt="test"
                                    className="mx-auto d-block  img-fluid"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-7 col-md-9">
                                <div className="job-list-desc">
                                  <h6 className="mb-2">
                                    <Link
                                      target="_blank"
                                      href={`/job/${list?.job_id
                                        }/${list?.location_of_posting
                                          ?.toLowerCase()
                                          .replace(/[\s/]+/g, "-")}/${list?.slug}`}
                                      className="text-dark"
                                    >
                                      {list?.job_title || ""}
                                    </Link>
                                  </h6>
                                  <p>{list?.industry?.name}</p>
                                  {/* <p className="text-muted mb-0">
                                  <i className="fa-solid fa-building-columns me-2" />
                                  {list.company_id}
                                </p> */}
                                  <ul className="list-inline mb-0">
                                    <li className="list-inline-item me-3">
                                      <p className="text-muted mb-0">
                                        <i className="fa-solid fa-location-dot me-2" />
                                        {list?.location_of_posting}
                                      </p>
                                    </li>
                                    <li className="list-inline-item">
                                      <p className="text-muted mb-0">
                                        <i className="fa-regular fa-clock me-2" />
                                        {list?.publish_date && format(new Date(list.publish_date), "dd-MM-yyyy")}
                                      </p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-3">
                                <div className="job-list-button-sm text-right">
                                  <div className="mt-3">
                                    <Link
                                      href={`/job/${list?.job_id
                                        }/${list?.location_of_posting
                                          ?.toLowerCase()
                                          .replace(/[\s/]+/g, "-")}/${list?.slug}`}
                                      className="btn btn-md btn-primary"
                                    >
                                      Job Details
                                    </Link>
                                  </div>
                                  <div className="mt-3 ">
                                    <Link
                                      href={`https://ats.allianceinternational.co.in/job-Seeker-Apply/${list?.job_id}/${list?.location_of_posting
                                        ?.toLowerCase()
                                        .replace(/[^a-z0-9]+/g, "-")
                                        .replace(/(^-|-$)/g, "")}/${list?.slug}`}
                                      className="btn btn-md btn-primary"
                                    >
                                      Apply
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {Array.isArray(jobDetails) && jobDetails.length > 0 && (
                  <div className="col-lg-12 mt-4 pt-2">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination job-pagination mb-0 justify-content-center">
                        {/* Previous Button */}
                        <li
                          className={`page-item ${paginationNumber?.currentPage == 1 ? "disabled" : ""
                            }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => {
                              pageNumberRef.current =
                                Number(paginationNumber?.currentPage) - 1;
                              getAllJobsAction();
                            }}
                            aria-disabled={paginationNumber?.currentPage == 1}
                          >
                            <i className="fa-solid fa-chevron-left" />
                          </button>
                        </li>

                        {/* Page Numbers */}

                        {paginationNumber?.currentPage &&
                          paginationNumber?.currentPage > 1 ? (
                          <li className={`page-item`}>
                            <button
                              className="page-link fix-color-pagination-button"
                              onClick={() => {
                                pageNumberRef.current = Number(
                                  paginationNumber?.currentPage - 1
                                );
                                getAllJobsAction();
                              }}
                            >
                              {paginationNumber?.currentPage - 1 || "0"}
                            </button>
                          </li>
                        ) : null}

                        <li
                          className={`page-item ${paginationNumber?.currentPage > 1 ? "" : ""
                            } `}
                        >
                          <button
                            className="page-link active fix-color-pagination-button-action"
                          // onClick={() => setPage(pageNumber)}
                          >
                            {paginationNumber?.currentPage || "1"}
                          </button>
                        </li>

                        {paginationNumber?.currentPage &&
                          paginationNumber?.totalPages > 1 &&
                          paginationNumber?.totalPages >
                          paginationNumber?.currentPage ? (
                          <li className={`page-item`}>
                            <button
                              className="page-link fix-color-pagination-button"
                              onClick={() => {
                                pageNumberRef.current = Number(
                                  paginationNumber?.currentPage + 1
                                );
                                getAllJobsAction();
                              }}
                            >
                              {paginationNumber?.currentPage + 1 || ""}
                            </button>
                          </li>
                        ) : null}

                        {/* Next Button */}
                        <li
                          className={`page-item ${paginationNumber?.currentPage >=
                            paginationNumber?.totalPages
                            ? "disabled"
                            : ""
                            }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => {
                              // page < meta?.totalPages && setPage(page + 1)
                              getAllJobsAction();
                            }}
                            aria-disabled={
                              paginationNumber?.currentPage >=
                              paginationNumber?.totalPages
                            }
                          >
                            <i className="fa-solid fa-chevron-right" />
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-light py-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-5">
              <div className="float-start position-relative notification-icon me-2">
                <i className="mdi mdi-bell-outline text-primary" />
                <span className="badge badge-pill badge-danger">1</span>
              </div>
              <h5 className="mt-2 mb-0 fw-500">Your Job Notification</h5>
            </div>
            <div className="col-lg-8 col-md-7 mt-4 mt-sm-0">
              <form>
                <div className="form-group mb-0">
                  <div className="input-group mb-0">
                    <input
                      name="email"
                      id="email"
                      type="email"
                      className="form-control"
                      placeholder="Your email :"
                      // required=""
                      aria-describedby="newssubscribebtn"
                    />
                    <div className="input-group-append ms-2">
                      <button
                        className="btn btn-primary submitBnt"
                        type="submit"
                        id="newssubscribebtn"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <hr />
    </>
  );
};
export default index;
