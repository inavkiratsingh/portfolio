import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="px-20 pt-14">
      <h1 className="text-6xl font-bold tracking-widest text-zinc-100">Contact.</h1>
      <p className="text-zinc-400 py-6 leading-8">
        Get in touch or shoot me an email directly on <span className="text-zinc-200 font-bold">navs6164@gmail.com</span>
      </p>
      <div className="w-[500px]">
        <Input className="text-zinc-300 rounded-sm border-[0.1px] border-zinc-800 p-4 py-5 mb-8 focus:bg-zinc-900" placeholder="Name" />
        <Input className="text-zinc-300 rounded-sm border-[0.1px] border-zinc-800 p-4 py-5 mb-8 focus:bg-zinc-900" placeholder="Email" />
        <Textarea className="text-zinc-300 rounded-sm border-[0.1px] border-zinc-800 p-4 py-5 mb-8 bg-transparent resize-none focus:outline-none focus:ring-0 focus:border-transparent focus:border-zinc-800 focus:bg-zinc-900" placeholder="Message" rows={4} />
        <Button className="bg-zinc-300 text-zinc-700 hover-none px-10 py-7 hover:bg-zinc-300 hover:text-zinc-900 mb-8">Send Message</Button>
      </div>
      <Link href="#" className="text-zinc-400">
        <div className="mt-10 mb-4">See More About Me</div>
      </Link>
    </div>
  );
}
