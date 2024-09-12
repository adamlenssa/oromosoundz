import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Providers/GlobalProvider";
import Header from "../Header.tsx/Header";
import toast from "react-hot-toast";
import styles from "./LoginPage.module.css";
import { Requests } from "../../API";
import { useEffect } from "react";
const LoginPage = () => {
  const { userInformation, setUserInformation, setUser, checkIfLoggedIn } =
    useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (checkIfLoggedIn()) {
      navigate("/music");
    }
  });
  return (
    <>
      <Header />
      <section className={styles.container}>
        <div className={styles.wrapper}>
          <h1>Login</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              Requests.login(
                userInformation,
                localStorage.getItem(userInformation.username)
              )
                .then((user) => {
                  setUser(user);
                  localStorage.setItem("user", JSON.stringify(user));
                })
                .then(() => navigate("/music"))
                .catch((e) => {
                  if (e.response.data.message == "invalid token") {
                    localStorage.removeItem(userInformation.username);
                    return toast.error("Try to login again");
                  }
                  if (e.response.data.message == "Email verification sent") {
                    return toast.success(e.response.data.message);
                  }
                  return toast.error(e.response.data.message);
                });
            }}
          >
            <div className={styles.row}>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                id="username"
                value={userInformation.username}
                onChange={(e) => {
                  setUserInformation({
                    ...userInformation,
                    username: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                id="username"
                onChange={(e) => {
                  setUserInformation({
                    ...userInformation,
                    passwordHash: e.target.value,
                  });
                }}
              />
            </div>
            <input type="submit" value="Login" />
            <p>
              If you are new here,{" "}
              <Link to="/register">click here to register.</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
