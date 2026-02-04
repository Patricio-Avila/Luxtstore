import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, Star, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

const ProductGrid = () => {
  const { addItem } = useCart();

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          inventory (
            quantity
          )
        `)
        .eq('is_active', true);

      if (error) throw error;
      return data;
    },
  });

  const handleAddToCart = (product: any) => {
    addItem(product);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-lux-blue" />
      </div>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Productos Destacados
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestra selección de productos más populares, diseñados con orgullo para la comunidad LUX
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
              <div className="relative overflow-hidden">
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg"; // Fallback image
                  }}
                />

                {/* Badge */}
                {product.badge && (
                  <Badge
                    className={`absolute top-3 left-3 ${product.badge_color === 'accent' ? 'bg-accent text-accent-foreground' :
                      product.badge_color === 'success' ? 'bg-success text-success-foreground' :
                        product.badge_color === 'lux-blue' ? 'bg-lux-blue text-primary-foreground' :
                          'bg-lux-orange text-primary-foreground'
                      }`}
                  >
                    {product.badge}
                  </Badge>
                )}

                {/* Wishlist button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Heart className="h-4 w-4" />
                </Button>

                {/* Quick add to cart overlay */}
                <div className="absolute inset-0 bg-lux-blue/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    className="shadow-lg"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.inventory?.[0]?.quantity < 1}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inventory?.[0]?.quantity > 0 ? 'Agregar al Carrito' : 'Agotado'}
                  </Button>
                </div>
              </div>

              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4
                            ? "text-accent fill-current"
                            : "text-muted-foreground"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Stock: {product.inventory?.[0]?.quantity || 0}
                    </span>
                  </div>

                  {/* Product name */}
                  <h3 className="font-semibold text-foreground group-hover:text-lux-blue transition-colors">
                    {product.name}
                  </h3>

                  {/* Student design indicator */}
                  {product.is_student_design && (
                    <div className="flex items-center text-sm text-lux-blue">
                      <span className="mr-1">🎨</span>
                      Diseñado por estudiante
                    </div>
                  )}
                </div>

                {/* Price and Add to Cart Button */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <Button
                    className="bg-lux-blue hover:bg-lux-blue-dark transition-colors"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.inventory?.[0]?.quantity < 1}
                  >
                    {product.inventory?.[0]?.quantity < 1 ? 'Agotado' : 'Agregar'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver todos los productos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;