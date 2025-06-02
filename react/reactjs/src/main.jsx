import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx';
// import TaskManager from './Task.jsx';

import Appnew from "./new app/Appnew.jsx";
import Folder from "./folder/Folder.jsx";
import Comment from "./comment/Comment.jsx";
import Main from "./comment/Main.jsx";
import OtpBox from "./ground/OtpBox.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Appnew /> */}
    {/* <Folder /> */}
    {/* <Comment /> */}
    {/* <Main /> */}
    <OtpBox />
  </StrictMode>
);
