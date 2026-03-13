import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { headerData } from "./headerData";
import { ContactPhoneList } from "./ContactPhoneList";
import { SocialMediaLinks } from "./SocialMediaLinks";
import { CountrySelector } from "./CountrySelector";
import { NavigationMenu } from "./NavigationMenu";

const MobileMenu = dynamic(
  () => import("./MobileMenu").then((mod) => ({ default: mod.MobileMenu })),
  {
    ssr: false,
  }
);

const HireTalentForm = dynamic(
  () =>
    import("../forms/hireTalentForm").then((mod) => ({
      default: mod.HireTalentForm,
    })),
  {
    ssr: false,
  }
);

const Header = () => {
  const [isMobileMenuActive, setMobileMenuActive] = useState(false);
  const [showModalhire, setShowModalhire] = useState(false);
  const [activeCountry, setActiveCountry] = useState("CA");

  const handleButtonClick = () => {
    setShowModalhire(true);
  };

  const toggleMobileMenu = () => {
    setMobileMenuActive(!isMobileMenuActive);
  };

  const handleMenuIconClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toggleMobileMenu();
  };

  const handleNavLinkClick = () => {
    setMobileMenuActive(false);
  };

  const isArabic = false; // In order to disable ar language.
  const selectedLanguage = isArabic ? headerData.ar : headerData.en;

  return (
    <>
      <header id="ae_header">
        <div className="container-fluid c-pad-x">
          {/* Header Top */}
          <div className="header-top">
            <div className="header-top-inner">
              <ContactPhoneList />
              <SocialMediaLinks />
            </div>
          </div>

          {/* Header Main */}
          <div className="header-wrapper">
            {/* Logo and Country Selector */}
            <div className="brand-img">
              <Link
                aria-label="alliance-new-logo"
                href="/"
                className="company-logo"
              >
                <Image
                  width={172}
                  height={45}
                  src="/assets/images/header/alliance-new-logo.png"
                  alt="alliancerecruitmentagency"
                  title="alliancerecruitmentagency"
                  className="img-fluid"
                  loading="eager"
                />
              </Link>
              <CountrySelector
                activeCountry={activeCountry}
                setActiveCountry={setActiveCountry}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="w-100">
              <div className="header-right-menu w-100">
                <NavigationMenu
                  selectedLanguage={selectedLanguage}
                  handleButtonClick={handleButtonClick}
                />
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <Link
              href="#"
              onClick={handleMenuIconClick}
              className="menu-icon ms-auto"
            >
              <i className="fas fa-bars"></i>
              <i className="fas fa-times"></i>
            </Link>
          </div>
        </div>

        {/* Mobile Menu - Outside main container */}
        <MobileMenu
          handleNavLinkClick={handleNavLinkClick}
          handleButtonClick={handleButtonClick}
          selectedLanguage={selectedLanguage}
          isMobileMenuActive={isMobileMenuActive}
        />
      </header>

      {/* Hire Talent Modal */}
      <HireTalentForm
        show={showModalhire}
        setShowModalhire={setShowModalhire}
        title="Hire Talent"
      />
    </>
  );
};

export default Header;

