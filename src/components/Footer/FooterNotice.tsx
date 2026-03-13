import React from "react";
import Link from "next/link";
import { FooterData } from "./footerData";

interface FooterNoticeProps {
  selectedLanguage: FooterData[string];
}

const FooterNotice: React.FC<FooterNoticeProps> = ({ selectedLanguage }) => {
  return (
    <section className="blue-box">
      <div>
        <p className="com-pera" style={{ fontSize: "14px" }}>
          {selectedLanguage?.blueBox}
          <Link
            prefetch={false}
            href="/notice"
            className="text-text-decoration-underline fw-bold"
          >
            {" "}
            {selectedLanguage?.urlText}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default FooterNotice;

