import Link from "next/link";
import Image from "next/image";

interface CTAButtonProps {
  type: "post-vacancy" | "hire-talent" | "franchise-inquiry" | "job-seekers";
  onClick?: () => void;
  href?: string;
}

type ButtonConfig = {
  bg: string;
  icon: string;
  text: string;
  tabletBg: string;
  tabletIcon: string;
  tabletText: string;
  alt: string;
  desktopWidth: number;
  desktopHeight: number;
  tabletWidth: number;
  tabletHeight: number;
  iconWidth: number;
  iconHeight: number;
  textWidth: number;
  textHeight: number;
};

const buttonConfig: Record<CTAButtonProps["type"], ButtonConfig> = {
  "post-vacancy": {
    bg: "/assets/images/header/post-vacancy-bg.png",
    icon: "/assets/images/header/post-vacancy-icon.png",
    text: "/assets/images/header/post-vacancy-text.png",
    tabletBg: "/assets/images/header/tab-post-vacancy-bg.png",
    tabletIcon: "/assets/images/header/tab-post-vacancy-icon.png",
    tabletText: "/assets/images/header/tab-post-vacancy-text.png",
    alt: "post-your-vacancy-btn",
    desktopWidth: 116,
    desktopHeight: 40,
    tabletWidth: 70,
    tabletHeight: 29,
    iconWidth: 43,
    iconHeight: 40,
    textWidth: 60,
    textHeight: 28,
  },

  "hire-talent": {
    bg: "/assets/images/header/hire-talent-bg.png",
    icon: "/assets/images/header/hire-talent-icon.png",
    text: "/assets/images/header/hire-talent-text.png",
    tabletBg: "/assets/images/header/tab-hire-talent-bg.png",
    tabletIcon: "/assets/images/header/tab-hire-talent-icon.png",
    tabletText: "/assets/images/header/tab-hire-talent-text.png",
    alt: "hire-a-talent-btn",
    desktopWidth: 98,
    desktopHeight: 40,
    tabletWidth: 70,
    tabletHeight: 29,
    iconWidth: 40,
    iconHeight: 40,
    textWidth: 40,
    textHeight: 28,
  },

  "franchise-inquiry": {
    bg: "/assets/images/header/franchise-inq-bg.png",
    icon: "/assets/images/header/franchise-inquiry-icon.png",
    text: "/assets/images/header/franchise-inquiry-text.png",
    tabletBg: "/assets/images/header/tab-franchise-inq-bg.png",
    tabletIcon: "/assets/images/header/tab-franchise-inq-icon.png",
    tabletText: "/assets/images/header/tab-franchise-inq-text.png",
    alt: "franchise-inquiry-btn",
    desktopWidth: 114,
    desktopHeight: 40,
    tabletWidth: 70,
    tabletHeight: 29,
    iconWidth: 43,
    iconHeight: 40,
    textWidth: 60,
    textHeight: 28,
  },

  "job-seekers": {
    bg: "/assets/images/header/job-seekers-bg.png",
    icon: "/assets/images/header/job-seekers-icon.png",
    text: "/assets/images/header/job-seekers-text.png",
    tabletBg: "/assets/images/header/tab-job-seekers-bg.png",
    tabletIcon: "/assets/images/header/tab-job-seekers-icon.png",
    tabletText: "/assets/images/header/tab-job-seekers-text.png",
    alt: "job-seekers-btn",
    desktopWidth: 107,
    desktopHeight: 40,
    tabletWidth: 71,
    tabletHeight: 29,
    iconWidth: 40,
    iconHeight: 40,
    textWidth: 40,
    textHeight: 28,
  },
};

export const CTAButton = ({ type, onClick, href }: CTAButtonProps) => {
  const config = buttonConfig[type];

  const ButtonContent = () => (
    <>
      {/* Desktop */}
      <div className="btn-box">
        <Image
          loading="eager"
          src={config.bg}
          alt={config.alt}
          width={config.desktopWidth}
          height={config.desktopHeight}
          className="btn-bg"
        />
        <Image
          loading="eager"
          src={config.icon}
          alt={`${type}-icon`}
          width={config.iconWidth}
          height={config.iconHeight}
          className="btn-icon"
        />
        <Image
          loading="eager"
          src={config.text}
          alt={`${type}-text`}
          width={config.textWidth}
          height={config.textHeight}
          className="btn-text"
        />
      </div>

      {/* Tablet */}
      <div className="btn-box tablet-btn">
        <Image
          loading="eager"
          src={config.tabletBg}
          alt={config.alt}
          width={config.tabletWidth}
          height={config.tabletHeight}
          className="btn-bg"
        />
        <Image
          loading="eager"
          src={config.tabletIcon}
          alt={`${type}-icon`}
          width={26}
          height={26}
          className="btn-icon"
        />
        <Image
          loading="eager"
          src={config.tabletText}
          alt={`${type}-text`}
          width={config.textWidth}
          height={19}
          className="btn-text"
        />
      </div>
    </>
  );

  if (onClick) {
    return (
      <div onClick={onClick} role="button" tabIndex={0}>
        <ButtonContent />
      </div>
    );
  }

  return (
    <Link href={href || "#"} aria-label={config.alt}>
      <ButtonContent />
    </Link>
  );
};
