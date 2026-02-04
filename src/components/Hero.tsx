import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import heroTshirt from "@/assets/hero-tshirt.jpg";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-lux-blue-light via-background to-lux-gray overflow-hidden">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-lux-blue">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm font-medium">Universidad LUX - Monterrey, NL</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Más que souvenirs,
                <span className="text-lux-blue block">identidad Lux</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Expresa tu orgullo universitario con productos únicos diseñados para la comunidad Lux. 
                De estudiantes para estudiantes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Explorar Productos
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Diseñado por Estudiantes
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-lux-blue">500+</div>
                <div className="text-sm text-muted-foreground">Productos únicos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-lux-blue">10k+</div>
                <div className="text-sm text-muted-foreground">Estudiantes satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">100%</div>
                <div className="text-sm text-muted-foreground">Productos sustentables</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroTshirt}
                alt="Playera universitaria LUX con diseño exclusivo"
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-8 right-8 w-20 h-20 bg-accent rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-8 left-8 w-16 h-16 bg-lux-blue rounded-full opacity-30 animate-bounce"></div>
            
            {/* Floating badge */}
            <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              🔥 Nuevo diseño
            </div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-lux-orange/5 to-transparent rotate-12"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-lux-blue/5 to-transparent -rotate-12"></div>
      </div>
    </section>
  );
};

export default Hero;