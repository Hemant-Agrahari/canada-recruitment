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

export const CalendlyModal = ({ show, setShowModal, title }: any) => {
  const router = useRouter();
  const currentUrl = router.asPath;
  //   const context = useContext(SelectedCountryContext);
  //   const selectedCountry = context ? context.toLowerCase() : null;
  const handleClose = () => setShowModal(false);
  const [countryName, setCountryName] = useState<any>(null);
  const [countryCode, setCountryCode] = useState<any>(null);
  const [captcha, setCaptcha] = useState("");
  const [notification, setNotification] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  return (
    <>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          centered
          size="xl"
          className="hiring-platform calendly-popup p-0"
          // scrollable
        >
          <div className="modal-header border-0 pb-1">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            />
          </div>
          <div className="modal-body">
            <iframe
              src="https://calendly.com/aistechnolab/30min?month=2024-05"
              width="100%"
              height="100%"
              title="Select a Date & Time - Calendly"
            />
          </div>
        </Modal>
      </div>
    </>
  );
};
