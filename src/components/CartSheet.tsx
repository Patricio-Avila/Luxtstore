import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { SalesService } from "@/services/SalesService";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CartSheet = () => {
    const { items, removeItem, updateQuantity, cartTotal, isCartOpen, setIsCartOpen, clearCart } = useCart();

    const handleCheckout = async () => {
        try {
            if (items.length === 0) return;

            toast.loading("Procesando compra...");

            const { data: { session } } = await supabase.auth.getSession();

            await SalesService.createOrder({
                userId: session?.user?.id,
                items: items.map(item => ({
                    productId: item.id,
                    productName: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalAmount: cartTotal
            });

            toast.dismiss();
            toast.success("¡Compra realizada con éxito!");
            clearCart();
            setIsCartOpen(false);
        } catch (error) {
            console.error(error);
            toast.dismiss();
            toast.error("Error al procesar la compra");
        }
    };

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent className="w-full sm:w-[540px] flex flex-col">
                <SheetHeader>
                    <SheetTitle>Tu Carrito</SheetTitle>
                    <SheetDescription>
                        Revisa tus productos antes de finalizar la compra.
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-1 my-4 pr-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                            <ShoppingBag className="h-16 w-16 mb-4 opacity-20" />
                            <p>Tu carrito está vacío</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 border-b pb-4">
                                    {item.image_url && (
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                            className="h-20 w-20 object-cover rounded-md bg-secondary"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = "/placeholder.svg";
                                            }}
                                        />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">${item.price}</p>

                                        <div className="flex items-center gap-2 mt-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => updateQuantity(item.id, -1)}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="w-8 text-center">{item.quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => updateQuantity(item.id, 1)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive ml-auto"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="text-right font-semibold">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                <SheetFooter className="border-t pt-4">
                    <div className="w-full space-y-4">
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>

                        <Button
                            className="w-full bg-lux-blue hover:bg-lux-blue-dark"
                            size="lg"
                            disabled={items.length === 0}
                            onClick={handleCheckout}
                        >
                            Comprar Ahora
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;
