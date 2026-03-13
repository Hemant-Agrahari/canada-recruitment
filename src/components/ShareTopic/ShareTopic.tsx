import { useRouter } from "next/router";
import Image from "next/image";

export default function ShareTopic() {
    const router = useRouter();
    const pathname = router.asPath;
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://www.alliancerecruitmentagency.ca";
    const pageUrl = `${baseUrl}${pathname}`;

    const copyLink = async () => {
        await navigator.clipboard.writeText(pageUrl);
        alert("Link copied to clipboard");
    };

    return (
        <div className="bg-light rounded-4 p-3">
            <div className="d-flex gap-3 align-items-center">
                {/* LinkedIn */}
                <a
                    href={`https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=${encodeURIComponent(pageUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image src="/assets/social-icons/linkedin-blue.svg" alt="LinkedIn" width="20" height={20} className="share-icon" />
                </a>

                {/* Facebook */}
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image src="/assets/social-icons/facebook-blue.svg" alt="Facebook" width="20" height={20} className="share-icon" />
                </a>

                {/* X */}
                <a
                    href={`https://twitter.com/intent/tweet?url=${pageUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="twitter-blue"
                >
                    <Image src="/assets/social-icons/twitter-1.svg" alt="X" width="20" height={20} className="share-icon" />
                </a>

                {/* Copy link */}
                <button
                    type="button"
                    className="btn btn-link p-0"
                    onClick={copyLink}
                >
                    <Image src="/assets/social-icons/link-blue.svg" alt="Copy link" width="20" height={20} className="share-icon" />
                </button>
            </div>
        </div>
    );
}
