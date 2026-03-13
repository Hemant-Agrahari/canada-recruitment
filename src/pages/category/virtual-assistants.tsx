import React from "react";
import meta from "../../meta/meta.json"
import CustomHead from "@/components/Head";
import Link from "next/link";
const VirtualAssistants = () => {

    return (
        <>
            <CustomHead
                {...meta["virtual-assistants"]}
            />
            <div className="inner-wrapper">

                <section className="breadcrumb p07"><div><ul className="br-crumb"><li><Link href="/"><span>Home</span></Link><meta content="1" /></li></ul><span className="delimiter">›</span>Archive category: Virtual Assistants</div></section>
                <section className="content fancy-borders-disabled  ">
                    <section className="main postlist blog-section single-all">
                        <div className="row">
                            <div className="col-md-12"><h1>Latest News &amp; Blogs</h1></div>
                            <div className="col-md-9">
                                <div className="row">
                                    {/* <!-- Start: Post --> */}
                                    <div className="col-md-6">
                                        <article id="post-6133" className="post-6133 post type-post status-publish format-standard has-post-thumbnail hentry category-remote-hiring category-virtual-assistants entry">
                                            <span className="post-title"><Link href="/blog/virtual-onboarding-how-to-onboard-remote-employees/" rel="bookmark" title="Virtual Onboarding: How to Onboard Remote Employees?">Virtual Onboarding: How to Onboard Remote Employees?</Link></span>
                                            <div className="tag-list">
                                                <p className="post-meta"><span className="spvc_area"><span className="spvc_icon"></span><span className="spvc_views">5206</span></span>May 31, 2021 <span>|</span> by Pallavi Chawla</p>
                                            </div>
                                            <Link href="/blog/virtual-onboarding-how-to-onboard-remote-employees/">
                                                <img width="680" height="246" src="/wp-content/uploads/2021/05/virtual-onboarding-how-to-onboard-remote-employees.jpg" className="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="How to Onboard Remote Employees" decoding="async" data-pagespeed-url-hash="3268266334" /></Link>								<div className="blog-post-content"><p>Generally, the concept of onboarding relates itself with the realm of the human resources industry or staffing solution UAE that focuses on the process of introducing the newly hired employee[...]</p></div>
                                            <p className="more more-icon"><Link href="/blog/virtual-onboarding-how-to-onboard-remote-employees/">Read more</Link></p>
                                        </article>
                                    </div>
                                    {/* <!-- End: Post --> */}
                                    <div className="col-md-12">
                                        <nav className="project-nav blog-nav">
                                            <span className="prev"></span>
                                            <span className="next"></span>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                {/* <form role="search" method="get" id="searchform" action="/webblog" cr-attached="true" data-hs-cf-bound="true">
                                <div className="search-form">
                                    <input type="text" className="search-input" value="" name="s" id="s" />
                                    <input type="submit" id="searchsubmit" value="Search" />
                                </div>
                            </form> */}
                                {/* <!-- Categories --> */}
                                <div className="categories">
                                    <p className="cat-title">Categories</p>
                                    <ul className="list_val">
                                        <li className="cat_list"><Link href="/category/business-trip/">Business Trip</Link></li><li className="cat_list"><Link href="/category/contract-staffing/">Contract Staffing</Link></li><li className="cat_list"><Link href="/category/head-hunting/">Headhunting</Link></li><li className="cat_list"><Link href="/category/hiring-tips/">Hiring Tips</Link></li><li className="cat_list"><Link href="/category/human-resource/">Human Resource</Link></li><li className="cat_list"><Link href="/category/job-seekers/">Job Seekers</Link></li><li className="cat_list"><Link href="/category/launching-event/">Launching Event</Link></li><li className="cat_list"><Link href="/category/recruitment/">Recruitment</Link></li><li className="cat_list"><Link href="/category/recruitment-agencies/">Recruitment Agencies</Link></li><li className="cat_list"><Link href="/category/recruitment-process-outsourcing-rpo/">Recruitment Process outsourcing (RPO)</Link></li><li className="cat_list"><Link href="/category/recruitment-tips/">Recruitment Tips</Link></li><li className="cat_list"><Link href="/category/recruitment-trends/">Recruitment Trends</Link></li><li className="cat_list"><Link href="/category/remote-hiring/">Remote Hiring</Link></li><li className="cat_list"><Link href="/category/startups/">Startups</Link></li><li className="cat_list"><Link href="/category/tips/">Tips</Link></li><li className="cat_list"><Link href="/category/virtual-assistants/">Virtual Assistants</Link></li>		            		</ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </section></div>
            {/* <!-- #main --> */}
        </>
    );
};
export default VirtualAssistants;

