import { useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import style from "./Header.module.scss";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [searchWord, setSearchWord] = useState();

  const navigate = useNavigate();

  //Sætter default value til at være 'a' hvis der bliver søgt med et tomt søgefelt
  const default_value = "a";

  //Function der navigerer til boligsiden med det søgte ord som param
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
