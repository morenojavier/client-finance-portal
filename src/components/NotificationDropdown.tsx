
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Notification = {
  id: string;
  message: string;
  date: Date;
  read: boolean;
};

type NotificationDropdownProps = {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
};

const NotificationDropdown = ({
  notifications,
  onMarkAsRead,
}: NotificationDropdownProps) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSelect = (id: string) => {
    onMarkAsRead(id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-finance-secondary text-white text-xs flex items-center justify-center transform translate-x-1 -translate-y-1">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="py-2 px-4 text-sm text-muted-foreground text-center">
            No hay notificaciones
          </div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              onClick={() => handleSelect(notification.id)}
              className={`p-3 cursor-pointer ${!notification.read ? "bg-slate-50" : ""}`}
            >
              <div className="w-full">
                <div className="flex justify-between items-start">
                  <p className={`text-sm ${!notification.read ? "font-medium" : ""}`}>
                    {notification.message}
                  </p>
                  {!notification.read && (
                    <span className="h-2 w-2 bg-finance-secondary rounded-full flex-shrink-0 mt-1"></span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {notification.date.toLocaleDateString("es-MX", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
