import { AppProps } from "next/app";
import Layout from "../components/layout";

// Importing custom CSS files
import "../../public/assets/css/landingpage.css";
import "bootstrap/dist/css/bootstrap.css";
import "../../public/assets/css/header.css";
import "../../public/assets/css/service-form.css";
import "../../public/assets/css/all.css";
import "../../public/assets/css/style.css";
import "../../public/assets/css/globals.css";
import "../../public/assets/css/footer.css";
import "../../public/assets/css/blog.css";
import "../../public/assets/css/fancybox.css";
import "../../public/assets/css/landingpage-responsive.css";
import "../../public/assets/css/responsive.css";
import "../../public/assets/css/responsivecustom.css";
import "../../public/assets/css/custom.css";
import "../../public/assets/css/intlTelInput.css";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import "../../public/assets/css/franchiseEnquiry.css";
import "../../public/assets/css/handbook.css";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "../styles/owl.theme.default.css";
import "../../public/assets/css/franchise.css";
import "../../public/assets/css/franchisewhatsappcta.css";
import "../../public/assets/css/slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../public/assets/css/digital-marketing-services.css";
import "../../public/assets/css/welcome-modal.css";
import ScrollToTop from "@/components/scrolltotop";
import Script from "next/script";

// Fix: Directly apply Verdana in global styles (system font)
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Apply the font to the body directly in global styles */}
      <style jsx global>{`
        body {
          font-family: 'Epilogue', sans-serif; /* Apply Verdana with fallback to sans-serif */
          margin: 0;
          padding: 0;
        }
      `}</style>

      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ScrollToTop />

      {/* <Script
        strategy="lazyOnload"
        type="text/javascript/"
        src="../assets/scripts/jQuery.js"
        async
      /> */}
      <Script
        strategy="afterInteractive"
        src="../assets/scripts/bootstrap5.js"
        async
      />
      {/* Optional: Uncomment if you need to load Owl Carousel JS */}
      {/* <Script
        strategy="lazyOnload"
        src="../assets/scripts/owl.carousel.min.js"
        async
      /> */}
    </>
  );
}
