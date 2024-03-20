import React from "react";
import Sidebar, { SidebarItem } from "./SidebarItems";
import { MdHomeFilled } from "react-icons/md";
import { MdGroups } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";

export default function App() {
  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem
          icon={<MdDashboard />}
          text="Dashboard"
          url="/dashboard"
        />

        <SidebarItem
          icon={<IoPersonSharp />}
          text="My Account"
          url="/my-account"
        />
      </Sidebar>
    </div>
  );
}
