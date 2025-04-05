"use server";

import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import { getUser } from "@/utils/supabase/server";

export const updateNoteAction = async (
  noteId: string | undefined,
  noteText: string,
) => {
  try {
    const user = await getUser();
    if (!user) {
      throw new Error("You must be logged in");
    }
    let error;
    if (noteId) {
      error = await prisma.note.update({
        where: {
          id: noteId,
        },
        data: {
          content: noteText,
        },
      });
    }

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const createNoteAction = async (noteId: string) => {
  try {
    const user = await getUser();

    if (!user) {
      throw new Error("You must be logged in");
    }

    if (noteId) {
      await prisma.note.create({
        data: {
          id: noteId,
          content: "",
          authorId: user?.id,
        },
      });
    }

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};
