import PasskeyModal from "@/components/PasskeyModal";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


export default function page() {  
  const searchParams = useSearchParams();
  const isAdmin = searchParams.get('admin');  

  return (

    
    
    <div className="px-20 pt-14">
      {isAdmin && <PasskeyModal />}
      <h1 className="text-6xl uppercase tracking-widest text-zinc-100">I'm Navkirat Singh</h1>
      <p className="text-zinc-400 py-6 leading-8">
        
        Your friendly neighborhood frontend developer, UX architect, and
        JavaScript engineer. I spend my days (and often nights) painting the
        Internet canvas with Projects and lines of code, turning zeroes and ones
        into immersive, interactive experiences, <br /><br />Bona fide photochromic Lens
        enthusiast - sunlight or indoors, I've got it covered. I tread the path
        of minimalism, finding beauty in simplicity and order. When I'm not
        crafting beautiful web experiences, you can find me reading Articles or
        swaying to the rhythm of Pop Music & Jazz, losing myself in the
        captivating flow of melodies. anyways you can Contact Me
      </p>
      <Link href="#" className="text-zinc-400">
        <div className="pt-7">See More About Me</div>
      </Link>
    </div>
  );
}
