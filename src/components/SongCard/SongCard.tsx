import styles from "./song-card.module.css";
import { Song } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import { Requests } from "../../API";
import toast from "react-hot-toast";
import ReactAudioPlayer from "react-audio-player";

const SongCard = ({ song }: { song: Song }) => {
  const { allLikes, user, getAllLikes, setAllLikes, getAllSongs } =
    useGlobalContext();
  const linkUrl = `/songs/${song.id}`;
  const checkIfLiked = () =>
    allLikes.find((like) => like.userId == user?.id && like.songId == song.id);

  return (
    <div className={styles.songCard}>
      <div className={styles.thumbnail}>
        <img src={song.image} alt="" />
        <ReactAudioPlayer src={song.link} controls style={{ width: "100%" }} />
      </div>
      <div className={styles.text}>
        <Link to={linkUrl}>
          <h3>{song.songname}</h3>
        </Link>
        <h4>{song.singer}</h4>
        <div className={styles.likes}>
          {user && (
            <FontAwesomeIcon
              icon={fas.faHeart}
              color={checkIfLiked() && "red"}
              onClick={async () => {
                const token = localStorage.getItem(user.username);
                const like = checkIfLiked();
                if (!token) return;
                if (!checkIfLiked()) {
                  try {
                    setAllLikes([
                      ...allLikes,
                      {
                        songId: song.id,
                        userId: user.id,
                        id: allLikes.length + 100,
                      },
                    ]);
                    await Requests.likeSong(song.id, token);
                    getAllSongs();
                    getAllLikes();
                    toast.success(`We love ${song.songname} by ${song.singer}`);
                  } catch (e) {
                    setAllLikes(allLikes);
                    checkIfLiked();
                    console.log(e);
                    toast.error("Couldn't Like the song");
                  }
                }
                setAllLikes(
                  allLikes.filter((like) => like.id !== checkIfLiked()?.id)
                );
                if (!like) return;
                return Requests.unlikeSong(like.id, token)
                  .then(() => {
                    getAllLikes();
                    getAllSongs();
                  })
                  .then(() => toast.success("Unliked"))
                  .catch((e) => {
                    console.log(e);
                    setAllLikes(allLikes);
                    toast.error("Couldn't remove your like");
                  });
              }}
            />
          )}
          <p>Likes: {song._count.likes}</p>
        </div>
      </div>
      <div className={styles.ratings}>
        {!song.public && user?.role == "admin" && (
          <FontAwesomeIcon
            icon={fas.faUpload}
            onClick={() => {
              const token = localStorage.getItem(user.username);
              if (!token) return;
              Requests.aprroveSong(token, { public: true }, song.id).then(() =>
                getAllSongs()
              );
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SongCard;
