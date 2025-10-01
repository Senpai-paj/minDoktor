import { Task } from "@/types/task";
import TaskCard from "./card/TaskCard";
import { useState } from "react";
import { StepBack, StepForward } from 'lucide-react';

type CategoryProps = {
    tasks: Task[];
    setAllData: React.Dispatch<React.SetStateAction<Task[]>>;
    setData: React.Dispatch<React.SetStateAction<Task[]>>;
  }
  

export default function Category({ tasks, setAllData, setData }: CategoryProps) {

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const paginatedData = tasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
      <div className="relative shadow-2xl rounded-xl h-[93vh] w-[90vw] m-auto mt-5">
        {paginatedData.map((t) => (
          <TaskCard
            key={t.id}
            {...t}
            onDeleted={(id) => {
              setAllData((prev) => prev.filter((x) => x.id !== id))
              setData((prev) => prev.filter((x) => x.id !== id))
            }}
            onEdited={(task) => {
              setAllData((prev) => prev.map((x) => x.id === task.id ? task : x))
              setData((prev) => prev.map((x) => x.id === task.id ? task : x))
            }}
          />
        ))}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex justify-around space-x-2">
            <button className="text-sky-950" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><StepBack/></button>
            <span className="text-sky-950">Page {currentPage} of {Math.ceil(tasks.length / pageSize)}</span>
            <button className="text-sky-950" disabled={currentPage * pageSize >= tasks.length} onClick={() => setCurrentPage(p => p + 1)}><StepForward/></button>
        </div>
      </div>
    )
  }
  