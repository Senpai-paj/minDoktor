import { Plus } from 'lucide-react';

export default function Navbar({ onCreateClick }: { onCreateClick: () => void }) {

    return (
        <div className="flex justify-around bg-sky-950 h-[5vh] w-full">
            <h1 className="text-xl m-3 p-2 font-medium cursor-default">Min Todo</h1>
            <button onClick={onCreateClick} className="size-10 cursor-pointer m-3 p-2 px-5 bg-sky-950 border border-slate-300 duration-300 hover:bg-sky-800 text-slate-200 text-black border-slate-300 w-fit rounded-2xl">+ Skappa</button>
        </div>
    )
}


                