import Link from "next/link"
import Image from "next/image"
const DeepaRani = () => {
    return <>
        <Image id="youtube-icon" alt="youtube-section-4" width={300} height={200} src="/assets/images/homepage/yt4.webp" loading="lazy" />
        <Link href="https://youtu.be/YvGN5BToh_c" target="_blank">
            <Image id="icon-youtube-c-level" width={140} height={100} alt="icon-youtube" src="/assets/images/homepage/yt-icon.png" loading="lazy" />
        </Link></>
}
export default DeepaRani