import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";

function Layout() {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex h-full">
        <nav className="flex w-60 flex-col border-r border-zinc-200 pt-6">
          <Navbar />
        </nav>
        <div className="w-full bg-zinc-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
