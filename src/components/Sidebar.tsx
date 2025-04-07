
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Receipt, 
  User, 
  LogOut, 
  Menu, 
  X,
  CreditCard,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SidebarProps = {
  isMobile?: boolean;
  toggleSidebar?: () => void;
};

const Sidebar = ({ isMobile, toggleSidebar }: SidebarProps) => {
  const navigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Clientes",
      path: "/clientes",
      icon: Users,
    },
    {
      name: "Servicios",
      path: "/servicios",
      icon: Receipt,
    },
    {
      name: "Datos de Pago",
      path: "/datos-pago",
      icon: CreditCard,
    },
    {
      name: "Mi Cuenta",
      path: "/cuenta",
      icon: User,
    },
  ];

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar fixed left-0 top-0 z-40 flex flex-col transition-all duration-300",
        isMobile ? "w-64" : "w-16 hover:w-64 group"
      )}
    >
      {isMobile && (
        <div className="flex justify-end p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-sidebar-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      <div className="flex items-center justify-center py-6">
        <div className={cn(
          "transition-all duration-300 overflow-hidden",
          isMobile ? "block" : "hidden group-hover:block"
        )}>
          <img 
            src="/lovable-uploads/2d8e8f94-d15f-4e1c-9d28-dae088e0a1cb.png" 
            alt="Logo" 
            className="h-12 w-auto" 
          />
        </div>
        <div className={cn(
          "transition-all", 
          isMobile ? "hidden" : "block group-hover:hidden"
        )}>
          <img 
            src="/lovable-uploads/2d8e8f94-d15f-4e1c-9d28-dae088e0a1cb.png" 
            alt="Logo" 
            className="h-8 w-auto" 
          />
        </div>
      </div>

      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sidebar-foreground rounded-md transition-all",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-foreground"
                      : "hover:bg-sidebar-accent/50"
                  )
                }
              >
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className={cn(
                  "transition-all duration-300 overflow-hidden",
                  isMobile ? "block" : "opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto"
                )}>
                  {item.name}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4">
        <button
          onClick={() => console.log("Logout")}
          className={cn(
            "flex items-center w-full px-4 py-3 text-sidebar-foreground rounded-md transition-colors hover:bg-sidebar-accent/50"
          )}
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className={cn(
            "transition-all duration-300 overflow-hidden", 
            isMobile ? "block" : "opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto"
          )}>
            Cerrar Sesión
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
