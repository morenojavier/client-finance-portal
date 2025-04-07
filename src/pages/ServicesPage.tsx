
import React from "react";
import { Share2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ServiceTable from "@/components/ServiceTable";
import { useNavigate } from "react-router-dom";
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
import {
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Mock clients data - in a real app this would come from an API
const mockClients = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    company: "Empresa A",
  },
  {
    id: "2",
    name: "María González",
    company: "Negocio B",
  },
  {
    id: "3",
    name: "Juan López",
    company: "Startup C",
  }
];

const ServicesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredClients = mockClients.filter(
    client => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleClientSelect = (clientId: string) => {
    navigate(`/cliente/${clientId}`);
  };
  
  return (
    <div className="px-4 py-6 space-y-6">
      <div className="animate-in flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Servicios</h1>
          <p className="text-muted-foreground">
            Consulta todos tus servicios y su estado actual
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-1 items-center">
              <Share2 className="h-4 w-4" />
              <span>Compartir</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Compartir estado de cuenta</DialogTitle>
              <DialogDescription>
                Selecciona el cliente para compartir su estado de cuenta
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="relative mb-4">
                <Input
                  placeholder="Buscar cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
                <Users className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              </div>
              <div className="border rounded-md max-h-[300px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Empresa</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.length > 0 ? (
                      filteredClients.map((client) => (
                        <TableRow 
                          key={client.id}
                          className="cursor-pointer hover:bg-muted"
                          onClick={() => handleClientSelect(client.id)}
                        >
                          <TableCell>{client.name}</TableCell>
                          <TableCell>{client.company}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} className="text-center py-4">
                          No se encontraron clientes
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="animate-in">
        <ServiceTable />
      </div>
    </div>
  );
};

export default ServicesPage;
