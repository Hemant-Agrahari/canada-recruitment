import { MetaProductScriptI } from "@/utils/interfaces";

export const localBusinessScript = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Alliance Recruitment Agency Canada",
  "image": "https://www.alliancerecruitmentagency.ca/assets/images/header/alliance-new-logo.png",
  "@id": "https://www.alliancerecruitmentagency.ca/",
  "url": "https://www.alliancerecruitmentagency.ca/",
  "telephone": "+17809004752",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2920 Highway 7, unit 2101",
    "addressLocality": "Vaughan",
    "addressRegion": "Ontario",
    "postalCode": "L4KOP4",
    "addressCountry": "CA"
  }
}


export const employmentAgencyScript = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  "name": "Alliance Recruitment Agency Canada - Best Staffing Agency",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2920 Highway 7, unit 2101",
    "addressLocality": "Vaughan",
    "addressRegion": "Ontario",
    "postalCode": "L4KOP4",
    "addressCountry": "CA"
  },
  "image": "https://www.alliancerecruitmentagency.ca/_next/image?url=%2Fassets%2Fimages%2Fheader%2Falliance-new-logo.png&w=256&q=75",
  "email": "sales@alliancerecruitmentagency.com",
  "telephone": "+17809004752",
  "url": "https://www.alliancerecruitmentagency.ca/",
  "description": "Alliance International is a leading recruitment agency in Canada, providing top-tier staffing solutions for industries such as IT, healthcare, and finance. Let us help you find top talent or your next career opportunity.",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "23.009720",
    "longitude": "72.502312"
  },
  "priceRange": "$"
}


export const webSiteSchema = {
  "@context": "https://schema.org/",
  "@type": "WebSite",
  "name": "Top Staffing Agencies Canada | Find Your Perfect Hire Today",
  "url": "https://www.alliancerecruitmentagency.ca/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.alliancerecruitmentagency.ca/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}


export function getRandomRatingValue(): number {
  return Number((Math.random() * (5 - 4.6) + 4.6).toFixed(2));
}

export function getRandomReviewCount(): number {
  return Math.floor(Math.random() * (450 - 150 + 1)) + 150;
}

export const dynamicMetaProductScript = ({ meta }: { meta: MetaProductScriptI }) => {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": meta.name,
    "image": meta.image,
    "description": meta.description,
    "brand": {
      "@type": "Brand",
      "name": "Alliance Recruitment Agency Canada"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": meta.aggregateRating.ratingValue,
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": meta.aggregateRating.reviewCount
    }
  }
}