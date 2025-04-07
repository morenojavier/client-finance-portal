
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertCircle 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
}

const CustomServiceTable = ({ limit, clientId }: ServiceTableProps) => {
  // Filter services by clientId if provided
  let services = [...mockServices];
  
  if (clientId) {
    services = services.filter(service => service.clientId === clientId);
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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Servicio</TableHead>
            {!clientId && <TableHead>Cliente</TableHead>}
            <TableHead>Fecha</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.length > 0 ? (
            services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  <div className="font-medium">{service.name}</div>
                </TableCell>
                {!clientId && (
                  <TableCell>
                    <div className="font-medium">{service.client}</div>
                  </TableCell>
                )}
                <TableCell>{new Date(service.date).toLocaleDateString("es-MX")}</TableCell>
                <TableCell>${service.amount.toLocaleString("es-MX")}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(service.status)}
                    {getStatusBadge(service.status)}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={clientId ? 4 : 5} className="h-24 text-center">
                No hay servicios registrados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomServiceTable;
