import toast from "react-hot-toast";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import styles from "./addMusicPage.module.css";
import Header from "../Header.tsx/Header";
import { useNavigate } from "react-router-dom";
import { Requests } from "../../API";
import axios from "axios";
import { useState } from "react";
import { apiRequestNoAuth } from "../../Constants/axios";

const AddMusicPage = () => {
  const {
    newSong,
    setNewSong,
    addNewSong,
    getAllSongs,
    user,
    allArtists,
    getAllArtists,
  } = useGlobalContext();
  const navigate = useNavigate();
  const handleLinkToAudio = async () => {
    const songAudio = await apiRequestNoAuth.post("/songs/download", {
      link: newSong.link,
    });
    return songAudio.data.link;
  };
  const imageLink = async () => {
    const { data }: { data: { link: string } } = await axios.post(
      "http://localhost:1129/songs/image",
      {
        link: newSong.link,
      }
    );
    return data.link;
  };
  const [disable, setDisable] = useState<boolean>(false);
  return (
    <>
      <datalist id="artists">
        {allArtists.map((artist) => (
          <option key={artist.id}>{artist.fullName}</option>
        ))}
      </datalist>
      <Header />
      <section>
        <div className={styles.container}>
          <h1>Add New Music</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setDisable(true);
              if (!user) return navigate("/login");
              const token = localStorage.getItem(user.username);
              if (!token) {
                setDisable(false);
                return toast.error("Please login again!");
              }
              const artistExists = allArtists.find(
                (artist) => artist.fullName == newSong.singer
              );
              const songID = await handleLinkToAudio();
              const imageUrl = await imageLink();
              if (!artistExists) {
                const [firstName, lastName] = newSong.singer.split(" ");
                await Requests.addNewArtist(token, {
                  firstName,
                  lastName,
                  fullName: newSong.singer,
                }).catch((e) => {
                  toast.error(e.response.data.message);
                });
              }
              if (user.role == "admin") {
                return addNewSong({
                  link: songID,
                  singer: newSong.singer,
                  songname: newSong.songname,
                  type: newSong.type,
                  image: imageUrl,
                })
                  .then(() => {
                    setDisable(false);
                    setNewSong({
                      ...newSong,
                      singer: "",
                      songname: "",
                      link: "",
                    });
                    getAllSongs();
                    getAllArtists();
                    return toast.success("Successfully added song and artist");
                  })
                  .catch((e) => {
                    setDisable(false);
                    console.log(e.response.data);

                    toast.error(e.response.data.message);
                  });
              }

              return addNewSong({
                link: songID,
                singer: newSong.singer,
                songname: newSong.songname,
                type: newSong.type,
                image: imageUrl,
              }).then(() => {
                setDisable(false);
                getAllSongs();
                getAllArtists();
                return toast.success("Successfully uploaded, pending approval");
              });
            }}
            name="New Song"
          >
            <div className={styles.row}>
              <label htmlFor="songname">Song Name: </label>
              <input
                id="songname"
                disabled={disable}
                type="text"
                value={newSong.songname}
                required
                onChange={(e) =>
                  setNewSong({ ...newSong, songname: e.target.value })
                }
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="artistname">Artist Name: </label>
              <input
                id="artistname"
                disabled={disable}
                type="text"
                list="artists"
                value={newSong.singer}
                required
                onChange={(e) =>
                  setNewSong({ ...newSong, singer: e.target.value })
                }
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="Link">Link: </label>
              <input
                id="Link"
                disabled={disable}
                type="text"
                value={newSong.link}
                required
                onChange={(e) =>
                  setNewSong({ ...newSong, link: e.target.value })
                }
              />
            </div>
            <p>Make sure to paste the url from the youtube video!</p>
            <div className={styles.row}>
              <label htmlFor="type">Type: </label>
              <select
                disabled={disable}
                name="type"
                id="type"
                required
                onChange={(e) =>
                  setNewSong({ ...newSong, type: e.target.value })
                }
              >
                <option defaultChecked value="Wallaga">
                  Wallaga
                </option>
                <option value="Shewa">Shewa</option>
                <option value="Arsi">Arsi</option>
                <option value="Hararghe">Hararghe</option>
                <option value="Illubabor">Ilu Ababora</option>
                <option value="Jimma">Jimma</option>
                <option value="Bale">Bale</option>
                <option value="Borana">Borana</option>
                <option value="Guji">Guji</option>
                <option value="Karayuu">Karayuu</option>
                <option value="Wallo">Wallo</option>
                <option value="Oldies">Oldies</option>
                <option value="Modern">Modern</option>
              </select>
            </div>
            <input type="submit" value="Add Song" disabled={disable} />
          </form>
        </div>
      </section>
    </>
  );
};

export default AddMusicPage;
