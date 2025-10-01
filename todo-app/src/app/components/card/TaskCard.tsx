import { Task } from "@/types/task";
import DeleteButton from "./card-components/DeleteButton";
import EditButton from "./card-components/EditButton";
import CheckButton from "./card-components/CheckButton";
import { useState } from "react";
import EditTask from "../EditTask";

type TaskCardProps = Task & { onDeleted?: (id: string) => void, onEdited?: (task: Task) => void }

export default function TaskCard(task: TaskCardProps) { 

    const [isEditOpen, setIsEditOpen] = useState(false)

    const deadline = (() => {
        const taskDeadline = new Date(task.dueDate);
        const currentDate = new Date();
        const diffInDays = Math.ceil((taskDeadline.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    
        if (diffInDays === 1) return `Deadline in ${diffInDays} day`;
        if (diffInDays <= 2) return `Deadline in ${diffInDays} days`;
        return '';
    })();

    return (
        <div className="w-[80%] m-auto rounded-xl mt-5 overflow-hidden">
            <div className="bg-sky-950 p-3 rounded-t-xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-400">
                        <span className="text-sm font-medium">due to {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    {task.editDate && 
                        <div className="flex items-center text-gray-400">
                            <span className="text-sm font-medium" title={`edited ${new Date(task.editDate).toLocaleDateString()}`}>edited</span>
                        </div>
                    }
                    <div className="flex items-center ">
                        <div
                            className={`w-2 h-2 mr-1 rounded-full ${
                            task.priority === 0
                                ? 'bg-green-500'
                                : task.priority === 1
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                        ></div>
                        <span className="text-gray-400 text-sm font-medium">
                            {task.priority === 0
                            ? 'Low'
                            : task.priority === 1
                            ? 'Medium'
                            : 'Prior'}
                        </span>
                    </div>
                    
                </div>
                
                <div className="flex items-center mb-3">
                    <div>
                    <h1 className="text-white text-2xl font-semibold">{task.title}</h1>
                    <p className="text-gray-400 text-base h-[5vh] overflow-x-auto">{task.description}</p>
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <CheckButton/>
                    <EditButton onClick={() => setIsEditOpen(true)} />
                    <DeleteButton id={task.id} onDeleted={task.onDeleted} /> 
                </div>
            </div>
            {deadline != '' && 

             <div className="bg-red-400 rounded-b-[32px] text-center">
             <div className="flex items-center justify-center ">
                 <span className="text-gray-900 text-base font-medium">{deadline}</span>
             </div>
             </div>
            
            }
           
            <EditTask
                isOpen={isEditOpen}
                task={task}
                onClose={() => setIsEditOpen(false)}
                onEdited={task.onEdited}
            />
        </div>
    )

}


