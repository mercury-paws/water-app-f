import { NavLink } from "react-router-dom";
import css from "./Logo.module.css";

function Logo() {
  return (
    <div className={css.logoContainer}>
      <NavLink to="/">
        <p className={css.logo}>Aquatrack</p>
      </NavLink>
    </div>
  );
}

export default Logo;
