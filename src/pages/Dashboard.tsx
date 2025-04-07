
import React, { useState } from "react";
import DashboardCard from "@/components/DashboardCard";
import ServiceTable from "@/components/ServiceTable";
import { 
  DollarSign, 
  Receipt, 
  CheckCircle, 
  AlertCircle 
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [totalBalance] = useState(21000);
  const [totalServices] = useState(5);
  const [completedServices] = useState(3);
  const [pendingPayments] = useState(2);

  // Mock data for the chart
  const data = [
    { name: "Pagadas", value: 60 },
    { name: "Pendientes", value: 40 },
  ];

  const COLORS = ["#0891b2", "#e11d48"];

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="animate-in">
        <h1 className="text-2xl font-bold mb-1">Bienvenido al Portal Financiero</h1>
        <p className="text-muted-foreground">
          Revisa el estado actual de tus servicios y pagos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in">
        <DashboardCard
          title="Saldo Total"
          value={`$${totalBalance.toLocaleString('es-MX')}`}
          description="Valor actual de tus servicios"
          icon={DollarSign}
          trend={{ value: 12, positive: true }}
          className="border-l-4 border-finance-primary"
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
        <DashboardCard
          title="Pagos Pendientes"
          value={pendingPayments}
          description="Servicios con pago pendiente"
          icon={AlertCircle}
          className="border-l-4 border-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in">
        <div className="lg:col-span-2">
          <ServiceTable />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Estado de Pagos</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    labelLine={false}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
