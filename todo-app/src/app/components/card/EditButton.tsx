import type React from "react"


export default function EditButton() {

  return (
    <button
      className="min-w-40 relative overflow-hidden rounded-2xl hover:bg-slate-200 
                border hover:text-black border-slate-300 cursor-pointer"
    >
      <span className="relative z-10 w-full flex items-center justify-center gap-2">
        Ändra
      </span>
    </button>
  )
}
