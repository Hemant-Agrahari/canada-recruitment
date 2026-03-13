import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FooterData } from "./footerData";

interface FooterMainProps {
  selectedLanguage: FooterData[string];
}

const FooterMain: React.FC<FooterMainProps> = ({ selectedLanguage }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("Hire");

  const handleRadioClick = (tab: string) => {
    setActiveTab(tab);
    let redirectUrl = "/contact-us";
    if (tab === "Out") {
      redirectUrl = "/contact-us#start-project";
    }
    router.push(redirectUrl, undefined, { shallow: true });
  };

  return (
    <div className="container">
      <div className="footer-inner mt-4">
        <div className="row">
          <div className="col-lg-6 mb-2 c-center-map">
            <Image
              src="/assets/images/homepage/footer_map_img.webp"
              width={583}
              height={424}
              alt="Footer Map"
              className="img-fluid"
              priority={false}
            />
          </div>
          <div className="col-lg-6">
            <div className="footer-right-wrapper h-100">
              <div className="img-right h-100">
                <Image
                  src="/assets/images/homepage/footer-right.svg"
                  alt="Footer Map"
                  className="img-fluid h-100"
                  width={100}
                  height={100}
                  loading="lazy"
                />
              </div>
              <div className="footer-right-content">
                {selectedLanguage.formtitle && (
                  <h4>
                    <span className="footer-text com-pera text-decoration-none">
                      {selectedLanguage.formtitle}
                    </span>
                  </h4>
                )}
                <div className="footer-radio-group mt-4">
                  {selectedLanguage.employer && (
                    <Link prefetch={false} href="/contact-us">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="Employer"
                        id="Employer1"
                        checked={activeTab === "Employer1"}
                        onChange={() => handleRadioClick("Employer1")}
                      />
                      <label
                        className="form-check-label com-pera text-decoration-none"
                        htmlFor="Employer1"
                      >
                        {selectedLanguage?.employer}
                      </label>
                    </Link>
                  )}
                  {selectedLanguage.project && (
                    <div className="form-check">
                      <Link prefetch={false} href="/contact-us#start-project">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="Employer"
                          id="Out"
                          checked={activeTab === "Out"}
                          onChange={() => handleRadioClick("Out")}
                        />
                      </Link>
                      <label
                        className="form-check-label com-pera text-decoration-none"
                        htmlFor="Out"
                      >
                        {selectedLanguage?.project}
                      </label>
                    </div>
                  )}
                </div>
                <div className="my-4 job-seeker-wrapper">
                  {selectedLanguage.jobseeker && (
                    <h4 className="mb-0">
                      {" "}
                      <span className="footer-text">{selectedLanguage.jobseeker}</span>
                    </h4>
                  )}
                  {selectedLanguage.applyjob && (
                    <Link
                      prefetch={false}
                      href="https://www.alliancerecruitmentagency.com/job-seekers/"
                      className="blue-out-line-btn text-decoration-none"
                    >
                      {selectedLanguage?.applyjob}
                    </Link>
                  )}
                </div>
                <h4>
                  {" "}
                  <span className="footer-text">{selectedLanguage.employers}</span>
                </h4>
                <ul className="my-4 job-seeker-wrapper">
                  <li>
                    <span className="c-ftr-icon3 ftr-icons"></span>
                    <Link
                      prefetch={false}
                      href="tel:+17809004752"
                      className="com-pera text-decoration-none"
                    >
                      +1 (780)900 4752
                    </Link>
                  </li>

                  <li>
                    <span className="c-ftr-icon2 ftr-icons"></span>
                    <Link
                      prefetch={false}
                      href="tel:+19179009072"
                      className="com-pera text-decoration-none"
                    >
                      +1 (917)900 9072
                    </Link>
                  </li>
                  <li>
                    <span className="c-ftr-icon1 ftr-icons"></span>
                    <Link
                      prefetch={false}
                      href="tel:+44 20 3838 0743"
                      className="com-pera text-decoration-none"
                    >
                      +44 20 3838 0743
                    </Link>
                  </li>
                  <li>
                    <span className="c-ftr-icon4 ftr-icons"></span>
                    <Link
                      prefetch={false}
                      href="tel:+918980018741"
                      className="com-pera text-decoration-none"
                    >
                      +91 89800 18741
                    </Link>
                  </li>
                </ul>
                <div className="my-4">
                  <h4>
                    {" "}
                    <span className="footer-text">{selectedLanguage.forjob}</span>
                  </h4>
                  <ul className="job-seeker-wrapper my-3 justify-content-between">
                    <li>
                      <Link
                        prefetch={false}
                        href="mailto: sales@alliancerecruitmentagency.com"
                        className="com-pera email-text"
                      >
                        {" "}
                        <span className="mx-1" style={{ width: 25, height: 25 }}>
                          <Image
                            width={24}
                            height={24}
                            src="/assets/header_images/gmail 1(24).svg"
                            loading="lazy"
                            alt="Email"
                          />
                        </span>
                        &nbsp;sales@alliancerecruitmentagency.com
                      </Link>
                    </li>
                    <li>
                      <Link
                        prefetch={false}
                        href="https://m.me/Alliancerecruitmentagency/"
                        target="_blank"
                        aria-label="facebook icon"
                      >
                        <span className="mx-1" style={{ width: 30, height: 30 }}>
                          <Image
                            width={28}
                            height={28}
                            src="/assets/header_images/facebook 1(24) (1).svg"
                            loading="lazy"
                            alt="Facebook"
                          />
                        </span>
                      </Link>
                      <Link
                        prefetch={false}
                        href="https://www.linkedin.com/company/alliance-recruitment-agency/"
                        target="_blank"
                        aria-label="linkdin icon"
                      >
                        <span className="mx-1" style={{ width: 30, height: 30 }}>
                          <Image
                            width={28}
                            height={28}
                            src="/assets/header_images/linkedin 1 (24).svg"
                            loading="lazy"
                            alt="LinkedIn"
                          />
                        </span>
                      </Link>
                      <Link
                        prefetch={false}
                        href="https://x.com/career_alliance"
                        target="_blank"
                        aria-label="twitter icon"
                      >
                        <span className="mx-1" style={{ width: 30, height: 30 }}>
                          <Image
                            width={26}
                            height={26}
                            src="/assets/header_images/twitter 1.svg"
                            loading="lazy"
                            alt="Twitter"
                          />
                        </span>
                      </Link>
                      <Link
                        prefetch={false}
                        href="https://www.instagram.com/alliancerecruitment/"
                        target="_blank"
                        aria-label="instagram icon"
                      >
                        <span className="mx-1" style={{ width: 30, height: 30 }}>
                          <Image
                            width={28}
                            height={28}
                            src="/assets/header_images/instagram 1.svg"
                            loading="lazy"
                            alt="Instagram"
                          />
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMain;

