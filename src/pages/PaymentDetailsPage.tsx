
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

const PaymentDetailsPage = () => {
  return (
    <div className="px-4 py-6 space-y-6">
      <div className="animate-in">
        <h1 className="text-2xl font-bold mb-1">Datos de Pago</h1>
        <p className="text-muted-foreground">
          Información bancaria para realizar transferencias y pagos
        </p>
      </div>

      <div className="animate-in">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Información Bancaria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Empresa</p>
                <p className="font-semibold">COMERCIALIZADORA PACMAN SA DE CV</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Banco</p>
                <p className="font-semibold">BANCO INBURSA</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">RFC</p>
                <p className="font-semibold">CPA180712SJ1</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Número de Cuenta</p>
                <p className="font-semibold">50057375011</p>
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-sm font-medium text-muted-foreground mb-1">CLABE Interbancaria</p>
              <div className="bg-muted p-3 rounded-md">
                <p className="font-mono font-semibold text-center">036320500573750112</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button size="lg" className="w-full md:w-auto">
              Pagar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PaymentDetailsPage;
