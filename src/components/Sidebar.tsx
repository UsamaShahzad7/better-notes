
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { getUser } from "@/utils/supabase/server";
import { Note } from "@prisma/client";
import { prisma } from "@/db/prisma";
import Link from "next/link";
import SidebarGroupContent from "./SidebarGroupContent";

async function AppSidebar() {
  const user = await getUser();

  let notes: Note[] = [];

  if (user) {
    notes = await prisma.note.findMany({
      where: {
        authorId: user?.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {user ? (
              <div className="bold text-2xl">Notes</div>
            ) : (
              <Link href="/login" className="underline">
                Login
              </Link>
            )}
          </SidebarGroupLabel>
          {user && <SidebarGroupContent notes={notes}></SidebarGroupContent>}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
