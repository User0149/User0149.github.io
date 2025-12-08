import type { ReactNode } from "react";

interface MainContentContainerProps {
    children: ReactNode;
}

export default function MainContentContainer({ children }: MainContentContainerProps) {
    return (
        <div className="px-[100px] mx-auto max-w-[1500px]">
            {children}
        </div>
    );
}
