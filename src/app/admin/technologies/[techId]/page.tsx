"use client"
import { useParams } from "next/navigation"

const page = () => {
  const params = useParams<{ techId: string }>();
  console.log(params);
  
  return (
    <div className="text-zinc-500">{params.techId}</div>
  )
}

export default page