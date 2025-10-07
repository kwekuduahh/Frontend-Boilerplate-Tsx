import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

interface ProductFiltersProps {
    filters: any;
    onFiltersChange: (f: any) => void;
    onSearch: (q: string) => void;
    searchQuery: string;
    totalProducts: number;
    filteredProducts: number;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
    filters, onFiltersChange, onSearch, searchQuery, totalProducts, filteredProducts
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const categoryOptions = [
        { value: 'all', label: 'All Categories' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing', label: 'Clothing' },
        { value: 'home-garden', label: 'Home & Garden' },
        { value: 'sports', label: 'Sports & Outdoors' },
        { value: 'books', label: 'Books' },
        { value: 'toys', label: 'Toys & Games' }
    ];

    const stockStatusOptions = [
        { value: 'all', label: 'All Stock Status' },
        { value: 'in-stock', label: 'In Stock' },
        { value: 'low-stock', label: 'Low Stock' },
        { value: 'out-of-stock', label: 'Out of Stock' }
    ];

    const sortOptions = [
        { value: 'name-asc', label: 'Name (A-Z)' },
        { value: 'name-desc', label: 'Name (Z-A)' },
        { value: 'price-asc', label: 'Price (Low to High)' },
        { value: 'price-desc', label: 'Price (High to Low)' },
        { value: 'stock-asc', label: 'Stock (Low to High)' },
        { value: 'stock-desc', label: 'Stock (High to Low)' },
        { value: 'created-desc', label: 'Newest First' },
        { value: 'created-asc', label: 'Oldest First' }
    ];

    const handleFilterChange = (key: string, value: any) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    const clearFilters = () => {
        onFiltersChange({ category: 'all', stockStatus: 'all', sortBy: 'name-asc', priceRange: [0, 1000], featured: false, onSale: false });
        onSearch('');
    };

    const hasActiveFilters = () => filters?.category !== 'all' || filters?.stockStatus !== 'all' || filters?.featured || filters?.onSale || searchQuery?.length > 0;

    return (
        <div className="p-4 mb-6 border rounded-lg bg-card border-border">
            <div className="flex flex-col mb-4 space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Icon name="Search" size={16} className="absolute transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                        <Input type="search" placeholder="Search products by name, SKU, or description..." value={searchQuery} onChange={(e) => onSearch((e?.target as HTMLInputElement).value)} className="pl-10" />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant={isExpanded ? "default" : "outline"} size="sm" onClick={() => setIsExpanded(!isExpanded)} iconName="Filter" iconPosition="left">Filters</Button>
                    {hasActiveFilters() && (
                        <Button variant="ghost" size="sm" onClick={clearFilters} iconName="X" iconPosition="left">Clear</Button>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                <span>Showing {filteredProducts} of {totalProducts} products{hasActiveFilters() && ' (filtered)'}</span>
                <div className="flex items-center space-x-4">
                    <Select options={sortOptions} value={filters?.sortBy} onChange={(value: string) => handleFilterChange('sortBy', value)} placeholder="Sort by..." className="w-48" />
                </div>
            </div>
            {isExpanded && (
                <div className="pt-4 border-t border-border animate-fade-in">
                    <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4">
                        <Select label="Category" options={categoryOptions} value={filters?.category} onChange={(value: string) => handleFilterChange('category', value)} />
                        <Select label="Stock Status" options={stockStatusOptions} value={filters?.stockStatus} onChange={(value: string) => handleFilterChange('stockStatus', value)} />
                        <div>
                            <label className="block mb-2 text-sm font-medium text-foreground">Price Range</label>
                            <div className="flex items-center space-x-2">
                                <Input type="number" placeholder="Min" value={filters?.priceRange?.[0]} onChange={(e) => handleFilterChange('priceRange', [parseInt((e?.target as HTMLInputElement).value) || 0, filters?.priceRange?.[1]])} className="w-20" />
                                <span className="text-muted-foreground">-</span>
                                <Input type="number" placeholder="Max" value={filters?.priceRange?.[1]} onChange={(e) => handleFilterChange('priceRange', [filters?.priceRange?.[0], parseInt((e?.target as HTMLInputElement).value) || 1000])} className="w-20" />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-foreground">Product Status</label>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked={filters?.featured} onChange={(e) => handleFilterChange('featured', (e?.target as HTMLInputElement).checked)} className="w-4 h-4 bg-white rounded text-primary border-border focus:ring-primary focus:ring-2" />
                                    <span className="text-sm text-foreground">Featured</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked={filters?.onSale} onChange={(e) => handleFilterChange('onSale', (e?.target as HTMLInputElement).checked)} className="w-4 h-4 bg-white rounded text-primary border-border focus:ring-primary focus:ring-2" />
                                    <span className="text-sm text-foreground">On Sale</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {hasActiveFilters() && (
                            <>
                                {filters?.category !== 'all' && (
                                    <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                                        Category: {categoryOptions?.find(c => c?.value === filters?.category)?.label}
                                        <button onClick={() => handleFilterChange('category', 'all')} className="ml-1 hover:text-primary/80"><Icon name="X" size={12} /></button>
                                    </span>
                                )}
                                {filters?.stockStatus !== 'all' && (
                                    <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                                        Stock: {stockStatusOptions?.find(s => s?.value === filters?.stockStatus)?.label}
                                        <button onClick={() => handleFilterChange('stockStatus', 'all')} className="ml-1 hover:text-primary/80"><Icon name="X" size={12} /></button>
                                    </span>
                                )}
                                {filters?.featured && (
                                    <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                                        Featured
                                        <button onClick={() => handleFilterChange('featured', false)} className="ml-1 hover:text-primary/80"><Icon name="X" size={12} /></button>
                                    </span>
                                )}
                                {filters?.onSale && (
                                    <span className="inline-flex items-center px-2 py-1 text-xs rounded bg-primary/10 text-primary">
                                        On Sale
                                        <button onClick={() => handleFilterChange('onSale', false)} className="ml-1 hover:text-primary/80"><Icon name="X" size={12} /></button>
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductFilters;


