import Link from "next/link";
import Image from "next/image";

interface Contact {
  flag: string;
  alt: string;
  href: string;
  phone: string;
}

const mobileContacts: Contact[] = [
  {
    flag: "/assets/images/header/uk.png",
    alt: "United Kingdom Flag",
    href: "tel:+44 20 3838 0743",
    phone: "+44 20 3838 0743",
  },
  {
    flag: "/assets/images/header/united-states-flag.svg",
    alt: "United State Flag",
    href: "tel:+19179009072",
    phone: "+1 (917) 900 9072",
  },
  {
    flag: "/assets/images/header/canada-flag.svg",
    alt: "Canada Flag",
    href: "tel:+17809004752",
    phone: "+1 (780) 900 4752",
  },
  {
    flag: "/assets/images/header/india-flag.svg",
    alt: "India Flag",
    href: "tel:+918980018741",
    phone: "+91 89800 18741",
  },
];

export const MobileContactList = () => {
  return (
    <div className="country-numbers">
      {mobileContacts.map((contact, index) => (
        <div key={index} className="contact-content">
          <span>
            <Image
              loading="eager"
              width={16}
              height={16}
              src={contact.flag}
              alt={contact.alt}
            />
          </span>
          <Link href={contact.href} className="com-pera">
            <span className="phone-icon">
              <Image
                loading="eager"
                width={16}
                height={16}
                src="/assets/images/header/phone-icon.svg"
                alt="Call Now"
              />
            </span>
            {contact.phone}
          </Link>
        </div>
      ))}
    </div>
  );
};

