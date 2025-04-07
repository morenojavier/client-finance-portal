import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft,
  Receipt, 
  DollarSign,
  AlertCircle,
  CheckCircle,
  CircleDollarSign,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomServiceTable from "@/components/CustomServiceTable";
import DashboardCard from "@/components/DashboardCard";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

const mockClients = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    email: "carlos@empresa.com",
    phone: "555-1234",
    company: "Empresa A",
    pendingBalance: 5000,
    completedServices: 2,
    totalServices: 3,
    pendingPayments: 1
  },
  {
    id: "2",
    name: "María González",
    email: "maria@negocio.com",
    phone: "555-5678",
    company: "Negocio B",
    pendingBalance: 7500,
    completedServices: 4,
    totalServices: 6,
    pendingPayments: 2
  },
  {
    id: "3",
    name: "Juan López",
    email: "juan@startup.com",
    phone: "555-9012",
    company: "Startup C",
    pendingBalance: 3000,
    completedServices: 1,
    totalServices: 4,
    pendingPayments: 3
  }
];

const ClientDashboard = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPublicView, setIsPublicView] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);

  useEffect(() => {
    const fetchClient = () => {
      setTimeout(() => {
        const foundClient = mockClients.find(c => c.id === clientId);
        setClient(foundClient || null);
        setLoading(false);
      }, 300);
    };

    const currentPath = window.location.pathname;
    setIsPublicView(!currentPath.includes('/dashboard') && !currentPath.includes('/clientes'));

    fetchClient();
  }, [clientId]);

  const handleShareLink = () => {
    const shareLink = `${window.location.origin}/cliente/${clientId}`;
    navigator.clipboard.writeText(shareLink);
    toast.success("Enlace copiado al portapapeles", {
      description: "Ya puedes compartirlo con tu cliente"
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Cargando estado de cuenta...</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Cliente no encontrado</h1>
            <p className="text-gray-500 mt-2">
              El cliente solicitado no existe o ha sido eliminado.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Button asChild variant="default">
              <Link to="/clientes">Volver a Clientes</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6 bg-background min-h-screen">
      <div className="animate-in flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          {!isPublicView && (
            <Link 
              to="/clientes" 
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-2"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Volver a clientes
            </Link>
          )}
          <h1 className="text-2xl font-bold mb-1">Estado de cuenta: {client.name}</h1>
          <p className="text-muted-foreground">
            {client.company} - {client.email}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2 flex-wrap">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartir
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Compartir estado de cuenta</DialogTitle>
                      <DialogDescription>
                        Comparte este enlace con tu cliente para que pueda ver su estado de cuenta
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="p-3 bg-gray-50 rounded border text-sm">
                        <span className="font-mono break-all">
                          {`${window.location.origin}/cliente/${clientId}`}
                        </span>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                      </DialogClose>
                      <Button onClick={handleShareLink}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Copiar enlace
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TooltipTrigger>
              <TooltipContent>
                <p>Compartir estado de cuenta con el cliente</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={() => console.log("Liquidar adeudo")}
          >
            <CircleDollarSign className="mr-2 h-4 w-4" />
            Liquidar adeudo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in">
        <DashboardCard
          title="Adeudo Total"
          value={`$${client.pendingBalance.toLocaleString('es-MX')}`}
          description="Valor actual de tus servicios"
          icon={DollarSign}
          className="border-l-4 border-finance-primary"
        />
        <DashboardCard
          title="Pagos Pendientes"
          value={client.pendingPayments}
          description="Servicios con pago pendiente"
          icon={AlertCircle}
          className="border-l-4 border-orange-500"
        />
        <DashboardCard
          title="Total de Servicios"
          value={client.totalServices}
          description="Servicios activos"
          icon={Receipt}
          className="border-l-4 border-finance-secondary"
        />
        <DashboardCard
          title="Servicios Completados"
          value={client.completedServices}
          description="Servicios facturados y pagados"
          icon={CheckCircle}
          className="border-l-4 border-green-500"
        />
      </div>

      <div className="animate-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {!showAllServices ? "Pagos pendientes" : "Todos los servicios"}
          </h2>
          <Button 
            variant="outline" 
            onClick={() => setShowAllServices(!showAllServices)}
          >
            {showAllServices ? "Ver solo pendientes" : "Ver todos los servicios"}
          </Button>
        </div>
        <CustomServiceTable 
          clientId={clientId} 
          filterStatus={!showAllServices ? ["pending", "overdue"] : undefined}
        />
      </div>
    </div>
  );
};

export default ClientDashboard;
