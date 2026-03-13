import { log } from 'console';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const headingData = {
  en: [
    { title: "C - Level", href: "/c-level-recruitment-agency/", iconClass: "c-headhun-icon1" },
    { title: "Healthcare & Doctor", href: "/healthcare-recruitment-agencies-in-dubai/", iconClass: "c-headhun-icon2" },
    { title: "Retail & Marketing", href: "/retail-recruitment-agencies-in-dubai/", iconClass: "c-headhun-icon3" },
    { title: "Educational Industry", href: "/teacher-recruitment-agencies-in-dubai/", iconClass: "c-headhun-icon4" },
    { title: "All Chef", href: "/executive-chef-dubai/", iconClass: "c-headhun-icon5" },
    { title: "Hotel & Restaurant", href: "/hotel-recruitment-agency-dubai/", iconClass: "c-headhun-icon6" },
    { title: "Information-Technology", href: "/it-recruitment-agency-dubai/", iconClass: "c-headhun-icon7" },
    { title: "Engineering", href: "/engineering-recruitment-agencies-in-dubai/", iconClass: "c-headhun-icon8" },
    { title: "Banking & Finance", href: "/banking-recruitment-agencies-in-dubai/", iconClass: "c-headhun-icon9" }
  ],
  ar: [
    { title: "المستوى التنفيذي", href: "/c-level-recruitment-agency/", iconClass: "c-headhun-icon1" },
    { title: "الرعاية الصحية والطبيب", href: "/healthcare-recruitment-agencies-in-dubai/", iconClass: "c-headhun-icon2" },
    { title: "التجزئة والتسويق", href: "/retail-recruitment-agencies-in-dubai/", iconClass: "c-headhun-icon3" },
    { title: "الصناعة التعليمية", href: "/teacher-recruitment-agencies-in-dubai/", iconClass: "c-headhun-icon4" },
    { title: "جميع الطهاة", href: "/executive-chef-dubai/", iconClass: "c-headhun-icon5" },
    { title: "الفندق والمطعم", href: "/hotel-recruitment-agency-dubai/", iconClass: "c-headhun-icon6" },
    { title: "تكنولوجيا المعلومات", href: "/it-recruitment-agency-dubai/", iconClass: "c-headhun-icon7" },
    { title: "الهندسة", href: "/engineering-recruitment-agencies-in-dubai/", iconClass: "c-headhun-icon8" },
    { title: "البنوك والتمويل", href: "/banking-recruitment-agencies-in-dubai/", iconClass: "c-headhun-icon9" }
  ]
};

const HeadingHunting = () => {
  const router = useRouter();
  const isArabic = router.asPath.includes('/ar'); 
  console.log("isArabic", isArabic);
  
  const selectedLanguage = isArabic ? headingData.ar : headingData.en;

  return (
    <div>  
      <section className="headhunting pb-0">
        <div className="container-fluid c-pad-x">
          <div className="row">
            <div className="col-lg-3">
              <h2 className="com-title text-align-left">{isArabic ? "التوظيف في" : "Headhunting In"}</h2>
            </div>
            <div className="col-lg-9">
              <div className="row">
                {selectedLanguage.map((item, index) => (
                  <div key={index} className="col-lg-4 col-sm-6">
                      <div className="icon-des">
                        <span className={`icons ${item.iconClass}`}></span>
                        <h3>{item.title}</h3>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeadingHunting;
