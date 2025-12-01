import type { ReactNode } from "react";

interface SpaceYProps {
    spacing: number;
    children: ReactNode;
}

export default function SpaceY({spacing , children }: SpaceYProps) {
    return (
        <div className={`space-y-${String(spacing)}`}>
            {children}
        </div>
    );
}