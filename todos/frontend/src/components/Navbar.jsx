import { useSelector } from "react-redux";
import NavItems from "./NavItems";
import { ChartNoAxesColumn, CircleCheckBig, Inbox, Star } from "lucide-react";
function Navbar() {
  const { list } = useSelector((state) => state.category);
  console.log(list);
  return (
    <>
      <ul className="flex flex-col gap-3 px-4">
        <NavItems text="All tasks" path="/" icon={<Inbox size={14} />} />
        <NavItems text="Today" icon={<Star size={14} />} path="/today" />
        <NavItems
          text="Completed"
          path="/completed"
          icon={<CircleCheckBig size={14} />}
        />
        <NavItems
          text="Dashboard"
          path="/dashboard"
          icon={<ChartNoAxesColumn size={14} />}
        />
      </ul>
      <div className="mt-10 flex w-full items-center justify-between px-4">
        <p className="text-xs font-semibold text-zinc-600">LISTS</p>
        <button className="ml-auto font-semibold text-zinc-600">+</button>
      </div>
      <ul className="flex flex-col gap-3 px-4">
        {list.map((list, idx) => (
          <NavItems text={list.title} path={`/list/${list.id}`} key={idx} />
        ))}
        <NavItems text="Work" path="/" icon={<Inbox size={14} />} />
        <NavItems text="Personal" path="/" icon={<Star size={14} />} />
      </ul>
    </>
  );
}

export default Navbar;
