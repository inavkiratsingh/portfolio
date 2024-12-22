'use client'

import * as React from "react"
import { ChevronRight } from "lucide-react"
import axios from "axios"
import { SearchForm } from "@/components/search-form"
// import { VersionSwitcher } from "@/components/version-switcher"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useEffect } from "react"


const truncateTitle = (title: string, maxLength: number) => {
  return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [itmesApp, setItemsApp] = React.useState<any[]>([]);
  const fetchAllProject = async () => {
    try {
      const response = await axios.get(
        `/api/get-allprojects`
      );
      const projects = response.data.data;
      const items = projects.map((project: any) => ({
        title: truncateTitle(project.title, 25),
        url: `/admin/?projectId=${project._id}`,
      }));
  
      setItemsApp([
        { title: "Add New Project", url: "/admin/?new=true" },
        ...items,
      ]);
      
    } catch (error) {
      console.log(error);      
    } 
  };
  useEffect(() => {
    fetchAllProject();
  }, []);

  
  const data = {
    navMain: [
      {
        title: "Projects",
        url: "#",
        items: itmesApp,
      },
    ],
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent className="pl-4">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild > 
                          {/* isActive={item.isActive} */}
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
