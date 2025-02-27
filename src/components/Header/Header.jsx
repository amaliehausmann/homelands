import { useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import style from "./Header.module.scss";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [searchWord, setSearchWord] = useState();

  const navigate = useNavigate();

  const default_value = 'a';

  function search(searchedWord) {
    navigate(`/boliger/search/${searchedWord}`);
  }

  return (
    <header className={style.headerStyling}>
      <div>
        <h1>HomeLands</h1>
      </div>
      <div>
        <NavBar />
        <div>
          <input
            placeholder="Indtast søgeord"
            type="search"
            name="search"
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <span onClick={() => search(searchWord || default_value)}>
            <IoIosSearch />
          </span>
        </div>
      </div>
    </header>
  );
};
