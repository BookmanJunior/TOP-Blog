import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import ValidationError from "../components/InputValidationError";
import { UseUser } from "./Root";
import { UserType } from "../types/UserType";
import "../styles/SignUp.scss";

type Credentials = {
  username: string;
  password: string;
  confirmPassword: string;
};

type ValidationErrors = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  networkError?: string;
};

export default function SingUp() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>();
  const { setUser } = UseUser();
  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit} className="sign-up-form">
      <FormInput
        name="username"
        value={credentials.username}
        onChange={(e) => {
          const inputVal = e.target.value;
          setCredentials({ ...credentials, username: inputVal });
          if (inputVal.length >= 4) {
            if (errors?.username) {
              setErrors({ ...errors, username: "" });
            }
          } else {
            setErrors({
              ...errors,
              username: "Username must be at least 4 characters long",
            });
          }
        }}
      >
        <ValidationError error={errors?.username} />
      </FormInput>
      <FormInput
        name="password"
        value={credentials.password}
        type="password"
        onChange={(e) => {
          const inputVal = e.target.value;
          setCredentials({ ...credentials, password: inputVal });
          if (inputVal.length >= 8) {
            if (errors?.password) {
              setErrors({ ...errors, password: "" });
            }
          } else {
            setErrors({
              ...errors,
              password: "Password must be at least 8 characters long",
            });
          }
        }}
      >
        <ValidationError error={errors?.password} />
      </FormInput>
      <FormInput
        name="confirmPassword"
        value={credentials.confirmPassword}
        title="Confirm Password"
        type="password"
        onChange={(e) => {
          const inputVal = e.target.value;
          setCredentials({ ...credentials, confirmPassword: inputVal });
          if (inputVal.length >= 8) {
            if (errors?.confirmPassword) {
              setErrors({ ...errors, confirmPassword: "" });
            }
          }
          if (inputVal !== credentials.password) {
            setErrors({
              ...errors,
              confirmPassword: "Password's don't match",
            });
          }
        }}
      >
        <ValidationError error={errors?.confirmPassword} />
      </FormInput>
      <ValidationError error={errors?.networkError} />
      <button>Sign Up</button>
    </form>
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (ValidationResult()) {
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/sign-up", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (res.status >= 400) {
        const resError = (await res.json()) as ValidationErrors;
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

  function ValidationResult() {
    let isError = false;

    if (credentials.username.length < 4) {
      setErrors((latest) => ({
        ...latest,
        username: "Username must be at least 4 characters long",
      }));
      isError = true;
    }

    if (credentials.password.length < 8) {
      setErrors((latest) => ({
        ...latest,
        password: "Password must be at least 8 characters long",
      }));
      isError = true;
    }

    if (credentials?.confirmPassword !== credentials?.password) {
      setErrors((latest) => ({
        ...latest,
        confirmPassword: "Passwords don't match",
      }));
      isError = true;
    }
    return isError;
  }
}
