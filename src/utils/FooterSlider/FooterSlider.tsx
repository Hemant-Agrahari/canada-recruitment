import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
// Define an interface for the slider data
interface SliderItem {
  text: string;
  url: string;
}

// Footer slider data in English and Arabic
const footerSliderData: { en: SliderItem[]; ar: SliderItem[] } = {
  en: [
    { text: "Cambridge", url: "/recruitment-companies-cambridge" },
    { text: "Montreal", url: "/recruitment-agencies-montreal" },
    { text: "Vancouver", url: "/recruitment-agencies-vancouver" },
    { text: "Barrie", url: "/staffing-agencies-barrie-ontario" },
    { text: "Calgary", url: "/recruitment-agencies-calgary" },
    { text: "Winnipeg", url: "/staffing-agency-winnipeg" },
  ],
  ar: [
    { text: "قطر", url: "/recruitment-agencies-qatar/" },
    { text: "دبي، الإمارات العربية المتحدة", url: "/recruitment-agency-in-dubai/" },
    { text: "الشارقة", url: "/recruitment-agencies-sharjah/" },
    { text: "الكويت", url: "/recruitment-agencies-kuwait/" },
    { text: "جدة", url: "/recruitment-agencies-jeddah/" },
    { text: "الرياض", url: "/recruitment-agencies-riyadh/" },
    { text: "البحرين", url: "/recruitment-agencies-bahrain/" },
    { text: "عمان", url: "" },
    { text: "مدينة أخرى", url: "/manpower-middle-east-dubai/" },
  ],
};
export const FooterSlider: React.FC = () => {
  const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
  });
  const options = {
    loop: true,
    margin: 11,
    autoplay: false,
    nav: true,
    navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"], // Customize navigation text/icons
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    dots: false,
    responsive: {
      0: {
        items: 3, // Number of items for screens less than 600 pixels wide
      },
      600: {
        items: 5, // Number of items for screens between 600 and 992 pixels wide
      },
      992: {
        items: 6, // Number of items for screens between 992 and 1200 pixels wide
      },
      1200: {
        items: 6, // Number of items for screens 1200 pixels wide and above
      }
    }
  };

  const [renderCarousel, setRenderCarousel] = useState(false);

  // console.log("renderCarousel",renderCarousel)

  useEffect(() => {
    setRenderCarousel(true);
  }, []);
  const router = useRouter();
  const isArabic = router.asPath.includes('/ar');
  const selectedLanguage = isArabic ? footerSliderData.ar : footerSliderData.en;
  return (
    <>
      <section className="footer-slider py-10">
        <div className="carousel-container">
          {renderCarousel && (
            <OwlCarousel {...options}>
              {selectedLanguage.map((item, index) => (
                <div className="item" key={index}>
                  <Link className="marker-hover" href={item.url}>
                    <i className="fas fa-map-marker-alt"></i> {item.text}
                  </Link>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </section>
    </>
  );
};


