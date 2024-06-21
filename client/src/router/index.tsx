import { createHashRouter } from "react-router-dom";
import DataManage from "../pages/DataManage";
import TagManage from "../pages/TagManage";
import App from "@/App.tsx";
import Home from "@/pages/Home";
import KeepAlive from "react-activation";
const router = createHashRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Home></Home>
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
