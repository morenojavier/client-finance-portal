
import React from "react";
import PublicNavbar from "@/components/PublicNavbar";
import ServiceTable from "@/components/ServiceTable";

const PublicServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-6">
          <div className="animate-in">
            <h1 className="text-2xl font-bold mb-1">Servicios</h1>
            <p className="text-muted-foreground">
              Listado de servicios disponibles
            </p>
          </div>

          <div className="animate-in">
            <ServiceTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicServicesPage;
