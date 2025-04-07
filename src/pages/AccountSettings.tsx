
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload, Phone } from "lucide-react";

const AccountSettings = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [isCSFDialogOpen, setIsCSFDialogOpen] = useState(false);
  const [csfFile, setCSFFile] = useState<File | null>(null);

  // Mock user data
  const [userData, setUserData] = useState({
    cliente: "Cliente Demo",
    contacto: "Juan Pérez",
    email: "cliente@ejemplo.com",
    telefono: "55 1234 5678",
    razonSocial: "Cliente Demo S.A. de C.V.",
    rfc: "CDM980521ABC",
    direccionFiscal: "Avenida Ejemplo 123, Col. Centro, Ciudad de México, CP 12345"
  });

  // For password change form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      toast({
        title: "Información actualizada",
        description: "Los datos personales han sido actualizados correctamente."
      });
      setLoading(false);
    }, 1000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    // Mock API call
    setTimeout(() => {
      toast({
        title: "Contraseña actualizada",
        description: "La contraseña ha sido actualizada correctamente."
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      setLoading(false);
    }, 1000);
  };

  const handleCSFFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        setCSFFile(file);
      } else {
        toast({
          title: "Tipo de archivo no válido",
          description: "Por favor, sube un archivo PDF o una imagen.",
          variant: "destructive"
        });
        e.target.value = '';
      }
    }
  };

  const handleCSFUpload = () => {
    if (csfFile) {
      setLoading(true);
      // Mock API call
      setTimeout(() => {
        toast({
          title: "CSF subida correctamente",
          description: `El archivo ${csfFile.name} ha sido subido correctamente.`
        });
        setCSFFile(null);
        setIsCSFDialogOpen(false);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="animate-in">
        <h1 className="text-2xl font-bold mb-1">Mi Cuenta</h1>
        <p className="text-muted-foreground">
          Gestiona tu información personal y de facturación
        </p>
      </div>

      <div className="animate-in">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="personal">Datos Personales</TabsTrigger>
            <TabsTrigger value="password">Contraseña</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Datos Personales</CardTitle>
                <CardDescription>
                  Actualiza tus datos personales y fiscales
                </CardDescription>
              </CardHeader>
              <form onSubmit={handlePersonalInfoSubmit}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="cliente" className="text-sm font-medium">
                        Cliente
                      </label>
                      <Input
                        id="cliente"
                        name="cliente"
                        value={userData.cliente}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contacto" className="text-sm font-medium">
                        Persona de contacto
                      </label>
                      <Input
                        id="contacto"
                        name="contacto"
                        value={userData.contacto}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Correo Electrónico
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={userData.email}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="telefono" className="text-sm font-medium">
                        Teléfono / WhatsApp
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          className="pl-8"
                          value={userData.telefono}
                          onChange={handlePersonalInfoChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="razonSocial" className="text-sm font-medium">
                      Razón Social
                    </label>
                    <Input
                      id="razonSocial"
                      name="razonSocial"
                      value={userData.razonSocial}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="rfc" className="text-sm font-medium">
                      RFC
                    </label>
                    <Input
                      id="rfc"
                      name="rfc"
                      value={userData.rfc}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="direccionFiscal" className="text-sm font-medium">
                      Dirección Fiscal
                    </label>
                    <Textarea
                      id="direccionFiscal"
                      name="direccionFiscal"
                      rows={3}
                      value={userData.direccionFiscal}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>

                  <div className="pt-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setIsCSFDialogOpen(true)}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Agregar CSF
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="bg-finance-primary hover:bg-finance-dark"
                    disabled={loading}
                  >
                    {loading ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Cambiar Contraseña</CardTitle>
                <CardDescription>
                  Actualiza tu contraseña de acceso al portal
                </CardDescription>
              </CardHeader>
              <form onSubmit={handlePasswordSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="currentPassword" className="text-sm font-medium">
                      Contraseña Actual
                    </label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="newPassword" className="text-sm font-medium">
                      Nueva Contraseña
                    </label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirmar Contraseña
                    </label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="bg-finance-primary hover:bg-finance-dark"
                    disabled={loading}
                  >
                    {loading ? "Actualizando..." : "Cambiar Contraseña"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal para subir CSF */}
      <Dialog open={isCSFDialogOpen} onOpenChange={setIsCSFDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar CSF</DialogTitle>
            <DialogDescription>
              Sube tu Constancia de Situación Fiscal en formato PDF o imagen.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid w-full items-center gap-2">
              <label htmlFor="csfFile" className="text-sm font-medium">
                Selecciona un archivo:
              </label>
              <Input
                id="csfFile"
                type="file"
                accept="application/pdf,image/*"
                onChange={handleCSFFileChange}
              />
              {csfFile && (
                <div className="text-sm text-muted-foreground">
                  Archivo seleccionado: {csfFile.name}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCSFDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCSFUpload} disabled={!csfFile || loading}>
              <Upload className="mr-2 h-4 w-4" />
              {loading ? "Subiendo..." : "Subir CSF"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountSettings;
