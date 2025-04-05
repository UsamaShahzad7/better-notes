import { User } from "@supabase/supabase-js"

type Props = {
  user: User | null
}

export default function NewNoteButton({user}: Props) {
  return (
    <div>NewNoteButton</div>
  )
}
