import React, { useState } from 'react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { Button } from '@/_Shared/Components/Ui/button';
import AppImage from '@/_Shared/Components/AppImage';

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

interface ProductPerformanceTableProps {
    products: Product[];
}

const ProductPerformanceTable: React.FC<ProductPerformanceTableProps> = ({ products }) => {
    const [sortBy, setSortBy] = useState<keyof Product>('revenue');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const sortedProducts = [...products].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
    });

    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    const handleSort = (column: keyof Product) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('desc');
        }
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatPercentage = (value: number): string => {
        return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
    };

    const getPerformanceColor = (change: number): string => {
        if (change > 0) return 'text-success';
        if (change < 0) return 'text-error';
        return 'text-muted-foreground';
    };

    return (
        <div className="border rounded-lg bg-card border-border shadow-card">
            <div className="p-6 border-b border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="mb-4 text-lg font-semibold text-card-foreground sm:mb-0">
                        Product Performance
                    </h3>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <DynamicIcon name="download" size={20} />
                            Export
                        </Button>
                        <Button variant="outline" size="sm">
                            <DynamicIcon name="filter" size={20} />
                            Filter
                        </Button>
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="p-4 font-medium text-left text-muted-foreground">Product</th>
                            <th
                                className="p-4 font-medium text-left cursor-pointer text-muted-foreground hover:text-foreground transition-smooth"
                                onClick={() => handleSort('revenue')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Revenue</span>
                                    <DynamicIcon
                                        name={sortBy === 'revenue' ? (sortOrder === 'asc' ? 'chevron-up' : 'chevron-down') : 'chevrons-up-down'}
                                        size={14}
                                    />
                                </div>
                            </th>
                            <th
                                className="p-4 font-medium text-left cursor-pointer text-muted-foreground hover:text-foreground transition-smooth"
                                onClick={() => handleSort('orders')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Orders</span>
                                    <DynamicIcon
                                        name={sortBy === 'orders' ? (sortOrder === 'asc' ? 'chevron-up' : 'chevron-down') : 'chevrons-up-down'}
                                        size={14}
                                    />
                                </div>
                            </th>
                            <th
                                className="p-4 font-medium text-left cursor-pointer text-muted-foreground hover:text-foreground transition-smooth"
                                onClick={() => handleSort('conversion')}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Conversion</span>
                                    <DynamicIcon
                                        name={sortBy === 'conversion' ? (sortOrder === 'asc' ? 'chevron-up' : 'chevron-down') : 'chevrons-up-down'}
                                        size={14}
                                    />
                                </div>
                            </th>
                            <th className="p-4 font-medium text-left text-muted-foreground">Performance</th>
                            <th className="p-4 font-medium text-left text-muted-foreground">Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedProducts.map((product) => (
                            <tr key={product.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                                <td className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 overflow-hidden rounded-lg bg-muted">
                                            <AppImage
                                                src={product.image}
                                                alt={product.name}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-card-foreground">{product.name}</p>
                                            <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div>
                                        <p className="font-semibold text-card-foreground">{formatCurrency(product.revenue)}</p>
                                        <p className={`text-sm ${getPerformanceColor(product.revenueChange)}`}>
                                            {formatPercentage(product.revenueChange)}
                                        </p>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div>
                                        <p className="font-semibold text-card-foreground">{product.orders.toLocaleString()}</p>
                                        <p className={`text-sm ${getPerformanceColor(product.ordersChange)}`}>
                                            {formatPercentage(product.ordersChange)}
                                        </p>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div>
                                        <p className="font-semibold text-card-foreground">{product.conversion}%</p>
                                        <p className={`text-sm ${getPerformanceColor(product.conversionChange)}`}>
                                            {formatPercentage(product.conversionChange)}
                                        </p>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center space-x-1">
                                            <DynamicIcon
                                                name={product.trend === 'up' ? 'trending-up' : product.trend === 'down' ? 'trending-down' : 'minus'}
                                                size={16}
                                                className={
                                                    product.trend === 'up' ? 'text-success' :
                                                        product.trend === 'down' ? 'text-error' : 'text-muted-foreground'
                                                }
                                            />
                                            <span className="text-sm text-muted-foreground">{product.trend}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-2 h-2 rounded-full ${product.stock > 50 ? 'bg-success' :
                                            product.stock > 10 ? 'bg-warning' : 'bg-error'
                                            }`} />
                                        <span className="text-sm text-card-foreground">{product.stock} units</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedProducts.length)} of {sortedProducts.length} products
                </p>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                    >
                        <DynamicIcon name="chevron-left" size={20} />
                        Previous
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <DynamicIcon name="chevron-right" size={20} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductPerformanceTable;

