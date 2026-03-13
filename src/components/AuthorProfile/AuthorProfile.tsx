import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Author from "../Author/Author";

interface AuthorProfileProps {
  showTitle?: boolean;
  showIcon?: boolean;
  className?: string;
}
const AuthorProfile: React.FC<AuthorProfileProps> = ({ showTitle = true, showIcon = false, className }) => {
  const name = "Anish Malek";
  const title = "Recruitment Expert";
  const company = "Alliance Recruitment Agency Canada";
  const bio = "Anish Malek is a recruitment expert at Alliance Recruitment Agency Canada, dedicated to helping businesses find the right talent. With years of experience in the recruitment industry, they are passionate about connecting employers with qualified candidates and supporting job seekers in their career journeys. Their focus is on building strong teams that contribute to business growth and success.";
  const imageUrl = "/assets/author.png";
  const imageAlt = "Anish Malek profile picture";
  const linkedinUrl = "https://www.linkedin.com/in/anish-malek-19ba9721b/";
  const connectButtonText = "Connect With Experts";
  const connectButtonLink = "https://calendly.com/allianceinternationalservices/global";

  return (
    <>
      <Head>
        <title>Anish Malek - Recruitment Expert at Alliance Recruitment Agency Canada</title>
        <link rel="canonical" href="https://www.alliancerecruitmentagency.ca/author/anish-malek" />
        <meta name="description" content="Anish Malek is a recruitment expert at Alliance Recruitment Agency Canada, helping employers find top talent and supporting job seekers in their career success." />
        <meta name="robots" content="index, follow" />
      </Head>
      <Author name={name} title={title} company={company} bio={bio} imageUrl={imageUrl} imageAlt={imageAlt} linkedinUrl={linkedinUrl} showTitle={showTitle} showIcon={showIcon} connectButtonLink={connectButtonLink} connectButtonText={connectButtonText} className={className} />
    </>
  );
};

export default AuthorProfile;

