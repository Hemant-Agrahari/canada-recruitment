import React from "react";

interface MarketingFaqProps {
  faq: any[];
}

const MarketingFaq = ({ faq }: MarketingFaqProps) => {
  if (!faq || !Array.isArray(faq) || faq.length === 0) {
    return null;
  }

  return (
    <section className="faq-section">
      <div className="container">
        <h2 className="com-title mb-4">Frequently Asked Questions</h2>

        <div className="accordion" id="accordionFaq">
          {faq.map((item: any, index: any) => {
            return (
              <React.Fragment key={index}>
                <div className="accordion-item">
                  <h3 className="accordion-header">
                    <button
                      className={`accordion-button ${
                        index === 0 ? "" : "collapsed"
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                      aria-expanded={index === 0 ? "true" : "false"}
                      aria-controls={`collapse${index}`}
                    >
                      {item.question || ""}
                    </button>
                  </h3>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${
                      index === 0 ? "show" : ""
                    }`}
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body">
                      {item.answer || ""}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MarketingFaq;
