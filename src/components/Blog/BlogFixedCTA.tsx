import React from "react";
import { useRouter } from "next/router";

interface BlogFixedCTAProps {
    isFormVisible: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

const BlogFixedCTA: React.FC<BlogFixedCTAProps> = ({
    isFormVisible,
    setIsModalOpen,
}) => {
    const router = useRouter();

    if (isFormVisible) return null;

    return (
        <div className="fixed-cta-wrapper">
            <div className="fixed-cta-card">
                <p className="cta-card-text">Looking to Hire?</p>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="fixed-cta-btn"
                >
                    Hire Staff
                </button>
            </div>

            <div className="fixed-cta-card">
                <p className="cta-card-text">Looking for Work?</p>
                <button
                    onClick={() => router.push("/job-seekers")}
                    className="fixed-cta-btn"
                >
                    Find a Job
                </button>
            </div>
        </div>
    );
};

export default BlogFixedCTA;
