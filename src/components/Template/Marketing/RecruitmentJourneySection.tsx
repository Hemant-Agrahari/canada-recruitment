import React from 'react'
import Image from "next/image";
import Link from 'next/link';

interface RecruitmentJourneySectionProps {
    setIsModalOpen: (value: boolean) => void;
    setIsCTAModalOpen?: (value: boolean) => void;
    setFormId?: (id: string) => void;
}

const RecruitmentJourneySection = ({ setIsModalOpen, setIsCTAModalOpen, setFormId }: RecruitmentJourneySectionProps) => {
    return (
        <section className="recruitment-journey-section py-4 py-md-5 pt-md-0 pb-md-0">
            <div className="container">
                <div className="recruitment-journey-wrapper text-center p-4 p-md-5 pt-md-0 bg-white rounded-4">
                    <h2 className="recruitment-journey-title mb-4 mb-md-5 px-2" style={{ color: "#006699", fontWeight: "600" }}>
                        Start Your Recruitment Journey Now
                    </h2>
                    <div className="row g-4 g-lg-5 justify-content-center">
                        {/* Job Seeker Side */}
                        <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                            <div className="journey-card h-100 d-flex flex-column">
                                <div className="journey-img mb-4 d-flex align-items-center justify-content-center" style={{ minHeight: "150px" }}>
                                    <Image
                                        src="/assets/Job Search.svg"
                                        width={200}
                                        height={150}
                                        alt="Job Search"
                                        className="img-fluid"
                                        style={{ maxHeight: "150px", objectFit: "contain" }}
                                    />
                                </div>
                                <div className="mt-auto">
                                    <Link href="/job-seekers" className="btn journey-btn btn-find-jobs w-100 mb-3 py-2 rounded-pill text-white fw-bold fs-5 shadow-sm">
                                        Find Jobs
                                    </Link>
                                    <p className="journey-desc text-muted fs-5 mb-0">
                                        I'm a <strong>candidate</strong>, <br className="d-none d-sm-block" />looking for a job
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Employer Side */}
                        <div className="col-12 col-md-6 col-lg-5 col-xl-4">
                            <div className="journey-card h-100 d-flex flex-column">
                                <div className="journey-img mb-4 d-flex align-items-center justify-content-center" style={{ minHeight: "150px" }}>
                                    <Image
                                        src="/assets/Hire talent.svg"
                                        width={200}
                                        height={150}
                                        alt="Hire Talent"
                                        className="img-fluid"
                                        style={{ maxHeight: "150px", objectFit: "contain" }}
                                    />
                                </div>
                                <div className="mt-auto">
                                    <button
                                        onClick={() => {
                                            if (setIsCTAModalOpen) {
                                                setIsCTAModalOpen(true);
                                            } else {
                                                setFormId?.("servicepage-cta-form");
                                                setIsModalOpen(true);
                                            }
                                        }}
                                        className="btn journey-btn btn-hire-talent w-100 mb-3 py-2 rounded-pill text-white fw-bold fs-5 shadow-sm"
                                    >
                                        Hire Talent Now
                                    </button>
                                    <p className="journey-desc text-muted fs-5 mb-0">
                                        I'm an <strong>employer</strong>, <br className="d-none d-sm-block" />looking for staff
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RecruitmentJourneySection