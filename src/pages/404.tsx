import React from "react";
import Link from "next/link";
import CustomHead from "@/components/Head";
import { Properties } from 'csstype';
import meta from "../meta/meta.json"

interface ErrorLoadingProps { }
const ErrorLoading: React.FC<ErrorLoadingProps> = () => {
    return (
      <>
       <CustomHead
                {...meta["404"]}
            />
        <div>   
            {/* <!-- Recruitment section start--> */}
            <section className="four-zero-four accounting-section" style={{marginTop:"80px"}}>
                <div className="container">
                    <div className="inner-con">
                        <div className="row gy-4">
                            <div className="col-lg-12 ">
                                <div className="page-not-found">
                                    <h2 className="com-title four-zero">
                                        404
                                    </h2>
                                    <h3 className="com-title" style={{textAlign:"center"}}>
                                        OOPS! PAGE NOT FOUND
                                    </h3>
                                    <p className="com-text">
                                        Sorry, The page you're looking for doesn't exist.<br /> If you think something is
                                        broken,report a problem.
                                    </p>
                                    <Link href="/" className="com-btn">
                                        Back To Home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Recruitment section End--> */}
        </div></>
    );
};
export default ErrorLoading;

