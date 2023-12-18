import React from "react";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {ProtectedRoute} from "./ProtectedRoute";
import {useAuth} from "../provider/AuthContext";
import {Signin} from "../pages/auth/Signin";
import {Signup} from "../pages/auth/Signup";
import Home from "../pages/home/Home";
import {IotList} from "../pages/home/iot/IotList";
import {IotCreate} from "../pages/home/iot/IotCreate";
import {IotView} from "../pages/home/iot/IotView";

const Routes = () => {
  const {authenticated} = useAuth();

  // Define public routes accessible to all users
  const routesForPublic: [] = [];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <Home />,
          children: [
            {
              path: "/",
              element: <IotList />,
            },
            {
              path: "iot-create",
              element: <IotCreate />,
            },
            {
              path: "iot-view/:id",
              element: <IotView />,
            },
            {
              path: "*",
              element: (
                <div>
                  <h1>Page not found</h1>
                </div>
              ),
            },
          ],
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(authenticated === false ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
