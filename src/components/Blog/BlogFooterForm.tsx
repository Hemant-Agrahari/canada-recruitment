import React, { forwardRef } from "react";
import BlogContactForm from "@/components/forms/BlogContactForm";

const BlogFooterForm = forwardRef<HTMLElement>((props, ref) => {
    return (
        <section ref={ref} className="footer-contact-form">
            <BlogContactForm
                apiEndpoint="blogSidebarFooterForm"
                type="footer"
                id="blogs-footer-form"
            />
        </section>
    );
});

BlogFooterForm.displayName = "BlogFooterForm";

export default BlogFooterForm;
