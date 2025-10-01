import type React from "react"
import { Sparkles } from 'lucide-react';

export default function CheckButton() {

  return (
    <button
      className="group min-w-40 relative overflow-hidden rounded-2xl hover:bg-green-200 
                border hover:text-green-800 border-green-300 cursor-pointer"
    >
      {/* Default text */}
      <span className="block transition-opacity duration-300 group-hover:opacity-0">
        Check
      </span>
      {/* Hover */}
      <span className="absolute inset-0 flex items-center justify-around opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <Sparkles className="w-4 h-4"/>
        Bra jobbat
        <Sparkles className="w-4 h-4"/>
      </span>
    </button>
  )
}
