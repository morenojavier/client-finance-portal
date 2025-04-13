import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "@/components/DashboardCard";
import { 
  DollarSign, 
  Receipt, 
  CheckCircle, 
  AlertCircle,
  CircleDollarSign,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [totalBalance] = useState(21000);
  const [totalServices] = useState(5);
  const [completedServices] = useState(3);
  const [pendingPayments] = useState(2);
  const [totalClients] = useState(3);
  const [activeClients] = useState(3);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 animate-in">
        <DashboardCard
          title="Adeudo Total"
          value={`$${totalBalance.toLocaleString('es-MX')}`}
          description="Valor total de servicios"
          icon={DollarSign}
          className="border-l-4 border-finance-primary sm:col-span-2 xl:col-span-2"
        />
        <DashboardCard
          title="Total Clientes"
          value={totalClients}
          description="Clientes registrados"
          icon={Users}
          className="border-l-4 border-blue-500"
        />
        <DashboardCard
          title="Clientes Activos"
          value={activeClients}
          description="Con pagos pendientes"
          icon={Users}
          className="border-l-4 border-green-600"
        />
        <DashboardCard
          title="Pagos Pendientes"
          value={pendingPayments}
          description="Servicios por cobrar"
          icon={AlertCircle}
          className="border-l-4 border-orange-500"
        />
        <DashboardCard
          title="Servicios Activos"
          value={totalServices}
          description="Total de servicios"
          icon={Receipt}
          className="border-l-4 border-finance-secondary"
        />
        <DashboardCard
          title="Servicios Pagados"
          value={completedServices}
          description="Facturados y pagados"
          icon={CheckCircle}
          className="border-l-4 border-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Últimos servicios</CardTitle>
            </CardHeader>
            <CardContent>
              <CustomServiceTable limit={5} />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Clientes con adeudo</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/clientes">Ver todos</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="text-right">Adeudo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-muted-foreground">{client.company}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${client.pendingBalance.toLocaleString('es-MX')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
