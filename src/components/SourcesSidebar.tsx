import { Book, FileText, GraduationCap, PenTool, ExternalLink } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const sources = [
  {
    title: "ELA akadeemilise kirjutamise juhend",
    url: "#",
    icon: Book,
    description: "Põhjalik juhend akadeemilise töö koostamiseks",
  },
  {
    title: "Viitamise reeglid (APA formaat)",
    url: "#",
    icon: FileText,
    description: "APA 7. väljaande viitamisreeglid",
  },
  {
    title: "Lõputöö vormistamise nõuded",
    url: "#",
    icon: GraduationCap,
    description: "Formaadi ja struktuuri nõuded",
  },
  {
    title: "Akadeemiline stiil ja keelekasutus",
    url: "#",
    icon: PenTool,
    description: "Teadusliku teksti kirjutamise põhimõtted",
  },
];

export function SourcesSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <Book className="w-5 h-5 flex-shrink-0" />
          <span className="font-semibold group-data-[collapsible=icon]:hidden">
            Allikad ja juhendid
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Kasulikud materjalid
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sources.map((source) => (
                <SidebarMenuItem key={source.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={source.title}
                    className="h-auto py-2"
                  >
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3"
                    >
                      <source.icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 group-data-[collapsible=icon]:hidden">
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-sm">{source.title}</span>
                          <ExternalLink className="w-3 h-3 opacity-50" />
                        </div>
                        <p className="text-xs text-sidebar-foreground/70 mt-0.5">
                          {source.description}
                        </p>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
