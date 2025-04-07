
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type PublicNavbarProps = {
  companyName?: string;
};

const PublicNavbar = ({ companyName = "Empresa Demo" }: PublicNavbarProps) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-finance-dark">
          {companyName}
        </h1>
      </div>

      <div className="flex items-center">
        <Link to="/login">
          <Button>Iniciar Sesión</Button>
        </Link>
      </div>
    </header>
  );
};

export default PublicNavbar;
