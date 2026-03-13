import Link from "next/link";
import { MobileContactList } from "./MobileContactList";
import { locationLinks } from "./locationData";
import { MobileCTAButtons } from "./MobileCTAButtons";

interface MobileMenuProps {
  handleNavLinkClick: () => void;
  handleButtonClick: () => void;
  selectedLanguage: any;
  isMobileMenuActive: boolean;
}

export const MobileMenu = ({
  handleNavLinkClick,
  handleButtonClick,
  selectedLanguage,
  isMobileMenuActive,
}: MobileMenuProps) => {
  return (
    <div className="mob-header container-fluid c-pad-x">
      <div
        className={`mobile-main-menu ${isMobileMenuActive ? "active" : ""
          } d-none-desktop`}
      >
        <div>
          <div className="container p-0">
            <MobileContactList />
          </div>
        </div>

        <div className="first-custome-acr c-p-x">
          <ul className="accordion" id="accordionExample">
            <li className="first-custome-acr-li">
              <Link
                onClick={handleNavLinkClick}
                href="/"
                className="first-custome-acr-li-a"
              >
                {selectedLanguage?.home}
              </Link>
            </li>

            <li className="first-custome-acr-li">
              <Link
                onClick={handleNavLinkClick}
                href="/about-us"
                className="first-custome-acr-li-a"
              >
                {selectedLanguage?.about}
              </Link>
            </li>

            <li className="accordion-item first-custome-acr-li">
              <p className="accordion-header" id="headinservice">
                <button
                  className="accordion-button first-custome-acr-li arrow-design collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseservice"
                  aria-expanded="true"
                  aria-controls="collapseservice"
                >
                  {selectedLanguage?.services}
                </button>
              </p>
              <div
                id="collapseservice"
                className="accordion-collapse collapse"
                aria-labelledby="headinservice"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <ul className="second-inner-ul-1 row">
                    {locationLinks.map((location) => (
                      <li key={location.key} className="col-6">
                        <Link onClick={handleNavLinkClick} href={location.href}>
                          {selectedLanguage?.[location.key]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>

            <li className="first-custome-acr-li">
              <Link
                onClick={handleNavLinkClick}
                href="/webblog/"
                className="first-custome-acr-li-a"
              >
                {selectedLanguage?.blog}
              </Link>
            </li>

            <li className="first-custome-acr-li">
              <Link
                onClick={handleNavLinkClick}
                href="/case-studies"
                className="first-custome-acr-li-a"
              >
                {selectedLanguage?.caseStudies}
              </Link>
            </li>

            <li className="first-custome-acr-li">
              <Link
                onClick={handleNavLinkClick}
                href="/contact-us/"
                className="first-custome-acr-li-a"
              >
                {selectedLanguage?.contact}
              </Link>
            </li>

            <MobileCTAButtons
              handleNavLinkClick={handleNavLinkClick}
              handleButtonClick={handleButtonClick}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

