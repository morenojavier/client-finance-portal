
import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import NotificationDropdown, { Notification } from "./NotificationDropdown";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type NavbarProps = {
  toggleSidebar: () => void;
  companyName?: string;
};

const Navbar = ({ toggleSidebar, companyName = "Xulabia" }: NavbarProps) => {
  // Mock notifications data - in a real app, this would come from an API
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      message: "Se ha agregado un nuevo servicio: Consultoría Financiera",
      date: new Date(2023, 3, 7, 10, 30),
      read: false,
    },
    {
      id: "2",
      message: "Se ha agregado un nuevo servicio: Auditoría Fiscal",
      date: new Date(2023, 3, 6, 14, 15),
      read: false,
    },
    {
      id: "3",
      message: "Se ha actualizado el estado de un pago pendiente",
      date: new Date(2023, 3, 5, 9, 45),
      read: true,
    },
  ]);

  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  // Load company logo from localStorage on component mount
  useEffect(() => {
    const savedLogo = localStorage.getItem('companyLogo');
    if (savedLogo) {
      setLogoUrl(savedLogo);
    }
  }, []);

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
      <div className="md:w-1/3 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden mr-2"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 flex justify-center">
        <h1 className="text-xl font-semibold text-finance-dark">
          {companyName}
        </h1>
      </div>

      <div className="md:w-1/3 flex items-center justify-end space-x-4">
        <div className="relative">
          <NotificationDropdown 
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
          />
        </div>
        <Link to="/cuenta" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Avatar className="h-8 w-8">
            {logoUrl ? (
              <AvatarImage src={logoUrl} alt="Logo de empresa" />
            ) : (
              <AvatarFallback className="bg-finance-primary text-white">
                C
              </AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm font-medium hidden md:block">
            Cliente Demo
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
