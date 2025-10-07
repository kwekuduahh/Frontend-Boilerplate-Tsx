import { useState } from 'react';
import { Button } from '@/_Shared/Components/Ui/button';
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic';

const ActivityFeed = ({ activities = [], title = "Recent Activity" }) => {
    const [filter, setFilter] = useState('all');
    const [isLive, setIsLive] = useState(true);

    const mockActivities = activities?.length > 0 ? activities : [
        {
            id: 1,
            type: 'order',
            title: 'New Order Received',
            description: 'Order #ORD-2024-001 from Sarah Johnson',
            timestamp: Date.now() - 300000,
            status: 'new',
            amount: '$156.99',
            customer: 'Sarah Johnson'
        },
        {
            id: 2,
            type: 'payment',
            title: 'Payment Processed',
            description: 'Payment of $89.50 for Order #ORD-2024-002',
            timestamp: Date.now() - 600000,
            status: 'success',
            amount: '$89.50'
        },
        {
            id: 3,
            type: 'inventory',
            title: 'Low Stock Alert',
            description: 'Product "Premium T-Shirt" has only 5 units left',
            timestamp: Date.now() - 900000,
            status: 'warning',
            product: 'Premium T-Shirt'
        },
        {
            id: 4,
            type: 'customer',
            title: 'New Customer Registration',
            description: 'Michael Rodriguez joined as a new customer',
            timestamp: Date.now() - 1200000,
            status: 'info',
            customer: 'Michael Rodriguez'
        },
        {
            id: 5,
            type: 'order',
            title: 'Order Shipped',
            description: 'Order #ORD-2024-003 has been shipped to Emma Davis',
            timestamp: Date.now() - 1800000,
            status: 'shipped',
            customer: 'Emma Davis'
        },
        {
            id: 6,
            type: 'refund',
            title: 'Refund Processed',
            description: 'Refund of $45.00 processed for Order #ORD-2024-004',
            timestamp: Date.now() - 2400000,
            status: 'refund',
            amount: '$45.00'
        }
    ];

    const getActivityIcon = (type: string, status: string) => {
        const iconMap: { [key: string]: keyof typeof dynamicIconImports } = {
            order: status === 'shipped' ? 'truck' : 'shopping-cart',
            payment: 'credit-card',
            inventory: 'package',
            customer: 'user-plus',
            refund: 'rotate-ccw'
        };
        return iconMap?.[type] || 'bell';
    };

    const getStatusColor = (status: string) => {
        const colorMap: Record<string, string> = {
            new: 'bg-primary',
            success: 'bg-success',
            warning: 'bg-warning',
            info: 'bg-blue-500',
            shipped: 'bg-blue-600',
            refund: 'bg-orange-500'
        };
        return colorMap[status] || 'bg-muted-foreground';
    };

    const formatTimeAgo = (timestamp: number) => {
        const minutes = Math.floor(timestamp / 60000);
        const hours = Math.floor(timestamp / 3600000);
        const days = Math.floor(timestamp / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    const filteredActivities = filter === 'all'
        ? mockActivities
        : mockActivities?.filter(activity => activity?.type === filter);

    const filterOptions: { value: string; label: string; icon: keyof typeof dynamicIconImports }[] = [
        { value: 'all', label: 'All', icon: 'list' },
        { value: 'order', label: 'Orders', icon: 'shopping-cart' },
        { value: 'payment', label: 'Payments', icon: 'credit-card' },
        { value: 'inventory', label: 'Inventory', icon: 'package' },
        { value: 'customer', label: 'Customers', icon: 'users' }
    ];

    return (
        <div className="flex flex-col h-full border rounded-lg bg-card border-border shadow-card">
            <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                        <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`}></div>
                            <span className="text-xs text-muted-foreground">{isLive ? 'Live' : 'Paused'}</span>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsLive(!isLive)}
                        title={isLive ? 'Pause live updates' : 'Resume live updates'}
                    >
                        <DynamicIcon name={isLive ? 'pause' : 'play'} size={16} />
                    </Button>
                </div>

                {/* Filter Tabs */}
                <div className="flex p-1 space-x-1 rounded-lg bg-muted">
                    {filterOptions?.map((option: { value: string; label: string; icon: keyof typeof dynamicIconImports }) => (
                        <button
                            key={option?.value}
                            onClick={() => setFilter(option?.value)}
                            className={`flex items-center space-x-2 px-3 py-2 text-xs font-medium rounded-md transition-smooth ${filter === option?.value
                                ? 'bg-primary text-primary-foreground shadow-card'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <DynamicIcon name={option?.icon} size={14} />
                            <span className="hidden sm:inline">{option?.label}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                {filteredActivities?.length > 0 ? (
                    <div className="space-y-1">
                        {filteredActivities?.map((activity) => (
                            <div
                                key={activity?.id}
                                className="p-4 border-l-4 border-transparent cursor-pointer hover:bg-muted/50 transition-smooth hover:border-primary"
                            >
                                <div className="flex items-start space-x-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(activity?.status)}`}>
                                        <DynamicIcon
                                            name={getActivityIcon(activity?.type, activity?.status)}
                                            size={16}
                                            color="white"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-sm font-medium truncate text-foreground">
                                                {activity?.title}
                                            </h4>
                                            <span className="ml-2 text-xs text-muted-foreground whitespace-nowrap">
                                                {formatTimeAgo(activity?.timestamp)}
                                            </span>
                                        </div>

                                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                            {activity?.description}
                                        </p>

                                        {activity?.amount && (
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-sm font-medium text-success">
                                                    {activity?.amount}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <DynamicIcon name="activity" size={48} className="mb-4 text-muted-foreground" />
                        <h4 className="mb-2 text-lg font-medium text-foreground">No Recent Activity</h4>
                        <p className="text-sm text-muted-foreground">
                            Activity will appear here when events occur
                        </p>
                    </div>
                )}
            </div>
            <div className="p-4 border-t border-border">
                <Button variant="outline" size="sm" className="w-full">
                    View All Activity
                    <DynamicIcon name="external-link" size={16} className="ml-2" />
                </Button>
            </div>
        </div>
    );
};

export default ActivityFeed;


