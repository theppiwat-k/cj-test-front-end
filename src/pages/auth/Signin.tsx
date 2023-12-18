import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Input} from "../../components/forms/Input";
import {FormProvider, useForm} from "react-hook-form";
import {PrimaryButton} from "../../components/buttons/PrimaryButton";
import {signin as signinService} from "../../services/user";
import {useAuth} from "../../provider/AuthContext";

interface ISignin {
  username: string;
  password: string;
}

export function Signin() {
  const navigate = useNavigate();
  const {setAuthenticated} = useAuth();
  const methods = useForm<ISignin>();

  const onSubmit = methods.handleSubmit(async data => {
    try {
      const body: ISignin = {
        username: data.username,
        password: data.password,
      };
      const signin = await signinService(body);
      await setAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(signin.data));
      navigate("/", {replace: true});
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div>
      <section className="flex h-screen items-center justify-center bg-white">
        <div className="container mb-4 flex max-w-md flex-col rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <FormProvider {...methods}>
            <form onSubmit={e => e.preventDefault()} noValidate>
              <div className="mb-4">
                <Input
                  type="username"
                  id="username"
                  label="Email"
                  placeholder="Enter username"
                  autocomplete="username"
                  validation={{
                    required: {
                      value: true,
                      message: "required",
                    },
                  }}
                />
              </div>
              <div className="mb-6">
                <Input
                  type="password"
                  id="password"
                  label="Password"
                  placeholder="Enter password"
                  autocomplete="password"
                  validation={{
                    required: {
                      value: true,
                      message: "required",
                    },
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-x-2">
                  <PrimaryButton
                    type="submit"
                    id="login"
                    text="Sign In"
                    onClick={onSubmit}
                  />
                  <Link to={"/signup"}>
                    <button
                      className="hover:bg-blue-dark rounded bg-blue-600 px-4 py-2 font-bold text-white"
                      type="button">
                      Register
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </section>
    </div>
  );
}
