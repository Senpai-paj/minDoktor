import Populate from './Populate'; 
import { Task } from '@/types/task';

type NavbarProps = {
    onCreateClick: () => void,
    setData: React.Dispatch<React.SetStateAction<Task[]>>;
    setAllData: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default function Navbar({ onCreateClick, setData, setAllData }: NavbarProps) {
    return (
      <nav className="w-full bg-gray-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
  
          <h1 className="text-xl font-semibold text-gray-800 cursor-default">
            Min Todo
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={onCreateClick}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 cursor-pointer text-gray-700 hover:bg-gray-100 transition"
            >
              + Create
            </button>
            <Populate setData={setData} setAllData={setAllData} />
          </div>
        </div>
      </nav>
    );
  }
                