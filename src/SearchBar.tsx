import type { setState } from "./types";
export default function SearchBar({setSearchTerm}: {setSearchTerm: setState<string>}) {
    return (
        <input className="border rounded-lg pt-1 pb-1 pl-2 pr-2" placeholder="Search here" onInput={
            (e) => {
                setSearchTerm((e.target as HTMLInputElement).value);
            }
        }></input>
    );
}