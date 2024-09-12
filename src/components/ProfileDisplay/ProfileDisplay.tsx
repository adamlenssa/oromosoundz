import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProfileDisplay.module.css";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import { Link } from "react-router-dom";

const ProfileDisplay = ({ hoverProfile }: { hoverProfile: boolean }) => {
  const { user, setUser } = useGlobalContext();
  if (!user) {
    return (
      <div className={styles.wrapper}>
        <Link to="/login">
          <p>Sign In</p>
        </Link>
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.profileDisplay}>
        <div className={styles.text}>
          <p>{`${user.firstName} ${user.lastName}`}</p>
          {!hoverProfile && <FontAwesomeIcon icon={fas.faCaretDown} />}
          {hoverProfile && <FontAwesomeIcon icon={fas.faCaretUp} />}
        </div>
        {hoverProfile && (
          <div className={styles.menu}>
            <Link to="/profile">
              <p>Profile</p>
            </Link>
            <Link to="/">
              <p
                onClick={() => {
                  localStorage.removeItem("user");
                  setUser(null);
                }}
              >
                Logout
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDisplay;
