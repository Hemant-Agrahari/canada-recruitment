import React from "react";
import Link from "next/link";
import Image from "next/image";
function OurExpertise() {
  return (
    <>
      <section className="our-expert py-50" id="top-up">
        <div className="container">
          <h2 className="com-title">Our Expertise</h2>
          <div className="row">
            <div className="col-lg-11 mx-auto">
              <div className="inner-card">
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div
                      className="nav flex-column nav-pills"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      <button
                        className="nav-link active"
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-home"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                        aria-label="C-Suite-Executive-Search"
                      >
                        {/* <h3>
                          <Link
                            // 
                            aria-label="C-Suite-Executive-Search"
                            href="#top-up"
                          > */}
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/c-suite-executive-search-gray.svg"
                          alt="c suite executive search"
                          className="gray-img"
                          loading="eager"
                        />
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/c-suite-executive-search-white.svg"
                          alt="c suite executive search"
                          className="white-img"
                          loading="eager"
                        />
                        <span className="tab-title">C-Suite Executive Search</span>
                        {/* </Link>
                        </h3> */}
                      </button>
                      <button
                        className="nav-link"
                        id="v-pills-profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-profile"
                        aria-selected="false"
                        aria-label="Senior-Leadership-Recruitment"
                      >
                        {/* <h3>
                          <Link
                            aria-label="Senior-Leadership-Recruitment"
                            // 
                            href="#top-up"
                          > */}
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/senior-leadership-recruitment-gray.svg"
                          alt="senior leadership recruitment"
                          className="gray-img"
                          loading="eager"
                        />
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/senior-leadership-recruitment-white.svg"
                          alt="senior leadership recruitment"
                          className="white-img"
                          loading="eager"
                        />
                        <span className="tab-title">Top Leadership Recruitment</span>
                        {/* </Link>
                        </h3> */}
                      </button>
                      <button
                        className="nav-link"
                        id="v-pills-messages-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-messages"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-messages"
                        aria-selected="false"
                        aria-label="Director-Level-Recruitment"
                      >
                        {/* <h3>
                          <Link
                            // 
                            aria-label="Director-Level-Recruitment"
                            href="#top-up"
                          > */}
                        {" "}
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/director-level-recruitment-gray.svg"
                          alt="director level recruitment"
                          className="gray-img"
                          loading="eager"
                        />
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/director-level-recruitment-white.svg"
                          loading="eager"
                          alt="director level recruitment"
                          className="white-img"
                        />
                        <span className="tab-title">Headhunting (Senior Roles)</span>

                        {/* </Link>
                        </h3> */}
                      </button>
                      <button
                        className="nav-link"
                        id="v-pills-settings-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-settings"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-settings"
                        aria-selected="false"
                        aria-label="Industry-Specific-Talent-Sourcing"

                      >
                        {/* <h3>
                          {" "}
                          <Link
                            // 
                            aria-label="Industry-Specific-Talent-Sourcing"
                            href="#top-up"
                          >
                            {" "} */}
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/industry-specific-talent-sourcing-gray.svg"
                          loading="eager"
                          alt="industry specific talent sourcing"
                          className="gray-img"
                        />
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/industry-specific-talent-sourcing-white.svg"
                          alt="industry specific talent sourcing"
                          className="white-img"
                          loading="lazy"
                        />
                        <span className="tab-title">Industry-Specific Candidate Sourcing</span>


                        {/* </Link>
                        </h3> */}
                      </button>
                      <button
                        className="nav-link"
                        id="v-pills-settings-tab-1"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-settings-1"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-settings-1"
                        aria-selected="false"
                        aria-label="Temp Staffing"
                      >
                        {/* <h3>
                          {" "} */}
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/practice-area-based-staffing-gray.svg"
                          alt="practice area based staffing"
                          className="gray-img"
                          loading="lazy"
                        />
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/practice-area-based-staffing-white.svg"
                          alt="practice area based staffing"
                          className="white-img"
                          loading="lazy"
                        />
                        <span className="tab-title">Temp Staffing</span>
                        {/* </h3> */}
                      </button>
                      <button
                        className="nav-link"
                        id="v-pills-settings-tab-2"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-settings-2"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-settings-2"
                        aria-selected="false"
                        aria-label="recruitment-process-outsourcing"
                      >
                        {/* <h3>
                          <Link
                            // 
                            aria-label="recruitment-process-outsourcing"
                            href="#top-up"
                          >
                            {" "} */}
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/recruitment-process-outsourcing-gray.svg"
                          loading="lazy"
                          alt="recruitment process outsourcing"
                          className="gray-img"
                        />
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/recruitment-process-outsourcing-white.svg"
                          alt="recruitment process outsourcing"
                          className="white-img"
                          loading="lazy"
                        />
                        <span className="tab-title">Recruitment Process Outsourcing</span>

                        {/* </Link>
                        </h3> */}
                      </button>
                      <button
                        className="nav-link"
                        id="v-pills-settings-tab-3"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-settings-3"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-settings-3"
                        aria-selected="false"
                        aria-label="it-outsourcing-gray"
                      >
                        {/* <h3>
                          <Link
                            aria-label="it-outsourcing-gray"
                            // 
                            href="#top-up"
                          >
                            {" "} */}
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/it-outsourcing-gray.svg"
                          alt="it outsourcing"
                          className="gray-img"
                          loading="lazy"
                        />
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/it-outsourcing-white.svg"
                          alt="it outsourcing"
                          className="white-img"
                          loading="lazy"
                        />
                        <span className="tab-title">IT Outsourcing</span>
                        {/* </Link>
                        </h3> */}
                      </button>
                      <button
                        className="nav-link"
                        id="v-pills-settings-tab-4"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-settings-4"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-settings-4"
                        aria-selected="false"
                        aria-label="staff-augmentation-gray"
                      >
                        {/* <h3>
                          <Link
                            // 
                            aria-label="staff-augmentation-gray"
                            href="#top-up"
                          > */}
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/staff-augmentation-gray.svg"
                          alt="staff augmentation"
                          className="gray-img"
                          loading="lazy"
                        />
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/staff-augmentation-white.svg"
                          alt="staff augmentation"
                          className="white-img"
                          loading="lazy"
                        />
                        <span className="tab-title">Staff Augmentation</span>
                        {/* </Link>
                        </h3> */}
                      </button>
                      <button
                        className="nav-link"
                        id="v-pills-settings-tab-5"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-settings-5"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-settings-5"
                        aria-selected="false"
                        aria-label="hr-consultancy-gray"
                      >
                        {/* <h3>
                          <Link
                            aria-label="hr-consultancy-gray"
                            // 
                            href="#top-up"
                          > */}
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/hr-consultancy-gray.svg"
                          alt="hr consultancy"
                          className="gray-img"
                          loading="lazy"
                        />
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/hr-consultancy-white.svg"
                          alt="hr consultancy"
                          className="white-img"
                          loading="lazy"
                        />
                        <span className="tab-title"> HR Consultancy</span>

                        {/* </Link>
                        </h3> */}
                      </button>
                      <button
                        className="nav-link"
                        id="v-pills-settings-tab-6"
                        data-bs-toggle="pill"
                        data-bs-target="#v-pills-settings-6"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-settings-6"
                        aria-selected="false"
                        aria-label="cv-sourcing-gray"
                      >
                        {/* <h3>
                          <Link
                            aria-label="cv-sourcing-gray"
                            // 
                            href="#top-up"
                          > */}
                        {" "}
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/cv-sourcing-gray.svg"
                          alt="global local cv sourcing recruitment local"
                          className="gray-img"
                          loading="lazy"
                        />
                        <Image
                          width={100}
                          height={100}
                          src="/assets/images/homepage/cv-sourcing-white.svg"
                          alt="global local cv sourcing recruitment local"
                          className="white-img"
                          loading="lazy"
                        />
                        <span className="tab-title">Resume Sourcing</span>
                        {/* </Link>
                        </h3> */}
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="tab-content-wrapper">
                      <div className="tab-content" id="v-pills-tabContent">
                        <div
                          className="tab-pane fade show active tab-mo-1"
                          id="v-pills-home"
                          role="tabpanel"
                          aria-labelledby="v-pills-home-tab"
                        >
                          <h3 className="content-head">
                            Find the best C-suite leaders in Canada and global locations!

                          </h3>
                          <p className="com-pera">
                            We are proud to claim that our global executive search team connects you to your ideal C-suite. With their vast network of top-tier talent across Canada and 25+ global hubs, we have a great track record of successfully placing CEOs, COOs, CTOs, CISOs, and more. Are you ready to hire your next game-changing leader with us?
                          </p>

                          <Link
                            // 
                            href="/contact-us"
                            className="blue-btn"
                            style={{ marginTop: "0px" }}
                          >
                            Learn More
                          </Link>
                        </div>
                        <div
                          className="tab-pane fade tab-mo-2"
                          id="v-pills-profile"
                          role="tabpanel"
                          aria-labelledby="v-pills-profile-tab"
                        >
                          <h3 className="content-head">
                            Get the highest recruiting support to fill management positions!

                          </h3>
                          <p className="com-pera">
                            Helping over 1000 companies is solid evidence of our expertise in hiring top-tier leadership. Find exceptional Presidents, Vice Presidents, Managing Directors, Operational Directors, and Global Heads. Count on us to find the leaders who will help your Canadian business succeed.


                          </p>

                          <Link
                            // 
                            href="/contact-us"
                            className="blue-btn"
                            style={{ marginTop: "0px" }}
                          >
                            Learn More
                          </Link>
                        </div>
                        <div
                          className="tab-pane fade tab-mo-3"
                          id="v-pills-messages"
                          role="tabpanel"
                          aria-labelledby="v-pills-messages-tab"
                        >
                          <h3 className="content-head">
                            Attract and retain senior talent for any practice area/team!


                          </h3>
                          <p className="com-pera">
                            Looking for experts who can lead with impact? We help you attract and hire senior professionals across all specialisations — from product design and financial management to BI, data analytics, cloud engineering, and sales growth. Let us help you secure the right talent to meet your strategic goals


                          </p>

                          <Link
                            // 
                            href="/contact-us"
                            className="blue-btn"
                            style={{ marginTop: "0px" }}
                          >
                            Learn More
                          </Link>
                        </div>
                        <div
                          className="tab-pane fade tab-mo-4"
                          id="v-pills-settings"
                          role="tabpanel"
                          aria-labelledby="v-pills-settings-tab"
                        >
                          <h3 className="content-head">
                            Get the right manpower to outperform your competition!
                          </h3>
                          <p className="com-pera">
                            We help you build a winning team! Our industry-specific recruiters understand your industry and its unique talent needs. So, we bring to you the right fit for your team. Our specialized recruiters focus on over 50 sectors, from Aviation and Healthcare to IT and E-commerce, to fulfill your unique manpower needs. Let's build a skilled, results-focused team that drives growth and keeps you market-ready.


                          </p>

                          <Link
                            // 
                            href="/contact-us"
                            className="blue-btn"
                            style={{ marginTop: "0px" }}
                          >
                            Learn More
                          </Link>
                        </div>
                        <div
                          className="tab-pane fade tab-mo-5"
                          id="v-pills-settings-1"
                          role="tabpanel"
                          aria-labelledby="v-pills-settings-tab-1"
                        >
                          <h3 className="content-head">
                            Find, hire, and onboard temp manpower with ease!

                          </h3>
                          <p className="com-pera">
                            Need skilled talent on a temporary basis? Our comprehensive temp staffing services cover project-based, offshore, remote, and on-site hiring across 100+ domains in Canada. Whether you’re in IT, logistics, hospitality, energy, or any other sector, we quickly connect you with certified and experienced professionals.
                            Scale the workforce or not- Get Top-hires, every time!


                          </p>

                          <Link
                            href="/contact-us"
                            className="blue-btn"
                            style={{ marginTop: "0px" }}
                          >
                            Learn More
                          </Link>
                        </div>
                        <div
                          className="tab-pane fade tab-mo-6"
                          id="v-pills-settings-2"
                          role="tabpanel"
                          aria-labelledby="v-pills-settings-tab-2"
                        >
                          <h3 className="content-head">
                            Leverage RPO to build a powerful workforce!


                          </h3>
                          <p className="com-pera">
                            Facing talent gaps or shortages? Designed for Canadian employment agencies, our services help reduce hiring costs by up to 70% and significantly cut hiring timelines. We provide you with specialized, impact-ready talent your industry consistently demands. Our optimized process helps you focus on growing your business with the right talent in place.


                          </p>

                          <Link
                            // 
                            href="/contact-us"
                            className="blue-btn"
                            style={{ marginTop: "0px" }}
                          >
                            Learn More
                          </Link>
                        </div>
                        <div
                          className="tab-pane fade tab-mo-7"
                          id="v-pills-settings-3"
                          role="tabpanel"
                          aria-labelledby="v-pills-settings-tab-3"
                        >
                          <h3 className="content-head">
                            Find the talent to level up project standards and revenues!


                          </h3>
                          <p className="com-pera">
                            We are among the top global IT recruiters and a leading staffing agency in Canada. Whether you need the right talent onshore or offshore for any software, web, app, or platform development project, we are your most cost-effective choice. Reduce costs, get 24/7 support, scale quickly, and win clients with our expert IT staffing services.


                          </p>

                          <Link
                            // 
                            href="/contact-us"
                            className="blue-btn"
                            style={{ marginTop: "0px" }}
                          >
                            Learn More
                          </Link>
                        </div>
                        <div
                          className="tab-pane fade tab-mo-8"
                          id="v-pills-settings-4"
                          role="tabpanel"
                          aria-labelledby="v-pills-settings-tab-4"
                        >
                          <h3 className="content-head">
                            Get access to top IT experts exactly when you need them.


                          </h3>
                          <p className="com-pera">
                            Our staff augmentation service delivers highly skilled IT professionals across crucial domains like software development, AI/ML, data science, and web/mobile. The flexibility to expand or contract your team as needed helps you have the right talent in place, always. No long-term contracts.


                          </p>

                          <Link
                            // 
                            href="/contact-us"
                            className="blue-btn"
                            style={{ marginTop: "0px" }}
                          >
                            Learn More
                          </Link>
                        </div>
                        <div
                          className="tab-pane fade tab-mo-9"
                          id="v-pills-settings-5"
                          role="tabpanel"
                          aria-labelledby="v-pills-settings-tab-5"
                        >
                          <h3 className="content-head">
                            Get top-quality manpower consultancy services in Canada!


                          </h3>
                          <p className="com-pera">
                            Achieve big business goals with the right talent by your side. Whether your focus is on digital transformation, new product launches, or market expansion, we are fully equipped to support your needs. More than 12,000 businesses across Canada trust us to deliver effective HR strategies.


                          </p>

                          <Link
                            // 
                            href="/contact-us"
                            className="blue-btn"
                            style={{ marginTop: "0px" }}
                          >
                            Learn More
                          </Link>
                        </div>
                        <div
                          className="tab-pane fade tab-mo-10"
                          id="v-pills-settings-6"
                          role="tabpanel"
                          aria-labelledby="v-pills-settings-tab-6"
                        >
                          <h3 className="content-head">
                            Resume Sourcing

                          </h3>
                          <p className="com-pera">
                            Keep your team strong with our resume sourcing services, delivering qualified candidates within hours or days. Experience up to 80% faster hiring and reduce costs by 50–60%. Enjoy smarter, more efficient recruitment across Canada with our expert CV sourcing support.


                          </p>

                          <Link
                            // 
                            href="/contact-us"
                            className="blue-btn"
                            style={{ marginTop: "0px" }}
                          >
                            Learn More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default OurExpertise;
