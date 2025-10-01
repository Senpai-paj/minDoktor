import { populate } from '@/lib/api'
import { BadgePlus  } from 'lucide-react';
import type { Task } from '@/types/task'

type PopulateProps = {
    setData: React.Dispatch<React.SetStateAction<Task[]>>;
    setAllData: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default function Populate( {setData, setAllData} : PopulateProps) {

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
        controller.abort(); // cancel fetch on unmount
    };
  }

  return (
    <button className='cursor-pointer' title="Click to populate" onClick={handlePopulate}><BadgePlus/></button>
  )
}


