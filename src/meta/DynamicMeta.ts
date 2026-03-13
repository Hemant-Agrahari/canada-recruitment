export interface metaFaq {
  question: string;
  answer: string;
}

export interface DynamicMeta {
  title?: string;
  description?: string;
  keywords?: string;
  slug?: string;
  indexFollow?: boolean;
  robotindex?: string;
  ogType?: string;
  ogLocale?: string;
  sitename?: string;
  metaFaq?: metaFaq[];
  articlePublisher?: string;
  articlePublishedTime?: string,
  articleModifiedTime?: string,
  twitterLable1?: string;
  twitterLable2?: string;
  twitterData1?: string;
  twitterData2?: string;
  ogImage?: {
    url: string;
    width: number;
    height: number;
    type: string;
  } | null;
}

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

export const generateDynamicMeta = ({ meta }: { meta: DynamicMeta }) => {
  const baseMeta = {
    title: meta?.title || "",
    description: meta?.description || "",
    keywords: meta?.keywords || "",
    author: "Pallavi Chawla",
    robotindex: meta?.robotindex || "index, follow",
    canonicalURL: meta?.slug && !meta.slug.includes("[page]") ? `${FRONTEND_URL}/${meta?.slug}` : FRONTEND_URL,
    OgUrl: meta?.slug && !meta.slug.includes("[page]") ? `${FRONTEND_URL}/${meta?.slug}` : FRONTEND_URL,
    sitename: meta?.sitename || "Alliance Recruitment Agency CA",
    ogType: meta?.ogType || "article",
    ogLocale: meta?.ogLocale || 'en_US',
    Ogtitle: meta?.title || "",
    Ogdescription: meta?.description || "",
    twittertitle: meta?.title || "",
    twitterdescription: meta?.description || "",
    metaFaq: meta?.metaFaq,
    articlePublisher: "https://www.facebook.com/Alliancerecruitmentagency/",
    articlePublishedTime: meta?.articlePublishedTime,
    articleModifiedTime: meta?.articleModifiedTime,
    twitterLable1: meta.twitterLable1,
    twitterLable2: meta.twitterLable2,
    twitterData1: meta.twitterData1,
    twitterData2: meta.twitterData2,
    ogImage: meta.ogImage && {
      url: meta.ogImage?.url,
      height: meta.ogImage?.height,
      width: meta.ogImage?.width,
      type: meta.ogImage?.type,
    }
  };

  return baseMeta;
};
