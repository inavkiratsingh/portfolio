'use client'
import axios from "axios";
import { useEffect, useState } from "react";

const divideProject = {

}

export default function page() {
    const [categorizedData, setCategorizedData] = useState({
        Study: [],
        Skill: [],
        Experience: [],
    });
    const fetchAabout = async () => {
        try {
            const response = await axios.get(
                `/api/get-allabout`
            );
            const about = response.data.data;
            const grouped = about.reduce(
                (acc: any , item: any) => {
                acc[item.type] = [...(acc[item.type] || []), item];
                return acc;
                },
                { Study: [], Skill: [], Experience: [] }
            );
            setCategorizedData(grouped);
          
        } catch (error) {
          console.log(error);      
        } 
    };

    useEffect(() => {
        fetchAabout();
    }, [])
    
    const data= [
        {id:1, height: 100},
        {id:2, height: 200},
        {id:3, height: 100},
        {id:2, height: 400},
    ]
    return (
        <div className="px-20 pt-14">
            <h1 className="text-6xl font-bold tracking-tighter text-zinc-100">
                About Me.
            </h1>

            <div className="py-10">
                <h1 className="text-xl font-bold tracking-tight text-zinc-300 mb-10">Study.</h1>
                {categorizedData.Study.map((item:any) => (
                    <div key={item._id} className="flex gap-10">
                        <div>
                            <div className="timeline relative w-0 h-full bg-zinc-400 border border-zinc-500">
                                <div className="timeline-circle border-2 w-4 h-4 top-0 rounded-full absolute -translate-x-1/2 bg-black"></div>
                            </div>
                        </div>
                        <div className="text-zinc-100 mb-10 w-full">
                            <div className="flex justify-between items-end mb-4">
                                <h1 className="text-xl font-bold">{item.title}.<span className="text-sm"> ({item.start}-{item.end})</span></h1>
                                <a href={item.link.split('-')[1]}>{item.link.split('-')[0]}</a>
                            </div>
                            <p className="text-md">{item.description}</p>
                        </div>
                    </div>
                        
                ))}
            </div>

            <div className="py-10">
                <h1 className="text-xl font-bold tracking-tight text-zinc-300 mb-10">Skill.</h1>
                {categorizedData.Skill.map((item:any) => (
                    <div key={item._id} className="flex gap-10">
                        <div>
                            <div className="timeline relative w-0 h-full bg-zinc-400 border border-zinc-500">
                                <div className="timeline-circle border-2 w-4 h-4 top-0 rounded-full absolute -translate-x-1/2 bg-black"></div>
                            </div>
                        </div>
                        <div className="text-zinc-100 mb-10 w-full">
                            <div className="flex justify-between items-end mb-4">
                                <h1 className="text-xl font-bold">{item.title}.<span className="text-sm"> ({item.start}-{item.end})</span></h1>
                                <a href={item.link.split('-')[1]}>{item.link.split('-')[0]}</a>
                            </div>
                            <p className="text-md">{item.description}</p>
                        </div>
                    </div>
                        
                ))}
            </div>

            <div className="py-10">
                <h1 className="text-xl font-bold tracking-tight text-zinc-300 mb-10">Experience.</h1>
                {categorizedData.Experience.map((item:any) => (
                    <div key={item._id} className="flex gap-10">
                        <div>
                            <div className="timeline relative w-0 h-full bg-zinc-400 border border-zinc-500">
                                <div className="timeline-circle border-2 w-4 h-4 top-0 rounded-full absolute -translate-x-1/2 bg-black"></div>
                            </div>
                        </div>
                        <div className="text-zinc-100 mb-10 w-full">
                            <div className="flex justify-between items-end mb-4">
                                <h1 className="text-xl font-bold">{item.title}.<span className="text-sm"> ({item.start}-{item.end})</span></h1>
                                <a href={item.link.split('-')[1]}>{item.link.split('-')[0]}</a>
                            </div>
                            <p className="text-md">{item.description}</p>
                        </div>
                    </div>
                        
                ))}
            </div>
        
        
        </div>
    )
}