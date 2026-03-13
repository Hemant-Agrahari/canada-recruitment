import React from "react";

interface BlogFAQProps {
    faq: any[];
}

const BlogFAQ: React.FC<BlogFAQProps> = ({ faq }) => {
    if (!faq || faq.length === 0 || faq[0]?.question?.length <= 2) return null;

    return (
        <section className="faq-blog-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12 col-md-12 p-0 m-0">
                        <h2 id="faqs" className="heading_style my-4">
                            FAQs
                        </h2>
                        <div className="faq-contents">
                            <div className="accordion" id="accordionFaq">
                                {faq.map((item: any, index: any) => {
                                    return (
                                        <div
                                            className="accordion-item"
                                            key={index}
                                        >
                                            <h3 className="accordion-header">
                                                <button
                                                    className={`accordion-button ${index === 0 ? "" : "collapsed"
                                                        }`}
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#collapse${index}`}
                                                    aria-expanded={
                                                        index === 0 ? "true" : "false"
                                                    }
                                                    aria-controls={`collapse${index}`}
                                                >
                                                    <b>
                                                        Q {1 + index}.{` `}{" "}
                                                        {item.question}
                                                    </b>
                                                </button>
                                            </h3>
                                            <div
                                                id={`collapse${index}`}
                                                className={`accordion-collapse collapse ${index === 0 ? "show" : ""
                                                    }`}
                                                data-bs-parent="#accordionFaq"
                                            >
                                                <div className="accordion-body">
                                                    <b>Ans. </b>
                                                    <span
                                                        dangerouslySetInnerHTML={{
                                                            __html: item.answer,
                                                        }}
                                                    ></span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogFAQ;
