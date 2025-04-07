
import React, { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
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
  Eye
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
import { useLocation } from "react-router-dom";

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
  const servicesPerPage = 5;
  const location = useLocation();
  const isPublicView = location.pathname.includes('/publico');
  
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

  // Apply search filter
  const filteredServices = services.filter(
    (service) =>
      service.concepto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.cliente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply pagination
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

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

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <CardTitle>Servicios</CardTitle>
        <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar servicios..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columnVisibility.fecha && <TableHead>Fecha</TableHead>}
                {columnVisibility.cliente && <TableHead>Cliente</TableHead>}
                {columnVisibility.concepto && <TableHead>Concepto</TableHead>}
                {columnVisibility.descripcion && <TableHead className="hidden md:table-cell">Descripción</TableHead>}
                {columnVisibility.total && <TableHead>Total</TableHead>}
                {columnVisibility.estatus_factura && <TableHead className="hidden md:table-cell">Estatus Factura</TableHead>}
                {columnVisibility.pago_cliente && <TableHead>Pago Cliente</TableHead>}
                {columnVisibility.archivo && <TableHead>Archivo</TableHead>}
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentServices.length > 0 ? (
                currentServices.map((service) => (
                  <TableRow 
                    key={service.id}
                    className={getRowColorClass(service)}
                  >
                    {columnVisibility.fecha && <TableCell>{formatDate(service.fecha)}</TableCell>}
                    {columnVisibility.cliente && <TableCell>{service.cliente}</TableCell>}
                    {columnVisibility.concepto && <TableCell>{service.concepto}</TableCell>}
                    {columnVisibility.descripcion && (
                      <TableCell className="hidden md:table-cell">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="flex items-center gap-1 p-0 h-auto"
                              >
                                <Info className="h-3 w-3" />
                                <span>Más información</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm bg-white text-black">
                              <p>{service.descripcion}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    )}
                    {columnVisibility.total && <TableCell>{formatCurrency(service.total)}</TableCell>}
                    {columnVisibility.estatus_factura && (
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant={service.estatus_factura === "generada" ? "default" : "outline"}
                          className={cn(
                            service.estatus_factura === "generada" 
                              ? "bg-green-100 text-green-800 hover:bg-green-100" 
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          )}
                        >
                          {service.estatus_factura === "generada" ? "Generada" : "Pendiente"}
                        </Badge>
                      </TableCell>
                    )}
                    {columnVisibility.pago_cliente && (
                      <TableCell>
                        <Badge
                          variant={service.pago_cliente === "pagada" ? "default" : "outline"}
                          className={cn(
                            service.pago_cliente === "pagada" 
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100" 
                              : "bg-orange-100 text-orange-800 hover:bg-orange-100"
                          )}
                        >
                          {service.pago_cliente === "pagada" ? "Pagada" : "Pendiente"}
                        </Badge>
                      </TableCell>
                    )}
                    {columnVisibility.archivo && (
                      <TableCell>
                        {isPublicView ? (
                          service.hasFile ? (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleFileAction(service.id, true)}
                              className="flex items-center gap-1"
                            >
                              <Eye className="h-3 w-3" />
                              <span className="hidden sm:inline">Ver</span>
                            </Button>
                          ) : null
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleFileAction(service.id, !!service.hasFile)}
                            className="flex items-center gap-1"
                          >
                            {service.hasFile ? (
                              <>
                                <Eye className="h-3 w-3" />
                                <span className="hidden sm:inline">Ver</span>
                              </>
                            ) : (
                              <>
                                <PaperclipIcon className="h-3 w-3" />
                                <span className="hidden sm:inline">Adjuntar</span>
                              </>
                            )}
                          </Button>
                        )}
                      </TableCell>
                    )}
                    <TableCell className="text-right">
                      {!isPublicView && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {service.estatus_factura === "generada" && (
                              <>
                                <DropdownMenuItem className="flex items-center">
                                  <Download className="mr-2 h-4 w-4" />
                                  <span>Descargar PDF</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center">
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span>Descargar XML</span>
                                </DropdownMenuItem>
                              </>
                            )}
                            {service.pago_cliente === "pendiente" && (
                              <DropdownMenuItem className="flex items-center">
                                <Upload className="mr-2 h-4 w-4" />
                                <span>Subir Comprobante</span>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-6">
                    No se encontraron servicios
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Paginación */}
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
      </CardContent>

      {/* Modal de subida de archivos */}
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

      {/* Modal para ver/reemplazar archivos */}
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
