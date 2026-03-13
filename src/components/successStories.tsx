import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MartinAlbinson from './clientTestimonials/MartinAlbinson';
import DeepaRani from './clientTestimonials/DeepaRani';
import GaryMorris from './clientTestimonials/GaryMorris';
import MathewAnderson from './clientTestimonials/MathewAnderson';
function SuccessStories() {

    return (
        <>
            <section className="our-succes">
                <h2 className="com-title">Our Success Stories</h2>
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <div className="our-succestab mx-auto">
                            <ul className="nav nav-pills" id="our-succes-pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                     <button
                                        className="nav-link active"
                                        id="our-succes-pills-home-tab"
                                        data-bs-toggle="pill"
                                        data-bs-target="#our-succes-pills-home"
                                        type="button"
                                        role="tab"
                                        aria-controls="our-succes-pills-home"
                                        aria-selected="true"
                                    >
Our Client</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="our-succes-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#our-succes-pills-profile" type="button" role="tab" aria-controls="our-succes-pills-profile" aria-selected="false">Our Franchise Owner</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="site-testimonial">
                        <div className="tab-content" id="our-succes-pills-tabContent">
                            <div className="tab-pane fade show active" id="our-succes-pills-home" role="tabpanel" aria-labelledby="our-succes-pills-home-tab">
                                <div className="row g-md-5 g-4 our-success-slider for-mobile mx-0">
                                    <div className="col-md-4">
                                        <div className="succes-story-card">

                                            <div className="story-img">
                                                <Image id="youtube-icon" alt="youtube-section-1" width={300} height={400} src="/assets/images/homepage/yt1.webp" loading="lazy" />
                                                <Link href="https://www.youtube.com/watch?v=SP-tY9KyeyQ" target="_blank">
                                                    <Image id="icon-youtube-c-level" width={140} height={400} alt="icon-youtube" src="/assets/images/homepage/yt-icon.png" loading="lazy" />
                                                </Link>
                                            </div>
                                            <div className="story-body">
                                                <h3 className="story-head">Testimonial - Gary Morris</h3>
                                                <p className="story-desc com-pera">We help this international company by providing workers both near their offices and far away in other countries. We work in many places around the world to meet their needs. Click to see what results we’ve achieved!</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="succes-story-card">

                                            <div className="story-img">
                                                <MartinAlbinson />
                                            </div>
                                            <div className="story-body">
                                                <h3 className="story-head">Testimonial - Martin Albinson</h3>
                                                <p className="story-desc com-pera">We help this global company find top leaders and other staff for different jobs. Our way of working makes sure they get the best people. Click to learn how our client has benefited.
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="succes-story-card">

                                            <div className="story-img">
                                                <Image id="youtube-icon" alt="youtube-section-3" width={300} height={400} src="/assets/images/homepage/yt3.webp" loading="lazy" />
                                                <Link href="https://www.youtube.com/watch?v=SP-tY9KyeyQ" target="_blank">
                                                    <Image id="icon-youtube-c-level" width={140} height={400} alt="icon-youtube" src="/assets/images/homepage/yt-icon.png" loading="lazy" />
                                                </Link>
                                            </div>
                                            <div className="story-body">
                                                <h3 className="story-head">Testimonial - Matthew Anderson</h3>
                                                <p className="story-desc com-pera">We provide a special hiring service called RPO to this company. This helps them find great candidates for many jobs faster and easier. Click to hear what the client says about working with us.</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="tab-pane fade" id="our-succes-pills-profile" role="tabpanel" aria-labelledby="our-succes-pills-profile-tab">
                                <div className="row g-md-5 our-success-slider for-mobile mx-0">
                                    <div className="col-md-4 mx-auto">
                                        <div className="succes-story-card">

                                            <div className="story-img">
                                                <DeepaRani />
                                            </div>
                                            <div className="story-body">
                                                <p className="story-head">Testimonial - Deepa Rani</p>
                                                <p className="story-desc com-pera">As one of our valued recruitment franchise partners, her experience highlights the strength of our collaboration and the remarkable success we’ve achieved together.
 </p>
                                            </div>

                                        </div>
                                    </div>

                                </div>


                            </div>
                        </div>

                    </div>
                    <input type="hidden" name="testimonial_status" id="testimonial_status" value="0" />
                </div>
            </section>
        </>
    );
}
export default SuccessStories;
