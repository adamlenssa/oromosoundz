import { useGlobalContext } from "../../Providers/GlobalProvider";
import Header from "../Header.tsx/Header";
import SearchBar from "../SearchBar/SearchBar";
import SongCard from "../SongCard/SongCard";
import SongRow from "../SongRow/SongRow";
import styles from "./homePage.module.css";

const HomePage = () => {
  const { sections, allSongs, searchingSongs, isSearching, user, width } =
    useGlobalContext();
  const searchedSongs = allSongs.filter(
    (song) =>
      song.songname.toUpperCase().includes(searchingSongs.toUpperCase()) ||
      song.singer.toUpperCase().includes(searchingSongs.toUpperCase()) ||
      song.type.toUpperCase().includes(searchingSongs.toUpperCase())
  );
  const searchBar = width > 565 ? <SearchBar /> : null;
  return (
    <>
      <Header />
      {searchBar}
      <div className={styles.container}>
        {!isSearching &&
          sections.map((section, index) => {
            const songs =
              user?.role == "admin"
                ? section.songs
                : section.songs.filter(
                    (song) => song.public || song.uploadedBy == user?.id
                  );
            return (
              <SongRow
                songs={songs}
                title={section.name}
                key={index}
                height={197}
                width={350}
              />
            );
          })}
        {isSearching && (
          <div className={styles.filteredVideos}>
            {searchedSongs.map((song) => (
              <SongCard song={song} key={song.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
