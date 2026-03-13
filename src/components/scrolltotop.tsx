// components/ScrollToTop.js

import Image from 'next/image';
import { useEffect, useState } from 'react';

const ScrollToTop = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isClient, setIsClient] = useState(false);

    const handleScroll = () => {
        const scroll = window.scrollY;
        setScrollProgress(scroll);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        // Set client-side flag to prevent hydration mismatch
        setIsClient(true);
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Don't render on server to avoid hydration mismatch
    if (!isClient) {
        return null;
    }

    return (
        <>
            <button onClick={scrollToTop} className="scroll-to-top-button" type="button" style={{ opacity: scrollProgress > 100 ? "1" : "0" }} aria-label='Scroll to top'>
                <Image alt='' src="/assets/images/scroll-top.png" width="56" height="56" />
            </button>
        </>
    );
};

export default ScrollToTop;
