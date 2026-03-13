import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function VisitPopup() {
    const [popup, setPopup] = useState(true);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         // Check if the user has scrolled down 50 pixels or more
    //         if (window.scrollY > 50) {
    //             setPopup(false);
    //         }else if (window.scrollY < 50) {
    //             setPopup(true);
    //         }
    //     };

    //     // Attach the scroll event listener
    //     window.addEventListener('scroll', handleScroll);

    //     // Cleanup the event listener on component unmount
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    // Conditional class based on popup state
    const popupClass = popup ? 'header-top-url lazyloaded text-center' : 'hidden';

    return (
        <div id="header-top-urls" className={popupClass}>
            <p>
                For Hiring Top Remote Talent, Web and App Development, visit
                <Link className='bluetext' href="https://www.aistechnolabs.com/?utm_source=Alliance&utm_medium=Text&utm_campaign=Partnership+with+Alliance&utm_id=Partnership">
                    <b> aistechnolabs.com</b>
                </Link>
            </p>
            <span id="close-btn">
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setPopup(false)}
                ></button>
            </span>
        </div>
    );
}

export default VisitPopup;



// import Image from 'next/image'
// import Link from 'next/link'
// import React, { useState } from 'react'

// function VisitPopup() {


//     const [popup, setPopup] = useState(true)


//     return (
//         <div id="header-top-urls" className="header-top-url lazyloaded text-center"  >
//            <p> For Hiring Top Remote Talent, Web and App Development, visit <Link className='bluetext' href="https://www.aistechnolabs.com/?utm_source=Alliance&amp;utm_medium=Text&amp;utm_campaign=Partnership+with+Alliance&amp;utm_id=Partnership"> <b> aistechnolabs.com </b></Link> </p>

//             <span id="close-btn">
//                 <button type="button" className="btn-close" aria-label="Close" onClick={()=>{
//                     setPopup(false);
//                 }}></button>
//             </span>
//         </div>
//     )
// }

// export default VisitPopup