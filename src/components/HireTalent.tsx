import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
const hireCardData = {
    "en": [
      {
        "title": "Hire Talent",
        "subtitle": "Share your recruitment needs!",
        "link": "../contact-us"
      },
      {
        "title": "Staff Augmentation",
        "subtitle": "Let us know how many people you need!",
        "link": "../contact-us"
      },
      {
        "title": "RPO Solution",
        "subtitle": "Let us help you hire quality talent faster!",
        "link": "../contact-us"
      },
      {
        "title": "Franchise Inquiry",
        "subtitle": "Launch your business successfully!",
        "link": "/franchise-enquiry/"
      }
    ],
    "ar": [
      {
        "title": "توظيف المواهب",
        "subtitle": "شارك احتياجات التوظيف الخاصة بك!",
        "link": "../contact-us"
      },
      {
        "title": "توسيع الموظفين",
        "subtitle": "أخبرنا بعدد الأشخاص الذين تحتاجهم!",
        "link": "../contact-us"
      },
      {
        "title": "حلول التوظيف الخارجي",
        "subtitle": "دعنا نساعدك في توظيف المواهب بسرعة!",
        "link": "../contact-us"
      },
      {
        "title": "استفسار عن الامتياز",
        "subtitle": "ابدأ عملك بنجاح!",
        "link": "/franchise-enquiry/"
      }
    ]
  }

function HireTalent() {
const router = useRouter()
const isArabic = router.asPath.includes("/ar")
const selectedLanguage = isArabic ? hireCardData.ar : hireCardData.en
    return (
        <>

<section className="Hire-card-css hire-talent">
      <div className="container-fluid c-pad-x">
        <div className="row g-4">
          {selectedLanguage.map((item, index) => (
            <div key={index} className="col-lg-3 col-sm-6">
              <div className="hire-card">
                <h3 className="hire-title">{item.title}</h3>
                <Link prefetch={false} href={item.link} className="com-btn mb-4">
               {isArabic ? "اتصل بنا":"Contact Us"}   
                </Link>
                <p className="com-text color-gray" style={{ fontWeight: "400" }}>
                  {item.subtitle}
                  <span className="right-arrow-img m-1">
                    <Image
                      width={100}
                      height={100}
                      src="/assets/images/right-arrow.svg"
                      alt="right-arrow"
                      title="right-arrow"
                      loading="eager"
                    />
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
        </>
    );
}
export default HireTalent;
