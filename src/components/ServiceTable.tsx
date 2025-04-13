
import React, { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  FileText, 
  Download, 
  MoreVertical, 
  Upload, 
  Filter, 
  Search,
  FileImage,
  PaperclipIcon,
  Info,
  Eye,
  User,
  Mail,
  Building,
  CreditCard,
  Clock,
  LayoutGrid,
  LayoutList
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLocation, useNavigate } from "react-router-dom";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Service {
  id: string;
  fecha: string;
  cliente: string;
  concepto: string;
  descripcion: string;
  total: number;
  estatus_factura: "generada" | "pendiente";
  pago_cliente: "pagada" | "pendiente";
  hasFile?: boolean;
}

const mockServices: Service[] = [
  {
    id: "1",
    fecha: "2023-03-01",
    cliente: "Empresa A",
    concepto: "Asesoría Financiera",
    descripcion: "Asesoría mensual de finanzas empresariales",
    total: 5000,
    estatus_factura: "generada",
    pago_cliente: "pagada",
    hasFile: true
  },
  {
    id: "2",
    fecha: "2023-03-15",
    cliente: "Empresa B",
    concepto: "Soporte Técnico",
    descripcion: "Soporte técnico para sistemas de contabilidad",
    total: 3500,
    estatus_factura: "generada",
    pago_cliente: "pendiente"
  },
  {
    id: "3",
    fecha: "2023-04-01",
    cliente: "Empresa A",
    concepto: "Asesoría Financiera",
    descripcion: "Asesoría mensual de finanzas empresariales",
    total: 5000,
    estatus_factura: "pendiente",
    pago_cliente: "pendiente"
  },
  {
    id: "4",
    fecha: "2023-04-10",
    cliente: "Empresa C",
    concepto: "Consultoría Fiscal",
    descripcion: "Análisis de obligaciones fiscales",
    total: 7500,
    estatus_factura: "generada",
    pago_cliente: "pagada",
    hasFile: true
  },
  {
    id: "5",
    fecha: "2023-05-01",
    cliente: "Empresa A",
    concepto: "Asesoría Financiera",
    descripcion: "Asesoría mensual de finanzas empresariales",
    total: 5000,
    estatus_factura: "generada",
    pago_cliente: "pendiente"
  },
  {
    id: "6",
    fecha: "2023-05-15",
    cliente: "Empresa D",
    concepto: "Consultoría Legal",
    descripcion: "Asesoría legal para cumplimiento normativo",
    total: 6200,
    estatus_factura: "pendiente",
    pago_cliente: "pendiente"
  },
  {
    id: "7",
    fecha: "2023-06-01",
    cliente: "Empresa A",
    concepto: "Asesoría Financiera",
    descripcion: "Asesoría mensual de finanzas empresariales",
    total: 5000,
    estatus_factura: "generada",
    pago_cliente: "pendiente"
  },
  {
    id: "8",
    fecha: "2023-06-20",
    cliente: "Empresa B",
    concepto: "Capacitación",
    descripcion: "Capacitación en herramientas de contabilidad",
    total: 4500,
    estatus_factura: "generada",
    pago_cliente: "pagada"
  },
];

interface ColumnVisibility {
  fecha: boolean;
  cliente: boolean;
  concepto: boolean;
  descripcion: boolean;
  total: boolean;
  estatus_factura: boolean;
  pago_cliente: boolean;
  archivo: boolean;
}

const ServiceTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [services] = useState<Service[]>(mockServices);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isViewFileOpen, setIsViewFileOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>({
    fecha: true,
    cliente: true,
    concepto: true,
    descripcion: true,
    total: true,
    estatus_factura: true,
    pago_cliente: true,
    archivo: true
  });
  
  const servicesPerPage = 4; // Changed from 5 to 4 for better card layout
  const location = useLocation();
  const navigate = useNavigate();
  const isPublicView = location.pathname.includes('/publico');
  
  // Group services by client
  const servicesByClient = services.reduce((acc: Record<string, any>, service) => {
    if (!acc[service.cliente]) {
      acc[service.cliente] = {
        cliente: service.cliente,
        services: [],
        totalPending: 0,
        totalAmount: 0
      };
    }
    
    acc[service.cliente].services.push(service);
    acc[service.cliente].totalAmount += service.total;
    
    if (service.pago_cliente === "pendiente") {
      acc[service.cliente].totalPending += service.total;
    }
    
    return acc;
  }, {});
  
  const clientsList = Object.values(servicesByClient);
  
  // Apply search filter
  const filteredClients = clientsList.filter(
    (client: any) =>
      client.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply pagination
  const indexOfLastClient = currentPage * servicesPerPage;
  const indexOfFirstClient = indexOfLastClient - servicesPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(filteredClients.length / servicesPerPage);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-MX").format(date);
  };
  
  // Function to check if a date is from a previous month
  const isPreviousMonth = (dateString: string) => {
    const currentDate = new Date();
    const serviceDate = new Date(dateString);
    
    // Check if the service date is from a previous month
    return (
      serviceDate.getMonth() < currentDate.getMonth() ||
      serviceDate.getFullYear() < currentDate.getFullYear()
    );
  };
  
  // Function to determine row color based on payment status and date
  const getRowColorClass = (service: Service) => {
    if (service.pago_cliente === "pendiente" && isPreviousMonth(service.fecha)) {
      return "bg-red-50"; // Light red background for urgent pending payments
    }
    return ""; // Default background
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Comprueba si el archivo es una imagen o PDF
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        setFileToUpload(file);
      } else {
        toast({
          title: "Tipo de archivo no válido",
          description: "Por favor, sube solo imágenes o documentos PDF.",
          variant: "destructive",
        });
        event.target.value = '';
      }
    }
  };

  const handleFileAction = (serviceId: string, hasFile: boolean) => {
    setSelectedServiceId(serviceId);
    if (hasFile) {
      setIsViewFileOpen(true);
    } else {
      setIsUploadOpen(true);
    }
  };

  const handleUploadSubmit = () => {
    if (fileToUpload && selectedServiceId) {
      // Simulación de carga de archivo - en un caso real se enviaría al servidor
      toast({
        title: "Archivo subido correctamente",
        description: `${fileToUpload.name} ha sido adjuntado al servicio.`,
      });
      
      // Cierra el diálogo y reinicia el estado
      setIsUploadOpen(false);
      setFileToUpload(null);
      setSelectedServiceId(null);
    } else {
      toast({
        title: "Error al subir",
        description: "Por favor, selecciona un archivo.",
        variant: "destructive",
      });
    }
  };

  const handleColumnToggle = (column: keyof ColumnVisibility) => {
    setColumnVisibility(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  const handleViewClientDetails = (cliente: string) => {
    // In a real implementation, this would navigate to the client detail page
    // Here we just show a notification for demonstration
    toast({
      title: "Ver detalles de cliente",
      description: `Navegando a detalles del cliente: ${cliente}`
    });
    
    // Find client ID in a real implementation and navigate
    // For now, simulate navigation to a client page
    // navigate(`/cliente/${clientId}`);
  };

  // This will be a table view showing services instead of clients grouped by client
  const renderTableView = () => {
    // Simple table view showing each service
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-3 text-sm font-medium">Fecha</th>
              <th className="p-3 text-sm font-medium">Cliente</th>
              <th className="p-3 text-sm font-medium">Concepto</th>
              <th className="p-3 text-sm font-medium">Total</th>
              <th className="p-3 text-sm font-medium">Estado</th>
              <th className="p-3 text-sm font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {services
              .filter(service => service.cliente.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(service => (
                <tr 
                  key={service.id} 
                  className={`border-b hover:bg-gray-50 ${getRowColorClass(service)}`}
                >
                  <td className="p-3 text-sm">{formatDate(service.fecha)}</td>
                  <td className="p-3 text-sm">{service.cliente}</td>
                  <td className="p-3 text-sm">{service.concepto}</td>
                  <td className="p-3 text-sm font-medium">{formatCurrency(service.total)}</td>
                  <td className="p-3 text-sm">
                    <Badge 
                      variant={service.pago_cliente === "pagada" ? "outline" : "default"}
                      className={service.pago_cliente === "pagada" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}
                    >
                      {service.pago_cliente === "pagada" ? "Pagado" : "Pendiente"}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewClientDetails(service.cliente)}>
                        <Eye className="h-3 w-3 mr-1" />
                        Detalles
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleFileAction(service.id, !!service.hasFile)}
                        variant={service.hasFile ? "outline" : "default"}
                      >
                        {service.hasFile ? (
                          <>
                            <FileText className="h-3 w-3 mr-1" />
                            Ver archivo
                          </>
                        ) : (
                          <>
                            <Upload className="h-3 w-3 mr-1" />
                            Subir archivo
                          </>
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Card view showing clients (current implementation)
  const renderCardView = () => {
    if (currentClients.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentClients.map((client: any) => (
            <Card 
              key={client.cliente} 
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardContent className="p-5">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{client.cliente}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Building className="h-3 w-3" />
                      <span>Empresa</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Total de servicios</div>
                    <div className="font-semibold">{client.services.length}</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-500 mb-1">Pagos pendientes</div>
                    <div className="font-semibold">
                      {client.services.filter((s: any) => s.pago_cliente === "pendiente").length}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Adeudo</div>
                    <div className="font-bold text-lg">{formatCurrency(client.totalPending)}</div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewClientDetails(client.cliente)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      <span>Detalles</span>
                    </Button>
                    <Button 
                      variant={client.totalPending > 0 ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "flex items-center gap-1",
                        client.totalPending > 0 ? "bg-blue-600" : ""
                      )}
                    >
                      <CreditCard className="h-3 w-3" />
                      <span>{client.totalPending > 0 ? "Pagar" : "Pagado"}</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    } else {
      return (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <h3 className="text-lg font-medium">No se encontraron clientes</h3>
          <p className="text-muted-foreground mt-1">
            {searchTerm ? 'Prueba con otra búsqueda' : 'No hay clientes para mostrar'}
          </p>
        </div>
      );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <CardTitle>Servicios por Cliente</CardTitle>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* View mode toggle */}
          <ToggleGroup 
            type="single" 
            value={viewMode} 
            onValueChange={(value) => {
              if (value) setViewMode(value as "card" | "table");
            }}
            className="border rounded-md"
          >
            <ToggleGroupItem value="card" aria-label="Ver como tarjetas">
              <LayoutGrid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="Ver como tabla">
              <LayoutList className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          {!isPublicView && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem disabled className="font-medium">
                  Mostrar/Ocultar Columnas
                </DropdownMenuItem>
                <DropdownMenuCheckboxItem
                  checked={columnVisibility.fecha}
                  onCheckedChange={() => handleColumnToggle("fecha")}
                >
                  Fecha
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={columnVisibility.cliente}
                  onCheckedChange={() => handleColumnToggle("cliente")}
                >
                  Cliente
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={columnVisibility.concepto}
                  onCheckedChange={() => handleColumnToggle("concepto")}
                >
                  Concepto
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={columnVisibility.descripcion}
                  onCheckedChange={() => handleColumnToggle("descripcion")}
                >
                  Descripción
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={columnVisibility.total}
                  onCheckedChange={() => handleColumnToggle("total")}
                >
                  Total
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={columnVisibility.estatus_factura}
                  onCheckedChange={() => handleColumnToggle("estatus_factura")}
                >
                  Estatus Factura
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={columnVisibility.pago_cliente}
                  onCheckedChange={() => handleColumnToggle("pago_cliente")}
                >
                  Pago Cliente
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={columnVisibility.archivo}
                  onCheckedChange={() => handleColumnToggle("archivo")}
                >
                  Archivo
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Render based on view mode */}
        {viewMode === "card" ? renderCardView() : renderTableView()}
        
        {viewMode === "card" && filteredClients.length > servicesPerPage && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink 
                        isActive={pageNumber === currentPage}
                        onClick={() => paginate(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                {totalPages > 5 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink onClick={() => paginate(totalPages)}>
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>

      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adjuntar archivo</DialogTitle>
            <DialogDescription>
              Sube un comprobante de pago en formato imagen o PDF.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid w-full items-center gap-2">
              <label htmlFor="fileUpload" className="text-sm font-medium">
                Selecciona un archivo:
              </label>
              <Input
                id="fileUpload"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
              />
              {fileToUpload && (
                <div className="text-sm text-muted-foreground">
                  Archivo seleccionado: {fileToUpload.name}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleUploadSubmit}>
              <Upload className="mr-2 h-4 w-4" />
              Subir archivo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewFileOpen} onOpenChange={setIsViewFileOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Archivo adjunto</DialogTitle>
            <DialogDescription>
              {isPublicView ? 
                "Vista previa del archivo adjunto a este servicio." : 
                "Puedes ver o reemplazar el archivo adjunto a este servicio."
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex justify-center">
              <Button className="flex items-center gap-2" onClick={() => window.open("#", "_blank")}>
                <FileImage className="h-4 w-4" />
                <span>Ver archivo</span>
              </Button>
            </div>
            
            {!isPublicView && (
              <div className="grid w-full items-center gap-2 border-t pt-4">
                <p className="text-sm font-medium">¿Deseas reemplazar este archivo?</p>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                />
                {fileToUpload && (
                  <div className="text-sm text-muted-foreground">
                    Archivo seleccionado: {fileToUpload.name}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewFileOpen(false)}>
              Cerrar
            </Button>
            {!isPublicView && (
              <Button onClick={handleUploadSubmit} disabled={!fileToUpload}>
                <Upload className="mr-2 h-4 w-4" />
                Reemplazar archivo
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ServiceTable;
