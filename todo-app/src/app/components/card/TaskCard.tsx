import { Task } from "@/types/task";
import DeleteButton from "./card-components/DeleteButton";
import EditButton from "./card-components/EditButton";
import CheckButton from "./card-components/CheckButton";
import { useState } from "react";
import EditTask from "../EditTask";

type TaskCardProps = Task & { onDeleted?: (id: string) => void, onEdited?: (task: Task) => void }

export default function TaskCard(task: TaskCardProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [checked, setChecked] = useState(task.status ?? false);
  
    const deadline = (() => {
      const taskDeadline = new Date(task.dueDate);
      const currentDate = new Date();
      const diffInDays = Math.ceil(
        (taskDeadline.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
      );
  
      if (diffInDays === 1) return `Deadline in ${diffInDays} day`;
      if (diffInDays <= 2) return `Deadline in ${diffInDays} days`;
      return '';
    })();
  
    return (
      <div className="w-full max-w-2xl bg-gray-50 border border-gray-200 shadow-md rounded-xl p-4">
        {/* Header section */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">
            Due {new Date(task.dueDate).toLocaleDateString()}
          </span>
          {task.editDate && (
            <span
              className="text-xs text-gray-400"
              title={`edited ${new Date(task.editDate).toLocaleDateString()}`}
            >
              Edited
            </span>
          )}
          <div className="flex items-center">
            <div
              className={`w-3 h-3 mr-2 rounded-full ${
                task.priority === 0
                  ? 'bg-green-500'
                  : task.priority === 1
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            ></div>
            <span className="text-xs text-gray-600">
              {task.priority === 0 ? 'Low' : task.priority === 1 ? 'Medium' : 'High'}
            </span>
          </div>
        </div>
  
        <h1 className={`text-lg font-semibold ${checked ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {task.title}
        </h1>
        <p className="text-sm text-gray-600 mb-4 break-words">{task.description}</p>
        
        <div className="flex flex-wrap gap-2 justify-around">
          {!checked && <CheckButton setChecked={setChecked} taskId={task.id} onEdited={task.onEdited}/>}
          {!checked && <EditButton onClick={() => setIsEditOpen(true)} />}
          <DeleteButton id={task.id} onDeleted={task.onDeleted} />
        </div>
  
        {((deadline !== '') && !checked) && (
          <div className="mt-3 p-2 rounded-lg bg-red-100 text-center">
            <span className="text-red-700 text-sm font-medium">{deadline}</span>
          </div>
        )}
  
        <EditTask
          isOpen={isEditOpen}
          task={task}
          onClose={() => setIsEditOpen(false)}
          onEdited={task.onEdited}
        />
      </div>
    );
  }
  


