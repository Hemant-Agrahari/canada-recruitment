import Link from "next/link";

interface MobileCTAButtonsProps {
  handleNavLinkClick: () => void;
  handleButtonClick: () => void;
}

export const MobileCTAButtons = ({
  handleNavLinkClick,
  handleButtonClick,
}: MobileCTAButtonsProps) => {
  return (
    <div className="nav-btn mobile">
      <Link
        onClick={handleNavLinkClick}
        href="/contact-us"
        className="com-btn-1 find-btn"
      >
        <div className="mob-btn-box">
          <div className="mob-btn-bg">
            <img
              src="/assets/images/header/post-vacancy-bg-mob.png"
              alt="post-vacancy-bg-mob"
              width="167"
              height="40"
            />
            <img
              src="/assets/images/header/post-vacancy-mob.png"
              alt="post-vacancy-mob"
              width="43"
              height="40"
              className="mob-btn-icon"
            />
            <span className="mob-btn-text">Post Your Vacancy</span>
          </div>
        </div>
      </Link>

      <Link
        onClick={handleButtonClick}
        href="javascript:void(0);"
        data-target="hiretalentmodal"
        className="com-btn-1 find-btn hire-talent-modal"
      >
        <div className="mob-btn-box">
          <div className="mob-btn-bg">
            <img
              src="/assets/images/header/hire-talent-bg-mob.png"
              alt="hire-talent-bg-mob"
              width="167"
              height="40"
            />
            <img
              src="/assets/images/header/hire-talent-mob.png"
              alt="hire-talent-mob"
              width="43"
              height="40"
              className="mob-btn-icon"
            />
            <span className="mob-btn-text">Hire A Talent</span>
          </div>
        </div>
      </Link>

      <Link
        onClick={handleNavLinkClick}
        href="/franchise-enquiry/"
        className="com-btn-1 find-btn"
      >
        <div className="mob-btn-box">
          <div className="mob-btn-bg">
            <img
              src="/assets/images/header/franchise-inq-bg-mob.png"
              alt="franchise-inq-bg-mob"
              width="167"
              height="40"
            />
            <img
              src="/assets/images/header/franchise-inq-mob.png"
              alt="franchise"
              width="43"
              height="40"
              className="mob-btn-icon"
            />
            <span className="mob-btn-text">Franchise Inquiry</span>
          </div>
        </div>
      </Link>

      <Link
        onClick={handleNavLinkClick}
        href="/job-seekers/"
        className="com-btn-1 find-btn"
      >
        <div className="mob-btn-box">
          <div className="mob-btn-bg">
            <img
              src="/assets/images/header/job-seekers-bg-mob.png"
              alt="job-seekers-bg-mob"
              width="167"
              height="40"
            />
            <img
              src="/assets/images/header/job-seekers-mob.png"
              alt="job-seekers-mob"
              width="43"
              height="40"
              className="mob-btn-icon"
            />
            <span className="mob-btn-text">Job Seekers</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

