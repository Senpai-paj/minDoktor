import { Task } from "@/types/task"
import { useCallback, useEffect, useState, useRef } from "react"
import { search } from "@/lib/serivces/task.Service"

export default function Search({ all, onSearch}: {all: Task[], onSearch: (tasks: Task[]) => void }) {

    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const controllerRef = useRef<AbortController | null>(null);

    const localFilter = useCallback((q: string) => {
        const query = q.trim().toLowerCase()
        if (!query) return all
        return all.filter(t =>
            t.title.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query)
        )
    }, [all])

    useEffect(() => {
        onSearch(localFilter(text))
    }, [text, localFilter, onSearch])

    async function runServerSearch() {

        const q = text.trim()
        if (!q) return onSearch(all)

        controllerRef.current?.abort();
        const controller = new AbortController();
        controllerRef.current = controller;

        setLoading(true)
        
        search(q, controller.signal)
        .then((server) => {
          onSearch(server);
        })
        .catch((err) => {
          if (err.name !== "AbortError") console.error("Search failed", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return (
        <div className="flex gap-2 items-center w-full">
          <input
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runServerSearch();
            }}
            placeholder="Search tasks..."
          />
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-4 py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 transition"
            onClick={runServerSearch}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      );
      
}
