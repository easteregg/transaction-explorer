import {ReactNode} from "react";

export function HorCenter({children}: { children: ReactNode }) {
    return (
        <div className="flex flex-col h-[100svh] justify-start items-center p-2 ">
            <div></div>
            <div className="w-full xl:w-screen max-w-screen-2xl">{children}</div>
        </div>
    )
}
