import Link from "next/link";
import Image from "next/image";
const Groucher = () => {
    return (
        <>
            <Image id="youtube-icon-c-level" alt="youtube-section-1" width={420} height={200} src="/assets/images/groucher.webp" priority={false} />
            <Link prefetch={false} href="https://www.youtube.com/watch?v=13hFeGT61qg" target="_blank">
                <Image id="icon-youtube-c-level" width={140} height={100} alt="icon-youtube" src="/assets/images/homepage/yt-icon.png" priority={false} />
            </Link></>
    )
};

export default Groucher;
