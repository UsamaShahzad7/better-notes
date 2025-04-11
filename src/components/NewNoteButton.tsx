"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { createNoteAction } from "@/app/actions/note";
import { useNoteStore } from "@/providers/NoteStore";

type Props = {
  user: User | null;
};

export default function NewNoteButton({ user }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const setSelectedNote = useNoteStore((state) => state.setSelectNote)

  const handleNewNoteButtonClick = async () => {
    if (!user) {
      router.push("/login");
    }
    setLoading(true);
    const uuid = uuidv4();
    const data = await createNoteAction(uuid);
    setSelectedNote(uuid)
    router.push(`/?noteId=${uuid}`);
    if (data.errorMessage) {
      toast.error(data.errorMessage);
    } else {
      toast.success("New Note Created", {
        description: "You can now start writing your note",
      });
    }

    setLoading(false);
  };
  return (
    <Button
      onClick={handleNewNoteButtonClick}
      className="w-24"
      disabled={loading}
      variant={"default"}
    >
      {loading ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
}
