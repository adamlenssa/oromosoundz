import React from "react";

export type Song = {
  id: number;
  songname: string;
  singer: string;
  link: string;
  uploadedBy: number;
  type: string;
  public: boolean;
  time: Date;
  image?: string;
  _count: { likes: number };
};

export type Comment = {
  id: number;
  songId: number;
  userId: number;
  comment: string;
  time: Date;
};

export type User = {
  id: number;
  username: string;
  passwordHash: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "listner";
};

export type Artist = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
};

export type UserLogin = {
  username: string;
  passwordHash: string;
};

export type RegisterUser = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type Like = {
  userId: number;
  songId: number;
  id: number;
};

export type TGlobalContext = {
  allSongs: Song[];
  setAllSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  searchingSongs: string;
  setSearchingSongs: React.Dispatch<React.SetStateAction<string>>;
  sections: {
    name: string;
    songs: Song[];
  }[];
  allComments: Comment[];
  allArtists: Artist[];
  setAllArtists: React.Dispatch<React.SetStateAction<Artist[]>>;
  focus: boolean;
  setFocus: React.Dispatch<React.SetStateAction<boolean>>;
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  userInformation: UserLogin;
  setUserInformation: React.Dispatch<React.SetStateAction<UserLogin>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  registerUser: RegisterUser;
  setRegisterUser: React.Dispatch<React.SetStateAction<RegisterUser>>;
  registerUserInformation: (newUser: RegisterUser) => Promise<{
    token: string;
    newUser: User;
  }>;
  checkIfLoggedIn: () => boolean;
  newSong: Omit<
    Song,
    "id" | "uploadedBy" | "time" | "boolean" | "public" | "_count"
  >;
  setNewSong: React.Dispatch<
    React.SetStateAction<
      Omit<Song, "id" | "uploadedBy" | "time" | "boolean" | "public" | "_count">
    >
  >;
  addNewSong: (
    song: Omit<
      Song,
      "id" | "uploadedBy" | "time" | "boolean" | "public" | "_count"
    >
  ) => Promise<Response>;
  getAllSongs: () => Promise<string | void>;
  getAllLikes: () => Promise<string | void>;
  getAllArtists: () => Promise<string | void>;
  getAllUsers: () => Promise<string | void>;
  allUsers: Omit<User, "role" | "email" | "passwordHash">[];
  setAllUsers: React.Dispatch<
    React.SetStateAction<Omit<User, "role" | "email" | "passwordHash">[]>
  >;
  allLikes: Like[];
  setAllLikes: React.Dispatch<React.SetStateAction<Like[]>>;
  getAllComments: () => Promise<string | void>;
  trendingSongs: Song[];
  width: number;
};
