// import type { FormEvent } from "react";
// import { useState } from "react";
// import { setLocalStorage } from "../../../utils/storage";
import Button from "../../ui/Buttton";
import Input from "../../ui/Input";
import styles from "./Login.module.css";
import { login } from "../../../services/auth.service";

// ------------
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// ------------

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const result = await login(data);
      console.log("HASIL LOGIN:", result);
      localStorage.setItem("auth", result.token);

      navigate("/orders");
    } catch (errors) {
      console.error(errors);
    }
  };

  // ------------------------
  // const handleLogin = async (event: FormEvent) => {
  //   event.preventDefault();
  //   const form = event.target as HTMLFormElement;
  //   const payload = {
  //     email: form.email.value,
  //     password: form.password.value,
  //   };
  //   const result = await login(payload);
  //   console.log("HASIL LOGIN:", result);
  //   setLocalStorage("auth", result.token);
  //   window.location.href = "/orders";
  // };
  // ------------------------

  return (
    <main className={styles.login}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="Insert Email"
            {...register("email", { required: "Email wajib diisi" })}
          />
          {errors.email && (
            <p className={styles.message}>{errors.email.message}</p>
          )}

          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="Insert Password"
            {...register("password", { required: "Password wajib diisi" })}
          />
          {errors.password && (
            <p className={styles.message}>{errors.password.message}</p>
          )}

          <Button type="submit">Login</Button>
        </form>
      </div>
    </main>
  );
};

export default Login;

{
  /* <form className={styles.form} onSubmit={handleLogin}>
          <Input
            label="Email"
            name="email"
            id="email"
            type="email"
            placeholder="Insert Email"
            required
          />
          <Input
            label="Password"
            name="password"
            id="password"
            type="password"
            placeholder="Insert Password"
            required
          />
          <Button type="submit">Login</Button>
        </form> */
}
