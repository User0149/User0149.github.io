import type { StateSetter } from "../types/types";

interface SearchBarProps {
    setSearchTerm: StateSetter<string>;
}

export default function SearchBar({ setSearchTerm }: SearchBarProps) {
    return (
        <input className="border rounded-lg pt-1 pb-1 pl-2 pr-2 text-lg" placeholder="Search here" onInput={
            (e) => {
                setSearchTerm((e.target as HTMLInputElement).value);
            }
        }></input>
    );
}
