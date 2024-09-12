import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import z from "zod";
import toast from "react-hot-toast";

const TokenAuth = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          background: 'repeat url("../../../public/back.jpg")',
          width: "100vw",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "fit-content",
            backgroundColor: "var(--default-color)",
            padding: "2rem 1rem",
            borderRadius: "1rem",
            margin: "auto",
          }}
          onClick={() => {
            if (!token) {
              toast.error("error occured");
              return console.log("no token");
            }
            const deco = jwtDecode(token);
            const parser = z.object({
              username: z.string(),
              id: z.number(),
              role: z.enum(["admin", "listner"]),
              iat: z.number(),
            });
            const { username } = parser.parse(deco);
            localStorage.setItem(username, token);
            navigate("/login");
          }}
        >
          Click here to proceed
        </div>
      </div>
    </>
  );
};

export default TokenAuth;
