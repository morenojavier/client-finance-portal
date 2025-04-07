
import React, { useState } from "react";
import { Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavbarProps = {
  toggleSidebar: () => void;
};

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [notifications] = useState(2);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden mr-2"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-finance-dark hidden md:block">
          Portal Financiero
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-finance-secondary text-white text-xs flex items-center justify-center transform translate-x-1 -translate-y-1">
                {notifications}
              </span>
            )}
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-finance-primary flex items-center justify-center text-white">
            C
          </div>
          <span className="text-sm font-medium hidden md:block">
            Cliente Demo
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
