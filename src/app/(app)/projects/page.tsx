'use client'
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import ProjectCards from "@/components/ProjectCards";

export default function page() {
  const [projects, setProjects] = useState([]);
  const [projects1, setProjects1] = useState([]);
  const fetchAllProject = async () => {
    try {
      const response = await axios.get(
        `/api/get-allprojects`
      );
      const projects = response.data.data;
      let mid = Math.floor((projects.length / 2)+1);
      const firstHalf = projects.slice(0, mid);
      const secondHalf = projects.slice(mid);
      setProjects(firstHalf);
      setProjects1(secondHalf);
      console.log(projects);
      
      
    } catch (error) {
      console.log(error);      
    } 
  };

  useEffect(() => {
    fetchAllProject();
  }, [])
  

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
        <div className={`w-[calc(50%-10px)]`}>
          {projects.map((project:any) => (
            <ProjectCards key={project?._id} data={project} />
          ))}
        </div>

        <div className={`w-[calc(50%-10px)]`}>
          {projects1.map((project:any) => (
            <ProjectCards key={project?._id} data={project} />
          ))}
        </div>
      </div>
      
    </div>
  );
}
