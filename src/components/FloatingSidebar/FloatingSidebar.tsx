import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const FloatingSidebar = () => {
    const [countryName, setCountryName] = useState('AU');
    const [countryCode, setCountryCode] = useState('');

    // const getGeoInfo = () => {
    //     axios.get('https://ipapi.co/json/')
    //         .then((response) => {
    //             let data = response.data;
    //             setCountryName(data.country);
    //             setCountryCode(data.country_calling_code);
    //             // console.log("Countrydata",data.country)
    //             // console.log("Countrydata",data.country_calling_code)
    //         })
    //         .catch((error) => {
    //             // console.error('Error fetching geolocation:', error);
    //         });
    // };

    // useEffect(() => {
    //     getGeoInfo();
    // }, []);

    const renderPhoneNumber = () => {
        if (countryName === 'IN') {
            return '+918980018741'; // Phone number for India
        } else if (countryName === 'AU') {
            return '+1 (780) 900 4752'; // Phone number for AU
        }
        else if (countryName === 'US') {
            return '+19179009072'; // Phone number for Us
        }
        else if (countryName === 'CA') {
            return '+17809004752'; // Phone number for Ca
        }
        else {
            return '+1 (780) 900 4752'; // Default phone number
        }
    };


    return (
        <>
            <div className="sidebar-icon">
                <ul>
                    <li>
                        <a href="mailto:sales@aistalent.com">
                            <img className="lazyloaded" src="/wp-content/themes/alliancerecruitmentagency/images/email-sidebar.svg" data-src="/wp-content/themes/alliancerecruitmentagency/images/email-sidebar.svg" width="15" height="15" loading="lazy" alt="Email Icon" />
                        </a>
                        <span className="hover-txt">Write to us</span>
                    </li>
                    <li>
                        <a href="https://calendly.com/allianceinternationalservices/global" target="_blank" rel="noopener noreferrer">
                            <img className="lazyloaded" src="/wp-content/themes/alliancerecruitmentagency/images/calender.svg" data-src="/wp-content/themes/alliancerecruitmentagency/images/calender.svg" width="15" height="15" loading="lazy" alt="Calendar Icon" />
                        </a>
                        <span className="hover-txt">Book a meeting</span>
                    </li>
                    <li>
                        <Link href={`tel:${renderPhoneNumber()}`}>
                            <img className="lazyloaded" src="/wp-content/themes/alliancerecruitmentagency/images/phone-call.svg" data-src="/wp-content/themes/alliancerecruitmentagency/images/phone-call.svg" width="15" height="15" loading="lazy" alt="Phone Call Icon" />
                        </Link>
                        <span className="hover-txt india">Call us</span>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default FloatingSidebar;
