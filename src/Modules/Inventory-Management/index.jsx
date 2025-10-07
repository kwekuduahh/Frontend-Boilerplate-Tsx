import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import InventoryStats from './components/InventoryStats';
import LowStockAlerts from './components/LowStockAlerts';
import StockOverviewTable from './components/StockOverviewTable';
import StockMovementTracker from './components/StockMovementTracker';
import SupplierManagement from './components/SupplierManagement';
import StockAdjustmentModal from './components/StockAdjustmentModal';

const InventoryManagement = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Mock data for inventory stats
  const inventoryStats = {
    totalProducts: 1247,
    totalProductsChange: 5.2,
    totalStockValue: 892450,
    stockValueChange: 12.8,
    lowStockItems: 23,
    lowStockChange: -15.3,
    outOfStockItems: 8,
    outOfStockChange: -25.0
  };

  // Mock data for products
  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      sku: "WBH-001",
      category: "electronics",
      currentStock: 45,
      reservedStock: 12,
      reorderPoint: 20,
      lowStockThreshold: 15,
      supplier: "tech-supply-co",
      supplierName: "Tech Supply Co.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
      id: 2,
      name: "Cotton T-Shirt - Navy Blue",
      sku: "CTS-NB-002",
      category: "clothing",
      currentStock: 8,
      reservedStock: 3,
      reorderPoint: 25,
      lowStockThreshold: 20,
      supplier: "fashion-wholesale",
      supplierName: "Fashion Wholesale",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
    },
    {
      id: 3,
      name: "Leather Wallet - Brown",
      sku: "LW-BR-003",
      category: "accessories",
      currentStock: 0,
      reservedStock: 0,
      reorderPoint: 15,
      lowStockThreshold: 10,
      supplier: "global-imports",
      supplierName: "Global Imports",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400"
    },
    {
      id: 4,
      name: "Smart Fitness Watch",
      sku: "SFW-004",
      category: "electronics",
      currentStock: 67,
      reservedStock: 8,
      reorderPoint: 30,
      lowStockThreshold: 25,
      supplier: "tech-supply-co",
      supplierName: "Tech Supply Co.",
      image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400"
    },
    {
      id: 5,
      name: "Garden Planter Set",
      sku: "GPS-005",
      category: "home",
      currentStock: 12,
      reservedStock: 2,
      reorderPoint: 20,
      lowStockThreshold: 15,
      supplier: "local-distributors",
      supplierName: "Local Distributors",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400"
    }
  ];

  // Mock data for low stock alerts
  const lowStockAlerts = [
    {
      id: 1,
      productName: "Cotton T-Shirt - Navy Blue",
      sku: "CTS-NB-002",
      currentStock: 8,
      reorderPoint: 25,
      recommendedQuantity: 100,
      priority: "critical",
      leadTime: 7,
      supplierName: "Fashion Wholesale",
      supplierContact: "+1 (555) 123-4567",
      notes: "Popular item with high demand during summer season"
    },
    {
      id: 2,
      productName: "Garden Planter Set",
      sku: "GPS-005",
      currentStock: 12,
      reorderPoint: 20,
      recommendedQuantity: 50,
      priority: "high",
      leadTime: 14,
      supplierName: "Local Distributors",
      supplierContact: "+1 (555) 987-6543",
      notes: "Spring season approaching, expect increased demand"
    }
  ];

  // Mock data for stock movements
  const stockMovements = [
    {
      id: 1,
      productName: "Wireless Bluetooth Headphones",
      sku: "WBH-001",
      type: "sale",
      quantityChange: -3,
      stockBefore: 48,
      stockAfter: 45,
      timestamp: "2025-01-13 14:30:22",
      reference: "ORD-2025-001234",
      user: "System",
      reason: "Customer purchase"
    },
    {
      id: 2,
      productName: "Smart Fitness Watch",
      sku: "SFW-004",
      type: "restock",
      quantityChange: 25,
      stockBefore: 42,
      stockAfter: 67,
      timestamp: "2025-01-13 10:15:45",
      reference: "PO-2025-000567",
      user: "John Smith",
      reason: "Supplier delivery"
    },
    {
      id: 3,
      productName: "Cotton T-Shirt - Navy Blue",
      sku: "CTS-NB-002",
      type: "return",
      quantityChange: 2,
      stockBefore: 6,
      stockAfter: 8,
      timestamp: "2025-01-13 09:45:12",
      reference: "RET-2025-000123",
      user: "Sarah Johnson",
      reason: "Customer return - size exchange"
    },
    {
      id: 4,
      productName: "Leather Wallet - Brown",
      sku: "LW-BR-003",
      type: "adjustment",
      quantityChange: -5,
      stockBefore: 5,
      stockAfter: 0,
      timestamp: "2025-01-12 16:20:33",
      reference: "ADJ-2025-000089",
      user: "Mike Wilson",
      reason: "Damaged inventory write-off"
    }
  ];

  // Mock data for suppliers
  const suppliers = [
    {
      id: 1,
      name: "Tech Supply Co.",
      email: "orders@techsupply.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      status: "active",
      rating: 4.8,
      leadTime: 5,
      productCount: 156,
      lastOrderDate: "2025-01-10",
      totalOrders: 89,
      totalValue: 245680,
      notes: "Reliable supplier for electronics with fast shipping"
    },
    {
      id: 2,
      name: "Fashion Wholesale",
      email: "sales@fashionwholesale.com",
      phone: "+1 (555) 987-6543",
      location: "Los Angeles, CA",
      status: "active",
      rating: 4.2,
      leadTime: 7,
      productCount: 234,
      lastOrderDate: "2025-01-08",
      totalOrders: 67,
      totalValue: 189450,
      notes: "Great selection of clothing items with competitive pricing"
    },
    {
      id: 3,
      name: "Global Imports",
      email: "info@globalimports.com",
      phone: "+1 (555) 456-7890",
      location: "New York, NY",
      status: "pending",
      rating: 3.9,
      leadTime: 14,
      productCount: 89,
      lastOrderDate: "2025-01-05",
      totalOrders: 34,
      totalValue: 98750,
      notes: "International supplier with unique product selection"
    }
  ];

  // Mock notifications for header
  const notifications = [
    {
      id: 1,
      title: "Low Stock Alert",
      message: "Cotton T-Shirt - Navy Blue is running low (8 units remaining)",
      type: "warning",
      read: false,
      time: "5 minutes ago"
    },
    {
      id: 2,
      title: "Restock Complete",
      message: "Smart Fitness Watch inventory has been restocked (+25 units)",
      type: "success",
      read: false,
      time: "2 hours ago"
    }
  ];

  const notificationCounts = {
    orders: 12,
    customers: 3,
    inventory: 8
  };

  const handleStockAdjustment = (product) => {
    setSelectedProduct(product);
    setIsAdjustmentModalOpen(true);
  };

  const handleSaveAdjustment = async (adjustmentData) => {
    // In a real app, this would make an API call
    console.log('Saving stock adjustment:', adjustmentData);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleReorderClick = (product) => {
    console.log('Creating purchase order for:', product);
    // In a real app, this would navigate to PO creation or open a modal
  };

  const handleDismissAlert = (alertId) => {
    console.log('Dismissing alert:', alertId);
    // In a real app, this would update the alerts state
  };

  const handleCreatePO = (supplier) => {
    console.log('Creating purchase order for supplier:', supplier);
    // In a real app, this would navigate to PO creation
  };

  const handleContactSupplier = (supplier) => {
    console.log('Contacting supplier:', supplier);
    // In a real app, this would open email client or messaging system
  };

  const handleEditSupplier = (supplier) => {
    console.log('Editing supplier:', supplier);
    // In a real app, this would open supplier edit modal
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };

  const handleProfileClick = (action) => {
    console.log('Profile action:', action);
    if (action === 'logout') {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
      />
      
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        notificationCounts={notificationCounts}
      />

      <main className={`pt-16 transition-smooth ${
        isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-60'
      }`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Inventory Management</h1>
              <p className="text-muted-foreground">
                Monitor stock levels, track movements, and manage supplier relationships
              </p>
            </div>
          </div>

          {/* Inventory Stats */}
          <InventoryStats stats={inventoryStats} />

          {/* Low Stock Alerts */}
          <LowStockAlerts
            alerts={lowStockAlerts}
            onReorderClick={handleReorderClick}
            onDismissAlert={handleDismissAlert}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Stock Overview Table - Takes 2 columns */}
            <div className="xl:col-span-3">
              <StockOverviewTable
                products={products}
                onStockAdjustment={handleStockAdjustment}
                onReorderClick={handleReorderClick}
              />
            </div>

            {/* Stock Movement Tracker - Takes 1 column */}
            <div className="xl:col-span-3">
              <StockMovementTracker movements={stockMovements} />
            </div>
          </div>

          {/* Supplier Management */}
          <SupplierManagement
            suppliers={suppliers}
            onCreatePO={handleCreatePO}
            onContactSupplier={handleContactSupplier}
            onEditSupplier={handleEditSupplier}
          />
        </div>
      </main>

      {/* Stock Adjustment Modal */}
      <StockAdjustmentModal
        isOpen={isAdjustmentModalOpen}
        onClose={() => setIsAdjustmentModalOpen(false)}
        product={selectedProduct}
        onSave={handleSaveAdjustment}
      />
    </div>
  );
};

export default InventoryManagement;