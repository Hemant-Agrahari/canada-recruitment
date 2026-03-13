import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import PhoneInput from "react-phone-input-2";
import Image from "next/image";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRouter } from "next/router";
// import SelectedCountryContext from "../createContext";
import GoogleCaptchaWrapper from "../captcha/google-captcha-wrapper";
import { CalendlyModal } from "./CalendlyModal";
import { HireTalent } from "./HireTalent";
import Link from "next/link";
// import { HireTalentForm } from "./HireTalentForm";
// import { CalendlyModal } from "./CalendlyModal";

// export default function HireDeveloperLaravelbudget({
//   show,
//   setShowModal,
//   title,
//   setShowModalhire,
// }: any) {
//   return (
//     <GoogleCaptchaWrapper>
//       <HireTalent
//         show={show}
//         setShowModal={setShowModal}
//         title={title}
//         setShowModalhire={setShowModalhire}
//       />
//     </GoogleCaptchaWrapper>
//   );
// }

export const HireTalentForm = ({
  show,
  setShowModal: any,
  title,
  setShowModalhire,
}: any) => {
  const router = useRouter();
  const currentUrl = router.asPath;
  //   const context = useContext(SelectedCountryContext);
  //   const selectedCountry = context ? context.toLowerCase() : null;
  const handleClose1 = () => setShowModalhire(false);
  const [countryName, setCountryName] = useState<any>(null);
  const [countryCode, setCountryCode] = useState<any>(null);
  const [captcha, setCaptcha] = useState("");
  const [notification, setNotification] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [showModal, setShowModal] = useState(false);
  const [showCalendlymodal, setShowCalendlymodal] = useState(false);
const handleModal=()=>{
  setShowModal(true);
  setShowModalhire(false)
}
  return (
    <>
      <React.Fragment>
        <Modal
          show={show}
          onHide={handleClose1}
          centered
          size="xl"
          className="hiring-platform p-0"
          scrollable
        >
          <div className="modal-header border-0 pb-1">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose1}
            />
          </div>
          <div className="modal-body">
            <h2 className="section-title text-center">
            Explore the Hiring Platform
            </h2>
            <h4 className="section-subtitle text-center">
            Select your preferred method of interaction and let's move forward together
            </h4>
            <div className="row text-center">
              <div className="col-lg-4 col-md-4">
                <div className="interact-box mt-0">
                  <Image
                    priority={true}
                    src="/assets/images/header/interact_one.svg"
                    alt="schedule-a-call"
                    width={191}
                    height={190}
                  />
                  <p className="inetract-desc mb-0">
                  Do you have questions? Talk with our experts within the next 30 minutes or schedule a consultation at your preferred time.
                  </p>
                  <Link
                    type="button"
                    href="https://calendly.com/allianceinternationalservices/global"
                    target="_blank"
                    // onClick={() => {
                    //   setShowCalendlymodal(true);
                    // }}
                    className="cta-button"
                  >
                    Book a call
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="interact-box mb-0">
                  <Image
                    priority={true}
                    src="/assets/images/header/interact_two.svg"
                    alt="reques-a-demo"
                    width={191}
                    height={190}
                  />
                  <p className="inetract-desc mb-0">
                  Want to feel confident about your next step? We can provide a tailored overview of our thorough vetting process.
                  </p>
                  <Link
                    type="button"
                    href="https://calendly.com/allianceinternationalservices/global"
                    target="_blank"
                    className="cta-button"
                  >
                    Our Vetting Process
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="interact-box mb-0">
                  <Image
                    priority={true}
                    src="/assets/images/header/interact_three.svg"
                    alt="reques-a-demo"
                    width={191}
                    height={190}
                  />
                  <p className="inetract-desc mb-0">
                  Ready to unlock talent? Kickstart your hiring journey with a simple request for talent profiles!
                  </p>
                  <Link
                    // type="button"
                    // onClick={()=>handleModal()}
                    type="button"
                    href="https://calendly.com/allianceinternationalservices/global"
                    target="_blank"
                    className="cta-button"
                  >
                    Start Hiring
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <HireTalent
        show={showModal}
        setShowModal={setShowModal}
        title="Hire Talent Form"
      />
        {/* <CalendlyModal
        show={showCalendlymodal}
        setShowModal={setShowCalendlymodal}
        title="Calendly"
      /> */}
      </React.Fragment>
    </>
  );
};
