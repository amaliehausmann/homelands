import { NavBar } from "../NavBar/NavBar";
import style from "./Header.module.scss";
import { IoIosSearch } from "react-icons/io";

export const Header = () => {
  return (
    <header className={style.headerStyling}>
      <div>
        <h1>HomeLands</h1>
      </div>
      <div>
        <NavBar />
        <div>
          <input placeholder="Indtast søgeord" type="search" name="" id="" />
          <span>
            <IoIosSearch />
          </span>
        </div>
      </div>
    </header>
  );
};
