import Navbar from "@/components/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <ScrollArea className="h-full w-full">
        <div>
          <Outlet /> {/* This renders child routes */}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MainLayout;
