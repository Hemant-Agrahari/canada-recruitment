import Link from "next/link";
import Image from "next/image";
import { contactPhones } from "./headerData";

export const ContactPhoneList = () => {
  return (
    <ul className="job-seeker-wrapper">
      {contactPhones.map((contact, index) => (
        <li key={index}>
          <span>
            <Image
              width={20}
              height={20}
              src={contact.flag}
              alt={`${contact.country} Flag`}
              loading="eager"
            />
          </span>
          <Link href={contact.href} className="com-pera">
            <span className="phone-icon">
              <Image
                width={20}
                height={20}
                src="/assets/images/header/phone-icon.svg"
                loading="eager"
                alt="Call Now"
              />
            </span>
            {contact.phone}
          </Link>
        </li>
      ))}
    </ul>
  );
};

