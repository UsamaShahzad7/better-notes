import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggleButton } from "./ThemeToggleButton";
import LogoutButton from "./LogoutButton";
import { getUser } from "@/utils/supabase/server";
import { prisma } from "@/db/prisma";
import { SidebarTrigger } from "./ui/sidebar";

async function Header() {
  const user = await getUser()

  // const userData = await prisma.user.findUnique({
  //   where: {
  //     email: user?.email || ''
  //   }
  // })

  //Add sidebar trigger

  //<SidebarTrigger />

  return (
    <>
      <header className="bg-popover flex h-24 w-full items-center justify-between px-10 shadow-lg shadow-red-500/50">
        <Link href={"/"} className="flex items-end gap-4">
          <Image
            src="/better-notes.png"
            height={60}
            width={60}
            alt="logo"
            className="rounded-full"
          ></Image>
          <div className="flex flex-col pb-1 text-2xl leading-6 font-semibold">
            Better<span>Notes</span>
          </div>
        </Link>
        <div className="flex gap-4">
          {user ? (
            <>
              <LogoutButton />
              {/* <span className="border rounded-lg text-center bg-indigo-500">{userData?.email}</span> */}
            </>
          ) : (
            <>
              <Button asChild>
                <Link href={"/login"}>Login</Link>
              </Button>

              <Button asChild variant="outline">
                <Link href={"/sign-up"}>Signup</Link>
              </Button>
            </>
          )}
          <ThemeToggleButton />
        </div>
      </header>
    </>
  );
}

export default Header
