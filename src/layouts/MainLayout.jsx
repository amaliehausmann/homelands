import { Outlet } from "react-router-dom";
import style from "./MainLayout.module.scss";
import { Header } from "../components/Header/Header";

export const MainLayout = () => {
  return (
    <main className={style.mainLayout}>
      <Header/>
      <Outlet />
    </main>
  );
};
