import Link from "next/link";
import Image from "next/image";
import HeroImage from "../public/hero.webp";
import { Logo } from "../components/logo";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center relative">
      <Image src={HeroImage} alt="hero" fill className="absolute"></Image>
      <div className="relative z-10 text-white px-10 py-5 max-w-screen-sm bg-teal-800/90 rounded-md backdrop-blur-sm">
        <Logo></Logo>
        <p>
          The AI-powered SAAS solution to generate SEO-optimized blog posts in
          minutes. Get high-quality content, without sacrificing your time.
        </p>
        <Link href="/post/new" className="btn">
          Begin
        </Link>
      </div>
    </div>
  );
}
