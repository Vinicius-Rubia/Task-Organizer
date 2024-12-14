import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./assets/styles/main.css";
import { TaskOrganizerProviver } from "./contexts/task-organizer";

createRoot(document.getElementById("root")!).render(
  <TaskOrganizerProviver>
    <App />
  </TaskOrganizerProviver>
);
