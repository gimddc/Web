import { createHashRouter } from "react-router-dom";
import DataManage from "../pages/DataManage";
import TagManage from "../pages/TagManage";
import App from "@/App.tsx";
import StudyNotes from "@/pages/StudyNotes";
import KeepAlive from "react-activation";
const router = createHashRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <StudyNotes></StudyNotes>
      },
      {
        path: "data",
        element: (
          <KeepAlive id="Data">
            <DataManage></DataManage>
          </KeepAlive>
        )
      },
      {
        path: "tags",
        element: <TagManage></TagManage>
      }
    ]
  }
]);

export default router;
