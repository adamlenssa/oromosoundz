import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Artist,
  Comment,
  Like,
  RegisterUser,
  Song,
  TGlobalContext,
  User,
  UserLogin,
} from "../types";
import { Requests } from "../API";
import toast from "react-hot-toast";

const GlobalContext = createContext<TGlobalContext>({} as TGlobalContext);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [allArtists, setAllArtists] = useState<Artist[]>([]);
  const [allUsers, setAllUsers] = useState<
    Omit<User, "role" | "email" | "passwordHash">[]
  >([]);
  const [allLikes, setAllLikes] = useState<Like[]>([]);
  const [searchingSongs, setSearchingSongs] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [userInformation, setUserInformation] = useState<UserLogin>({
    username: "",
    passwordHash: "",
  });
  const [user, setUser] = useState<User | null>(null);
  const [registerUser, setRegisterUser] = useState<RegisterUser>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [newSong, setNewSong] = useState<
    Omit<Song, "id" | "uploadedBy" | "time" | "boolean" | "public" | "_count">
  >({
    singer: "",
    songname: "",
    link: "",
    type: "Wallaga",
  });
  const [trendingSongs, setTrendingSongs] = useState<Song[]>([]);
  const songTypes = [
    "Shewa",
    "Wallaga",
    "Arsi",
    "Bale",
    "Jimma",
    "Hararghe",
    "Borana",
    "Guji",
    "Illubabor",
    "Karayuu",
    "Modern",
    "Oldies",
    "Wallo",
  ];
  const sections = songTypes.map((type) => ({
    name: type,
    songs: allSongs.filter((song) => song.type == type),
  }));
  const getAllSongs = () =>
    Requests.getAllSongs()
      .then(setAllSongs)
      .catch((err) => {
        toast.error(err.message);
      });
  const getAllComments = () =>
    Requests.getAllComments()
      .then(setAllComments)
      .catch((err) => toast.error(err.message));
  const getAllLikes = () =>
    Requests.getAllLikes()
      .then(setAllLikes)
      .catch((err) => toast.error(err.message));
  const getAllArtists = () =>
    Requests.getAllArtists()
      .then((artists) => setAllArtists(artists))
      .catch((e) => toast.error(e.message));
  const checkIfLoggedIn = () => {
    const loggedin = localStorage.getItem("user");
    if (!loggedin) {
      return false;
    }
    const parse = JSON.parse(loggedin);
    if (!parse) {
      return false;
    }
    setUser(JSON.parse(loggedin));

    return true;
  };
  const getAllUsers = () =>
    Requests.getAllUsers()
      .then(setAllUsers)
      .catch((e) => toast.error(e.message));
  const registerUserInformation = (newUser: RegisterUser) =>
    Requests.registerNewUser(newUser);

  const addNewSong = (
    song: Omit<
      Song,
      "id" | "uploadedBy" | "time" | "boolean" | "public" | "_count"
    >
  ) => {
    if (!user) throw new Error("not Logged in");
    const token = localStorage.getItem(user.username);
    if (!token) throw new Error("unauthorized");
    return Requests.addNewSong(song, token);
  };
  const getTrendingSongs = () => {
    Requests.trendingSongs()
      .then((songs) => setTrendingSongs(songs))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkIfLoggedIn();
    getAllSongs();
    getAllLikes();
    getAllComments();
    getAllArtists();
    getAllUsers();
    getTrendingSongs();
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", () => {
      handleResize();
    });
  }, []);
  const [width, setWidth] = useState(window.innerWidth);

  return (
    <GlobalContext.Provider
      value={{
        allSongs,
        setAllSongs,
        allArtists,
        setAllArtists,
        searchingSongs,
        setSearchingSongs,
        getAllArtists,
        sections,
        allComments,
        focus,
        setFocus,
        isSearching,
        setIsSearching,
        userInformation,
        setUserInformation,
        registerUserInformation,
        user,
        setUser,
        registerUser,
        setRegisterUser,
        getAllUsers,
        setAllUsers,
        allUsers,
        checkIfLoggedIn,
        newSong,
        setNewSong,
        addNewSong,
        getAllSongs,
        getAllLikes,
        allLikes,
        setAllLikes,
        getAllComments,
        trendingSongs,
        width,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => useContext(GlobalContext);
export default GlobalProvider;
