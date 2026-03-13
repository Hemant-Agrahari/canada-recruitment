import React from 'react'
// import "./franchiseEnquiry.css"
import data from "@/utils/data.json"
import Link from 'next/link'
// const FranchisePreview = ({ data }: any) => {
const FranchisePreview = ({ data }: any) => {
  console.log(data)
  return (
    <>
      <div className="franchise-enquiry-wrapper   ">
        {data?.bannerContent && data?.bannerTitle &&
          <section className="main-banner py-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <h1>{data?.bannerTitle}</h1>
                  <p className="com-para" dangerouslySetInnerHTML={{ __html: data?.bannerContent }}></p>
                </div>
                <div className="col-lg-6">
                  {/* <img
                    data-src="/assets/images/hr-join-our-hR-franchise.webp"
                    src={`${data?.bannerImage}`}
                    alt={`${data?.bannerImageDetails.alt}`}
                    title={`${data?.bannerImageDetails.title}`}
                    height={500}
                    width={750}
                    className="img-fluid w-100"
                    loading="lazy"
                  /> */}
                  {data?.bannerImage &&
                    <img
                      className="img-fluid w-100"
                      loading="lazy"
                      alt={`${data?.bannerImageDetails.alt}`}
                      title={`${data?.bannerImageDetails.title}`}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${data?.bannerImage}`}
                      width={567}
                      height={719}
                    />
                  }
                </div>
              </div>
            </div>
          </section>
        }
        {/* <FranchiseCommonForm /> */}
        {data?.cta1?.ctaTitle &&
          <section className="start-with-us py-60 my-60 mb-0">
            <div className="container">
              <h2 className="com-title text-center pb-3">
                {data?.cta1?.ctaTitle}
              </h2>
              <div className="contact-us-btn text-center"  >
                <Link
                  href={`${data?.cta1.ctaBtnLink}`}
                >
                  {data?.cta1.ctaBtnTitle}
                </Link>
              </div>
            </div>
          </section>
        }
        {data?.content[0]?.contentImage &&
          <section className="card-img-text py-60 pb-0">
            <div className="container">
              <div className="row gy-4 pb-3">
                <div className="col-lg-6 align-self-center">
                  {data?.content[0]?.contentImage &&
                    <img
                      className="img-fluid w-100"
                      loading="lazy"
                      title={`${data?.content[0]?.imageTitle}`}
                      alt={`${data?.content[0]?.imageAlt}`}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data?.content[0]?.contentImage}`}
                      width={567}
                      height={719}
                    />
                  }
                </div>
                <div className="col-lg-6 ">
                  <h2 className="com-title text-start mt-0 mb-3">
                    {data?.content[0]?.contentTitle}
                  </h2>
                  <p className="com-para" dangerouslySetInnerHTML={{ __html: data?.content[0]?.contentText }}>
                  </p>
                </div>
              </div>
            </div>
          </section>
        }
        {data?.franchiseSupport[0]?.contentTitle &&
          <section className="we-can-join-us franchise-support py-60">
            <div className="container">
              <ul className="join-us-ul">
                {data?.franchiseSupport?.length > 0 ? (
                  data?.franchiseSupport.map((support: any, index: any) => (
                    <li className="join-us-li" key={index}>
                      <div className="number">{index + 1}</div>
                      <div className="text-start">
                        <div className="small-title text-start">{support.contentTitle}</div>
                        <p className="com-para" dangerouslySetInnerHTML={{ __html: support.contentDesp }}></p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="join-us-li">
                    <div className="text-start">
                      <p className="com-para">No franchise support information available.</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </section>
        }
        {data?.franchiseSupport2?.franchiseSupportTitle &&
          <section className="we-can-join-us franchise-support Common-Challenges py-60">
            <div className="container">
              <h2 className="com-title text-center py-3 mt-0 pt-0">
                {data?.franchiseSupport2?.franchiseSupportTitle}
              </h2>
              <ul className="join-us-ul">
                {data?.franchiseSupport2?.ListItems?.length > 0 ? (
                  data?.franchiseSupport2.ListItems.map((item: any, index: any) => (
                    <li className="join-us-li" key={index}>
                      <div className="number">
                        <noscript>
                          <img src="/assets/images/right-icons.svg" />
                        </noscript>
                        <img
                          className="lazyload"
                          src="/assets/images/right-icons.svg"
                          data-src="/assets/images/right-icons.svg"
                          alt={`Challenge icon ${index + 1}`} // Optional: alt attribute for accessibility
                        />
                      </div>
                      <div className="text-start">
                        <div className="small-title text-start">{item.contentTitle}</div>
                        <p className="com-para" dangerouslySetInnerHTML={{ __html: item.contentDesp }}></p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="join-us-li">
                    <div className="text-start">
                      <p className="com-para">No common challenges information available.</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </section>}
        {data?.cta2?.ctaTitle &&
          <section className="start-with-us py-60 my-60 mb-0">
            <div className="container">
              <h2 className="com-title text-center pb-3">
                {data?.cta2.ctaTitle}

              </h2>
              <div className="contact-us-btn text-center"  >
                <Link
                  href={`${data?.cta2.ctaBtnLink}`}
                >
                  {data?.cta2.ctaBtnTitle}
                </Link>
              </div>
            </div>
          </section>
        }
        {data?.franchiseSupport3 &&
          <section className="we-can-join-us franchise-support Common-Challenges py-60">
            <div className="container">
              <h2 className="com-title text-center py-3">
                {data?.franchiseSupport3.franchiseSupportTitle}
              </h2>
              <ul className="join-us-ul">
                {data?.franchiseSupport3.ListItems.map((item: any, index: any) => (
                  <li className="join-us-li" key={index}>
                    <div className="number">
                      <noscript>
                        <img src="/assets/images/right-icons.svg" />
                      </noscript>
                      <img
                        className="lazyload"
                        src="/assets/images/right-icons.svg"
                        data-src="/assets/images/right-icons.svg"
                      />
                    </div>
                    <div className="text-start">
                      <div className="small-title text-start">{item.contentTitle}</div>
                      <p className="com-para" dangerouslySetInnerHTML={{ __html: item.contentDesp }}></p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        }
        {data?.content2[0]?.contentTitle &&
          <section className="card-img-text py-60 pb-0">
            <div className="container">
              <div className="row gy-4 pb-3">
                <div className="col-lg-6 align-self-center">
                  <h2 className="com-title text-start mt-0 mb-3">
                    {data?.content2[0]?.contentTitle}
                  </h2>
                  <p className="com-para" dangerouslySetInnerHTML={{ __html: data?.content2[0]?.contentText }}>

                  </p>
                </div>
                <div className="col-lg-6 align-self-center">
                  {data?.content2[0]?.contentImage &&
                    <img
                      className="img-fluid w-100"
                      loading="lazy"
                      title={`${data?.content2[0]?.imageTitle}`}
                      alt={`${data?.content2[0]?.imageAlt}`}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data?.content2[0]?.contentImage}`
                      }
                      width={567}
                      height={719}
                    />
                  }
                </div>
              </div>
            </div>
          </section>
        }
        {data?.content3[0]?.contentTitle &&
          <section className="card-img-text py-60 pb-0">
            <div className="container">
              <div className="row gy-4 pb-3">
                <div className="col-lg-6 align-self-center">
                  {data?.content3[0]?.contentImage &&
                    <img
                      className="img-fluid w-100"
                      loading="lazy"
                      title={`${data?.content3[0]?.imageTitle}`}
                      alt={`${data?.content3[0]?.imageAlt}`}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data?.content3[0]?.contentImage}`
                      }
                      width={567}
                      height={719}
                    />
                  }
                </div>
                <div className="col-lg-6 align-self-center">
                  <h2 className="com-title text-start mt-0 mb-3">
                    {data?.content3[0]?.contentTitle}
                  </h2>
                  <p className="com-para" dangerouslySetInnerHTML={{ __html: data?.content3[0]?.contentText }}>
                  </p>
                </div>
              </div>
            </div>
          </section>
        }
        <section className="count-number-sec py-60">
          <div className="container">
            <div className="row">
              <div className="col-6 col-lg-3">
                <div className="count-nuber">12,000 +</div>
                <p className="com-para text-center">
                  Recruitment Assignments Completed
                </p>
              </div>
              <div className="col-6 col-lg-3">
                <div className="count-nuber">8,000 +</div>
                <p className="com-para text-center"> Satisfied Clients</p>
              </div>
              <div className="col-6 col-lg-3">
                <div className="count-nuber">25 +</div>
                <p className="com-para text-center">
                  Countries Recognized Presence in
                </p>
              </div>
              <div className="col-6 col-lg-3">
                <div className="count-nuber">16 +</div>
                <p className="com-para text-center"> years of experience</p>
              </div>
            </div>
          </div>
        </section>
        {data?.cta3?.ctaTitle &&
          <section className="start-with-us py-60 my-60 mb-0">
            <div className="container">
              <h2 className="com-title text-center pb-3">
                {data?.cta3.ctaTitle}
              </h2>
              <div className="contact-us-btn text-center"  >
                <Link
                  href={`${data?.cta3.ctaBtnLink}`}
                >
                  {data?.cta3.ctaBtnTitle}
                </Link>
              </div>
            </div>
          </section>
        }
        {data?.content4?.contentTitle &&
          <section className="comprehensive-support py-60 pt-0">
            <div className="container">
              <h2 className="com-title text-center pb-4">
                {data?.content4.contentTitle}
              </h2>
              <p className="com-para" dangerouslySetInnerHTML={{ __html: data?.content4.contentDesp }}>

              </p>
              <div className="row g-3 mt-1">
                {data?.content4.card.length > 0 ? (
                  data?.content4.card.map((item: any, index: any) => (
                    <div className="col-12 col-lg-4" key={index}>
                      <div className="comprehensive-support-card text-center">
                        {item.cardImg &&
                          <img
                            className="lazyload"
                            loading="lazy"
                            height="54"
                            width="54"
                            title={`${item.cardimgTitle}`}
                            alt={`${item.cardimgAlt}`}
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item.cardImg}`
                            }
                          />
                        }
                        <div className="small-title mt-2">{item.cardTitle}</div>
                        <p className="com-para" dangerouslySetInnerHTML={{ __html: item.cardDesp }}></p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <p className="com-para text-center">No cards available.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        }
        {data?.cta4?.ctaTitle &&
          <section className="start-with-us py-60 my-60 mb-0">
            <div className="container">
              <h2 className="com-title text-center pb-3">
                {data?.cta4.ctaTitle}
              </h2>
              <div className="contact-us-btn text-center"  >
                <Link
                  href={`${data?.cta4.ctaBtnLink}`}
                >
                  {data?.cta4.ctaBtnTitle}
                </Link>
              </div>
            </div>
          </section>
        }
      </div>
    </>
  )
}

export default FranchisePreview