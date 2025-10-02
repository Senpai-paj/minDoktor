import { Task } from "@/types/task";
import TaskCard from "./card/TaskCard";
import { useState } from "react";
import Pagination from "./Pagination";

type CategoryProps = {
    tasks: Task[];
    setAllData: React.Dispatch<React.SetStateAction<Task[]>>;
    setData: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function Category({ tasks, setAllData, setData, className }: CategoryProps & { className?: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const paginatedData = tasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className={`shadow-xl rounded-xl bg-gray-50 p-4 flex flex-col ${className}`}>
      
      <div className="flex-1 overflow-y-auto flex flex-col items-center space-y-4">
        {paginatedData.map((t) => (
          <TaskCard
            key={t.id}
            {...t}
            onDeleted={(id) => {
              setAllData((prev) => prev.filter((x) => x.id !== id));
              setData((prev) => prev.filter((x) => x.id !== id));
            }}
            onEdited={(task) => {
              setAllData((prev) => prev.map((x) => (x.id === task.id ? task : x)));
              setData((prev) => prev.map((x) => (x.id === task.id ? task : x)));
            }}
          />
        ))}
      </div>

      
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(tasks.length / pageSize)}
        onPageChange={(page) => setCurrentPage(page)}
      />

    </div>
  );
}


  