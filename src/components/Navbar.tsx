import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, Menu, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import CartSheet from "@/components/CartSheet";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fetch dynamic categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('name')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        return [];
      }
      return data || [];
    }
  });

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top bar */}
      <div className="bg-lux-blue text-primary-foreground py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          ¡Envío gratis en compras mayores a $500 en Monterrey, Nuevo León!
        </div>
      </div>

      {/* Main navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <a href="/" className="text-2xl font-bold text-lux-blue no-underline">
              LUX <span className="text-accent">Store</span>
            </a>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Tienda Dropdown */}
            <div className="relative group">
              <a href="/" className="text-foreground hover:text-lux-blue transition-colors font-medium cursor-pointer">
                Tienda
              </a>

              {/* Only show dropdown if we have categories */}
              {categories && categories.length > 0 && (
                <div className="absolute top-full left-0 w-64 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 mt-2 z-50">
                  <div className="p-2">
                    {categories.map((cat: any) => (
                      <a
                        key={cat.name}
                        href="#"
                        className="block px-4 py-2 text-sm text-foreground hover:bg-lux-blue-light hover:text-lux-blue rounded-md transition-colors"
                      >
                        {cat.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Ventas Link */}
            <a href="/dashboard" className="text-foreground hover:text-lux-blue transition-colors font-medium">
              Ventas
            </a>

            {/* Inventario Link */}
            <a href="/inventory" className="text-foreground hover:text-lux-blue transition-colors font-medium font-bold text-lux-orange">
              Inventario
            </a>
          </div>

          {/* Search, Cart, User */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-secondary rounded-lg px-3 py-2 w-80">
              <Search className="h-4 w-4 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="bg-transparent outline-none flex-1 text-sm placeholder:text-muted-foreground"
              />
            </div>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <div className="space-y-2">
              <a href="/" className="block px-4 py-2 text-foreground hover:bg-lux-blue-light hover:text-lux-blue rounded-md transition-colors font-semibold">
                Tienda
              </a>
              {categories?.map((cat: any) => (
                <a
                  key={cat.name}
                  href="#"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-lux-blue-light hover:text-lux-blue rounded-md transition-colors ml-4"
                >
                  {cat.name}
                </a>
              ))}
              <div className="border-t border-border pt-2 mt-2">
                <a href="/dashboard" className="block px-4 py-2 text-foreground hover:bg-lux-blue-light hover:text-lux-blue rounded-md transition-colors">
                  Ventas
                </a>
                <a href="/inventory" className="block px-4 py-2 text-foreground hover:bg-lux-blue-light hover:text-lux-blue rounded-md transition-colors font-bold text-lux-orange">
                  Inventario
                </a>
              </div>
            </div>
          </div>
        )}
        <CartSheet />
      </div>
    </nav>
  );
};

export default Navbar;