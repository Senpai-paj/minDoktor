import { useState } from "react"

type SortProps = {
    onSort: (order: 'recent' | 'older') => void
}

export default function Sort({ onSort }: SortProps) {
  const [sortOrder, setSortOrder] = useState<string>("");

  return (
    <select
      className="rounded-lg border border-gray-300 px-3 py-2 outline-none bg-gray-50 text-gray-700"
      value={sortOrder}
      onChange={(e) => {
        const order = e.target.value as "recent" | "older";
        setSortOrder(order);
        onSort(order);
      }}
    >
      <option value="">Sort by due date</option>
      <option value="recent">Newest due first</option>
      <option value="older">Oldest due first</option>
    </select>
  );
}
