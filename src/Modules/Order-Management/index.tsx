import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import OrderFilters from './components/OrderFilters';
import OrderTable from './components/OrderTable';
import BulkActions from './components/BulkActions';
import OrderDetailsModal from './components/OrderDetailsModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const OrderManagement = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
        timeRange: 'all',
        paymentStatus: 'all',
        customerType: 'all'
    });
    const [sortConfig, setSortConfig] = useState({
        key: 'date',
        direction: 'desc'
    });

    // Mock orders data
    const mockOrders = [
        {
            id: 'ORD-001',
            orderNumber: '2024-001234',
            customer: {
                name: 'Sarah Johnson',
                email: 'sarah.johnson@email.com',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
                type: 'vip',
                joinDate: 'March 2023'
            },
            date: '2025-01-13T10:30:00Z',
            status: 'processing',
            paymentStatus: 'paid',
            total: 299.99,
            items: 3,
            shippingMethod: 'Express Shipping',
            estimatedDelivery: 'Jan 15, 2025',
            trackingNumber: 'TRK123456789',
            orderItems: [
                {
                    name: 'Premium Wireless Headphones',
                    variant: 'Black, Large',
                    quantity: 1,
                    price: 199.99,
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150'
                },
                {
                    name: 'Phone Case',
                    variant: 'Clear',
                    quantity: 2,
                    price: 50.00,
                    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=150'
                }
            ],
            billingAddress: {
                name: 'Sarah Johnson',
                street: '123 Main Street',
                city: 'New York',
                state: 'NY',
                zip: '10001',
                country: 'United States'
            },
            shippingAddress: {
                name: 'Sarah Johnson',
                street: '123 Main Street',
                city: 'New York',
                state: 'NY',
                zip: '10001',
                country: 'United States'
            },
            notes: [
                {
                    author: 'Admin User',
                    date: '2025-01-13T11:00:00Z',
                    content: 'Customer requested expedited processing due to urgent need.'
                }
            ],
            refunds: []
        },
        // ... (remaining mock orders truncated for brevity, identical structure to JSX)
    ];

    const [orders, setOrders] = useState(mockOrders);
    const [filteredOrders, setFilteredOrders] = useState(mockOrders);

    // Mock notifications
    const mockNotifications = [
        {
            id: 1,
            title: 'New Order Received',
            message: 'Order #2024-001239 needs processing',
            type: 'info',
            read: false,
            time: '2 minutes ago'
        },
        {
            id: 2,
            title: 'Payment Failed',
            message: 'Order #2024-001240 payment requires attention',
            type: 'error',
            read: false,
            time: '15 minutes ago'
        }
    ];

    // Filter orders based on current filters
    useEffect(() => {
        let filtered = [...orders];

        // Search filter
        if (filters?.search) {
            const searchTerm = filters?.search?.toLowerCase();
            filtered = filtered?.filter(order =>
                order?.orderNumber?.toLowerCase()?.includes(searchTerm) ||
                order?.customer?.name?.toLowerCase()?.includes(searchTerm) ||
                order?.customer?.email?.toLowerCase()?.includes(searchTerm)
            );
        }

        // Status filter
        if (filters?.status && filters?.status !== 'all') {
            filtered = filtered?.filter(order => order?.status === filters?.status);
        }

        // Payment status filter
        if (filters?.paymentStatus && filters?.paymentStatus !== 'all') {
            filtered = filtered?.filter(order => order?.paymentStatus === filters?.paymentStatus);
        }

        // Customer type filter
        if (filters?.customerType && filters?.customerType !== 'all') {
            filtered = filtered?.filter(order => order?.customer?.type === filters?.customerType);
        }

        // Time range filter
        if (filters?.timeRange && filters?.timeRange !== 'all') {
            const now = new Date();
            const orderDate = (order) => new Date(order.date);

            switch (filters?.timeRange) {
                case 'today':
                    filtered = filtered?.filter(order => {
                        const date = orderDate(order);
                        return date?.toDateString() === now?.toDateString();
                    });
                    break;
                case 'yesterday':
                    const yesterday = new Date(now);
                    yesterday?.setDate(yesterday?.getDate() - 1);
                    filtered = filtered?.filter(order => {
                        const date = orderDate(order);
                        return date?.toDateString() === yesterday?.toDateString();
                    });
                    break;
                case 'last7days':
                    const week = new Date(now);
                    week?.setDate(week?.getDate() - 7);
                    filtered = filtered?.filter(order => orderDate(order) >= week);
                    break;
                case 'last30days':
                    const month = new Date(now);
                    month?.setDate(month?.getDate() - 30);
                    filtered = filtered?.filter(order => orderDate(order) >= month);
                    break;
                case 'last90days':
                    const quarter = new Date(now);
                    quarter?.setDate(quarter?.getDate() - 90);
                    filtered = filtered?.filter(order => orderDate(order) >= quarter);
                    break;
            }
        }

        // Amount range filter
        if (filters?.minAmount) {
            filtered = filtered?.filter(order => order?.total >= parseFloat(filters?.minAmount));
        }
        if (filters?.maxAmount) {
            filtered = filtered?.filter(order => order?.total <= parseFloat(filters?.maxAmount));
        }

        setFilteredOrders(filtered);
    }, [filters, orders]);

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({
            search: '',
            status: 'all',
            timeRange: 'all',
            paymentStatus: 'all',
            customerType: 'all',
            minAmount: '',
            maxAmount: '',
            startDate: '',
            endDate: ''
        });
    };

    const handleSort = (key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig?.key === key && prevConfig?.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleStatusUpdate = (orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders?.map(order =>
                order?.id === orderId ? { ...order, status: newStatus } : order
            )
        );

        if (selectedOrder && selectedOrder?.id === orderId) {
            setSelectedOrder(prev => ({ ...prev, status: newStatus }));
        }
    };

    const handleBulkAction = async (action, orderIds, options = {}) => {
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        switch (action) {
            case 'update-status':
                if (options?.status) {
                    setOrders(prevOrders =>
                        prevOrders?.map(order =>
                            orderIds?.includes(order?.id)
                                ? { ...order, status: options?.status }
                                : order
                        )
                    );
                }
                break;
            case 'print-labels': console.log('Printing labels for orders:', orderIds);
                break;
            case 'export-orders':
                console.log('Exporting orders:', orderIds);
                break;
            case 'send-notification':
                console.log('Sending notifications for orders:', orderIds);
                break;
            default:
                console.log(`Bulk action ${action} for orders:`, orderIds);
        }

        setSelectedOrders([]);
        setLoading(false);
    };

    const handleRefund = (orderId, refundData) => {
        setOrders(prevOrders =>
            prevOrders?.map(order => {
                if (order?.id === orderId) {
                    const updatedOrder = {
                        ...order,
                        refunds: [...(order?.refunds || []), {
                            ...refundData,
                            date: new Date()?.toISOString()
                        }]
                    };

                    if (refundData?.type === 'full') {
                        updatedOrder.status = 'refunded';
                        updatedOrder.paymentStatus = 'refunded';
                    }

                    return updatedOrder;
                }
                return order;
            })
        );

        if (selectedOrder && selectedOrder?.id === orderId) {
            setSelectedOrder(prev => ({
                ...prev,
                refunds: [...(prev?.refunds || []), {
                    ...refundData,
                    date: new Date()?.toISOString()
                }],
                ...(refundData?.type === 'full' && {
                    status: 'refunded',
                    paymentStatus: 'refunded'
                })
            }));
        }
    };

    const handleAddNote = (orderId, noteContent) => {
        const newNote = {
            author: 'Admin User',
            date: new Date()?.toISOString(),
            content: noteContent
        };

        setOrders(prevOrders =>
            prevOrders?.map(order =>
                order?.id === orderId
                    ? { ...order, notes: [...(order?.notes || []), newNote] }
                    : order
            )
        );

        if (selectedOrder && selectedOrder?.id === orderId) {
            setSelectedOrder(prev => ({
                ...prev,
                notes: [...(prev?.notes || []), newNote]
            }));
        }
    };

    const notificationCounts = {
        orders: 5,
        customers: 2,
        inventory: 8
    };

    return (
        <div className="min-h-screen bg-background">
            <Header
                notifications={mockNotifications}
                onNotificationClick={(notification) => console.log('Notification clicked:', notification)}
                onProfileClick={(action) => console.log('Profile action:', action)}
            />
            <Sidebar
                isCollapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                notificationCounts={notificationCounts}
            />
            <main className={`transition-smooth ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'
                } pt-16`}>
                <div className="p-6 space-y-6">
                    {/* Page Header */}
                    <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Order Management</h1>
                            <p className="text-muted-foreground">
                                Manage and track all customer orders from one central location
                            </p>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Button
                                variant="outline"
                                iconName="Download"
                                iconPosition="left"
                            >
                                Export Orders
                            </Button>
                            <Button
                                iconName="Plus"
                                iconPosition="left"
                            >
                                Create Order
                            </Button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                label: 'Total Orders',
                                value: orders?.length?.toLocaleString(),
                                change: '+12%',
                                icon: 'ShoppingCart',
                                color: 'text-blue-600'
                            },
                            {
                                label: 'Pending Orders',
                                value: orders?.filter(o => o?.status === 'pending')?.length?.toLocaleString(),
                                change: '+5%',
                                icon: 'Clock',
                                color: 'text-warning'
                            },
                            {
                                label: 'Processing',
                                value: orders?.filter(o => o?.status === 'processing')?.length?.toLocaleString(),
                                change: '+8%',
                                icon: 'Package',
                                color: 'text-blue-600'
                            },
                            {
                                label: 'Completed',
                                value: orders?.filter(o => o?.status === 'delivered')?.length?.toLocaleString(),
                                change: '+15%',
                                icon: 'CheckCircle',
                                color: 'text-success'
                            }
                        ]?.map((stat, index) => (
                            <div key={index} className="p-6 border rounded-lg bg-surface border-border shadow-card">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">{stat?.label}</p>
                                        <p className="mt-1 text-2xl font-bold text-foreground">{stat?.value}</p>
                                        <p className="mt-1 text-sm text-success">{stat?.change} from last month</p>
                                    </div>
                                    <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${stat?.color}`}>
                                        <Icon name={stat?.icon} size={24} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Filters */}
                    <OrderFilters
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                        onClearFilters={handleClearFilters}
                        totalOrders={orders?.length}
                        filteredOrders={filteredOrders?.length}
                    />

                    {/* Bulk Actions */}
                    {selectedOrders?.length > 0 && (
                        <BulkActions
                            selectedOrders={selectedOrders}
                            onBulkAction={handleBulkAction}
                            onClearSelection={() => setSelectedOrders([])}
                            loading={loading}
                        />
                    )}

                    {/* Orders Table */}
                    <OrderTable
                        orders={filteredOrders}
                        selectedOrders={selectedOrders}
                        onOrderSelect={setSelectedOrders}
                        onOrderClick={handleOrderClick}
                        onStatusUpdate={handleStatusUpdate}
                        sortConfig={sortConfig}
                        onSort={handleSort}
                        loading={loading}
                    />

                    {/* Pagination */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing {filteredOrders?.length} of {orders?.length} orders
                        </p>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" disabled>
                                Previous
                            </Button>
                            <Button variant="outline" size="sm">
                                1
                            </Button>
                            <Button variant="outline" size="sm" disabled>
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            {/* Order Details Modal */}
            <OrderDetailsModal
                order={selectedOrder}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedOrder(null);
                }}
                onStatusUpdate={handleStatusUpdate}
                onRefund={handleRefund}
                onAddNote={handleAddNote}
            />
        </div>
    );
};

export default OrderManagement;


