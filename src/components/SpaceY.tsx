import type { ReactNode } from "react";

type spaceType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface SpaceYProps {
    spacing: spaceType;
    children: ReactNode;
}

export default function SpaceY({spacing , children }: SpaceYProps) {
    return (
        <div className={{
            0: "space-y-0",
            1: "space-y-1",
            2: "space-y-2",
            3: "space-y-3",
            4: "space-y-4",
            5: "space-y-5",
            6: "space-y-6",
            7: "space-y-7",
            8: "space-y-8",
            9: "space-y-9",
            10: "space-y-10"
        }[spacing]}>
            {children}
        </div>
    );
}