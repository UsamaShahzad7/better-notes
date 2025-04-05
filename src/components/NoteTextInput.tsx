"use client";

import { useSearchParams } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useEffect } from "react";
import { Label } from "./ui/label";
import { debuounceTimeout } from "@/lib/constant";

let updateTimeOut: NodeJS.Timeout | null = null;
type Props = {
  noteId: string | undefined;
  startingNoteText: string;
};
export default function NoteTextInput({ noteId, startingNoteText }: Props) {
  const noteIdParam = useSearchParams().get("noteId");

  const { noteText, setNoteText } = useNote();

  useEffect(() => {
    if (noteIdParam === noteId) {
      setNoteText(startingNoteText);
    }
  }, [startingNoteText, noteIdParam, setNoteText, noteId]);

  const handleNoteUpdate = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNoteText(text);

    clearTimeout(updateTimeOut!);
    updateTimeOut = setTimeout(() => {
      updateNoteAction(noteId, text);
    }, debuounceTimeout);
  };

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Your Message</Label>
      <Textarea
        value={noteText}
        onChange={(e) => handleNoteUpdate(e)}
        placeholder="Write your note here"
        id="message-2"
        className="custom-scrollbar placeholder:text-muted-foreground mb-4 resize-none focus:ring-0 focus-visible:border-b-2 focus-visible:border-blue-500 focus-visible:ring-0 focus-visible:outline-none"
      ></Textarea>
      <p className="text-muted-foreground text-sm">
        Your message will be copied to the support team.
      </p>
    </div>
  );
}
