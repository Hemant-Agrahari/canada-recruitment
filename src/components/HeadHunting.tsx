

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
function HeadHunting() {

    return (
        <>
            <section className="headhunting " >
                <div className="container-fluid c-pad-x mb-50 " style={{ paddingBottom: "50px !important" }}>
                <div className="row">
                    <div className="col-lg-3">
                        <h2 className="com-title text-align-left">Headhunting In</h2>
                    </div>
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-4 col-sm-6">
                                <Link href="/c-level-recruitment-agency/">
                                    <div className="icon-des">

                                        <span className="icons c-headhun-icon1">
                                            {/* <!-- <Image src="../common/images/C-Level.svg" alt="C - Leve" title="C - Leve"
                                                        loading="lazy"  className="w-100 h-100"> --> */}
                                        </span>
                                        <h3>C - Level</h3>

                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <Link href="/healthcare-recruitment-agencies-in-dubai/">
                                    <div className="icon-des">


                                        <span className="icons c-headhun-icon2">
                                            {/* <!-- <Image src="../common/images/healthcare-doctor-svgrepo-com.svg" alt="Healthcare & Doctor"
                                                        title="Healthcare & Doctor" loading="lazy"  className="w-100 h-100"> --> */}
                                        </span>
                                        <h3>Healthcare & Doctor</h3>

                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <Link href="/retail-recruitment-agencies-in-dubai/">
                                    <div className="icon-des">

                                        <span className="icons c-headhun-icon3">
                                            {/* <!-- <Image src="../common/images/Retail-Marketing.svg" alt="Retail & Marketing"
                                                        title="Retail & Marketing" loading="lazy"  className="w-100 h-100"> --> */}
                                        </span>
                                        <h3>Retail & Marketing</h3>

                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <Link href="/teacher-recruitment-agencies-in-dubai/">
                                    <div className="icon-des">

                                        <span className="icons c-headhun-icon4">
                                            {/* <!-- <Image src="../common/images/Educational-Industry.svg" alt="Educational Industry" title="Educational Industry" loading="lazy"
                                                         className="w-100 h-100"> --> */}
                                        </span>
                                        <h3>Educational Industry</h3>

                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <Link href="/executive-chef-dubai/">
                                    <div className="icon-des">

                                        <span className="icons c-headhun-icon5">
                                            {/* <!-- <Image src="../common/images/All-Chef.svg" alt="All Chef" title="All Chef"
                                                        loading="lazy"  className="w-100 h-100"> --> */}
                                        </span>
                                        <h3>All Chef</h3>

                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <Link href="/hotel-recruitment-agency-dubai/">
                                    <div className="icon-des">

                                        <span className="icons c-headhun-icon6">
                                            {/* <!-- <Image src="../common/images/Hotel-Restoraunt.svg" alt="Hotel & Restoraunt" title="Hotel & Restoraunt" loading="lazy"
                                                         className="w-100 h-100"> --> */}
                                        </span>
                                        <h3>Hotel & Restaurant</h3>

                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <Link href="/it-recruitment-agency-dubai/">
                                    <div className="icon-des">

                                        <span className="icons c-headhun-icon7">
                                            {/* <!-- <Image src="../common/images/information-technology.svg" alt="information-technology"
                                                        title="information-technology" loading="lazy"  className="w-100 h-100"> --> */}
                                        </span>
                                        <h3>Information-Technology</h3>

                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <Link href="/engineering-recruitment-agencies-in-dubai/">
                                    <div className="icon-des">

                                        <span className="icons c-headhun-icon8">
                                            {/* <!-- <Image src="../common/images/engineering.svg" alt="engineering" title="engineering"
                                                        loading="lazy"  className="w-100 h-100"> --> */}
                                        </span>
                                        <h3>Engineering</h3>

                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <Link href="/banking-recruitment-agencies-in-dubai/">
                                    <div className="icon-des">

                                        <span className="icons c-headhun-icon9">
                                            {/* <!-- <Image src="../common/images/banking-finance.svg" alt="banking & finance"
                                                        title="banking & finance" loading="lazy"  className="w-100 h-100"> --> */}
                                        </span>
                                        <h3>Banking & Finance</h3>

                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
        </>
    );
}
export default HeadHunting;
