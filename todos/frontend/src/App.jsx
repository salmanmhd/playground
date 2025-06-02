import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllTasks from "./pages/AllTasks";
import Today from "./pages/Today";
import Completed from "./pages/Completed";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import ListTodos from "./pages/ListTodos";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<AllTasks />} />
          <Route path="/today" element={<Today />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/list/:id" element={<ListTodos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
