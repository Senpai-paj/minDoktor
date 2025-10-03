/**
 * Sort component for sorting tasks by due date.
 * Provides a dropdown UI for selecting sort order (recent/older).
 *
 * @module Sort
 */

import { useState } from "react"

/**
 * Props for Sort component.
 * @typedef {Object} SortProps
 * @property {(order: 'recent' | 'older') => void} onSort - Callback called with selected sort order.
 */
type SortProps = {
    onSort: (order: 'recent' | 'older') => void
}

/**
 * Sort dropdown component.
 *
 * @param {SortProps} props - Props for the component.
 * @returns {JSX.Element} The rendered dropdown.
 */
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
