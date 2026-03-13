interface Link {
  text?: string;
  url?: string;
}

export interface FooterData {
  [key: string]: {
    blueBox?: string;
    urlText?: string;
    formtitle?: string;
    employer?: string;
    project?: string;
    jobseeker?: string;
    applyjob?: string;
    employers?: string;
    forjob?: string;
    places?: string;
    links?: Link[];
    alliance?: string;
    reserved?: string;
    developedby?: string;
  };
}

export const footerData: FooterData = {
  en: {
    blueBox: "Important Note for all candidates. Please note that we do not charge MONEY FROM CANDIDATES in return of job offers/interviews. For more information",
    urlText: "Click Here",
    formtitle: "Looking For Top Talent? Or Want To Start A Project?",
    employer: "Yes, I'm Employer",
    project: "I want to Outsource IT Project",
    jobseeker: "Job Seeker",
    applyjob: "Apply For Job",
    employers: "Employers Only",
    forjob: "For Jobs",
    places: "Top Places We Serve",
    alliance: "Alliance Recruitment Agency",
    reserved: "All rights Reserved | Design Developed By",
    developedby: "AIS TECHNOLABS PVT LTD.",
    links: [
      {
        text: "Privacy Policy",
        url: "/privacy-policy",
      },
      {
        text: "Our Blog",
        url: "/webblog",
      },
      {
        text: "Sitemap",
        url: "/sitemap",
      },
    ],
  },
  ar: {
    blueBox: "ملاحظة هامة لجميع المرشحين. يرجى ملاحظة أننا لا نفرض أي رسوم مالية على المرشحين مقابل عروض العمل أو المقابلات. لمزيد من المعلومات",
    urlText: "اضغط هنا",
    formtitle: "هل تبحث عن أفضل المواهب؟ أو تريد بدء مشروع؟",
    employer: "نعم، أنا صاحب عمل",
    project: "أرغب في الاستعانة بمصادر خارجية لمشروع تكنولوجيا المعلومات",
    jobseeker: "باحث عن عمل",
    applyjob: "التقديم على وظيفة",
    employers: "لأصحاب العمل فقط",
    forjob: "للوظائف",
    places: "أفضل الأماكن التي نخدمها",
    alliance: "وكالة تحالف التوظيف",
    reserved: "جميع الحقوق محفوظة | التصميم والتطوير بواسطة",
    developedby: "شركة إيه آي إس تيكنولابس الخاصة المحدودة.",
    links: [
      {
        text: "سياسة الخصوصية",
        url: "/privacy-policy",
      },
      {
        text: "مدونتنا",
        url: "/webblog",
      },
      {
        text: "خريطة الموقع",
        url: "/site-map",
      },
    ],
  },
};

