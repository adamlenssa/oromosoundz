import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header.tsx/Header";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import SongCard from "../SongCard/SongCard";
import styles from "./RegionPage.module.css";

const RegionPage = () => {
  const { region } = useParams();
  const { allSongs, user } = useGlobalContext();
  const songs = allSongs
    .filter((song) => song.type === region)
    .filter((song) => song.public || song.uploadedBy == user?.id);
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }
  if (songs.length == 0) {
    return (
      <>
        <Header />
        <h1>No songs available in {region}</h1>
      </>
    );
  }
  return (
    <>
      <Header />
      <h1 className={styles.title}>{region}</h1>
      <div className={styles.songs}>
        {songs.map((song) => (
          <SongCard song={song} key={song.id} />
        ))}
      </div>
    </>
  );
};

export default RegionPage;
