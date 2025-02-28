import { navLinks } from "../../utils/NavArray";
import { NavLink } from "react-router-dom";
import style from "./NavBar.module.scss";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export const NavBar = () => {
  const { userToken } = useContext(UserContext);

  // Mapper over navLinks arrayet og opretter et nyt array (linkArray)
  const linkArray = navLinks.map((item) =>
    // Hvis linket er til "/login" ændres titlen hvis der er en userToken
    item.link === "/login"
      ? { ...item, title: userToken ? "Min profil" : "Login" } // Hvis userToken eksisterer = "Min profil", ellers "Login"
      : item
  );

  return (
    <nav className={style.navStyling}>
      <ul>
        {linkArray.map((item) => (
          <li key={item.title}>
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                isActive ? style.activeNavlink : style.navLink
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
