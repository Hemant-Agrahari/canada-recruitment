import React from "react";
import Link from "next/link";

const BlogBottomCTA: React.FC = () => {
    return (
        <section className="pt-50">
            <div className="new-section">
                <div className="container">
                    <div className="main-content">
                        <h2 className="mb-4">
                            Interested in finding out how Alliance can support you?
                        </h2>
                        <ul className="mb-3">
                            <li>
                                Utilize the extensive network of the finest 3.5% talent
                            </li>
                            <li>
                                Achieve hiring speeds multiplied by 10 and enjoy cost
                                benefits of up to 40%
                            </li>
                            <li>
                                Achieving a remarkable 70% success rate from initial
                                candidate interview to final selection
                            </li>
                        </ul>
                        <h3 className="mb-4">Let’s talk!</h3>
                        <Link
                            href="https://calendly.com/allianceinternationalservices/global"
                            target="_blank"
                            className="cta-btn"
                            id=""
                        >
                            Book Your Free Discovery Call
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogBottomCTA;
