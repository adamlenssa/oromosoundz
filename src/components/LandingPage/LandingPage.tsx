import styles from "./landingPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import SongCard from "../SongCard/SongCard";
import logo from "../../assets/Logo.png";
import { faArrowUpRightDots } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { trendingSongs } = useGlobalContext();
  return (
    <>
      <header className={styles.notloggedin}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <img src={logo} alt="Oromo Soundz Logo" />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.text}>
            <h1>Oromo Soundz</h1>
            <p>Where you find all of the amazing sounds of Oromia</p>
          </div>
          <div className={styles.buttons}>
            <Link to="/register">
              <div className={`${styles.btn} ${styles.lightaccent}`}>
                Sign Up
              </div>
            </Link>
            <Link to="/login">
              <div className={`${styles.btn} ${styles.maincolor}`}>Login</div>
            </Link>
          </div>
        </div>
      </header>
      <section className={styles.trendingSection}>
        <div className={styles.title}>
          <h3>
            <FontAwesomeIcon icon={faArrowUpRightDots} /> Trending
          </h3>
        </div>
        <div className={styles.trendingVideos}>
          {trendingSongs.map((song) => (
            <SongCard song={song} key={song.id} />
          ))}
        </div>
      </section>
      <section className={styles.about}>
        <div className={styles.adam}>
          <div className={styles.text}>
            <h2>About the Creator</h2>
            <p>
              My name is Adam Lenssa. I have created this app because I have a
              deep love for my cultural music and I wanted to create a platform
              where it would be easier for both the Diaspora and our people back
              home to find music to help connect them to our rich and beautiful
              culture.
            </p>
          </div>
          <div className={styles.picture}>
            <img src="/Porfile-pic.jpg" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
