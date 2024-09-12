import { Link } from "react-router-dom";
import { Song } from "../../types";
import SongCard from "../SongCard/SongCard";
import styles from "./SongRow.module.css";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

const SongRow = ({
  songs,
  title,
}: {
  songs: Song[];
  title: string;
  height: number;
  width: number;
}) => {
  const linkurl = `/music/${title}`;
  if (songs.length == 0) {
    return (
      <div className={styles.songRow}>
        <Link to={linkurl}>
          <h3 className={styles.title}>{title}</h3>
        </Link>
        <p>No Songs Available</p>
      </div>
    );
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 2500, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className={styles.songRow}>
      <Link to={linkurl}>
        <h3 className={styles.title}>{title}</h3>
      </Link>
      <div className="container">
        <Carousel
          responsive={responsive}
          infinite={true}
          focusOnSelect={true}
          renderButtonGroupOutside={true}
          children={songs.map((song) => {
            return <SongCard song={song} key={song.id} />;
          })}
        ></Carousel>
      </div>
    </div>
  );
};

export default SongRow;
