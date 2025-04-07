
import React from "react";
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ServiceTable from "@/components/ServiceTable";

const ServicesPage = () => {
  return (
    <div className="px-4 py-6 space-y-6">
      <div className="animate-in flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Servicios</h1>
          <p className="text-muted-foreground">
            Consulta todos tus servicios y su estado actual
          </p>
        </div>
        <Link to="/servicios/publico">
          <Button className="flex gap-1 items-center">
            <Share className="h-4 w-4" />
            <span>Compartir</span>
          </Button>
        </Link>
      </div>

      <div className="animate-in">
        <ServiceTable />
      </div>
    </div>
  );
};

export default ServicesPage;
