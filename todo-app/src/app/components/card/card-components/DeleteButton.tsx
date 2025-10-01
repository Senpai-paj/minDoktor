import type React from "react"
import { motion, useAnimation } from "motion/react"
import { Trash2Icon } from "lucide-react"
import { useState } from "react"
import { deleteTask } from "@/lib/api"

interface DeleteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string
  holdDuration?: number
  onDeleted?: (id: string) => void
}

export default function DeleteButton({ id, onDeleted, holdDuration = 3000, ...props }: DeleteButtonProps) {
  const [isHolding, setIsHolding] = useState(false)
  const controls = useAnimation()

  async function handleHoldStart() {
    setIsHolding(true)
    controls.set({ width: "0%" })
    await controls.start({
      width: "100%",
      transition: {
        duration: holdDuration / 1000,
        ease: "linear",
      },
    })
    try {
      await deleteTask(id)
      onDeleted?.(id)
    } finally {
      setIsHolding(false)
      controls.set({ width: "0%" })
    }
  }
  
  function handleHoldEnd() {
    setIsHolding(false)
    controls.stop()
    controls.start({
      width: "0%",
      transition: { duration: 0.1 },
    })
  }

  return (
    <button
      className="min-w-40 relative overflow-hidden rounded-2xl
                 bg-sky-950 hover:bg-red-700/20 
                 text-red-400 border 
                 border-red-400 cursor-pointer"
      
      onMouseDown={handleHoldStart}
      onMouseUp={handleHoldEnd}
      onMouseLeave={handleHoldEnd}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
      onTouchCancel={handleHoldEnd}
      {...props}
    >
      <motion.div
        initial={{ width: "0%" }}
        animate={controls}
        className="absolute left-0 h-full bg-red-200/30 dark:bg-red-600/40"
      />
      <span className="relative z-10 w-full flex items-center justify-center gap-2">
        <Trash2Icon className="w-4 h-4" />
        {!isHolding ? "Hold to delete" : "Deleting..."}
      </span>
    </button>
  )
}
