import { NavLink } from "react-router-dom";

function NavItems({ text, icon, path }) {
  return (
    <li>
      <NavLink to={path} className="flex items-center gap-2">
        <span>{icon}</span>
        {text}
      </NavLink>
    </li>
  );
}

export default NavItems;
