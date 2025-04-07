
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useIsMobile } from "@/hooks/use-mobile";

const AppLayout = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar - visible on desktop, conditionally visible on mobile */}
      {(showSidebar || !isMobile) && (
        <Sidebar 
          isMobile={isMobile} 
          toggleSidebar={isMobile ? toggleSidebar : undefined} 
        />
      )}

      {/* Overlay - only when sidebar is visible on mobile */}
      {isMobile && showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto pl-0 md:pl-16">
          <div className="container mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
