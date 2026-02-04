import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Trash, Search, Save } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const InventoryPage = () => {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // State for new product form
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        stock: "10",
        badge: "",
        category: "General"
    });

    // State for stock editing
    const [editingStock, setEditingStock] = useState<{ [key: string]: string }>({});

    // Fetch Products
    const { data: products, refetch, isLoading: isLoadingProducts } = useQuery({
        queryKey: ['inventory_products'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select(`
          *,
          inventory (
            quantity
          )
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data;
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1. Insert Product
            const { data: product, error: productError } = await supabase
                .from('products')
                .insert({
                    name: formData.name,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    image_url: formData.imageUrl || null,
                    badge: formData.badge || null,
                    is_active: true
                })
                .select()
                .single();

            if (productError) throw productError;
            if (!product) throw new Error("Failed to create product");

            // 2. Insert Inventory
            const { error: inventoryError } = await supabase
                .from('inventory')
                .insert({
                    product_id: product.id,
                    quantity: parseInt(formData.stock),
                    low_stock_threshold: 5
                });

            if (inventoryError) throw inventoryError;

            toast.success("Producto agregado exitosamente");
            setFormData({
                name: "",
                description: "",
                price: "",
                imageUrl: "",
                stock: "10",
                badge: "",
                category: "General"
            });
            refetch();

        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Error al agregar producto");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar este producto?")) return;

        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            toast.success("Producto eliminado");
            refetch();
        } catch (error: any) {
            toast.error("Error al eliminar");
        }
    };

    const handleUpdateStock = async (productId: string) => {
        const newStock = editingStock[productId];
        if (newStock === undefined || newStock === "") return;

        try {
            const quantity = parseInt(newStock);
            if (isNaN(quantity)) {
                toast.error("Cantidad inválida");
                return;
            }

            // Check if inventory record exists, if not insert, else update
            // But for now assuming one-to-one and existing

            const { error } = await supabase
                .from('inventory')
                .update({ quantity: quantity })
                .eq('product_id', productId);

            if (error) throw error;

            toast.success("Stock actualizado");
            setEditingStock(prev => {
                const newState = { ...prev };
                delete newState[productId];
                return newState;
            });
            refetch();
        } catch (error: any) {
            console.error(error);
            toast.error("Error al actualizar stock");
        }
    };

    // Filter products
    const filteredProducts = products?.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-lux-blue">Gestión de Inventario</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* ADD PRODUCT FORM */}
                <div className="md:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Agregar Producto</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Ej: Gorra LUX" />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="description">Descripción</Label>
                                    <Textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Detalles..." className="h-20" />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="price">Precio ($)</Label>
                                        <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required placeholder="0.00" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="stock">Stock</Label>
                                        <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="imageUrl">URL Imagen</Label>
                                    <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." />
                                </div>

                                <Button type="submit" className="w-full bg-lux-blue hover:bg-lux-blue-dark" disabled={loading}>
                                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                                    Guardar
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* INVENTORY LIST */}
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Lista de Productos</CardTitle>
                                <CardDescription>
                                    {products?.length || 0} productos registrados
                                </CardDescription>
                            </div>
                            <div className="relative w-64">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8"
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            {isLoadingProducts ? (
                                <div className="flex justify-center py-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-lux-blue" />
                                </div>
                            ) : (
                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Producto</TableHead>
                                                <TableHead className="w-[100px]">Precio</TableHead>
                                                <TableHead className="w-[140px]">Stock</TableHead>
                                                <TableHead className="w-[80px] text-right">Acción</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredProducts?.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                                        No se encontraron productos
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                filteredProducts?.map((product) => (
                                                    <TableRow key={product.id}>
                                                        <TableCell className="font-medium">
                                                            <div className="flex items-center gap-3">
                                                                {product.image_url && (
                                                                    <img
                                                                        src={product.image_url}
                                                                        alt={product.name}
                                                                        className="h-10 w-10 rounded object-cover bg-secondary"
                                                                        onError={(e) => {
                                                                            const target = e.target as HTMLImageElement;
                                                                            target.src = "/placeholder.svg";
                                                                        }}
                                                                    />
                                                                )}
                                                                <div className="flex flex-col">
                                                                    <span>{product.name}</span>
                                                                    {product.badge && (
                                                                        <span className="text-xs text-muted-foreground">{product.badge}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>${product.price}</TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <Input
                                                                    type="number"
                                                                    className="w-20 h-8"
                                                                    defaultValue={product.inventory?.[0]?.quantity || 0}
                                                                    onChange={(e) => setEditingStock(prev => ({
                                                                        ...prev,
                                                                        [product.id]: e.target.value
                                                                    }))}
                                                                />
                                                                {editingStock[product.id] !== undefined && (
                                                                    <Button
                                                                        size="icon"
                                                                        className="h-8 w-8 bg-green-600 hover:bg-green-700"
                                                                        onClick={() => handleUpdateStock(product.id)}
                                                                    >
                                                                        <Save className="h-4 w-4" />
                                                                    </Button>
                                                                )}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="text-destructive hover:bg-destructive/10"
                                                                onClick={() => handleDelete(product.id)}
                                                            >
                                                                <Trash className="h-4 w-4" />
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default InventoryPage;
