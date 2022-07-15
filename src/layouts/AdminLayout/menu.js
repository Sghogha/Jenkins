import React from "react";
// ICON
import { ReactComponent as Dashboard } from "src/assets/images/icons/dashboard.svg";
import { ReactComponent as Pancil } from "src/assets/images/icons/pencil.svg";
import { ReactComponent as BillingInformtion } from "src/assets/images/icons/subscriptions.svg";
import { ReactComponent as Orgdetails } from "src/assets/images/icons/org-details.svg";

// SELECTED ICON
import { ReactComponent as SDashboard } from "src/assets/images/icons/s_dashboard.svg";
import { ReactComponent as SBillingInformtion } from "src/assets/images/icons/s_subscriptions.svg";
import { ReactComponent as SOrgdetails } from "src/assets/images/icons/s_org-details.svg";
import { ReactComponent as SPencil } from "src/assets/images/icons/s_pencil.svg";

export default [
  {
    href: "/advertise/dashboard",
    title: "Dashboard",
    icon: <Dashboard />,
    activeIcon: <SDashboard />,
    subMenus: [],
  },
  {
    href: "#",
    title: "Manage Video Ads",
    icon: <Pancil />,
    activeIcon: <Pancil />,
    subMenus: [
      {
        href: "/advertise/new",
        title: "New Ad",
        icon: <Pancil />,
        activeIcon: <SPencil />,
        subMenus: [],
      },
      {
        href: "/advertise/all",
        title: "All Ads",
        icon: <Pancil />,
        activeIcon: <SPencil />,
        subMenus: [],
      },
    ],
  },
  {
    href: "/advertise/organisation-details",
    title: "Organisation Details",
    icon: <Orgdetails />,
    activeIcon: <SOrgdetails />,
    subMenus: [],
  },
  {
    href: "/advertise/billing-information",
    title: "Billing Information",
    icon: <BillingInformtion />,
    activeIcon: <SBillingInformtion />,
    subMenus: [],
  },
];
