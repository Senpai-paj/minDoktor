import { Task } from "@/types/task";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import CheckButton from "./CheckButton";

export default function TaskCard(task: Task) { 

    return (
        <div className="w-[80%] m-auto rounded-xl mt-5 overflow-hidden">
            <div className="bg-sky-950 p-3 rounded-t-xl">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-400">
                        <span className="text-sm font-medium">due to {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center ">
                        <div className="w-2 h-2 bg-green-500 mr-1 rounded-full"></div>
                        <span className="text-gray-400 text-sm font-medium">Prority</span>
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
                    <EditButton/>
                    <DeleteButton/> 
                </div>
            </div>
            
            <div className="bg-red-400 rounded-b-[32px] text-center">
                <div className="flex items-center justify-center ">
                    <span className="text-gray-900 text-base font-medium">2 days to deadline</span>
                </div>
            </div>
        </div>
    )

}


