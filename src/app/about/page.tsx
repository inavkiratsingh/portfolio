export default function page() {
    const data= [
        {id:1, height: 100},
        {id:2, height: 200},
        {id:3, height: 100},
        {id:2, height: 400},
    ]
    return (
        <div className="px-20 pt-14">
            <h1 className="text-6xl font-bold tracking-tight text-zinc-100">
                About Me.
            </h1>

            <div className="py-10">
                {data.map((item) => (
                    <div key={item.id} className="flex gap-10">
                        <div style={{ height: `${item.height}px` }}>
                            <div className="timeline relative w-0 h-full bg-zinc-400 border border-zinc-500">
                                <div className="timeline-circle border-2 w-4 h-4 top-0 rounded-full absolute -translate-x-1/2 bg-black"></div>
                            </div>
                        </div>
                        <div className="text-zinc-100 ">lkdsjfklsdf</div>
                    </div>
                        
                ))}
            </div>
        
        
        </div>
    )
}