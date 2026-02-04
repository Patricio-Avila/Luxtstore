import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shirt, 
  Coffee, 
  Crown, 
  Backpack, 
  Badge, 
  Zap, 
  Key, 
  Leaf,
  Palette
} from "lucide-react";

const Categories = () => {
  const categories = [
    {
      name: "Playeras",
      icon: Shirt,
      count: "120+ productos",
      description: "Diseños únicos y cómodos",
      color: "lux-blue",
      gradient: "from-lux-blue to-lux-blue-dark"
    },
    {
      name: "Termos y Tazas",
      icon: Coffee,
      count: "85+ productos",
      description: "Mantén tu energía LUX",
      color: "accent",
      gradient: "from-accent to-orange-600"
    },
    {
      name: "Gorras",
      icon: Crown,
      count: "45+ productos",
      description: "Estilo universitario",
      color: "lux-blue",
      gradient: "from-lux-blue to-lux-blue-dark"
    },
    {
      name: "Mochilas",
      icon: Backpack,
      count: "30+ productos",
      description: "Funcionales y elegantes",
      color: "success",
      gradient: "from-success to-green-700"
    },
    {
      name: "Lanyards",
      icon: Badge,
      count: "25+ productos",
      description: "Identifica tu orgullo LUX",
      color: "accent",
      gradient: "from-accent to-orange-600"
    },
    {
      name: "Pines y Botones",
      icon: Zap,
      count: "60+ productos",
      description: "Pequeños detalles, gran impacto",
      color: "lux-blue",
      gradient: "from-lux-blue to-lux-blue-dark"
    },
    {
      name: "Llaveros",
      icon: Key,
      count: "40+ productos",
      description: "Lleva LUX contigo",
      color: "success",
      gradient: "from-success to-green-700"
    },
    {
      name: "Bolsas Ecológicas",
      icon: Leaf,
      count: "20+ productos",
      description: "Sustentables y resistentes",
      color: "success",
      gradient: "from-success to-green-700"
    },
    {
      name: "Productos de Estudiantes",
      icon: Palette,
      count: "150+ productos",
      description: "Creatividad de la comunidad",
      color: "accent",
      gradient: "from-accent to-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-lux-gray/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Categorías de Productos
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encuentra exactamente lo que buscas para expresar tu identidad universitaria
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.name} 
                className="group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-br ${category.gradient} p-6 text-primary-foreground`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-white/20 p-3 rounded-lg">
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm opacity-90">{category.count}</div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90 mb-4">{category.description}</p>
                    
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30 transition-colors"
                    >
                      Explorar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Special sections */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Student designs highlight */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="bg-gradient-to-r from-accent to-orange-600 p-8 text-primary-foreground">
              <div className="flex items-center mb-4">
                <Palette className="h-10 w-10 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold">Diseñado por Estudiantes</h3>
                  <p className="opacity-90">Creatividad de nuestra comunidad</p>
                </div>
              </div>
              <p className="mb-6">
                Descubre productos únicos creados por talentosos estudiantes de la Universidad LUX. 
                Cada compra apoya directamente a nuestros diseñadores.
              </p>
              <Button variant="secondary" className="bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30">
                Ver diseños estudiantiles
              </Button>
            </div>
          </Card>

          {/* Sustainability highlight */}
          <Card className="overflow-hidden border-0 shadow-lg">
            <div className="bg-gradient-to-r from-success to-green-700 p-8 text-primary-foreground">
              <div className="flex items-center mb-4">
                <Leaf className="h-10 w-10 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold">Compromiso Sustentable</h3>
                  <p className="opacity-90">100% productos eco-friendly</p>
                </div>
              </div>
              <p className="mb-6">
                Todos nuestros productos están hechos con materiales sustentables y procesos 
                responsables con el medio ambiente. LUX se compromete con el futuro.
              </p>
              <Button variant="secondary" className="bg-white/20 text-primary-foreground border-white/30 hover:bg-white/30">
                Conoce más
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Categories;