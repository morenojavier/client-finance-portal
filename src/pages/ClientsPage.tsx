
import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  User, 
  Edit, 
  Archive,
  RefreshCw,
  Eye,
  FileText 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

// Interfaces
interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  pendingBalance: number;
  createdAt: string;
  archived?: boolean;
}

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "Carlos Rodríguez",
      email: "carlos@empresa.com",
      phone: "555-1234",
      company: "Empresa A",
      pendingBalance: 5000,
      createdAt: "2023-01-15",
      archived: false,
    },
    {
      id: "2",
      name: "María González",
      email: "maria@negocio.com",
      phone: "555-5678",
      company: "Negocio B",
      pendingBalance: 7500,
      createdAt: "2023-02-20",
      archived: false,
    },
    {
      id: "3",
      name: "Juan López",
      email: "juan@startup.com",
      phone: "555-9012",
      company: "Startup C",
      pendingBalance: 3000,
      createdAt: "2023-03-10",
      archived: false,
    },
    {
      id: "4",
      name: "Ana Martínez",
      email: "ana@antiguocliente.com",
      phone: "555-3456",
      company: "Antiguos Negocios",
      pendingBalance: 0,
      createdAt: "2022-05-18",
      archived: true,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
    },
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const activeClients = clients.filter(client => !client.archived);
  const archivedClients = clients.filter(client => client.archived);
  
  const filteredActiveClients = activeClients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredArchivedClients = archivedClients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const openAddClientDialog = () => {
    setEditingClient(null);
    form.reset({
      name: "",
      email: "",
      phone: "",
      company: "",
    });
    setOpenDialog(true);
  };
  
  const openEditClientDialog = (client: Client) => {
    setEditingClient(client);
    form.reset({
      name: client.name,
      email: client.email,
      phone: client.phone,
      company: client.company,
    });
    setOpenDialog(true);
  };
  
  const handleSubmitClient = (values: any) => {
    if (editingClient) {
      // Edit existing client
      const updatedClients = clients.map(client => 
        client.id === editingClient.id 
          ? { ...client, ...values } 
          : client
      );
      setClients(updatedClients);
      toast({
        title: "Cliente actualizado",
        description: `Los datos de ${values.name} han sido actualizados correctamente.`,
      });
    } else {
      // Add new client
      const newClient = {
        id: Math.random().toString(36).substr(2, 9),
        ...values,
        pendingBalance: 0,
        createdAt: new Date().toISOString().split('T')[0],
        archived: false,
      };
      setClients([...clients, newClient]);
      toast({
        title: "Cliente agregado",
        description: `${values.name} ha sido agregado correctamente.`,
      });
    }
    setOpenDialog(false);
  };
  
  const handleArchiveClient = (clientId: string) => {
    const clientToArchive = clients.find(client => client.id === clientId);
    if (!clientToArchive) return;
    
    const updatedClients = clients.map(client => 
      client.id === clientId 
        ? { ...client, archived: true } 
        : client
    );
    
    setClients(updatedClients);
    toast({
      title: "Cliente archivado",
      description: `${clientToArchive.name} ha sido archivado correctamente.`,
    });
  };
  
  const handleActivateClient = (clientId: string) => {
    const clientToActivate = clients.find(client => client.id === clientId);
    if (!clientToActivate) return;
    
    const updatedClients = clients.map(client => 
      client.id === clientId 
        ? { ...client, archived: false } 
        : client
    );
    
    setClients(updatedClients);
    toast({
      title: "Cliente activado",
      description: `${clientToActivate.name} ha sido activado correctamente.`,
    });
  };
  
  const goToClientDashboard = (clientId: string) => {
    navigate(`/cliente/${clientId}`);
  };
  
  return (
    <div className="px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Clientes</h1>
          <p className="text-muted-foreground">
            Administra los clientes y sus estados de cuenta
          </p>
        </div>
        <Button 
          className="mt-4 md:mt-0"
          onClick={openAddClientDialog}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar clientes..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Adeudo</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActiveClients.length > 0 ? (
                filteredActiveClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-muted-foreground">{client.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{client.company}</TableCell>
                    <TableCell className="font-medium">
                      ${client.pendingBalance.toLocaleString('es-MX')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => goToClientDashboard(client.id)}
                          title="Ver estado de cuenta"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditClientDialog(client)}
                          title="Editar cliente"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleArchiveClient(client.id)}
                          title="Archivar cliente"
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">No se encontraron clientes activos</h3>
                      <p className="text-muted-foreground mt-1">
                        {searchTerm ? 'Prueba con otra búsqueda' : 'Agrega tu primer cliente para comenzar'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Separator and archived clients section */}
        {(archivedClients.length > 0) && (
          <div className="mt-8">
            <div className="px-4 pb-2">
              <div className="flex items-center">
                <Archive className="h-4 w-4 text-muted-foreground mr-2" />
                <h2 className="text-lg font-medium">Clientes archivados</h2>
              </div>
              <Separator className="my-2" />
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Adeudo</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArchivedClients.length > 0 ? (
                    filteredArchivedClients.map((client) => (
                      <TableRow key={client.id} className="bg-muted/30">
                        <TableCell>
                          <div className="flex items-center">
                            <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                              <User className="h-4 w-4 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium">{client.name}</p>
                              <p className="text-sm text-muted-foreground">{client.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{client.company}</TableCell>
                        <TableCell className="font-medium">
                          ${client.pendingBalance.toLocaleString('es-MX')}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => goToClientDashboard(client.id)}
                              title="Ver estado de cuenta"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleActivateClient(client.id)}
                              title="Activar cliente"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6">
                        <p className="text-muted-foreground">
                          {searchTerm ? 'No se encontraron clientes archivados que coincidan con tu búsqueda' : 'No hay clientes archivados'}
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingClient ? 'Editar Cliente' : 'Nuevo Cliente'}
            </DialogTitle>
            <DialogDescription>
              {editingClient 
                ? 'Modifica los datos del cliente según sea necesario.' 
                : 'Completa la información para agregar un nuevo cliente.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitClient)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del cliente" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="555-1234" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Empresa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de la empresa" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingClient ? 'Actualizar' : 'Agregar'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientsPage;
