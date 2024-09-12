import axios from "axios";

const baseURL = "https://oromosoundz.xyz/";

export const apiRequestNoAuth = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const apiRequestAuth = (token: string) =>
  axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const apiRequestAuthNewSong = (token: string) =>
  axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data;",
      Authorization: `Bearer ${token}`,
    },
  });
