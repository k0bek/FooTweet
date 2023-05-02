import React from "react";
import Navbar from "./layout/sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen ">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
