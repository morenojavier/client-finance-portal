
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PublicNavbar from "@/components/PublicNavbar";
import { 
  Check, 
  DollarSign, 
  ArrowRight, 
  CreditCard, 
  CalendarCheck, 
  LineChart, 
  ShieldCheck,
  Clock,
  Users
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-finance-light to-white flex flex-col">
      <PublicNavbar companyName="ProBalance" />

      {/* Hero section */}
      <section className="py-12 md:py-20 px-4 container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <img 
            src="/placeholder.svg" 
            alt="ProBalance Hero" 
            className="w-48 h-48 mx-auto mb-6"
          />
          <h1 className="text-3xl md:text-5xl font-bold text-finance-dark mb-4">
            ProBalance – Claridad financiera para freelancers y pymes
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 italic">
            "Despídete del caos en tus cobros. Dale a tus estados de cuenta la formalidad y claridad que merecen."
          </p>
          <p className="text-lg text-gray-600 mb-6">
            ProBalance simplifica tus cobros recurrentes con estados de cuenta atractivos, profesionales y fáciles de entender. 
            Evita confusiones, mejora el control financiero y proyecta una imagen impecable con tus clientes.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
            <Link to="/login">
              <Button size="lg" className="bg-finance-primary hover:bg-finance-dark">
                Empieza hoy gratis
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link to="/servicios/publico">
              <Button size="lg" variant="outline">
                Conoce más
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits section with icons */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-8 justify-between">
            <div className="flex items-start gap-3">
              <div className="bg-finance-primary rounded-full p-2 mt-1 text-white">
                <Clock size={20} />
              </div>
              <p className="text-lg">Comparte fácilmente pagos pendientes y realizados.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-finance-primary rounded-full p-2 mt-1 text-white">
                <ShieldCheck size={20} />
              </div>
              <p className="text-lg">Reduce errores y traspapeleos.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-finance-primary rounded-full p-2 mt-1 text-white">
                <Users size={20} />
              </div>
              <p className="text-lg">Fortalece tu imagen profesional al instante.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing section with enhanced cards */}
      <section className="py-16 container mx-auto px-4" id="precios">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-finance-dark mb-4">Planes y Precios</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empieza hoy gratis y prueba nuestro plan Freemium.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto justify-center">
          {/* Free plan */}
          <Card className="w-full md:w-80 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="bg-gray-100 rounded-full p-3 inline-block">
                  <Users size={32} className="text-gray-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Freemium</h3>
              <p className="text-4xl font-bold mb-4">$0 <span className="text-sm font-normal text-gray-500">/ mes</span></p>
              <p className="text-gray-600 mb-6">Comienza a explorar nuestras funcionalidades básicas sin costo.</p>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Comenzar gratis
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          {/* Monthly plan */}
          <Card className="w-full md:w-80 border-finance-primary hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="bg-finance-primary text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-3">Popular</div>
              <div className="text-center mb-4">
                <div className="bg-finance-primary/10 rounded-full p-3 inline-block">
                  <CreditCard size={32} className="text-finance-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Mensual</h3>
              <div className="flex items-center justify-center mb-4">
                <DollarSign size={20} className="text-finance-primary" />
                <p className="text-4xl font-bold">5 <span className="text-sm font-normal text-gray-500">USD / mes</span></p>
              </div>
              <p className="text-gray-600 mb-6">Todas las funciones desbloqueadas con flexibilidad mensual.</p>
              <Link to="/login">
                <Button className="w-full bg-finance-primary hover:bg-finance-dark">
                  Suscribirse
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          {/* Annual plan */}
          <Card className="w-full md:w-80 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="bg-green-500 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-3">Ahorro</div>
              <div className="text-center mb-4">
                <div className="bg-green-500/10 rounded-full p-3 inline-block">
                  <CalendarCheck size={32} className="text-green-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Anual</h3>
              <div className="flex items-center justify-center mb-4">
                <DollarSign size={20} className="text-finance-primary" />
                <p className="text-4xl font-bold">49.99 <span className="text-sm font-normal text-gray-500">USD / año</span></p>
              </div>
              <p className="text-gray-600 mb-6">¡Ahorra 2 meses! con nuestro plan anual.</p>
              <Link to="/login">
                <Button className="w-full bg-finance-primary hover:bg-finance-dark">
                  Suscribirse
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it works section with carousel */}
      <section className="py-16 bg-gray-50 px-4" id="como-funciona">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-finance-dark mb-4 text-center">Así funciona ProBalance</h2>
          <p className="text-lg text-gray-600 mb-8 text-center">
            ¡Mira lo fácil que es gestionar tus cobros! Aquí te mostramos algunas capturas reales de la plataforma, 
            para que veas cómo puedes transformar tus cobros desde hoy.
          </p>
          
          <Carousel className="max-w-2xl mx-auto">
            <CarouselContent>
              <CarouselItem>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src="/placeholder.svg" 
                    alt="Dashboard de ProBalance" 
                    className="rounded-md w-full aspect-video object-cover bg-gray-100"
                  />
                  <p className="mt-3 text-center text-gray-700 font-medium">Estado de cuenta simplificado</p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src="/placeholder.svg" 
                    alt="Envío de estados de cuenta" 
                    className="rounded-md w-full aspect-video object-cover bg-gray-100" 
                  />
                  <p className="mt-3 text-center text-gray-700 font-medium">Gestión de cobros eficiente</p>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img 
                    src="/placeholder.svg" 
                    alt="Panel de control" 
                    className="rounded-md w-full aspect-video object-cover bg-gray-100" 
                  />
                  <p className="mt-3 text-center text-gray-700 font-medium">Panel de control intuitivo</p>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </section>

      {/* FAQ Section with improved styling */}
      <section className="py-16 container mx-auto px-4" id="faq">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-finance-dark mb-8 text-center">Preguntas Frecuentes</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-3 mb-2">
                <div className="bg-finance-primary rounded-full p-1 text-white flex-shrink-0 mt-1">
                  <Check size={16} />
                </div>
                <h3 className="text-xl font-medium text-finance-dark">¿Qué incluye el plan gratuito?</h3>
              </div>
              <p className="text-gray-600 ml-8">El plan gratuito te permite comenzar y probar la plataforma con las funcionalidades esenciales para que tomes el control desde el primer día.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-3 mb-2">
                <div className="bg-finance-primary rounded-full p-1 text-white flex-shrink-0 mt-1">
                  <Check size={16} />
                </div>
                <h3 className="text-xl font-medium text-finance-dark">¿Puedo cancelar mi suscripción en cualquier momento?</h3>
              </div>
              <p className="text-gray-600 ml-8">Sí, puedes cancelar tu suscripción mensual o anual cuando lo desees, sin cargos adicionales.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-3 mb-2">
                <div className="bg-finance-primary rounded-full p-1 text-white flex-shrink-0 mt-1">
                  <Check size={16} />
                </div>
                <h3 className="text-xl font-medium text-finance-dark">¿Cómo se realizan los pagos de la suscripción?</h3>
              </div>
              <p className="text-gray-600 ml-8">Aceptamos pagos con tarjeta de crédito o débito, vía una plataforma segura y confiable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback section */}
      <section className="py-16 bg-gray-50 px-4" id="sugerencias">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-finance-dark mb-4">¿Tienes sugerencias?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Tu opinión es muy importante para nosotros. Ayúdanos a mejorar ProBalance enviando tus sugerencias.
          </p>
          <Link to="/contacto">
            <Button size="lg" className="bg-finance-primary hover:bg-finance-dark">
              <LineChart className="mr-2" size={20} />
              Envía tu sugerencia
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-finance-dark text-white py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-bold mb-2">ProBalance</h2>
              <p className="text-gray-300">Tu aliado para cobros más simples, profesionales y claros.</p>
            </div>
            <div className="mt-6 md:mt-0">
              <nav className="flex flex-wrap gap-6 justify-center">
                <Link to="/" className="text-gray-300 hover:text-white">Inicio</Link>
                <Link to="#precios" className="text-gray-300 hover:text-white">Precios</Link>
                <Link to="#como-funciona" className="text-gray-300 hover:text-white">Cómo funciona</Link>
                <Link to="#faq" className="text-gray-300 hover:text-white">FAQ</Link>
                <Link to="/login" className="text-gray-300 hover:text-white">Iniciar sesión</Link>
              </nav>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} ProBalance. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
