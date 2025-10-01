import { Task } from "@/types/task"
import { useCallback, useEffect, useState } from "react"
import { searchTasks } from "@/lib/api"

export default function Search({ all, onSearch}: {all: Task[], onSearch: (tasks: Task[]) => void }) {

    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)

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
        setLoading(true)
        try {
            const server = await searchTasks(q)
            onSearch(server)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex gap-2 items-center w-full">
            <input
                className="w-full rounded border px-3 py-2 outline-none bg-sky-950"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') runServerSearch() }}
                placeholder="Search tasks..."
            />
            <button
                type="button"
                className="rounded-2xl border px-4 py-2 cursor-pointer bg-sky-950 border border-slate-300 duration-300 hover:bg-sky-800 text-slate-200 text-black border-slate-300"
                onClick={runServerSearch}
                disabled={loading}
            >
                {loading ? 'Searching...' : 'Search'}
            </button>
        </div>
    )
}
