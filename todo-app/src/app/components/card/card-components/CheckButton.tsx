import type React from "react"
import { Sparkles } from 'lucide-react';

type CheckButtonProps = {
  setChecked: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CheckButton({setChecked }: CheckButtonProps) {

  return (
    <button
      className="group min-w-40 relative overflow-hidden rounded-2xl hover:bg-green-300/20 
                border border-green-300 cursor-pointer"
      onClick={() => setChecked(true)}
    >
      {/* Default text */}
      <span className="block transition-opacity duration-300 group-hover:opacity-0">
        Check
      </span>
      {/* Hover */}
      <span className="absolute inset-0 flex items-center justify-around opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <Sparkles className="w-4 h-4"/>
        Congrats!
        <Sparkles className="w-4 h-4"/>
      </span>
    </button>
  )
}
