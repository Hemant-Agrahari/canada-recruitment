import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface AuthorProps {
    name?: string;
    title?: string;
    company?: string;
    bio?: string;
    imageUrl?: string;
    imageAlt?: string;
    linkedinUrl?: string;
    showTitle?: boolean;
    showIcon?: boolean;
    connectButtonLink?: string;
    connectButtonText?: string;
    className?: string;
}
const Author = ({ name, title, company, bio, imageUrl, imageAlt, linkedinUrl, showTitle, showIcon, connectButtonLink, connectButtonText, className }: AuthorProps) => {
    return (
        <div className={`author-profile-section ${className}`}>
            <div className="container">
                <div className="author-profile-container">
                    <div className="author-image-wrapper">
                        {imageUrl && <Image
                            src={imageUrl}
                            alt={imageAlt || "Author"}
                            width={210}
                            height={210}
                            className="author-profile-image"
                            priority
                        />}
                    </div>
                    <div className="author-profile-card">
                        <div className="author-info-wrapper">
                            <h2 className="author-name gap-3"><Link href='/author/anish-malek'>{name}</Link> {showIcon && <span className="margin-left-3"><Link href={linkedinUrl || "#"} target="_blank" rel="noopener noreferrer">
                                <Image src="/assets/social-icons/linkedin-blue.svg" alt="LinkedIn" width={24} height={24} className="dot-indicator" />
                            </Link>
                                <Link
                                    href={`mailto:alvis@aistechnolabs.com`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image
                                        src="/assets/social-icons/gmail.svg"
                                        alt="Gmail"
                                        width={24}
                                        height={24}
                                        className="dot-indicator"
                                    />
                                </Link></span>}</h2>
                            {showTitle && (
                                <div className="author-title">
                                    {title && <Link href='/author/anish-malek'><span>{title}</span></Link>}
                                    {title && company && <span className="title-separator"> at </span>}
                                    {company && <span>{company}</span>}
                                    <Link href={linkedinUrl || "#"} target="_blank" rel="noopener noreferrer">
                                        <Image src="/assets/social-icons/linkedin-blue.svg" alt="LinkedIn" width={24} height={24} className="dot-indicator" />
                                    </Link>
                                    <Link
                                        href={`mailto:alvis@aistechnolabs.com`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/assets/social-icons/gmail.svg"
                                            alt="Gmail"
                                            width={24}
                                            height={24}
                                            className="dot-indicator"
                                        />
                                    </Link>

                                </div>
                            )}
                            <p className="author-bio">{bio}</p>

                            {connectButtonLink && (
                                <Link href={connectButtonLink} className="author-connect-btn-wrapper">
                                    <span className="author-connect-btn">
                                        {connectButtonText}
                                    </span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .author-profile-section {
          // padding: 60px 0;
          background-color: #f8f9fa;
        }

        .author-profile-container {
          background: var(--main-blue-color);
          border-radius: 20px;
          padding: 40px;
          display: flex;
          align-items: center;
          gap: 40px;
          position: relative;
          box-shadow: 0 10px 30px rgba(255, 94, 30, 0.2);
        }

        .author-image-wrapper {
          flex-shrink: 0;
          z-index: 1;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          overflow: hidden;
          border: 6px solid #fff;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .author-image-wrapper img{
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        }

        .author-profile-image {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }

        .author-profile-card {
          background-color: #fff;
          border-radius: 12px;
          padding: 40px;
          flex: 1;
        }

        .author-info-wrapper {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          color: var(--main-blue-color);
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 8px;
          font-family: 'Outfit', sans-serif;
        }
        .author-title {
          color: var(--main-blue-color);
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          line-height: 1.4;
        }

        .dot-indicator {
          width: 8px;
          height: 8px;
          background-color: #007bff;
          border-radius: 50%;
          display: inline-block;
          margin-left: 10px;
        }

        .author-bio {
          color: #555;
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .author-connect-btn-wrapper {
          text-decoration: none !important;
          display: inline-block;
          width: fit-content;
        }

        .author-connect-btn {
          display: inline-block;
          background: #034460 !important;
          color: #fff !important;
          border-radius: 8px;
          font-weight: 700;
          font-size: 18px;
          padding: 14px 28px;
          text-decoration: none !important;
          transition: all 0.3s ease;
          border: none;
        }

        .author-connect-btn:hover {
          background: #023348 !important;
          color: #fff !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(3, 68, 96, 0.3);
        }

        .author-contact-info {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .contact-item {
          margin-bottom: 8px;
          font-size: 14px;
        }

        .contact-label {
          font-weight: 600;
          color: #333;
          margin-right: 8px;
        }

        .contact-link {
          color: #034460;
          text-decoration: none;
        }

        .contact-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 1100px) {
          .author-profile-container {
            flex-direction: column;
            padding: 30px;
            text-align: center;
          }

          .author-profile-card {
            padding: 30px 20px;
          }

          .author-name {
            font-size: 32px;
          }

          .author-title {
            justify-content: center;
            font-size: 18px;
            gap: 8px;
          }

          .author-connect-btn {
            margin: 0 auto;
          }
        }

        @media (max-width: 991px) {
          .author-name {
            font-size: 28px;
          }
          .author-title {
            font-size: 16px;
          }
        }

        @media (max-width: 768px) {
          .author-name {
            font-size: 28px;
          }

          .author-title {
            font-size: 16px;
          }

          .author-bio {
            font-size: 15px;
          }
        }

        @media (max-width: 480px) {
          .author-profile-container {
            padding: 20px;
          }
        }
      `}</style>
        </div >
    )
}

export default Author