import styles from "./ProfilePage.module.css";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import Header from "../Header.tsx/Header";
import SongCard from "../SongCard/SongCard";

const PorfilePage = () => {
  const { user, allSongs, allLikes } = useGlobalContext();
  const userFavorites = allLikes.filter((song) => song.userId == user?.id);
  return (
    <>
      <Header />
      <section className={styles.profile}>
        <div className={styles.userInfo}>
          <div className={styles.text}>
            <h3>
              <span>Name:</span> {user?.firstName} {user?.lastName}
            </h3>
            <h3>
              <span>Username:</span> {user?.username}
            </h3>
            <h3>
              <span>Email:</span> {user?.email}
            </h3>
          </div>
        </div>
        <div className={styles.favoritedSongs}>
          <h2>Liked Songs</h2>
          <div className={styles.songs}>
            {userFavorites.map((like) => {
              const songData = allSongs.find((song) => song.id == like.songId);
              if (!songData) {
                return;
              }
              return <SongCard song={songData} key={songData.id} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default PorfilePage;
