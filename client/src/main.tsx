import ReactDOM from "react-dom/client";

import router from "./router/index.tsx";
import { RouterProvider } from "react-router-dom";
import "@/assets/css/index.css";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import { AliveScope } from "react-activation";
import "@/i18n";

// for date-picker i18n
import "dayjs/locale/zh-cn";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AliveScope>
      <RouterProvider router={router} />
    </AliveScope>
  </Provider>
);
