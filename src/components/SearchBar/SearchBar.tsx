import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import styles from "./SearchBar.module.css";
import { fas } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const { searchingSongs, setSearchingSongs, setFocus, focus, setIsSearching } =
    useGlobalContext();

  return (
    <div
      className={`${styles.searchBar} ${focus && styles.focused}`}
      onFocus={() => {
        setFocus(true);
        setIsSearching(true);
      }}
      onBlur={() => {
        setFocus(false);
        if (searchingSongs.length < 1) {
          setIsSearching(false);
        }
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          value={searchingSongs}
          onChange={(e) => {
            setSearchingSongs(e.target.value);
          }}
        />
      </form>
      <FontAwesomeIcon icon={fas.faMagnifyingGlass} />
    </div>
  );
};

export default SearchBar;
