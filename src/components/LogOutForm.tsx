import { SetUserType } from "../types/UserType";
import { useNavigate } from "react-router-dom";

export default function LogOutForm({ setUser }: SetUserType) {
  const navigate = useNavigate();
  return (
    <form onSubmit={handleSubmit}>
      <button>Log Out</button>
    </form>
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/log-out", {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }
}
