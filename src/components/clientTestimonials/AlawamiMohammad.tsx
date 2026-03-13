import Link from "next/link"
import Image from "next/image"
const AlawamiMohammad = () => {
    return <>
        <Image id="youtube-icon-c-level" alt="youtube-section-1" width={420} height={200} src="/assets/images/homepage/alawami-mohammed-youtube-thumbnail.webp" loading="lazy" />
        <Link href="https://www.youtube.com/watch?v=13hFeGT61qg" target="_blank">
            <Image id="icon-youtube-c-level" width={140} height={100} alt="icon-youtube" src="/assets/images/homepage/yt-icon.png" loading="lazy" />
        </Link>
    </>
}
export default AlawamiMohammad