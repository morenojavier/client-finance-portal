
import React from "react";
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  name: string;
  client?: string;
  clientId?: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

// Mock services data
const mockServices = [
  {
    id: "1",
    name: "Consultoría Fiscal",
    client: "Carlos Rodríguez",
    clientId: "1",
    date: "2023-03-15",
    amount: 2500,
    status: "paid" as const,
  },
  {
    id: "2",
    name: "Declaración Anual",
    client: "María González",
    clientId: "2",
    date: "2023-03-20",
    amount: 5000,
    status: "pending" as const,
  },
  {
    id: "3",
    name: "Auditoría Contable",
    client: "Juan López",
    clientId: "3",
    date: "2023-03-25",
    amount: 3000,
    status: "overdue" as const,
  },
  {
    id: "4",
    name: "Asesoría Legal",
    client: "Carlos Rodríguez",
    clientId: "1",
    date: "2023-04-01",
    amount: 2500,
    status: "pending" as const,
  },
  {
    id: "5",
    name: "Consultoría Empresarial",
    client: "María González",
    clientId: "2",
    date: "2023-04-05",
    amount: 2500,
    status: "paid" as const,
  },
];

interface ServiceTableProps {
  limit?: number;
  clientId?: string;
  filterStatus?: string[];
}

const CustomServiceTable = ({ limit, clientId, filterStatus }: ServiceTableProps) => {
  // Filter services by clientId if provided
  let services = [...mockServices];
  
  if (clientId) {
    services = services.filter(service => service.clientId === clientId);
  }
  
  // Filter services by status if provided
  if (filterStatus && filterStatus.length > 0) {
    services = services.filter(service => filterStatus.includes(service.status));
  }
  
  // Limit the number of services if limit is provided
  if (limit && limit > 0) {
    services = services.slice(0, limit);
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700">
            Pagado
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700">
            Pendiente
          </Badge>
        );
      case "overdue":
        return (
          <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">
            Vencido
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Desconocido
          </Badge>
        );
    }
  };

  const getCardBorder = (status: string) => {
    switch (status) {
      case "paid":
        return "border-l-4 border-green-500";
      case "pending":
        return "border-l-4 border-orange-500";
      case "overdue":
        return "border-l-4 border-red-500";
      default:
        return "";
    }
  };

  return (
    <div>
      {services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className={cn("overflow-hidden hover:shadow-md transition-shadow", getCardBorder(service.status))}
            >
              <CardContent className="p-5">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{service.name}</h3>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(service.status)}
                      {getStatusBadge(service.status)}
                    </div>
                  </div>
                  
                  {!clientId && service.client && (
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Cliente:</span> {service.client}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Fecha:</span> {new Date(service.date).toLocaleDateString("es-MX")}
                    </div>
                    <div className="font-bold text-lg">${service.amount.toLocaleString("es-MX")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          {filterStatus && filterStatus.length > 0 
            ? "No hay servicios con pagos pendientes."
            : "No hay servicios registrados."}
        </div>
      )}
    </div>
  );
};

export default CustomServiceTable;
