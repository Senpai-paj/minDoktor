/**
 * Populate component for loading sample tasks into the app.
 * Provides a button to trigger population from the backend and updates state on completion.
 *
 * @module Populate
 */

import { populate } from '@/lib/api'
import { BadgePlus  } from 'lucide-react';
import type { Task } from '@/types/task'

/**
 * Props for Populate component.
 * @typedef {Object} PopulateProps
 * @property {React.Dispatch<React.SetStateAction<Task[]>>} setData - Setter for displayed tasks.
 * @property {React.Dispatch<React.SetStateAction<Task[]>>} setAllData - Setter for all tasks.
 */
type PopulateProps = {
    setData: React.Dispatch<React.SetStateAction<Task[]>>;
    setAllData: React.Dispatch<React.SetStateAction<Task[]>>;
};

/**
 * Populate button component.
 *
 * @param {PopulateProps} props - Props for the component.
 * @returns {JSX.Element} The rendered button that triggers population.
 */
export default function Populate( {setData, setAllData} : PopulateProps) {

  /**
   * Handles click to populate sample tasks from backend.
   */
  async function handlePopulate() {
    const controller = new AbortController();
      
    populate(controller.signal)
        .then((items: Task[]) => {
            setAllData(items);
            setData(items);
        })
        .catch((err) => {
            if (err.name !== "AbortError") {
                  console.error("Failed to populate Tasks", err);
            }
        });
      
    return () => {
        controller.abort(); 
    };
  }

  return (
    <button className='cursor-pointer text-slate-700 flex' title="Click to populate" onClick={handlePopulate}><BadgePlus/>Populate</button>
  )
}
