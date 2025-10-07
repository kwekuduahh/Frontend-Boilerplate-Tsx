import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProductCard from './components/ProductCard';
import ProductFilters from './components/ProductFilters';
import BulkOperations from './components/BulkOperations';
import ProductEditor from './components/ProductEditor';

const ProductCatalog: React.FC = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showProductEditor, setShowProductEditor] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filters, setFilters] = useState<any>({
        category: 'all',
        stockStatus: 'all',
        sortBy: 'name-asc',
        priceRange: [0, 1000],
        featured: false,
        onSale: false
    });

    // Mock product data
    const [products, setProducts] = useState<any[]>([
        {
            id: 1,
            name: "Wireless Bluetooth Headphones",
            description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
            price: 149.99,
            originalPrice: 199.99,
            sku: "WBH-001",
            category: "electronics",
            stock: 45,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
            images: [
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
                "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400"
            ],
            variants: [
                { id: 1, name: "Black", color: "#000000", sku: "WBH-001-BLK", price: 149.99, stock: 25 },
                { id: 2, name: "White", color: "#FFFFFF", sku: "WBH-001-WHT", price: 149.99, stock: 20 }
            ],
            isNew: true,
            isFeatured: true,
            onSale: true,
            seoTitle: "Premium Wireless Bluetooth Headphones - Noise Cancelling",
            seoDescription: "Experience superior sound quality with our premium wireless headphones featuring active noise cancellation and long battery life.",
            tags: ["wireless", "bluetooth", "headphones", "audio"]
        },
        // ... keep remaining mock products identical ...
    ]);

    // Mock notifications
    const [notifications] = useState<any[]>([
        {
            id: 1,
            title: "Low Stock Alert",
            message: "Smart Home Security Camera is running low on stock (8 remaining)",
            type: "warning",
            time: "5 minutes ago",
            read: false
        },
        {
            id: 2,
            title: "Product Updated",
            message: "Wireless Bluetooth Headphones price has been updated",
            type: "info",
            time: "1 hour ago",
            read: false
        }
    ]);

    // Filter and search products
    const filteredProducts = products.filter(product => {
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !product.sku.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        if (filters.category !== 'all' && product.category !== filters.category) return false;
        if (filters.stockStatus !== 'all') {
            if (filters.stockStatus === 'out-of-stock' && product.stock > 0) return false;
            if (filters.stockStatus === 'low-stock' && (product.stock === 0 || product.stock > 10)) return false;
            if (filters.stockStatus === 'in-stock' && product.stock <= 10) return false;
        }
        if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
        if (filters.featured && !product.isFeatured) return false;
        if (filters.onSale && !product.onSale) return false;
        return true;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (filters.sortBy) {
            case 'name-asc': return a.name.localeCompare(b.name);
            case 'name-desc': return b.name.localeCompare(a.name);
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'stock-asc': return a.stock - b.stock;
            case 'stock-desc': return b.stock - a.stock;
            case 'created-desc': return b.id - a.id;
            case 'created-asc': return a.id - b.id;
            default: return 0;
        }
    });

    const handleProductSelect = (productId: number, isSelected: boolean) => {
        if (isSelected) setSelectedProducts(prev => [...prev, productId]);
        else setSelectedProducts(prev => prev.filter(id => id !== productId));
    };

    const handleSelectAll = () => {
        if (selectedProducts.length === sortedProducts.length) setSelectedProducts([]);
        else setSelectedProducts(sortedProducts.map((p: any) => p.id));
    };

    const handleEditProduct = (product: any) => {
        setEditingProduct(product);
        setShowProductEditor(true);
    };

    const handleDuplicateProduct = (product: any) => {
        const duplicatedProduct = { ...product, id: Date.now(), name: `${product.name} (Copy)`, sku: `${product.sku}-COPY` };
        setProducts(prev => [...prev, duplicatedProduct]);
    };

    const handleArchiveProduct = (product: any) => {
        console.log('Archiving product:', product.name);
    };

    const handleQuickEdit = (product: any) => handleEditProduct(product);

    const handleSaveProduct = (updatedProduct: any) => {
        if (editingProduct) setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        else setProducts(prev => [...prev, { ...updatedProduct, id: Date.now() }]);
        setShowProductEditor(false);
        setEditingProduct(null);
    };

    const handleBulkAction = (actionData: any) => {
        console.log('Bulk action:', actionData);
    };

    const handleImportCSV = (file: File) => {
        console.log('Importing CSV:', file.name);
    };

    const handleExportCSV = (productIds: number[] | null = null) => {
        const productsToExport = productIds ? products.filter((p: any) => productIds.includes(p.id)) : products;
        console.log('Exporting products:', productsToExport.length);
    };

    const handleNotificationClick = (notification: any) => console.log('Notification clicked:', notification);
    const handleProfileClick = (action: string) => console.log('Profile action:', action);

    return (
        <div className="min-h-screen bg-background">
            <Header
                notifications={notifications}
                onNotificationClick={handleNotificationClick}
                onProfileClick={handleProfileClick}
            />

            <Sidebar
                isCollapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                notificationCounts={{ orders: 12, customers: 3, inventory: 5 }}
            />

            <main className={`transition-smooth ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'} pt-16`}>
                <div className="p-6">
                    {/* Page Header */}
                    <div className="flex flex-col mb-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h1 className="mb-2 text-2xl font-semibold text-foreground">Product Catalog</h1>
                            <p className="text-muted-foreground">Manage your product inventory and catalog settings</p>
                        </div>
                        <div className="flex items-center mt-4 space-x-3 lg:mt-0">
                            <div className="flex items-center p-1 space-x-1 rounded-lg bg-muted">
                                <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')}>
                                    <Icon name="Grid3X3" size={16} />
                                </Button>
                                <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('list')}>
                                    <Icon name="List" size={16} />
                                </Button>
                            </div>
                            <Button onClick={() => { setEditingProduct(null); setShowProductEditor(true); }} iconName="Plus" iconPosition="left">Add Product</Button>
                        </div>
                    </div>

                    {/* Filters */}
                    <ProductFilters filters={filters} onFiltersChange={setFilters} onSearch={setSearchQuery} searchQuery={searchQuery} totalProducts={products.length} filteredProducts={sortedProducts.length} />

                    {/* Bulk Operations */}
                    <BulkOperations selectedProducts={selectedProducts} onBulkAction={handleBulkAction} onClearSelection={() => setSelectedProducts([])} onImportCSV={handleImportCSV} onExportCSV={handleExportCSV} />

                    {/* Products Grid/List */}
                    <div className="border rounded-lg bg-card border-border">
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" checked={selectedProducts.length === sortedProducts.length && sortedProducts.length > 0} onChange={handleSelectAll} className="w-4 h-4 bg-white rounded text-primary border-border focus:ring-primary focus:ring-2" />
                                    <span className="text-sm text-foreground">Select All ({sortedProducts.length})</span>
                                </label>
                            </div>
                            <div className="text-sm text-muted-foreground">{selectedProducts.length > 0 && `${selectedProducts.length} selected`}</div>
                        </div>
                        {sortedProducts.length > 0 ? (
                            <div className={`p-6 ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}`}>
                                {sortedProducts.map((product: any) => (
                                    <ProductCard key={product.id} product={product} onEdit={handleEditProduct} onDuplicate={handleDuplicateProduct} onArchive={handleArchiveProduct} onQuickEdit={handleQuickEdit} isSelected={selectedProducts.includes(product.id)} onSelect={handleProductSelect} />
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center">
                                <Icon name="Package" size={64} className="mx-auto mb-4 opacity-50 text-muted-foreground" />
                                <h3 className="mb-2 text-lg font-medium text-foreground">No products found</h3>
                                <p className="mb-6 text-muted-foreground">{searchQuery || filters.category !== 'all' || filters.stockStatus !== 'all' ? 'Try adjusting your filters or search terms' : 'Get started by adding your first product to the catalog'}</p>
                                <Button onClick={() => { setEditingProduct(null); setShowProductEditor(true); }} iconName="Plus" iconPosition="left">Add Your First Product</Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <ProductEditor product={editingProduct} isOpen={showProductEditor} onClose={() => { setShowProductEditor(false); setEditingProduct(null); }} onSave={handleSaveProduct} />
        </div>
    );
};

export default ProductCatalog;


