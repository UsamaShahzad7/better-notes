"use client";

import React, { useEffect, useMemo, useState } from "react";
import { NotebookTabsIcon, SearchIcon } from "lucide-react";
import { Note } from "@prisma/client";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import Fuse from "fuse.js";

type Props = {
  notes: Note[];
};

function SidebarGroupContent({ notes }: Props) {
  const params = useSearchParams().get("noteId");
  const router = useRouter();

  const [localNotes, setLocalNotes] = useState(notes);
  const [searchText, setSearchText] = useState("");

  const handleNoteSelection = (item: Note) => {
    router.push(`/?noteId=${item.id}`);
  };

  const options = {
    includeScore: true,
    threshold: 0.4,
    keys: ["content"],
  };

  const fuse = useMemo(() => {
    return new Fuse(localNotes, options);
  }, [localNotes]);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const filteredNotes = searchText
    ? fuse.search(searchText).map((item) => item.item)
    : localNotes;

  return (
    <div>
      <div className="item-center relative my-5 flex">
        <SearchIcon className="absolute left-2 size-4 bottom-3"/>
        <Input
          className="bg-muted pl-8"
          placeholder="Search your notes"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <>
        <SidebarMenu>
          {filteredNotes?.map((item) => (
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
