
import React, { useState, useEffect } from "react";
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
import { Upload, Phone, Image, FileText } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const AccountSettings = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [isCSFDialogOpen, setIsCSFDialogOpen] = useState(false);
  const [isCSFViewDialogOpen, setIsCSFViewDialogOpen] = useState(false);
  const [isLogoDialogOpen, setIsLogoDialogOpen] = useState(false);
  const [csfFile, setCSFFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [hasCSF, setHasCSF] = useState<boolean>(false);
  const [csfPreview, setCSFPreview] = useState<string | null>(null);

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
        description: "Los datos de la empresa han sido actualizados correctamente."
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
        
        // Create preview for viewing
        const reader = new FileReader();
        reader.onloadend = () => {
          setCSFPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
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

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setLogoFile(file);
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Tipo de archivo no válido",
          description: "Por favor, sube una imagen.",
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
        setHasCSF(true);
        setIsCSFDialogOpen(false);
        setLoading(false);
      }, 1000);
    }
  };

  const handleLogoUpload = () => {
    if (logoFile) {
      setLoading(true);
      // Mock API call - in a real app we'd upload to server/storage
      setTimeout(() => {
        toast({
          title: "Logo subido correctamente",
          description: `La imagen ${logoFile.name} ha sido establecida como logo.`
        });
        
        // In a real app, we'd save the image URL to localStorage or database
        localStorage.setItem('companyLogo', logoPreview || '');
        
        setIsLogoDialogOpen(false);
        setLoading(false);
      }, 1000);
    }
  };

  // Load saved logo and check if CSF exists on component mount
  useEffect(() => {
    const savedLogo = localStorage.getItem('companyLogo');
    if (savedLogo) {
      setLogoPreview(savedLogo);
    }
    
    // Check if user has a CSF file (mock implementation)
    const savedCSF = localStorage.getItem('companyCSF');
    if (savedCSF) {
      setHasCSF(true);
      setCSFPreview(savedCSF);
    }
  }, []);

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
            <TabsTrigger value="personal">Datos de mi empresa</TabsTrigger>
            <TabsTrigger value="password">Contraseña</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Datos de mi empresa</CardTitle>
                <CardDescription>
                  Actualiza los datos de tu empresa y fiscales
                </CardDescription>
              </CardHeader>
              <form onSubmit={handlePersonalInfoSubmit}>
                <CardContent className="space-y-4">
                  {/* Company Logo Section - First field */}
                  <div className="flex flex-col items-center space-y-3 py-2 border-b pb-6">
                    <Avatar className="h-24 w-24">
                      {logoPreview ? (
                        <AvatarImage src={logoPreview} alt="Logo de la empresa" />
                      ) : (
                        <AvatarFallback className="text-2xl bg-finance-primary text-white">
                          {userData.cliente.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setIsLogoDialogOpen(true)}
                      className="flex items-center gap-2"
                    >
                      <Image className="h-4 w-4" />
                      {logoPreview ? "Cambiar Logo" : "Agregar Logo"}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Imagen recomendada: formato cuadrado, mínimo 200x200px
                    </p>
                  </div>

                  {/* Reorganized fields according to the specified order */}
                  <div className="space-y-2">
                    <label htmlFor="cliente" className="text-sm font-medium">
                      Empresa
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

                  <div className="pt-2 flex">
                    {hasCSF ? (
                      <div className="flex gap-2">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setIsCSFViewDialogOpen(true)}
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Ver CSF
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setIsCSFDialogOpen(true)}
                          className="flex items-center gap-2"
                        >
                          <Upload className="h-4 w-4" />
                          Cambiar CSF
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setIsCSFDialogOpen(true)}
                        className="flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Agregar CSF
                      </Button>
                    )}
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

      {/* Modal para ver CSF */}
      <Dialog open={isCSFViewDialogOpen} onOpenChange={setIsCSFViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Constancia de Situación Fiscal</DialogTitle>
          </DialogHeader>
          
          <div className="flex justify-center py-4">
            {csfPreview && csfPreview.startsWith('data:image') ? (
              <img src={csfPreview} alt="Constancia de Situación Fiscal" className="max-h-[500px] object-contain" />
            ) : csfPreview && csfPreview.startsWith('data:application/pdf') ? (
              <div className="w-full h-[500px] flex flex-col items-center justify-center">
                <FileText className="h-16 w-16 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Vista previa de PDF no disponible</p>
                <Button 
                  className="mt-4" 
                  onClick={() => window.open(csfPreview, '_blank')}
                >
                  Abrir PDF
                </Button>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="mt-2">No hay CSF disponible</p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCSFViewDialogOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para subir Logo */}
      <Dialog open={isLogoDialogOpen} onOpenChange={setIsLogoDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Logo de la Empresa</DialogTitle>
            <DialogDescription>
              Sube el logo de tu empresa en formato imagen.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {logoPreview && (
              <div className="flex justify-center">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={logoPreview} alt="Vista previa del logo" />
                  <AvatarFallback className="text-4xl">
                    {userData.cliente.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
            
            <div className="grid w-full items-center gap-2">
              <label htmlFor="logoFile" className="text-sm font-medium">
                Selecciona una imagen:
              </label>
              <Input
                id="logoFile"
                type="file"
                accept="image/*"
                onChange={handleLogoFileChange}
              />
              {logoFile && (
                <div className="text-sm text-muted-foreground">
                  Archivo seleccionado: {logoFile.name}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLogoDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleLogoUpload} disabled={!logoFile || loading}>
              <Upload className="mr-2 h-4 w-4" />
              {loading ? "Subiendo..." : "Guardar Logo"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountSettings;
