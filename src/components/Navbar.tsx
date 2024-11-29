import Link from "next/link";
import logo from "/public/logo.png";
import logo1 from "/public/logo1.png";
import Image from "next/image";

export default function Navbar() {
    return(
        <div className="text-center py-10 flex justify-between items-center">
            <Link href="/">
                <div className="logo">
                    <Image src={logo1} alt="logo" width={120} height={120}></Image>
                </div>
            </Link>
            <div className="links flex gap-10 text-zinc-400">
                <Link href="/projects" className="cursor-pointer">Projects</Link>
                <Link href="/about" className="cursor-pointer">About</Link>
                <Link href="/contact" className="cursor-pointer">Contact</Link>
            </div>
        </div>
    )
}