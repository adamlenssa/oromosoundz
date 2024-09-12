import Header from "../Header.tsx/Header.tsx";
import styles from "./RegistrationPage.module.css";
import { useGlobalContext } from "../../Providers/GlobalProvider.tsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const {
    registerUser,
    setRegisterUser,
    registerUserInformation,
    checkIfLoggedIn,
  } = useGlobalContext();
  return (
    <>
      <Header />
      <section className={styles.section}>
        <div className={styles.wrapper}>
          <h1>Registration</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              registerUserInformation(registerUser)
                .then(({ token, newUser }) => {
                  localStorage.setItem(newUser.username, token);
                  localStorage.setItem("user", JSON.stringify(newUser));
                  checkIfLoggedIn();
                  navigate("/music");
                })
                .catch((e) =>
                  toast.error(e.response.data[0].errors.issues[0].message)
                );
            }}
          >
            <div className={styles.row}>
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                name="username"
                value={registerUser.username}
                onChange={(e) => {
                  setRegisterUser({
                    ...registerUser,
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
                id="password"
                value={registerUser.password}
                onChange={(e) => {
                  setRegisterUser({
                    ...registerUser,
                    password: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="name">First Name: </label>
              <input
                type="text"
                name="firstName"
                value={registerUser.firstName}
                onChange={(e) => {
                  setRegisterUser({
                    ...registerUser,
                    firstName: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="name">Last Name: </label>
              <input
                type="text"
                name="lastName"
                value={registerUser.lastName}
                onChange={(e) => {
                  setRegisterUser({
                    ...registerUser,
                    lastName: e.target.value,
                  });
                }}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={registerUser.email}
                onChange={(e) => {
                  setRegisterUser({ ...registerUser, email: e.target.value });
                }}
              />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </section>
    </>
  );
};

export default RegistrationPage;
