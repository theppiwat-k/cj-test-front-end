import {axioswithCredentials} from "../api/axios";
import {useEffect} from "react";
import useRefreshToken from "./useRefreshToken";
import {useAuth} from "../provider/AuthContext";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const {setAuthenticated} = useAuth();

  useEffect(() => {
    const requestIntercept = axioswithCredentials.interceptors.request.use(
      config => {
        return config;
      },
      error => Promise.reject(error),
    );

    const responseIntercept = axioswithCredentials.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest?.sent
        ) {
          originalRequest.sent = true;
          try {
            await refresh();
            await setAuthenticated(true);
            return await axioswithCredentials(originalRequest);
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            await setAuthenticated(false);
          }
        }

        return Promise.reject(error);
      },
    );
    const controller = new AbortController();

    return () => {
      axioswithCredentials.interceptors.request.eject(requestIntercept);
      axioswithCredentials.interceptors.response.eject(responseIntercept);
      controller.abort();
    };
  }, [refresh, setAuthenticated]);

  return axioswithCredentials;
};

export default useAxiosPrivate;
