import { create } from 'zustand'

type State = {
  id: string,
  content: string,
  authorId: string
}

type Action = {
  setNoteContent: (firstName: State['content']) => void
}

// Create your store, which includes both state and (optionally) actions
export const useNoteStore = create<State & Action>((set) => ({
  id: '',
  content: '',
  authorId: '',
  setNoteContent: (content) => set(() => ({ content: content })),
}))

// // In consuming app
// function App() {
//   // "select" the needed state and actions, in this case, the firstName value
//   // and the action updateFirstName
//   const firstName = usePersonStore((state) => state.firstName)
//   const updateFirstName = usePersonStore((state) => state.updateFirstName)

//   return (
//     <main>
//       <label>
//         First name
//         <input
//           // Update the "firstName" state
//           onChange={(e) => updateFirstName(e.currentTarget.value)}
//           value={firstName}
//         />
//       </label>

//       <p>
//         Hello, <strong>{firstName}!</strong>
//       </p>
//     </main>
//   )
// }
