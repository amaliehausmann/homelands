import { navLinks } from "../../utils/NavArray";
import { NavLink } from "react-router-dom";
import style from "./NavBar.module.scss";

//Navbar component, med link til style module som trækker data fra et array og mapper det ud
export const NavBar = () => {
  return (
    <nav className={style.navStyling}>
      <ul>
        {navLinks.map((item) => (
          <li
            key={item.title}
          >
            <NavLink to={item.link} className={({ isActive }) =>
              isActive ? `${style.activeNavlink}` : style.navLink
            }>{item.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
