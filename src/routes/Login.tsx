import { useState } from "react";
import FormInput from "../components/FormInput";
import ValidationError from "../components/InputValidationError";
import { useNavigate } from "react-router-dom";
import { UseUser } from "./Root";
import { UserType } from "../types/UserType";

type LoginErrors = {
  credentials?: string;
  networkError?: string;
};

export default function Login() {
  const [errors, setErrors] = useState<LoginErrors>();
  const { setUser } = UseUser();
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <FormInput name="username" />
      <FormInput name="password" type="password" />
      <ValidationError error={errors?.credentials} />
      <ValidationError error={errors?.networkError} />
      <button>Login</button>
    </form>
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (res.status >= 400) {
        const resError = await res.json();
        setErrors(resError);
        return;
      }
      const resData: UserType = await res.json();
      setUser(resData);
      navigate("/");
    } catch (error) {
      setErrors({
        ...errors,
        networkError: "Network error. Please try again",
      });
    }
  }
}
