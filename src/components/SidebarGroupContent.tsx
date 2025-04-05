"use client";

import React from "react";
import { NotebookTabsIcon } from "lucide-react";
import { Note } from "@prisma/client";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  notes: Note[];
};

function SidebarGroupContent({ notes }: Props) {

  const params = useSearchParams().get("noteId");


  const router = useRouter();

  const handleNoteSelection = (item: Note) => {
    router.push(`/?noteId=${item.id}`);
  };

  return (
    <div>
      <>
        <SidebarMenu>
          {notes?.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <div
                  onClick={() => handleNoteSelection(item)}
                  className={`selectable flex cursor-pointer items-center gap-2 ${item.id === params ? "bg-red-500/50" : ""}`}
                >
                  <NotebookTabsIcon />
                  <span>{item.content}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </>
    </div>
  );
}

export default SidebarGroupContent;
