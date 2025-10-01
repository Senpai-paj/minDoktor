type EditButtonProps = {
  onClick?: () => void
}

export default function EditButton({ onClick }: EditButtonProps) {

  return (
    <button
      className="min-w-40 relative overflow-hidden rounded-2xl hover:bg-slate-200 
                border hover:text-black border-slate-300 cursor-pointer"
      onClick={onClick}
    >
      <span className="relative z-10 w-full flex items-center justify-center gap-2">
        Ändra
      </span>
    </button>
  )
}
