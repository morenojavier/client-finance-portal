
import React, { useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import ServiceTable from "@/components/ServiceTable";
import { 
  DollarSign, 
  Receipt, 
  CheckCircle, 
  AlertCircle,
  CircleDollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [totalBalance] = useState(21000);
  const [totalServices] = useState(5);
  const [completedServices] = useState(3);
  const [pendingPayments] = useState(2);

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="animate-in flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Bienvenido a tu estado de cuenta</h1>
          <p className="text-muted-foreground">
            Revisa el estado actual de tus servicios y pagos
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700"
          onClick={() => console.log("Liquidar adeudo")}
        >
          <CircleDollarSign className="mr-2 h-4 w-4" />
          Liquidar adeudo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in">
        <DashboardCard
          title="Adeudo Total"
          value={`$${totalBalance.toLocaleString('es-MX')}`}
          description="Valor actual de tus servicios"
          icon={DollarSign}
          className="border-l-4 border-finance-primary"
        />
        <DashboardCard
          title="Pagos Pendientes"
          value={pendingPayments}
          description="Servicios con pago pendiente"
          icon={AlertCircle}
          className="border-l-4 border-orange-500"
        />
        <DashboardCard
          title="Total de Servicios"
          value={totalServices}
          description="Servicios activos"
          icon={Receipt}
          className="border-l-4 border-finance-secondary"
        />
        <DashboardCard
          title="Servicios Completados"
          value={completedServices}
          description="Servicios facturados y pagados"
          icon={CheckCircle}
          className="border-l-4 border-green-500"
        />
      </div>

      <div className="animate-in">
        <ServiceTable />
      </div>
    </div>
  );
};

export default Dashboard;
