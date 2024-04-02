import Loader from "appComponents/Loader";
import { useUser } from "appRedux/hooks";
import { initialCSS } from "appRedux/slices/tailwindClassSlice";
import { getUser, setIsUserLoading } from "appRedux/slices/userSlice";
import LoginComponent from "components/LoginComponent";
import { USER_VO } from "constants";
import AppBuilder from "features/appbuilder";
import AppHome from "features/apps";
import AppPage from "features/apps/components/AppPage";
import LogIn from "features/login/LogIn";
import ModulesHome from "features/modules";
import ScreenHome from "features/screens";
import ScreenList from "features/screens/components/ScreenList";
import ScreenPage from "features/screens/components/ScreenPage";
import { useDidMount } from "hooks/useDidMount";
import Axios from "lib/Axios";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useDispatch } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";

const Root = () => {
  const { isLoading, data } = useUser();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const computeAuth = async () => {
    const currentUrl = new URL(window.location.href);
    const token = currentUrl.searchParams.get("token");
    const getToken = sessionStorage.getItem("accessToken")?.length > 120;

    if (token || getToken) {
      if (!getToken) {
        sessionStorage.setItem("accessToken", token);
      }
      try {
        await dispatch(getUser());
        dispatch(initialCSS());
        navigate("/app-builder");
      } catch (error) {
        dispatch(setIsUserLoading());
        navigate("/app-builder/login");
      }
    } else {
      dispatch(setIsUserLoading());
      navigate("/app-builder/login");
      // return  <Navigate to="/login" replace={true} />
    }
  };
  useDidMount(async () => {
    await computeAuth();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return <Outlet />;
};

export const AppRouter = () => {
  const { data } = useUser();

 const publicRoutes=[
  {
    path: "app-builder/*",
    element: <LoginComponent />,
  },
]
  // const appRoutes = [
  //   {
  //     path: "/",
  //     element: <AppPage />,
  //     children: 
  //   },
  // ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,

      children: !data
      ? publicRoutes
      : [
          {
            path: "/",
            element: <Outlet />,
            children: [
              {
                path: "app-builder/:appId",
                element: <AppBuilder />,
              },
              {
                path: "app-builder",
                element: <AppPage />,
              },
            ],
          },
        ],
    },
  ],{
      
  });
  return <RouterProvider router={router} />;
};
