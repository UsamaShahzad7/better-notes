import React from 'react'
import { NotebookTabsIcon } from 'lucide-react'
import { Note } from "@prisma/client"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'

type Props = {
  notes: Note[];
};

function SidebarGroupContent({notes}: Props) {
  return (
    <div>
      <SidebarMenu>
        {notes?.map((item) => (
          <SidebarMenuItem key={item.content}>
            <SidebarMenuButton asChild>
              <NotebookTabsIcon />
              <span>{item.content}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}

export default SidebarGroupContent
