
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

const AccountSettings = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock user data
  const [userData, setUserData] = useState({
    nombre: "Cliente Demo",
    email: "cliente@ejemplo.com",
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
                      <label htmlFor="nombre" className="text-sm font-medium">
                        Nombre Completo
                      </label>
                      <Input
                        id="nombre"
                        name="nombre"
                        value={userData.nombre}
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
    </div>
  );
};

export default AccountSettings;
