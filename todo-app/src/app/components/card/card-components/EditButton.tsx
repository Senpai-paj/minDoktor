type EditButtonProps = {
  onClick?: () => void
}

export default function EditButton({ onClick }: EditButtonProps) {

  return (
    <button
      className="min-w-40 rounded-2xl border border-gray-300 bg-gray-50 text-gray-700
                hover:bg-gray-100 cursor-pointer transition-colors duration-200 flex-1 min-w-[80px] max-w-[150px] text-center"
      onClick={onClick}
    >
      <span className="z-10 w-full flex items-center justify-center gap-2">
        Edit
      </span>
    </button>
  )
}
