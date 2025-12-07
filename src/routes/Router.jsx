import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayouts from "../Layouts/MainLayouts";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Clubs from "../pages/Clubs/Clubs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainLayouts,
    children:[
        {
            index:true,
            Component:Home
        },
        {
          path:"/clubs",
          Component:Clubs
        }
    ]
  },
  {
    path:"/auth",
    Component:AuthLayouts,
    children:[
      {
      path:"login",   
      Component:Login
    },
    {
      path:"register",
      Component:Register
    }
    ]
  }

]);
