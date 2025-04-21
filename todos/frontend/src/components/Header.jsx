import { useState } from "react";
import { ListChecks, Moon, Plus, Search, Sun, User } from "lucide-react";

function Header() {
  const [isDark, setIsDark] = useState(false);
  return (
    <div className="flex h-16 items-center justify-around gap-4 border-b border-zinc-200 px-4">
      <div className="flex h-full items-center gap-2 px-6">
        <span className="rounded-md bg-blue-500 p-1">
          <ListChecks className="size-5 text-white" />
        </span>
        <h2 className="text-lg font-bold">Taskify</h2>
      </div>
      <div className="flex flex-1 items-center gap-2 rounded-md bg-gray-200 pl-4">
        <Search className="text-gray-500" />
        <input
          className="h-9 flex-1 rounded-md border-b border-zinc-200 bg-gray-200 px-6 py-2 focus:outline-none"
          placeholder="Search tasks..."
        />
      </div>
      <div className="flex items-center gap-2">
        {isDark ? <Moon /> : <Sun />}
        <button className="flex h-9 items-center rounded-md bg-blue-500 px-4 py-2 text-white">
          {<Plus className="mr-2 size-5" />} New Task
        </button>
        <User />
      </div>
    </div>
  );
}

export default Header;
