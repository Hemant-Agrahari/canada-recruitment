import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { footerData } from "./footerData";
import FooterNotice from "./FooterNotice";
import FooterMain from "./FooterMain";
import FooterPlaces from "./FooterPlaces";
import FooterCopyright from "./FooterCopyright";

const FloatingSidebar = dynamic(() => import("../FloatingSidebar/FloatingSidebar"), {
  ssr: false,
});

const Footer = React.memo(() => {
  const [delay, setDelay] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelay(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const isArabic = router.asPath.includes("/ar");
  const selectedLanguage = isArabic ? footerData.ar : footerData.en;

  return (
    <>
      <footer>
        <FooterNotice selectedLanguage={selectedLanguage} />
        <FooterMain selectedLanguage={selectedLanguage} />
        <FooterPlaces selectedLanguage={selectedLanguage} />
        <FooterCopyright selectedLanguage={selectedLanguage} />
      </footer>
      {delay && (
        <>
          <FloatingSidebar />
        </>
      )}
    </>
  );
});

Footer.displayName = "Footer";

export default Footer;

