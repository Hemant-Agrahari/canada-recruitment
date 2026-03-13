import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const callactionData = {
  en: {
    title: "Interested in finding out how Alliance can support you?",
    list: [
      "Utilize the extensive network of the finest 3.5% talent",
      "Achieve hiring speeds multiplied by 10 and enjoy cost benefits of up to 40%",
      "Achieving a remarkable 70% success rate from initial candidate interview to final selection",
    ],
    subtitle: "Let’s talk!",
    link: "https://calendly.com/allianceinternationalservices/global",
    linkText: "Book Your Free Discovery Call",
  },
  ar: {
    title: "هل أنت مهتم بمعرفة كيف يمكن أن تدعمك التحالف؟",
    list: [
      "الاستفادة من شبكة واسعة تضم أفضل 3.5% من المواهب",
      "تحقيق سرعات توظيف مضاعفة بمقدار 10 مرات والاستفادة من وفورات تصل إلى 40%",
      "تحقيق معدل نجاح مذهل بنسبة 70% من المقابلة الأولية إلى الاختيار النهائي",
    ],
    subtitle: "فلنتحدث!",
    link: "https://calendly.com/allianceinternationalservices/global",
    linkText: "احجز مكالمتك الاستكشافية المجانية",
  },
};

const CallToAction = () => {
  const router = useRouter();
  const isArabic = router.asPath.includes('/ar');
  const selectedLanguage = isArabic ? callactionData.ar : callactionData.en;

  return (
    <div>
      <section className="py-50">
        <div className="new-section">
          <div className="container">
            <div className="main-content">
              <h2 className="mb-4">{selectedLanguage.title}</h2>
              <ul className="mb-3">
                {selectedLanguage.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <h3 className="mb-4">{selectedLanguage.subtitle}</h3>
              <Link
                prefetch={false}
                href={selectedLanguage.link}
                target="_blank"
                className="cta-btn"
              >
                {selectedLanguage.linkText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CallToAction;
