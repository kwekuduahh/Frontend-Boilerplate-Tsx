import React, { useEffect } from 'react';
import SalesChart from '@/Modules/Analytics-Reports/components/SalesChart';
import MetricsCard from '@/Modules/Analytics-Reports/components/MetricsCard';
import ProductPerformanceTable from '@/Modules/Analytics-Reports/components/ProductPerformanceTable';
import ReportFilters from '@/Modules/Analytics-Reports/components/ReportFilters';
import FinancialSummary from '@/Modules/Analytics-Reports/components/FinancialSummary';
import ReportScheduler from '@/Modules/Analytics-Reports/components/ReportScheduler';
import { useSidebar } from '@/_Shared/Hooks/useSidebar';


interface SalesDataPoint {
    name: string;
    revenue: number;
    orders: number;
    customers: number;
}

interface Product {
    id: number;
    name: string;
    sku: string;
    image: string;
    revenue: number;
    revenueChange: number;
    orders: number;
    ordersChange: number;
    conversion: number;
    conversionChange: number;
    trend: 'up' | 'down';
    stock: number;
}


const AnalyticsReports: React.FC = () => {
    const { isCollapsed } = useSidebar();

    // Mock data for sales chart
    const salesData: SalesDataPoint[] = [
        { name: 'Jan 1', revenue: 12400, orders: 45, customers: 32 },
        { name: 'Jan 2', revenue: 15600, orders: 52, customers: 41 },
        { name: 'Jan 3', revenue: 18200, orders: 61, customers: 48 },
        { name: 'Jan 4', revenue: 14800, orders: 48, customers: 38 },
        { name: 'Jan 5', revenue: 22100, orders: 73, customers: 58 },
        { name: 'Jan 6', revenue: 19500, orders: 65, customers: 52 },
        { name: 'Jan 7', revenue: 25300, orders: 84, customers: 67 },
        { name: 'Jan 8', revenue: 21700, orders: 71, customers: 56 },
        { name: 'Jan 9', revenue: 18900, orders: 63, customers: 49 },
        { name: 'Jan 10', revenue: 27400, orders: 91, customers: 72 },
        { name: 'Jan 11', revenue: 23800, orders: 79, customers: 63 },
        { name: 'Jan 12', revenue: 26200, orders: 87, customers: 69 },
        { name: 'Jan 13', revenue: 29100, orders: 96, customers: 76 }
    ];

    // Mock data for product performance
    const productData: Product[] = [
        {
            id: 1,
            name: "Premium Wireless Headphones",
            sku: "PWH-001",
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
            revenue: 45680,
            revenueChange: 12.5,
            orders: 234,
            ordersChange: 8.3,
            conversion: 4.2,
            conversionChange: 0.8,
            trend: 'up',
            stock: 87
        },
        {
            id: 2,
            name: "Smart Fitness Watch",
            sku: "SFW-002",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
            revenue: 38920,
            revenueChange: -3.2,
            orders: 189,
            ordersChange: -1.8,
            conversion: 3.8,
            conversionChange: -0.4,
            trend: 'down',
            stock: 156
        },
        {
            id: 3,
            name: "Organic Cotton T-Shirt",
            sku: "OCT-003",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
            revenue: 28450,
            revenueChange: 18.7,
            orders: 312,
            ordersChange: 22.1,
            conversion: 6.1,
            conversionChange: 1.3,
            trend: 'up',
            stock: 243
        },
        {
            id: 4,
            name: "Professional Camera Lens",
            sku: "PCL-004",
            image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
            revenue: 52100,
            revenueChange: 5.9,
            orders: 67,
            ordersChange: 3.2,
            conversion: 2.1,
            conversionChange: 0.2,
            trend: 'up',
            stock: 23
        },
        {
            id: 5,
            name: "Ergonomic Office Chair",
            sku: "EOC-005",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
            revenue: 41230,
            revenueChange: -8.1,
            orders: 98,
            ordersChange: -12.4,
            conversion: 1.8,
            conversionChange: -0.6,
            trend: 'down',
            stock: 45
        },
        {
            id: 6,
            name: "Bluetooth Speaker",
            sku: "BTS-006",
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
            revenue: 19870,
            revenueChange: 15.3,
            orders: 156,
            ordersChange: 18.9,
            conversion: 4.7,
            conversionChange: 1.1,
            trend: 'up',
            stock: 178
        },
        {
            id: 7,
            name: "Gaming Mechanical Keyboard",
            sku: "GMK-007",
            image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
            revenue: 33560,
            revenueChange: 7.2,
            orders: 124,
            ordersChange: 4.8,
            conversion: 3.2,
            conversionChange: 0.3,
            trend: 'up',
            stock: 92
        },
        {
            id: 8,
            name: "Stainless Steel Water Bottle",
            sku: "SSW-008",
            image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
            revenue: 15420,
            revenueChange: 25.8,
            orders: 287,
            ordersChange: 31.2,
            conversion: 8.3,
            conversionChange: 2.1,
            trend: 'up',
            stock: 312
        },
        {
            id: 9,
            name: "Wireless Phone Charger",
            sku: "WPC-009",
            image: "https://images.unsplash.com/photo-1609592806596-4d3b0c3b7b0e?w=400&h=400&fit=crop",
            revenue: 22340,
            revenueChange: -5.7,
            orders: 198,
            ordersChange: -8.3,
            conversion: 5.1,
            conversionChange: -0.9,
            trend: 'down',
            stock: 67
        },
        {
            id: 10,
            name: "LED Desk Lamp",
            sku: "LDL-010",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            revenue: 18750,
            revenueChange: 11.4,
            orders: 143,
            ordersChange: 9.7,
            conversion: 3.6,
            conversionChange: 0.5,
            trend: 'up',
            stock: 134
        }
    ];

    const handleExport = (format: string) => {
        // In a real app, this would trigger export functionality
        console.log(`Exporting data in ${format} format`);
        alert(`Exporting analytics data in ${format?.toUpperCase()} format...`);
    };



    useEffect(() => {
        document.title = 'Analytics & Reports - Uphshutin Admin';
    }, []);

    return (
        <main className={`pt-16 transition-smooth ${isCollapsed ? 'lg:pl-20' : 'lg:pl-60'
            }`}>
            <div className="p-6 space-y-6">
                {/* Page Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Analytics & Reports</h1>
                        <p className="mt-1 text-muted-foreground">
                            Comprehensive business intelligence and data insights
                        </p>
                    </div>
                    <div className="flex items-center mt-4 space-x-3 lg:mt-0">
                        <span className="text-sm text-muted-foreground">
                            Last updated: {new Date().toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Report Filters */}
                <ReportFilters
                    onFiltersChange={() => { }}
                    onExport={handleExport}
                />

                {/* Key Metrics */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <MetricsCard
                        title="Total Revenue"
                        value="$284,590"
                        change="+12.5%"
                        changeType="positive"
                        icon="dollar-sign"
                        description="Last 30 days"
                        trend={[45, 52, 48, 61, 58, 67, 71]}
                    />
                    <MetricsCard
                        title="Total Orders"
                        value="1,847"
                        change="+8.3%"
                        changeType="positive"
                        icon="shopping-cart"
                        description="Last 30 days"
                        trend={[23, 28, 25, 32, 29, 35, 38]}
                    />
                    <MetricsCard
                        title="Conversion Rate"
                        value="4.2%"
                        change="+0.8%"
                        changeType="positive"
                        icon="trending-up"
                        description="Last 30 days"
                        trend={[3.2, 3.5, 3.8, 4.1, 3.9, 4.2, 4.2]}
                    />
                    <MetricsCard
                        title="Avg. Order Value"
                        value="$154.20"
                        change="-2.1%"
                        changeType="negative"
                        icon="credit-card"
                        description="Last 30 days"
                        trend={[158, 162, 155, 151, 149, 154, 154]}
                    />
                </div>

                {/* Sales Charts */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <SalesChart
                        data={salesData}
                        title="Revenue Trends"
                        type="area"
                        height={350}
                    />
                    <SalesChart
                        data={salesData.map(item => ({ ...item, revenue: item.orders }))}
                        title="Order Volume"
                        type="bar"
                        height={350}
                    />
                </div>

                {/* Financial Summary */}
                <FinancialSummary />

                {/* Product Performance */}
                <ProductPerformanceTable products={productData} />

                {/* Report Scheduler */}
                <ReportScheduler />
            </div>
        </main>
    );
};

export default AnalyticsReports;

