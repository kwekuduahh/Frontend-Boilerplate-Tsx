import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const StockOverviewTable = ({ products, onStockAdjustment, onReorderClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockStatusFilter, setStockStatusFilter] = useState('all');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports & Outdoors' }
  ];

  const stockStatusOptions = [
    { value: 'all', label: 'All Stock Status' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'low-stock', label: 'Low Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' },
    { value: 'reorder-needed', label: 'Reorder Needed' }
  ];

  const supplierOptions = [
    { value: 'all', label: 'All Suppliers' },
    { value: 'tech-supply-co', label: 'Tech Supply Co.' },
    { value: 'fashion-wholesale', label: 'Fashion Wholesale' },
    { value: 'global-imports', label: 'Global Imports' },
    { value: 'local-distributors', label: 'Local Distributors' }
  ];

  const getStockStatus = (product) => {
    if (product?.currentStock === 0) return 'out-of-stock';
    if (product?.currentStock <= product?.reorderPoint) return 'reorder-needed';
    if (product?.currentStock <= product?.lowStockThreshold) return 'low-stock';
    return 'in-stock';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock': return 'text-success bg-success/10';
      case 'low-stock': return 'text-warning bg-warning/10';
      case 'out-of-stock': return 'text-error bg-error/10';
      case 'reorder-needed': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products?.filter(product => {
      const matchesSearch = product?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           product?.sku?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product?.category === categoryFilter;
      const matchesSupplier = supplierFilter === 'all' || product?.supplier === supplierFilter;
      const productStatus = getStockStatus(product);
      const matchesStatus = stockStatusFilter === 'all' || productStatus === stockStatusFilter;

      return matchesSearch && matchesCategory && matchesSupplier && matchesStatus;
    });

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];

        if (typeof aValue === 'string') {
          aValue = aValue?.toLowerCase();
          bValue = bValue?.toLowerCase();
        }

        if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [products, searchTerm, categoryFilter, stockStatusFilter, supplierFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      {/* Filters */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search products by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
            <Select
              options={categoryOptions}
              value={categoryFilter}
              onChange={setCategoryFilter}
              placeholder="Category"
              className="w-full sm:w-48"
            />
            <Select
              options={stockStatusOptions}
              value={stockStatusFilter}
              onChange={setStockStatusFilter}
              placeholder="Stock Status"
              className="w-full sm:w-48"
            />
            <Select
              options={supplierOptions}
              value={supplierFilter}
              onChange={setSupplierFilter}
              placeholder="Supplier"
              className="w-full sm:w-48"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAndSortedProducts?.length} of {products?.length} products
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <span className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-muted-foreground">In Stock</span>
            </span>
            <span className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-muted-foreground">Low Stock</span>
            </span>
            <span className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <span className="text-muted-foreground">Out of Stock</span>
            </span>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 hover:text-primary transition-hover"
                >
                  <span>Product</span>
                  <Icon name={getSortIcon('name')} size={16} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('sku')}
                  className="flex items-center space-x-2 hover:text-primary transition-hover"
                >
                  <span>SKU</span>
                  <Icon name={getSortIcon('sku')} size={16} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('currentStock')}
                  className="flex items-center space-x-2 hover:text-primary transition-hover"
                >
                  <span>Current Stock</span>
                  <Icon name={getSortIcon('currentStock')} size={16} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Reserved</th>
              <th className="text-left p-4 font-medium text-foreground">Available</th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-medium text-foreground">Supplier</th>
              <th className="text-right p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedProducts?.map((product) => {
              const status = getStockStatus(product);
              const available = product?.currentStock - product?.reservedStock;
              
              return (
                <tr key={product?.id} className="border-b border-border hover:bg-muted/30 transition-hover">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                        {product?.image ? (
                          <img 
                            src={product?.image} 
                            alt={product?.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = '/assets/images/no_image.png';
                            }}
                          />
                        ) : (
                          <Icon name="Package" size={20} className="text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{product?.name}</p>
                        <p className="text-sm text-muted-foreground">{product?.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-sm text-foreground">{product?.sku}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-foreground">{product?.currentStock?.toLocaleString()}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-muted-foreground">{product?.reservedStock?.toLocaleString()}</span>
                  </td>
                  <td className="p-4">
                    <span className={`font-medium ${available <= 0 ? 'text-error' : 'text-foreground'}`}>
                      {available?.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                      {status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{product?.supplierName}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onStockAdjustment(product)}
                        iconName="Edit"
                        iconSize={16}
                      >
                        Adjust
                      </Button>
                      {status === 'reorder-needed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onReorderClick(product)}
                          iconName="ShoppingCart"
                          iconSize={16}
                        >
                          Reorder
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
        {filteredAndSortedProducts?.length === 0 && (
          <div className="p-12 text-center">
            <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockOverviewTable;