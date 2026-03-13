

import Link from "next/link";
import Image from "next/image";
const EmilyGabon = () => {
    return (
        <>
            <Image id="youtube-icon-c-level" alt="Alliance International Review by Emily Gabon" width={420} height={200} src="/assets/images/homepage/emily-gabon.webp" loading="lazy" />
            <Link href="https://www.youtube.com/embed/_nA-LMgyTyE" target="_blank">
                <Image id="icon-youtube-c-level" width={140} height={100} alt="icon-youtube" src="/assets/images/homepage/yt-icon.png" loading="lazy" />
            </Link></>
            
    )
};

export default EmilyGabon;
