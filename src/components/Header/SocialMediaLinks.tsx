import Link from "next/link";
import Image from "next/image";
import { socialMediaLinks } from "./headerData";

export const SocialMediaLinks = () => {
  return (
    <div className="header-social-link">
      <ul className="job-seeker-wrapper">
        <li>
          {socialMediaLinks.map((social, index) => (
            <Link
              key={index}
              href={social.href}
              target="_blank"
              title={social.title}
            >
              <span className="mx-1">
                <Image
                  width={24}
                  height={24}
                  src={social.icon}
                  loading="eager"
                  alt={social.alt}
                />
              </span>
            </Link>
          ))}
        </li>
      </ul>
    </div>
  );
};

