import { Artist, RegisterUser, Song, UserLogin } from "./types";
import { apiRequestAuth, apiRequestNoAuth } from "./Constants/axios";

export const Requests = {
  login: (userLogin: UserLogin, token: string | null) => {
    if (!token)
      return apiRequestNoAuth
        .post("/users/login", userLogin)
        .then((res) => res.data);
    return apiRequestAuth(token)
      .post("/users/login", userLogin)
      .then((res) => res.data);
  },
  getAllArtists: () =>
    apiRequestNoAuth
      .get("/artists")
      .then((res) => res.data)
      .catch(() => {
        throw new Error("Couldn't collect the artists");
      }),
  getAllSongs: () =>
    apiRequestNoAuth
      .get("/songs")
      .then((res) => res.data)
      .catch(() => {
        throw new Error("Couldn't load the songs");
      }),
  getAllComments: () =>
    apiRequestNoAuth
      .get("/comments")
      .then((res) => res.data)
      .catch(() => {
        throw new Error("Couldn't load comments");
      }),
  registerNewUser: (userInformation: RegisterUser) =>
    apiRequestNoAuth.post("/users", userInformation).then((res) => res.data),
  getAllLikes: () =>
    apiRequestNoAuth
      .get("/likes")
      .then((res) => res.data)
      .catch(() => {
        throw new Error("Couldn't load the likes");
      }),
  getAllUsers: () =>
    apiRequestNoAuth
      .get("/users")
      .then((res) => res.data)
      .catch(() => {
        throw new Error("Couldn't load users");
      }),
  addNewArtist: (token: string, newArtist: Omit<Artist, "id">) =>
    apiRequestAuth(token)
      .post("/artists", newArtist)
      .then((res) => res.data),
  addNewSong: (
    newSong: Omit<
      Song,
      "id" | "uploadedBy" | "time" | "boolean" | "public" | "_count"
    >,
    token: string
  ) =>
    apiRequestAuth(token)
      .post("/songs/", newSong)
      .then((res) => res.data),
  likeSong: (songId: number, token: string) =>
    apiRequestAuth(token)
      .post("/likes", { songId })
      .then((res) => res.data)
      .catch(() => {
        throw new Error("Couldn' like the song");
      }),
  unlikeSong: (likeId: number, token: string) =>
    apiRequestAuth(token)
      .delete(`/likes/${likeId}`)
      .catch(() => {
        throw new Error("Couldn' like the song");
      }),
  newComment: (token: string, comment: { songId: number; comment: string }) =>
    apiRequestAuth(token)
      .post("/comments", comment)
      .then((res) => res.data),
  deleteComment: (token: string, id: number) =>
    apiRequestAuth(token)
      .delete(`/comments/${id}`)
      .then((res) => res.data),
  aprroveSong: (token: string, body: { public: boolean }, id: number) =>
    apiRequestAuth(token).patch(`/songs/${id}`, body),
  trendingSongs: () =>
    apiRequestNoAuth.get("/songs/trending").then((res) => res.data),
};
