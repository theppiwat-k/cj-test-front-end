import {FieldValues, RegisterOptions} from "react-hook-form";

type validate = RegisterOptions<FieldValues, string>;

export const validateRequire = (
  message: string = "required",
): validate | undefined => {
  const validate = {
    required: {
      value: true,
      message: message,
    },
  };
  return validate;
};

export const validateUsername = (): validate | undefined => {
  const validate = {
    required: {
      value: true,
      message: "required",
    },
    maxLength: {
      value: 50,
      message: "max 50 characters",
    },
  };
  return validate;
};

export const validateEmail = (): validate | undefined => {
  const validate = {
    required: {
      value: true,
      message: "required",
    },
    pattern: {
      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      message: "email not match",
    },
  };
  return validate;
};

export const validatePassword = (): validate | undefined => {
  const validate = {
    required: {
      value: true,
      message: "required",
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      message: `at least 8 characters with a letter and a number.`,
    },
  };
  return validate;
};

// Add more validation functions as needed
