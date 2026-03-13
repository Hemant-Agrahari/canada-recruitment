import Link from "next/link";
import Image from "next/image";
import { LocationMegaMenu } from "./LocationMegaMenu";
import { CTAButton } from "./CTAButton";

interface NavigationMenuProps {
  selectedLanguage: any;
  handleButtonClick: () => void;
}

export const NavigationMenu = ({
  selectedLanguage,
  handleButtonClick,
}: NavigationMenuProps) => {
  return (
    <nav className="bottom-menu d-none-mobile d-flex justify-content-end">
      <ul className="bottom-menu-nav me-3">
        <li className="bottom-nav-li">
          <Link href="/about-us" className="bottom-nav-link">
            {selectedLanguage?.about}
          </Link>
        </li>

        <li className="bottom-nav-li dropdown">
          <Link
            prefetch={false}
            href="#"
            className="bottom-nav-link dropdown-toggle"
            id="navbarDropdown1"
            role="button"
            aria-expanded="false"
            onClick={(e) => e.preventDefault()}
          >
            {selectedLanguage?.services}
            <Image
              src="/assets/images/header/vector-down.png"
              width="12"
              height="7"
              alt="vector-down"
              loading="eager"
            />
          </Link>

          <div
            className="dropdown-menu min-height-back hire-c"
            aria-labelledby="navbarDropdown1"
            data-bs-popper="static"
          >
            <LocationMegaMenu selectedLanguage={selectedLanguage} />
          </div>
        </li>

        <li className="bottom-nav-li">
          <Link prefetch={false} href="/webblog" className="bottom-nav-link">
            {selectedLanguage?.blog}
          </Link>
        </li>

        <li className="bottom-nav-li">
          <Link
            prefetch={false}
            href="/case-studies"
            className="bottom-nav-link"
          >
            {selectedLanguage?.caseStudies}
          </Link>
        </li>

        <li className="bottom-nav-li">
          <Link
            prefetch={false}
            href="/contact-us"
            style={{ whiteSpace: "nowrap" }}
            className="bottom-nav-link"
          >
            {selectedLanguage?.contact}
          </Link>
        </li>
      </ul>

      <ul>
        <li className="bottom-nav-li cta-btn-list">
          <div>
            <CTAButton type="post-vacancy" href="/contact-us" />
          </div>
          <div>
            <CTAButton type="hire-talent" onClick={handleButtonClick} />
          </div>
          <div>
            <CTAButton type="franchise-inquiry" href="/franchise-enquiry" />
          </div>
          <div>
            <CTAButton type="job-seekers" href="/job-seekers" />
          </div>
        </li>
      </ul>
    </nav>
  );
};

