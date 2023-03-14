import {ReactNode} from "react";


export function VertCenter({children}: { children: ReactNode }) {
    return (
        <div className="font-sans flex flex-row h-[100svh] mt-10 md:mt-auto justify-start items-start md:justify-center md:items-center">
            <div className="w-full md:w-3/4 p-2">{children}</div>
        </div>
    )
}