import { ChangeEvent, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useAtom } from "jotai";
import { query } from "../store";

const EmployeeSearch = () => {
  const [variables, setVariables] = useAtom(query);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    setDebounceTimer(
      setTimeout(() => {
        setVariables({ ...variables, query: e.target.value, page: 1 });
      }, 500)
    );
  };

  return (
    <div className="bg-white dark:bg-black flex items-center rounded-full border border-gray-400 overflow-hidden w-full md:w-1/3 pl-3 hover:border-gray-950 dark:hover:border-gray-100">
      <IoSearchSharp className="text-xl fill-gray-400" />
      <input
        className="p-1 py-2 rounded-l-full w-full outline-0 dark:bg-[#020817]"
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name or email"
        maxLength={40}
      />
    </div>
  );
};

export default EmployeeSearch;
