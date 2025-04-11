"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  DeleteIcon,
  NotebookTabsIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import { Note } from "@prisma/client";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import Fuse from "fuse.js";
import { useNoteStore } from "@/providers/NoteStore";

type Props = {
  notes: Note[];
};

function SidebarGroupContent({ notes }: Props) {
  const params = useSearchParams().get("noteId");
  const router = useRouter();

  const [localNotes, setLocalNotes] = useState(notes);
  const [searchText, setSearchText] = useState("");
  const setNoteText = useNoteStore((state) => state.setNoteContent);
  const selectedNoteId = useNoteStore((state) => state.id);
  const noteText = useNoteStore((state) => state.content);

  const handleNoteSelection = (item: Note) => {
    setNoteText(item.content);
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

  console.log("noteText", noteText)
  console.log("Selected", selectedNoteId)
  console.log("id", notes)
  return (
    <div>
      <div className="item-center relative my-5 flex">
        <SearchIcon className="absolute bottom-3 left-2 size-4" />
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
                  className={`selectable flex cursor-pointer items-center gap-2 my-2 py-6 ${item.id === params || item.id === selectedNoteId ? "bg-sidebar-accent/100" : ""}`}
                >
                  <NotebookTabsIcon />
                  <div className="flex flex-col">
                  <span className="truncate">
                    {item.content}
                  </span>
                  <p className="text-xs font-bold">{item.updatedAt.toLocaleDateString()}</p>
                  </div>
                  {/* <Trash2Icon className="justify-end hover:bg-red-200"/> */}
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
