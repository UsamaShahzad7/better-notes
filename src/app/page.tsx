import AskAIButton from "@/components/AskAIButton";
import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
import { prisma } from "@/db/prisma";
import { getUser } from "@/utils/supabase/server";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function HomePage({searchParams}: Props) {

  const noteIdParams = (await searchParams).noteId;

  const user = await getUser();

  const noteId = Array.isArray(noteIdParams) ? noteIdParams![0] : noteIdParams;

  const note = noteId
    ? await prisma.note.findUnique({
        where: {
          id: noteId,
          authorId: user?.id,
        },
      })
    : null;

  return (
    <div className="flex flex-col h-full items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        <AskAIButton user={user}></AskAIButton>
        <NewNoteButton user={user}></NewNoteButton>
      </div>

      <NoteTextInput noteId={noteId} startingNoteText={note?.content || ''}></NoteTextInput>
      Welcome
    </div>
  );
}
