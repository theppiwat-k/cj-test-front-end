import {FieldErrors, FieldValues} from "react-hook-form";

interface Props {
  errors: FieldErrors<FieldValues>;
  id: string;
}

export function findInputError({errors, id}: Props): {
  error: {
    message: string;
    ref: Record<string, string>;
    type: string;
  };
} {
  const filtered = Object.keys(errors)
    .filter(key => key === id)
    .reduce((cur, key: string) => {
      return Object.assign(cur, {error: errors[key]});
    }, {}) as {
    error: {
      message: string;
      ref: Record<string, string>;
      type: string;
    };
  };
  return filtered;
}
