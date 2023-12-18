import axios, {axioswithCredentials} from "../api/axios";
import {ISignin, IUser} from "../models/user";

const register = async (IUser: IUser) => {
  const endpoint = "api/user";
  return await axios.post(endpoint, IUser);
};

const signin = async (ISignin: ISignin) => {
  const endpoint = "api/auth/signin";
  return await axioswithCredentials.post(endpoint, ISignin);
};

const signout = async (userId: string) => {
  const endpoint = `api/auth/signout/${userId}`;
  return await axioswithCredentials.post(endpoint);
};

const whoami = async () => {
  const endpoint = "api/auth/whoami";
  return await axioswithCredentials.get(endpoint);
};

const getUserProfile = async (email: string) => {
  const endpoint = `api/user/${email}`;
  return await axioswithCredentials.get(endpoint);
};
export {register, signin, signout, whoami, getUserProfile};
