import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/router';
import { FaMapMarkerAlt } from 'react-icons/fa';
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
  const options = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
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
            <Slider {...options}>
              {selectedLanguage.map((item, index) => (
                <div className="item" key={index}>
                  <Link className="marker-hover" href={item.url}>
                    <FaMapMarkerAlt className="me-1" /> {item.text}
                  </Link>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>
    </>
  );
};


