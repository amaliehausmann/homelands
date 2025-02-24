import { Outlet } from "react-router-dom";
import style from "./MainLayout.module.scss";

export const MainLayout = () => {
  return (
    <main className={style.mainLayout}>
      <Outlet />
    </main>
  );
};
