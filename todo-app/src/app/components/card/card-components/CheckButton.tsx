import { useState } from "react";
import { Sparkles } from "lucide-react";
import { check } from '@/lib/api';
import { Task } from "@/types/task";

interface CheckButtonProps {
  onEdited?: (task: Task) => void
  setChecked: (value: boolean) => void;
  taskId: string;
}

export default function CheckButton({ setChecked, taskId, onEdited }: CheckButtonProps) {
  const [step, setStep] = useState<0 | 1>(0);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    if (step === 0) {
      setStep(1);
    } else {
      setLoading(true);
      try {
        const updatedTask = await check(taskId);
        setChecked(true);
        onEdited?.(updatedTask);
      } catch (err) {
        console.error("Failed to check task:", err);
      } finally {
        setLoading(false);
        setStep(0);
      }
    }
  };
  
  return (
    <button
      className="group min-w-40 relative overflow-hidden rounded-2xl 
                 border border-green-300 text-gray-700 px-4 
                 hover:bg-green-300/20 transition-colors duration-200 cursor-pointer disabled:opacity-50 flex-1 min-w-[80px] max-w-[150px] text-center"
      onClick={handleClick}
      disabled={loading}
    >
      
      <span className="block transition-opacity duration-300 group-hover:opacity-0">
        {step === 0 ? "Check" : "You sure?"}
      </span>

      {/* Hover sparkle span need to copy button design to prevent buggs */}
      <span className="absolute inset-0 flex items-center justify-around opacity-0 transition-opacity duration-500 group-hover:opacity-100 text-green-600 font-medium">
        <Sparkles className="w-4 h-4" />
        {step === 0 ? "Check" : "You sure?"}
        <Sparkles className="w-4 h-4" />
      </span>
    </button>
  );
}
