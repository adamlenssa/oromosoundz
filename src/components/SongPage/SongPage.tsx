import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header.tsx/Header";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import styles from "./SongPage.module.css";
import { Requests } from "../../API";
import { useState } from "react";
import { Comment } from "../../types";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const SongPage = () => {
  const [newComment, setNewComment] = useState<string>("");
  const [hover, setHover] = useState<boolean>(false);
  const { id: param } = useParams();
  if (!param) throw new Error();
  const id = +param;
  const { allSongs, allComments, user, allUsers, getAllComments } =
    useGlobalContext();
  const song = allSongs.find((song) => song.id == id);
  const comments = allComments.filter((comment) => comment.songId == song?.id);
  const findUserInformation = (comment: Comment) =>
    allUsers.find((user) => user.id == comment.userId);
  const navigate = useNavigate();
  const hovered = hover ? styles.hover : undefined;
  const audio = (
    <>
      <div className={styles.thumbnail}>
        <img src={song?.image} alt="" />
        <audio src={song?.link} controls className={styles.audio}></audio>
      </div>
    </>
  );
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <h2>{song?.songname}</h2>
        <h3>{song?.singer}</h3>
        {audio}
        <p>Likes: {song?._count.likes}</p>
        <div className={styles.comments}>
          <h4>Comments</h4>
          <div className={styles.newComment}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!user) return navigate("/login");
                const token = localStorage.getItem(user.username);
                if (!token) return;
                if (newComment.length <= 0) return toast.error("Empty Comment");
                return Requests.newComment(token, {
                  songId: id,
                  comment: newComment,
                })
                  .then(() => {
                    getAllComments();
                    setNewComment("");
                  })
                  .then(() => toast.success("Succesfully added your comment"))
                  .catch((e) => console.log(e));
              }}
            >
              <textarea
                name="comment"
                id="comment"
                value={newComment}
                placeholder="Write your comment here...."
                onChange={(e) => {
                  setNewComment(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
              />
              <input type="submit" value="Comment" />
            </form>
          </div>
          <div className={styles.commentsFlex}>
            {comments.length == 0 && <h2>No Comments</h2>}
            {comments.length > 0 &&
              comments.map((comment) => {
                const rawDate = new Date(comment.time).toLocaleString();
                return (
                  <div className={styles.comment} key={comment.id}>
                    <div className={styles.top}>
                      <p>@{findUserInformation(comment)?.username}</p>
                      <p>{rawDate}</p>
                    </div>
                    <div className={styles.bottom}>
                      <p>{comment.comment}</p>
                      <FontAwesomeIcon
                        className={hovered}
                        icon={faTrash}
                        onMouseEnter={() => {
                          setHover(true);
                        }}
                        onMouseLeave={() => {
                          setHover(false);
                        }}
                        onClick={() => {
                          if (!user) return;
                          const token = localStorage.getItem(user.username);
                          if (!token) return;
                          return Requests.deleteComment(token, comment.id)
                            .then(() => getAllComments())
                            .then(() => {
                              toast.success("Success");
                            })
                            .catch(() => toast.error("Error occured"));
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SongPage;
