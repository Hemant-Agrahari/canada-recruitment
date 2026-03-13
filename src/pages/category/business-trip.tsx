import React from 'react'
import Link from 'next/link'
import CustomHead from '@/components/Head'
import meta from "../../meta/meta.json"
const BusinessTrips = () => {
    return (
        <>
            <CustomHead
                {...meta["business-trip"]}
            />
            <div className="inner-wrapper">

                <section className="breadcrumb p07"><div><ul className="br-crumb"><li><Link href="/"><span>Home</span></Link><meta content="1" /></li></ul><span className="delimiter">›</span>Archive category: Business Trip</div></section>
                <section className="content fancy-borders-disabled  ">
                    <section className="main postlist blog-section single-all">
                        <div className="row">
                            <div className="col-md-12"><h1>Latest News &amp; Blogs</h1></div>
                            <div className="col-md-9">
                                <div className="row">
                                    {/* <!-- Start: Post --> */}
                                    <div className="col-md-6">
                                        <article id="post-7144" className="post-7144 post type-post status-publish format-standard has-post-thumbnail hentry category-business-trip entry">
                                            <span className="post-title"><Link href="/blog/what-are-the-benefits-of-using-alliance-for-hiring-cfo-for-your-business/" rel="bookmark" title="What Are The Benefits of Using Alliance For Hiring A...">What Are The Benefits of Using Alliance For Hiring A...</Link></span>
                                            <div className="tag-list">
                                                <p className="post-meta"><span className="spvc_area"><span className="spvc_icon"></span><span className="spvc_views">3491</span></span>September 2, 2022 <span>|</span> by Pallavi Chawla</p>
                                            </div>
                                            <Link href="/blog/what-are-the-benefits-of-using-alliance-for-hiring-cfo-for-your-business/"><img width="1200" height="434" src="/wp-content/uploads/2022/08/What-Are-The-Benefits-of-Using-Alliance-For-Hiring-A-CFO-For-Your-Business.jpg" className="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="What Are The Benefits of Using Alliance For Hiring A CFO For Your Business" decoding="async" sizes="(max-width: 34.9rem) calc(100vw - 2rem), (max-width: 53rem) calc(8 * (100vw / 12)), (min-width: 53rem) calc(6 * (100vw / 12)), 100vw" data-pagespeed-url-hash="804664598" /></Link>								<div className="blog-post-content"><p>When it comes to C-level recruitment, most companies hire a C-suite executive search agency. Finding the right agency makes a huge difference. Some CFO recruitment agencies just source names and[...]</p></div>
                                            <p className="more more-icon"><Link href="/blog/what-are-the-benefits-of-using-alliance-for-hiring-cfo-for-your-business/">Read more</Link></p>
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
                    {/* <!-- #main --> */}
                </section></div>
        </>
    )
}
export default BusinessTrips