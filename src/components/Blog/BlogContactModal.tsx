import React from "react";
import BlogContactForm from "@/components/forms/BlogContactForm";

interface BlogContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const BlogContactModal: React.FC<BlogContactModalProps> = ({
    isOpen,
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay blog-contact-form-modal" onClick={onClose}>
            <div
                className="modal-content"
                style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    maxWidth: "800px",
                    width: "100%",
                    height: "initial",
                    overflow: "auto",
                    position: "relative",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                    padding: "30px",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="blog-close-modal"
                    aria-label="Close modal"
                >
                    ×
                </button>

                <BlogContactForm
                    apiEndpoint="blogSidebarFooterForm"
                    onSuccess={onClose}
                    type="sidebar"
                    id="blogs-sidebar-form"
                />
            </div>
        </div>
    );
};

export default BlogContactModal;
