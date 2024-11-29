import Link from "next/link";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
    return(
        <div className="text-center py-10 flex gap-9 items-center text-zinc-400 px-20">
            <Link href="#" className="cursor-pointer text-xl"><FaFacebookF /></Link>
            <Link href="#" className="cursor-pointer text-xl"><FaLinkedinIn /></Link>
            <Link href="#" className="cursor-pointer text-xl"><IoLogoTwitter /></Link>
            <Link href="#" className="cursor-pointer text-xl"><FaInstagram /></Link>
            <Link href="#" className="cursor-pointer text-xl"><FaGithub /></Link>
        </div>
    )
}