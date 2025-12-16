import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayouts from "../Layouts/MainLayouts";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Clubs from "../pages/Clubs/Clubs";
import AdminDashboard from "../dashboard/Admin/AdminDashboard";
import ManagerDashboard from "../dashboard/Manager/ManagerDashboard";
import MemberDashboard from "../dashboard/Member/MemberDashboard";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageUser from "../dashboard/Admin/ManageUser/ManageUser";
// import ManageUserCard from "../dashboard/Admin/ManageUser/ManageUserCard";
import MangeClub from "../dashboard/Admin/ManageClubs/MangeClub";
import Payment from "../dashboard/Admin/Payments/Payment";
import ManagerOverview from "../dashboard/Manager/Manager Overview/ManagerOverview";
import MyClubs from "../dashboard/Manager/My Clubs/MyClubs";
import ClubMembers from "../dashboard/Manager/club-members/ClubMembers";
import EventsManagement from "../dashboard/Manager/events-Management/EventsManagement";
import EventRegistrations from "../dashboard/Manager/event-registrations/EventRegistrations";
import CreateClub from "../dashboard/Manager/My Clubs/CreateClub";
import MemberOverview from "../dashboard/Member/MemberOverview/MemberOverview";
import My_Clubs from "../dashboard/Member/My-clubs/My_Clubs";
import ClubDetails from "../dashboard/Member/My-clubs/ClubDetails ";
import MyEvents from "../dashboard/Member/My-Events/MyEvents";
import PaymentHistory from "../dashboard/Member/Payment-History/PaymentHistory";
import ClubDetailspage from "../pages/Clubs/ClubDetails";
import AdminOverview from "../dashboard/Admin/AdminOverviews/AdminOverview";
import CreateEventForm from "../dashboard/Manager/events-Management/CreateEventForm";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/clubs",
        Component: Clubs,
      },
      {
        path:"/club_details/:id",
        Component:ClubDetailspage
      },
      {
        path:"events",
        Component:EventsManagement
      }
    ],
  },
  {
    path: "/auth",
    Component: AuthLayouts,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "admin",
        children: [
          {
            index: true,
            Component: AdminOverview,
          },
          {
            path: "manage-users",
            Component: ManageUser,
          },
          {
            path: "manage-clubs",
            Component: MangeClub,
          },
          {
            path: "payments",
            Component: Payment,
          },
        ],
      },
      {
        path: "member",
        children: [
          {
            index: true,
            Component: MemberOverview,
          },
          {
            path: "myclubs",
            Component: My_Clubs,
          },
          {
            path: "club-details/:id",
            Component: ClubDetails,
          },
          {
            path:"myevents",
            Component:MyEvents
          },
          {
            path:"paymenthistory",
            Component:PaymentHistory
          }
        ],
      },
      {
        path: "manager",
        children: [
          {
            index: true,
            Component: ManagerOverview,
          },
          {
            path: "my-clubs",
            Component: MyClubs,
          },
          {
            path:"create_event",
            Component:CreateEventForm
          },
          {
            path: "create-club",
            Component: CreateClub,
          },
          {
            path: "club-members",
            Component: ClubMembers,
          },
          {
            path: "events-Management",
            Component: EventsManagement,
          },
          {
            path: "event-registrations",
            Component: EventRegistrations,
          },
        ],
      },
      // {
      //   path:"managerdashboard",
      //   Component:ManagerDashboard
      // },
      // {
      //   path:"memberdashboard",
      //   Component:MemberDashboard
      // },
    ],
  },
]);
