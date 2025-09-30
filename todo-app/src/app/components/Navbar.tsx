import { Plus } from 'lucide-react';

export default function Navbar() { 

    return (
        <div className="flex justify-around bg-sky-950 h-[5vh] w-full">
            <h1 className="text-xl m-3 p-2 font-medium cursor-default">Min Todo</h1>
            <button className="size-10 bg-red-700 w-fit m-3 p-2 px-5 rounded-full">Skappa</button>
        </div>
    )
}