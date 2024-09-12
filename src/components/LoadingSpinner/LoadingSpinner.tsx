import { BeatLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <BeatLoader color="blue" />
    </div>
  );
};

export default LoadingSpinner;
