import Link from "next/link";

export default function page() {

    const data = [
        {id:1, image: "a", title: "abc", height: 100},
        {id:2, image: "a", title: "bfgdsg", height: 300},
        {id:3, image: "a", title: "abc", height: 200}
    ]

  return (
    <div className="px-20 pt-14">
      <h1 className="text-6xl font-bold tracking-tight text-zinc-100">
        Projects.
      </h1>
      <div className="flex justify-center gap-10 text-zinc-300 items-center py-10">
        <Link href="#">
            <div className="px-5 py-2 rounded-md bg-zinc-200 text-zinc-800">All</div>
        </Link>
        <Link href="#">
            <div>Open Source</div>
        </Link>
        <Link href="#">
            <div>Designs</div>
        </Link>
        <Link href="#">
            <div>Web Servers</div>
        </Link>
      </div>

      <div className="flex flex-wrap gap-[20px]">
        {/* {data.map((item) => (
            <div key={item.id} className={`w-[calc(50%-10px)] h-[${item.height}] bg-zinc-500`}>
                {item.title}
            </div>
        ))} */}
        {data.map((item) => (
        <div
          key={item.id}
          className={`w-[calc(50%-10px)] h-[${item.height}px] bg-gray-200 relative overflow-hidden`}
        >
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
            {item.title}
          </div>
        </div>
      ))}
      </div>
      
    </div>
  );
}
