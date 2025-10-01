import { Task } from "@/types/task"
import { useState } from "react"

type SortProps = {
    onSort: (order: 'recent' | 'older') => void
}

export default function Sort({onSort}: SortProps) {

    const [sortOrder, setSortOrder] = useState<'recent' | 'older'>('recent')

    return (
        <select
            className="rounded-xl border px-3 py-2 outline-none bg-sky-950"
            value={sortOrder}
            onChange={(e) => {
              const order = (e.target.value as 'recent' | 'older')
              setSortOrder(order)
              onSort(order)
            }}
          >
            <option value="recent">Newest due first</option>
            <option value="older">Oldest due first</option>
          </select>
    )
}
