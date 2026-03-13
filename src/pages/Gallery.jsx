import React from 'react'
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
// import './galery.css'

export default function Gallery() {

    return (
        < section className='d-flex '>
            <div className='d-flex'>
                <LightGallery
                    plugins={[lgThumbnail, lgZoom]}
                >
                    <a className='res' href="/assets/images/header/a-logo.svg">
                        <img alt="img2" src="/assets/images/header/a-logo.svg" />
                    </a>
                    <a className='res' href="/assets/images/header/a-logo.svg">
                        <img alt="img2" src="/assets/images/header/a-logo.svg" />
                    </a>
                    <a className='res' href="/assets/images/header/a-logo.svg">
                        <img alt="img2" src="/assets/images/header/a-logo.svg" />
                    </a>
                    <a className='res' href="images/greenGirl.jpg">
                        <img alt="img1" src="images/greenGirl.jpg" />
                    </a>

                </LightGallery>
            </div>
            <div>
                <LightGallery>
                    <a className='res' href="images/greenGirl.jpg">
                        <img alt="img1" src="images/greenGirl.jpg" />
                    </a>
                </LightGallery>
            </div>
            <div>
                <LightGallery>
                    <a className='res' href="images/greenGirl.jpg">
                        <img alt="img1" src="images/greenGirl.jpg" />
                    </a>
                </LightGallery>
            </div>
        </section>
    )
}

