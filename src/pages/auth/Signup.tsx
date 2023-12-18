import React, {useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {Input} from "../../components/forms/Input";
import {Link, useNavigate} from "react-router-dom";
import {PrimaryButton} from "../../components/buttons/PrimaryButton";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/validations";
import {register as registerService} from "../../services/user";
import {IUser} from "../../models/user";
import ApiErrorHelper from "../../utils/apiErrorHelper";
import {CancelButton} from "../../components/buttons/CancelButton";
interface IRegisrer {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export function Signup() {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const methods = useForm<IRegisrer>();
  const onSubmit = methods.handleSubmit(async ({email, password, username}) => {
    try {
      const body: IUser = {
        email: email,
        password: password,
        username: username,
      };
      const register = await registerService(body);
      console.log(register);
      navigate("/login", {replace: true});
      methods.reset();
    } catch (error) {
      console.error("Axios Error:", error);
      const errorHelper = new ApiErrorHelper(error);
      const errorMessage = errorHelper.getErrorMessage();
      setError(errorMessage);
    }
  });

  const validateConfirmPassword = () => {
    const password = methods.getValues("password");
    const confirmPassword = methods.getValues("confirmPassword");
    if (password === confirmPassword) {
      return true;
    } else {
      return "passwords do not match";
    }
  };

  return (
    <div>
      <section className="flex h-screen items-center justify-center bg-white">
        <div className="container mb-4 flex max-w-md flex-col rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <h1 className="mb-3 text-2xl font-bold">Register</h1>
          <FormProvider {...methods}>
            <form onSubmit={e => e.preventDefault()} noValidate>
              <Input
                type="username"
                id="username"
                label="Username"
                placeholder="Enter username"
                className="mb-2"
                autocomplete="username"
                validation={validateUsername()}
              />
              <Input
                type="password"
                id="password"
                label="Password"
                placeholder="Enter password"
                className="mb-2"
                autocomplete="new-password"
                validation={{
                  ...validatePassword(),
                }}
              />
              <Input
                type="password"
                id="confirmPassword"
                label="Confirm Password"
                placeholder="Enter confirm password"
                className="mb-2"
                autocomplete="new-password"
                validation={{
                  required: {
                    value: true,
                    message: "required",
                  },
                  validate: validateConfirmPassword,
                }}
              />
              <Input
                type="email"
                id="email"
                label="Email"
                placeholder="Enter username"
                className="mb-2"
                autocomplete="email"
                validation={validateEmail()}
              />
              <div className="mb-6">
                <span className="text-xs text-red-500">{error}</span>
              </div>
              <PrimaryButton
                type="submit"
                id="submit"
                text="Submit"
                onClick={onSubmit}
                className="mx-2"
              />
              <Link to="/login">
                <CancelButton
                  type="button"
                  id="button"
                  text="Cancel"
                  className="max-w-sm"
                />
              </Link>
            </form>
          </FormProvider>
        </div>
      </section>
    </div>
  );
}
