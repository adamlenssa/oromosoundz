import { useEffect } from "react";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import Header from "../Header.tsx/Header";
import SongCard from "../SongCard/SongCard";
import styles from "./ApprovalPage.module.css";
import { useNavigate } from "react-router-dom";

const ApprovalPage = () => {
  const { user, allSongs } = useGlobalContext();
  const navigate = useNavigate();
  const approvalSongs = allSongs.filter((song) => !song.public);
  const render =
    approvalSongs.length === 0 ? (
      <h1>No Songs to aprrove</h1>
    ) : (
      approvalSongs.map((song) => <SongCard song={song} key={song.id} />)
    );
  useEffect(() => {
    if (!user) return navigate("/login");
  });
  return (
    <>
      <Header />
      <h2 className={styles.title}>Approval Page</h2>
      <div className={styles.videos}>{render}</div>
    </>
  );
};

export default ApprovalPage;
