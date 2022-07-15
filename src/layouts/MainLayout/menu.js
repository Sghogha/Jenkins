import React from "react";
// ICON
import { ReactComponent as Dashboard } from "src/assets/images/icons/dashboard.svg";
import { ReactComponent as Pancil } from "src/assets/images/icons/pencil.svg";
import { ReactComponent as Subscriptions } from "src/assets/images/icons/subscriptions.svg";
import { ReactComponent as Website } from "src/assets/images/icons/website.svg";
import { ReactComponent as User } from "src/assets/images/icons/user.svg";
import { ReactComponent as Bank } from "src/assets/images/icons/bank.svg";

// SELECTED ICON
import { ReactComponent as SDashboard } from "src/assets/images/icons/s_dashboard.svg";
import { ReactComponent as SSubscriptions } from "src/assets/images/icons/s_subscriptions.svg";
import { ReactComponent as SWebsite } from "src/assets/images/icons/s_website.svg";
import { ReactComponent as SUser } from "src/assets/images/icons/s_user.svg";
import { ReactComponent as SBank } from "src/assets/images/icons/s_bank.svg";
import { ReactComponent as SPencil } from "src/assets/images/icons/s_pencil.svg";

export default [
  // { href: "/channel-set-up", title: "Channel" },
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: <Dashboard />,
    activeIcon: <SDashboard />,
    subMenus: [],
  },
  {
    href: "#",
    title: "Manage Posts",
    icon: <Pancil />,
    activeIcon: <Pancil />,
    subMenus: [
      {
        href: "/post/new",
        title: "New Post",
        icon: <Pancil />,
        activeIcon: <SPencil />,
        subMenus: [],
      },
      {
        href: "/post/all",
        title: "All Post",
        icon: <Pancil />,
        activeIcon: <SPencil />,
        subMenus: [],
      },
      {
        href: "/post/categories",
        title: "Categories",
        icon: <Pancil />,
        activeIcon: <SPencil />,
        subMenus: [],
      },
    ],
  },
  {
    href: "/subscription",
    title: "Manage Subscriptions",
    icon: <Subscriptions />,
    activeIcon: <SSubscriptions />,
    subMenus: [],
  },
  {
    href: "/edit-website",
    title: "Edit Website",
    icon: <Website />,
    activeIcon: <SWebsite />,
    subMenus: [],
  },
  {
    href: "/user-profile",
    title: "User Details",
    icon: <User />,
    activeIcon: <SUser />,
    subMenus: [],
  },
  {
    href: "/bank-details",
    title: "Banking Details",
    icon: <Bank />,
    activeIcon: <SBank />,
    subMenus: [],
  },
];
