import { login } from "../../../services/auth.service";

// ------------
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "@heroui/react";
// ------------

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const result = await login(data);
      // console.log("HASIL LOGIN:", result);
      localStorage.setItem("auth", result.token);

      navigate("/orders");
    } catch (errors) {
      console.error(errors);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen p-5">
      <div className="shadow-lg p-10 w-[35%]  rounded-2xl outline-1 outline-gray-200">
        <h1 className="text-center text-4xl font-semibold mb-4">Login</h1>
        <Form
          className="w-full flex flex-col gap-6"
          onReset={() => {}}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            size="lg"
            isRequired
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email"
            type="email"
            {...register("email")}
          />

          <Input
            size="lg"
            isRequired
            errorMessage="Please enter a valid Password"
            label="Password"
            labelPlacement="outside"
            placeholder="Insert Password"
            type="password"
            {...register("password")}
          />

          <div className="flex gap-2 w-full ">
            <Button size="md" color="primary" type="submit">
              Submit
            </Button>
            <Button size="md" type="reset" variant="flat">
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </main>
  );
};

export default Login;
