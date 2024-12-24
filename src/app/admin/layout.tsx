'use client'
import { AppSidebar } from "@/components/app-sidebar"
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
import './globals.css'
import { useEffect, useState } from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [path, setPath] = useState<string []>([]);
  useEffect(() => {
    if(typeof window !== "undefined"){
      const params = new URLSearchParams(window.location.search);
      const pathParts = window.location.pathname.split("/").filter((part) => part);
      if(params.has('new')) {
        pathParts[1] = 'new Project'
      }
      if(params.has('projectId')) {
        pathParts[1] = params.get('projectId') || "unknown";
      }
      setPath(pathParts);
    }
  }, [])
  
  

  return (
    <html lang="en">
      <body className="bg-zinc-950">
        

        <SidebarProvider className="dark">
          <AppSidebar />
          <SidebarInset>
            <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1 text-zinc-200" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/admin">
                      admin
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{path[1]}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
                {children}
            </div>
          </SidebarInset>
        </SidebarProvider>

      </body>
    </html>
  );
}
