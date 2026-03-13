import React from "react";
import dynamic from "next/dynamic";
import { FooterSlider } from "@/utils/FooterSlider/FooterSlider";
import { FooterData } from "./footerData";

interface FooterPlacesProps {
  selectedLanguage: FooterData[string];
}

const FooterPlaces: React.FC<FooterPlacesProps> = ({ selectedLanguage }) => {
  return (
    <div className="p-0 m-0">
      <div className="footer-bottom">
        <p className="footer-head">{selectedLanguage.places}</p>
        <div className="top-place-service mt-3">
          <FooterSlider />
        </div>
      </div>
    </div>
  );
};

export default FooterPlaces;

