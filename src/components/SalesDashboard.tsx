import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2, DollarSign, ShoppingBag } from "lucide-react";

interface SalesData {
    day?: string;
    week?: string;
    total_orders: number;
    total_revenue: number;
    displayDate?: string;
}

const SalesDashboard = () => {
    const [period, setPeriod] = useState<"day" | "week">("day");

    const { data: salesData, isLoading } = useQuery({
        queryKey: ['sales', period],
        queryFn: async () => {
            // The view names are 'sales_by_day' and 'sales_by_week'
            const viewName = period === 'day' ? 'sales_by_day' : 'sales_by_week';

            const { data, error } = await supabase
                .from(viewName as any) // Cast to any because views might not be in generated types yet
                .select('*')
                .limit(30); // Last 30 periods

            if (error) throw error;

            // Format dates for display
            return (data as any[]).map(item => ({
                ...item,
                displayDate: new Date(period === 'day' ? item.day : item.week).toLocaleDateString()
            })).reverse() as SalesData[]; // Show oldest to newest
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-lux-blue" />
            </div>
        );
    }

    const totalRevenue = salesData?.reduce((sum, item) => sum + (Number(item.total_revenue) || 0), 0) || 0;
    const totalOrders = salesData?.reduce((sum, item) => sum + (Number(item.total_orders) || 0), 0) || 0;

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-lux-blue">Panel de Ventas</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ingresos Totales (Periodo Actual)</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Resumen de Ventas</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <Tabs defaultValue="day" className="space-y-4" onValueChange={(val) => setPeriod(val as "day" | "week")}>
                        <TabsList>
                            <TabsTrigger value="day">Por Día</TabsTrigger>
                            <TabsTrigger value="week">Por Semana</TabsTrigger>
                        </TabsList>

                        <TabsContent value="day" className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="displayDate" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="total_revenue" fill="#8884d8" name="Ingresos" />
                                </BarChart>
                            </ResponsiveContainer>
                        </TabsContent>

                        <TabsContent value="week" className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="displayDate" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="total_revenue" fill="#82ca9d" name="Ingresos" />
                                </BarChart>
                            </ResponsiveContainer>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default SalesDashboard;
