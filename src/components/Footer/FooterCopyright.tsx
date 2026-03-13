import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FooterData } from "./footerData";

interface FooterCopyrightProps {
  selectedLanguage: FooterData[string];
}

const FooterCopyright: React.FC<FooterCopyrightProps> = ({ selectedLanguage }) => {
  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <div className="footer-copy-right">
      <div className="container text-center pb-0 mb-0">
        <p className="nav-links" style={{ marginBottom: "0px" }}>
          © <span id="ftr-dynmc-dt">{currentDate}</span>
          <Link prefetch={false} href="/">
            {selectedLanguage?.alliance}{" "}
          </Link>
          | {selectedLanguage.reserved} :
          <Link prefetch={false} href="https://www.aistechnolabs.com/">
            <strong>{selectedLanguage?.developedby}</strong>
          </Link>{" "}
          {selectedLanguage.links?.map((item: any, index: number) => (
            <Link key={index} prefetch={false} href={item.url}>
              {item.text} |
            </Link>
          ))}
        </p>
      </div>
      <div className="footer-bottom-links text-center mt-2">
        <Link
          prefetch={false}
          href="https://www.dmca.com/Protection/Status.aspx?ID=65de1423-f8e5-4b69-986b-ceacb3d52c6f&refurl=https://www.alliancerecruitmentagency.com/"
          className="pe-3"
        >
          <Image
            width={121}
            height={24}
            src="/assets/images/dmca-ais.webp"
            alt="DMCA"
            title="DMCA"
            loading="lazy"
          />
        </Link>
        <Link prefetch={false} href="https://www.copyscape.com/">
          <Image
            width={200}
            height={25}
            src="/assets/images/protected.webp"
            alt="DMCA"
            title="DMCA"
            loading="lazy"
          />
        </Link>
      </div>
    </div>
  );
};

export default FooterCopyright;

