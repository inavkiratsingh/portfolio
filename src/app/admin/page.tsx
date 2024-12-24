'use client'

import { Projects } from "@/components/Projects"

export default function Page() {
  let newProject, projectId;
  if(typeof window !== "undefined"){
    const params = new URLSearchParams(window.location.search);
    if(params.has('new')) {
      newProject = params.get('new');  
    }
    if(params.has('projectId')) {
      projectId = params.get('projectId');
    }
  }
  
  return (
    
      <>
        {newProject ? <Projects /> : <Projects projectId={projectId} />}
      </>

  )
}
