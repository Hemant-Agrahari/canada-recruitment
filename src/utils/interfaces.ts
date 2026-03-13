export interface ServiceApiResponse {
  status: number;
  data: {
    blogData: object;
    relatedBlog: [];
    author: object;
  };
  message: string;
}

export interface BrandingServiceApiResponse {
  status: number;
  message: string;
  data: BrandingServiceData[];
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface BrandDevelopmentServiceApiResponse {
  status: number;
  message: string;
  data: BrandDevelopmentTemplateFormData[];
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface SubImage {
  subContentImage: string;
  subImageTxt: string;
  workLinkSlug: string;
}

export interface WorkImage {
  imageTitle: string;
  subImage: SubImage[];
}

export interface Card {
  title: string;
  content: string;
  cardImage: string;
  cardImageName?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Content {
  title: string;
  content: string;
  contentImage: string;
  contentImageName?: string;
  contentBtnTitle?: string;
  contentBtnLink?: string;
}

export interface Banner {
  bannerImage: string;
  bannerContent: string;
  bannerTitle: string;
  slug: string;
  blogDate: string;
  bannerBtnTitle: string;
  bannerBtnLink: string;
  bannerBtnTitle2?: string;
  bannerBtnLink2?: string;
}
export interface SuccessStory {
  title: string;
  content: string;
  image: File | string;
  imageTitle: string;
  imageName?: string;
  category: string;
  industry: string;
  buttonTitle: string;
  buttonLink: string;
}
export interface MarketingTemplateFormData {
  breadcrumbTitle: string;
  bannerImage: string;
  bannerImageName?: string;
  bannerContent: string;
  bannerTitle: string;
  slug: string;
  bannerBtnTitle: string;
  bannerBtnLink: string;
  bannerBtnTitle2?: string;
  bannerBtnLink2?: string;
  content: Content[];
  cardSection: {
    title: string;
    content: string;
  };
  card: Card[];
  workImage: WorkImage;
  successStory: SuccessStory[];
  seoTitle: string;
  seoDescription: string;
  robotindex?: string;
  faq: Faq[];
  template: string;
  allowIndexing?: boolean;
  allowSearchEngines?: boolean;
}

export interface CorporateTemplateFormData {
  breadcrumbTitle: string;
  bannerImage: string;
  bannerContent: string;
  bannerTitle: string;
  slug: string;
  bannerBtnTitle: string;
  bannerBtnLink: string;
  content: Content;
  cardSection: {
    title: string;
    content: string;
  };
  card: Card[];
  seoTitle: string;
  seoDescription: string;
  robotindex?: string;
  faq: Faq[];
  template: string;
}
export interface PortfolioWorkImage {
  workImage: string; // Assuming subContentImage is a file (e.g., image)
  imageTxt: string;
  tabTitle: string;
  workLinkSlug: string;
}
export interface PortfolioTemplateFormData {
  breadcrumbTitle: string;
  bannerImage: string;
  bannerContent: string;
  bannerTitle: string;
  slug: string;
  blogDate: string;
  bannerBtnTitle: string;
  bannerBtnLink: string;
  workTabs: string[];
  workImages: PortfolioWorkImage[];
  seoTitle: string;
  seoDescription: string;
  robotindex?: string;
  faq: Faq[];
  template: string;
}

export type imagePreviewType = "large" | "medium";

export interface PortfolioWorkDetailImages {
  image: string | File;
  imageTitle: string;
  imageSlug: string;
  imagePreviewType: imagePreviewType | "";
}
export interface PortfolioWorkDetailI {
  breadcrumbTitle: string;
  bannerImage: string;
  bannerContent: string;
  bannerTitle: string;
  slug: string;
  bannerBackgroundColor:string;
  workImages: PortfolioWorkDetailImages[];
  seoTitle: string;
  seoDescription: string;
  robotindex?: string;
  template: string;
}

export interface BrandingServiceData {
  _id: string;
  breadcrumbTitle: string;
  slug: string;
  bannerTitle: string;
  bannerContent: string;
  bannerImageDetails: {
    alt: string;
    title: string;
    bannerImage: string;
  };
  cta2: {
    ctaBtnTitle: string;
    ctaBtnLink: string;
  };
  contentone: ContentOne[];
  content: BrandingContent[];
  image: BrandingImage[];
  serviceSliderTitle: string;
  serviceSlider: SubServiceSlider[];
  seoTitle: string;
  seoDescription: string;
  robotindex?: string;
  faq: Faq[];
  template: string;
  isDelete: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ContentOne {
  contentTitle: string;
  contentText: string;
  contentAltImage: string;
  contentTitleImage: string;
  contentoneImage: string;
}

export interface BrandingContent {
  contentTitle: string;
  contentText: string;
  subContent: SubContent[];
}

export interface SubContent {
  subContentTitle: string;
  subContentDescription: string;
  subContentImage: string | null;
  subContentCtaButton: {
    state: boolean;
    btnText: string;
    link: string;
    boldtxt: string;
  };
}

export interface BrandingImage {
  imageTitle: string;
  subImage: BrandingSubImage[];
}

export interface BrandingSubImage {
  subContentImage: string | null;
  subImageTxt: string;
  subsubImage: string;
  subImageLink: string;
}

export interface SubServiceSlider {
  serviceSliderImage: string;
  serviceSliderAltImage: string;
  serviceSliderTitleImage: string;
  cardTitle: string;
  cardSubTitle: string;
  cardContent: string;
  subContentCtaButton: {
    state: boolean;
    btnText: string;
    link: string;
    boldtxt: string;
  };
}

export interface BrandDevelopmentSubServiceSliderSubContent {
  state: boolean;
  subSliderTitle: string;
  subSliderText: string;
}

export interface BrandDevelopmentSubServiceSlider {
  serviceSliderImage: string;
  serviceSliderImageAlt: string;
  serviceSliderButtonText: string;
  serviceSliderButtonLink: string;
  cardTitle: string;
  cardSubTitle: string;
  cardContent: string;
  subSliderContent: BrandDevelopmentSubServiceSliderSubContent[];
}

export interface BrandDevelopmentSectionTwo {
  sectiontwoTitle: string;
  sectiontwoSubTitle: string;
  sectiontwoImage: string | null;
  sectiontwoAlt: string;
  sectiontwoDesc: string;
}

export interface BrandDevelopmentMultipleSection {
  multiplesectionTitle: string;
  multiplesectionImage: string;
  multiplesectionAlt: string;
  multiplesectionDesc: string;
  multiplesectionImageAlt: string;
}

export interface BrandDevelopmentClientsContent {
  clientsContentTitle: string;
  clientsContentBtnName: string;
  clientsContentBtnLink: string;
  clientsSubContent: BrandDevelopmentClientsSubContent[];
}

export interface BrandDevelopmentClientsSubContent {
  clientsSubContentYoutubeLink: string;
  clientsSubContentImage: string;
  clientsSubContentTitle: string;
  clientsSubContentText: string;
  subImageTxt: string;
}

export interface BrandDevelopmentTemplateFormData {
  breadcrumbTitle: string;
  slug: string;
  bannerTitle: string;
  bannerSubTitle: string;
  bannerContent: string;
  bannerImageDetails: {
    alt: string;
    title: string;
    bannerImg: string;
  };
  cta2: {
    ctaBtnTitle: string;
    ctaBtnLink: string;
  };
  sectiontwo: BrandDevelopmentSectionTwo[];
  multiplesection: BrandDevelopmentMultipleSection[];
  image: BrandingImage[];
  clientsContent: BrandDevelopmentClientsContent[];
  serviceSliderTitle: string;
  serviceSlider: BrandDevelopmentSubServiceSlider[];
  seoTitle: string;
  seoDescription: string;
  robotindex?: string;
  faq: Faq[];
  template: string;
  categories: string | null;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface MediaServiceTemplateData {
  breadcrumbTitle: string;
  slug: string;
  bannerTitle: string;
  bannerContent: string;
  bannerImageDetails: {
    alt: string;
    title: string;
    bannerImg: string | null;
  };
  cta2: {
    ctaBtnTitle: string;
    ctaBtnLink: string;
  };
  sectioneight?: SectionEight;
  sectionnine?: SectionNine;
  seoTitle: string;
  seoDescription: string;
  robotindex?: string;
  faq: Faq[];
  template: string;
  isDelete: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SectionEight {
  sectioneightTitle: string;
  sectioneightDesc: string;
  sectioneightSubContent: SectionEightSubContent[];
}

export interface SectionEightSubContent {
  sectioneightSubTitle: string;
  sectioneightSubDesc: string;
  sectioneightSubImage: string | null;
  sectioneightSubImageAlt: string;
  sectioneightSubImageTitle: string;
  sectioneightSubSubImage: string | null;
  sectioneightSubSubImageAlt: string;
  sectioneightSubSubImageTitle: string;
}

export interface SectionNine {
  sectionnineTitle: string;
  sectionnineDesc: string;
  sectionnineSubContent: SectionNineSubContent[];
}

export interface SectionNineSubContent {
  sectionnineSubTitle: string;
  sectionninetSubDesc: string;
  sectionnineSubImage: string | null;
  sectionnineSubImageAlt: string;
  sectionnineSubImageTitle: string;
}


//ui ux data

export interface UiUxDesignerSectionTwoSubContent {
  sectiontwoSubTitle: string;
  sectiontwoSubImage: string;
  sectiontwoSubImageAlt: string;
  sectiontwoSubImageTitle: string;
  sectiontwoAlt: string;
}

export interface UiUxDesignerSectionThreePersonalInfo {
  sectionthreesubtitle: string;
  sectionthreesubsubtitle: string;
}

export interface UiUxDesignerSectionThreeSubSkills {
  sectionthreeSubSkillsTitle: string;
  sectionthreeSubSkillsImage: string;
  sectionthreeSubSkillsImageAlt: string;
  sectionthreeSubSkillsImageTitle: string;
  sectionthreeSubsubSkills: { sectionthreeSubsubSkillsTitle: string }[];
}

export interface UiUxDesignerSectionFourSubContent {
  sectionfourSubTitle: string;
  sectionfourSubDesc: string;
}

export interface UiUxDesignerSectionFiveSubContent {
  sectionfiveSubTitle: string;
}

export interface UiUxDesignerSectionSixSubContent {
  sectionsixSubTitle: string;
  sectionsixSubDesc: string;
  sectionsixSubPrice: string;
  sectionsixSubPriceCode: string;
  sectionsixSubImage: string;
  sectionsixSubImageAlt: string;
  sectionsixSubImageTitle: string;
  sectionsixSubButtonName: string;
  sectionsixSubButtonLink: string;
  sectionsixSubSubTitle: string;
  sectionsixSubSubDesc: string;
  sectionsixSubBadge: string;
}

export interface UiUxDesignerSectionSevenSubContent {
  sectionsevenSubTitle: string;
  sectionsevenSubSubTitle: string;
}

export interface UiUxDesignerClientContentSub {
  clientsSubContentYoutubeLink: string;
  clientsSubContentImage: string;
  clientsSubContentImageAlt: string;
  clientsSubContentTitle: string;
  clientsSubContentText: string;
}

export interface UiUxDesignerServiceSliderContent {
  serviceSliderImage: string;
  serviceSliderImageAlt: string;
  serviceSliderImageTitle: string;
  serviceSliderButtonText: string;
  serviceSliderButtonLink: string;
  serviceSliderSubTitle: string;
  serviceSliderSubDesc: string;
  serviceSliderSubContent: { state: boolean; serviceSliderSubContentTitle: string; serviceSliderSubContentText: string }[];
}

export interface UiUxTemplateData {
  _id: string;
  breadcrumbTitle: string;
  slug: string;
  bannerTitle: string;
  bannerContent: string;
  bannerImageDetails: {
    alt: string;
    title: string;
    bannerImage: string | null;
    bannerImg: string | null;
  };
  cta2: {
    ctaBtnTitle: string;
    ctaBtnLink: string;
  };
  sectiontwo: {
    sectiontwoTitle: string;
    sectiontwoDesc: string;
    sectiontwoSubContent: UiUxDesignerSectionTwoSubContent[];
  };
  sectionthree: {
    sectionthreeTitle: string;
    sectionthreeImage: string;
    sectionthreeImageAlt: string;
    sectionthreeImageTitle: string;
    sectionthreeName: string;
    sectionthreePosition: string;
    sectionthreeButtonName: string;
    sectionthreeButtonLink: string;
    sectionthreePersonalInfo: UiUxDesignerSectionThreePersonalInfo[];
    sectionthreeDesc: string;
    sectionthreeSubSkills: UiUxDesignerSectionThreeSubSkills[];
  };
  sectionfour: {
    sectionfourTitle: string;
    sectionfourDesc: string;
    sectionfourImage: string;
    sectionfourImageAlt: string;
    sectionfourImageTitle: string;
    sectionfourSubContent: UiUxDesignerSectionFourSubContent[];
  };
  sectionfive: {
    sectionfiveTitle: string;
    sectionfiveDesc: string;
    sectionfiveImage: string;
    sectionfiveImageAlt: string;
    sectionfiveImageTitle: string;
    sectionfiveSubContent: UiUxDesignerSectionFiveSubContent[];
  };
  sectionsix: {
    sectionsixTitle: string;
    sectionsixDesc: string;
    sectionsixSubContent: UiUxDesignerSectionSixSubContent[];
  };
  sectionseven: {
    sectionsevenTitle: string;
    sectionsevenDesc: string;
    sectionsevenSubContent: UiUxDesignerSectionSevenSubContent[];
  };
  sectioneight: {
    sectioneightTitle: string;
    sectioneightDesc: string;
    sectioneightSubContent: {
      sectioneightSubTitle: string;
      sectioneightSubDesc: string;
      sectioneightSubImage: string;
      sectioneightSubImageAlt: string;
      sectioneightSubImageTitle: string;
      sectioneightSubSubImage: string;
      sectioneightSubSubImageAlt: string;
      sectioneightSubSubImageTitle: string;
    }[];
  };
  sectionnine: {
    sectionnineTitle: string;
    sectionnineDesc: string;
    sectionnineSubContent: {
      sectionnineSubTitle: string;
      sectionnineSubDesc: string;
      sectionnineSubImage: string;
      sectionnineSubImageAlt: string;
      sectionnineSubImageTitle: string;
    }[];
  };
  clientsContent: {
    clientsContentTitle: string;
    clientsContentDesc: string;
    clientsContentBtnName: string;
    clientsContentBtnLink: string;
    clientsSubContent: UiUxDesignerClientContentSub[];
  };
  sectionten: {
    sectiontenTitle: string;
    sectiontenDesc: string;
    sectiontenButtonName: string;
    sectiontenButtonLink: string;
  };
  serviceSlider: {
    serviceSliderTitle: string;
    serviceSliderDesc: string;
    serviceSliderContent: UiUxDesignerServiceSliderContent[];
  };
  seoTitle: string;
  seoDescription: string;
  robotindex?: string;
  faq: Faq[];
  template: string;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface metaFaq {
  question: string;
  answer: string;
}

export interface MetaProductScriptI {
    name:string,
    image:string,
    description:string,
    aggregateRating:{
        ratingValue:string,
        reviewCount:string,
    }
    robotindex?: string;
}