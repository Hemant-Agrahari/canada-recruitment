import Link from "next/link";
import Image from "next/image";
const MathewAnderson = () => {
    return (
        <>
            <Image id="youtube-icon-c-level" alt="youtube-section-1" width={300} height={200} src="/assets/images/homepage/yt3.webp" loading="lazy" />
            <Link href="https://www.youtube.com/watch?v=2YOSlnB-rbY" target="_blank">
                <Image id="icon-youtube-c-level" width={140} height={100} alt="icon-youtube" src="/assets/images/homepage/yt-icon.png" loading="lazy" />
            </Link></>
    )
};

export default MathewAnderson;
