
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
  DropdownMenuTrigger 
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
  PaperclipIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Service {
  id: string;
  fecha: string;
  concepto: string;
  descripcion: string;
  total: number;
  estatus_factura: "generada" | "pendiente";
  pago_cliente: "pagada" | "pendiente";
}

const mockServices: Service[] = [
  {
    id: "1",
    fecha: "2023-03-01",
    concepto: "Asesoría Financiera",
    descripcion: "Asesoría mensual de finanzas empresariales",
    total: 5000,
    estatus_factura: "generada",
    pago_cliente: "pagada",
  },
  {
    id: "2",
    fecha: "2023-03-15",
    concepto: "Soporte Técnico",
    descripcion: "Soporte técnico para sistemas de contabilidad",
    total: 3500,
    estatus_factura: "generada",
    pago_cliente: "pendiente",
  },
  {
    id: "3",
    fecha: "2023-04-01",
    concepto: "Asesoría Financiera",
    descripcion: "Asesoría mensual de finanzas empresariales",
    total: 5000,
    estatus_factura: "pendiente",
    pago_cliente: "pendiente",
  },
  {
    id: "4",
    fecha: "2023-04-10",
    concepto: "Consultoría Fiscal",
    descripcion: "Análisis de obligaciones fiscales",
    total: 7500,
    estatus_factura: "generada",
    pago_cliente: "pagada",
  },
  {
    id: "5",
    fecha: "2023-05-01",
    concepto: "Asesoría Financiera",
    descripcion: "Asesoría mensual de finanzas empresariales",
    total: 5000,
    estatus_factura: "generada",
    pago_cliente: "pendiente",
  },
];

const ServiceTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [services] = useState<Service[]>(mockServices);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const filteredServices = services.filter(
    (service) =>
      service.concepto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleUploadClick = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsUploadOpen(true);
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
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Concepto</TableHead>
                <TableHead className="hidden md:table-cell">Descripción</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="hidden md:table-cell">Estatus Factura</TableHead>
                <TableHead>Pago Cliente</TableHead>
                <TableHead>Archivo</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>{formatDate(service.fecha)}</TableCell>
                    <TableCell>{service.concepto}</TableCell>
                    <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                      {service.descripcion}
                    </TableCell>
                    <TableCell>{formatCurrency(service.total)}</TableCell>
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
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleUploadClick(service.id)}
                        className="flex items-center gap-1"
                      >
                        <PaperclipIcon className="h-3 w-3" />
                        <span className="hidden sm:inline">Adjuntar</span>
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
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
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    No se encontraron servicios
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
    </Card>
  );
};

export default ServiceTable;
