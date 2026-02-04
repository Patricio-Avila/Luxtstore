import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-lux-blue text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                LUX <span className="text-lux-orange">Store</span>
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Más que souvenirs, identidad Lux. Productos únicos para la comunidad 
                universitaria más orgullosa de Monterrey.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Navegación</h4>
            <div className="space-y-3">
              {[
                "Todos los productos",
                "Graduación",
                "Regreso a clases",
                "Diseñado por estudiantes",
                "Productos eco-friendly",
                "Ediciones limitadas"
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block text-primary-foreground/80 hover:text-lux-orange transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Categorías</h4>
            <div className="space-y-3">
              {[
                "Playeras",
                "Termos y tazas",
                "Gorras",
                "Mochilas",
                "Lanyards",
                "Accesorios"
              ].map((category) => (
                <a
                  key={category}
                  href="#"
                  className="block text-primary-foreground/80 hover:text-lux-orange transition-colors"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-6">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-lux-orange" />
                  <span className="text-sm text-primary-foreground/80">
                    Monterrey, Nuevo León
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-lux-orange" />
                  <span className="text-sm text-primary-foreground/80">
                    +52 81 1234 5678
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-lux-orange" />
                  <span className="text-sm text-primary-foreground/80">
                    contacto@luxstore.edu.mx
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter LUX</h4>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Recibe ofertas exclusivas y nuevos diseños
              </p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button variant="accent" size="icon">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-primary-foreground/80">
              <span>© 2024 Universidad LUX Store</span>
              <span>•</span>
              <a href="#" className="hover:text-lux-orange transition-colors">
                Términos y condiciones
              </a>
              <span>•</span>
              <a href="#" className="hover:text-lux-orange transition-colors">
                Política de privacidad
              </a>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-primary-foreground/80">
              <span>Hecho con</span>
              <Heart className="h-4 w-4 text-lux-orange fill-current" />
              <span>por estudiantes LUX</span>
            </div>
          </div>
        </div>
      </div>

      {/* University pride banner */}
      <div className="bg-lux-orange">
        <div className="container mx-auto px-4 py-3">
          <div className="text-center text-primary-foreground font-medium">
            🎓 Orgullosamente Universidad LUX - Forjando el futuro desde 1985
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;