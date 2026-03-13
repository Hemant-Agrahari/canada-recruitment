import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface ExploreWithAIProps {
    postUrl: string;
    postTitle: string;
}

const ExploreWithAI = ({ postTitle }: ExploreWithAIProps) => {
    const router = useRouter();
    const pathname = router.asPath;
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://www.alliancerecruitmentagency.ca";
    const pageUrl = `${baseUrl}${pathname}`;

    const prompt = `Visit this URL and summarize the post for me: ${pageUrl}`;
    const encodedPrompt = encodeURIComponent(prompt);

    return (
        <div className="mt-4">
            <p className="fw-semibold mb-2">Explore this post with:</p>

            <div className="d-flex flex-wrap gap-2">
                <a
                    href={`https://www.perplexity.ai/search?q=${encodedPrompt}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm rounded-pill text-white"
                    style={{ backgroundColor: "#6f2cff" }}
                >
                    Perplexity
                </a>

                <a
                    href={`https://chat.openai.com/?q=${encodeURIComponent(`Summarize this post: ${postTitle} - ${pageUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-success rounded-pill text-white"
                >
                    ChatGPT
                </a>

                <a
                    href={`https://grok.com/?q=${encodeURIComponent(`Summarize this post: ${postTitle} - ${pageUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-dark rounded-pill text-white"
                >
                    Grok
                </a>

                <a
                    href={`https://www.google.com/search?udm=50&aep=11&q=${encodeURIComponent(`Summarize this post: ${pageUrl}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary rounded-pill text-white"
                >
                    Google AI
                </a>
            </div>
        </div>
    );
};

export default ExploreWithAI;
