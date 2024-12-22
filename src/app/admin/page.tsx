'use client'

import { AppSidebar } from "@/components/app-sidebar"
import { Projects } from "@/components/Projects"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  const params = new URLSearchParams(window.location.search);
  let newProject, projectId;
  if(params.has('new')) {
    newProject = params.get('new');  
  }
  if(params.has('projectId')) {
    projectId = params.get('projectId');
  }
  
  return (
    <SidebarProvider className="dark">
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1 text-zinc-200" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
            {newProject ? <Projects /> : <Projects projectId={projectId} />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
