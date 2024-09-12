import { fas } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/Logo.png";
import styles from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfileDisplay from "../ProfileDisplay/ProfileDisplay";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import SearchBar from "../SearchBar/SearchBar";

const Header = () => {
  const [hover, setHover] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [hoverProfile, setHoverProfile] = useState<boolean>(false);
  const { user, width } = useGlobalContext();

  const searchBar = width < 565 ? <SearchBar /> : null;
  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.images}>
          <div className={styles.logo}>
            <img src={logo} alt="" />
          </div>
          <div className={styles.text}>Oromo Soundz</div>
        </div>

        <FontAwesomeIcon
          icon={fas.faBars}
          className={styles.hamburgerMenu}
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        />
        <div
          className={`${styles.menu} ${
            menuOpen ? styles.active : styles.inactive
          }`}
        >
          <ul
            className={`${styles.nav} ${
              menuOpen ? styles.active : styles.inactive
            }`}
          >
            <li
              onMouseEnter={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
            >
              <div className={styles.music}>
                <Link to="/music">Music</Link>
                {hover && (
                  <ul className={styles.options}>
                    <Link to="/music/Wallaga">
                      <li>Wallaga</li>
                    </Link>
                    <Link to="/music/Shewa">
                      <li>Shewa</li>
                    </Link>
                    <Link to="/music/Arsi">
                      <li>Arsi</li>
                    </Link>
                    <Link to="/music/Hararghe">
                      <li>Hararghe</li>
                    </Link>
                    <Link to="/music/Illubabor">
                      <li>Ilu Ababora</li>
                    </Link>
                    <Link to="/music/Jimma">
                      <li>Jimmaa</li>
                    </Link>
                    <Link to="/music/Bale">
                      <li>Bale</li>
                    </Link>
                    <Link to="/music/Borana">
                      <li>Borana</li>
                    </Link>
                    <Link to="/music/Wallo">
                      <li>Wallo</li>
                    </Link>
                    <Link to="/music/Oldies">
                      <li>Oldies</li>
                    </Link>
                    <Link to="/music/Modern">
                      <li>Modern</li>
                    </Link>
                  </ul>
                )}
              </div>
            </li>
            <li>
              <Link to="/addmusic">Add Music</Link>
            </li>
            {user?.role == "admin" && (
              <li>
                <Link to="/songs/approval">Approval</Link>
              </li>
            )}
            <li
              onMouseEnter={() => {
                setHoverProfile(!hoverProfile);
              }}
              onMouseLeave={() => {
                setHoverProfile(!hoverProfile);
              }}
            >
              <ProfileDisplay hoverProfile={hoverProfile} />
            </li>
          </ul>
          {searchBar}
        </div>
      </nav>
    </header>
  );
};

export default Header;
