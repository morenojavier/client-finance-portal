
import React from "react";
import ServiceTable from "@/components/ServiceTable";

const ServicesPage = () => {
  return (
    <div className="px-4 py-6 space-y-6">
      <div className="animate-in">
        <h1 className="text-2xl font-bold mb-1">Servicios</h1>
        <p className="text-muted-foreground">
          Consulta todos tus servicios y su estado actual
        </p>
      </div>

      <div className="animate-in">
        <ServiceTable />
      </div>
    </div>
  );
};

export default ServicesPage;
