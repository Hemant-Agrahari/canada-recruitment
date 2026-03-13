import Link from "next/link";
import Image from "next/image";
const MartinAlbinson = () => {
    return (
        <>
            <Image id="youtube-icon-c-level" alt="youtube-section-1" width={300} height={200} src="/assets/images/homepage/yt2.webp" loading="lazy" />
            <Link href="https://youtu.be/UpfB-fCicB8" target="_blank">
                <Image id="icon-youtube-c-level" width={140} height={100} alt="icon-youtube" src="/assets/images/homepage/yt-icon.png" loading="lazy" />
            </Link></>
    )
};

export default MartinAlbinson;
