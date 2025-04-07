
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const RecuperarPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock password recovery request - in a real app, this would make an API call
    setTimeout(() => {
      toast({
        title: "Solicitud enviada",
        description: "Revisa tu correo para las instrucciones de recuperación",
      });
      setSubmitted(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-finance-light to-white p-4">
      <div className="max-w-md w-full animate-in">
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/2d8e8f94-d15f-4e1c-9d28-dae088e0a1cb.png" 
            alt="Logo" 
            className="h-16 w-auto" 
          />
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Recuperar Contraseña</CardTitle>
            <CardDescription>
              Ingresa tu correo electrónico para recibir instrucciones de recuperación
            </CardDescription>
          </CardHeader>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Correo Electrónico
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@empresa.com"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button
                  type="submit"
                  className="w-full bg-finance-primary hover:bg-finance-dark"
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar Instrucciones"}
                </Button>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-4 text-center">
              <p className="py-4">
                Hemos enviado un correo electrónico con instrucciones para recuperar tu contraseña a: <span className="font-medium">{email}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Si no recibes el correo en unos minutos, revisa tu carpeta de spam o correo no deseado.
              </p>
            </CardContent>
          )}
        </Card>
        
        <div className="mt-6 text-center">
          <Link to="/login" className="flex items-center justify-center text-finance-primary hover:text-finance-dark">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Volver a Iniciar Sesión</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecuperarPassword;
