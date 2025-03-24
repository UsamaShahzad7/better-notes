import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeToggleButton } from "./ThemeToggleButton";
import LogoutButton from "./LogoutButton";

function Header() {
  const user = null
  return (
    <header className="bg-popover flex w-full h-24 items-center justify-between px-10 shadow-lg shadow-red-500/50">
      <Link href={'/'} className="flex items-end gap-4">
        <Image
          src='/better-notes.png'
          height={60}
          width={60}
          alt="logo"
          className="rounded-full">

        </Image>
        <div className="flex flex-col pb-1 leading-6 text-2xl font-semibold">
          Better<span>Notes</span>
        </div>
      </Link>
      <div className="flex gap-4">
        {user ? (<LogoutButton/>) : (<>
          <Button asChild>
            <Link href={'/login'}>Login</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href={'/login'}>Signup</Link>
          </Button>
        </>)}
        <ThemeToggleButton />
      </div>
    </header>
  )
}

export default Header
