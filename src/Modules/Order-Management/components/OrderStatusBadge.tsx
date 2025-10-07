import React from 'react';
import Icon from '../../../components/AppIcon';

interface OrderStatusBadgeProps {
    status: string;
    size?: 'sm' | 'default' | 'lg';
    showIcon?: boolean;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, size = 'default', showIcon = true }) => {
    const getStatusConfig = (status: string) => {
        const configs: Record<string, { label: string; icon: string; className: string; iconColor: string }> = {
            pending: { label: 'Pending', icon: 'Clock', className: 'bg-warning/10 text-warning border-warning/20', iconColor: 'text-warning' },
            processing: { label: 'Processing', icon: 'Package', className: 'bg-blue-50 text-blue-700 border-blue-200', iconColor: 'text-blue-700' },
            shipped: { label: 'Shipped', icon: 'Truck', className: 'bg-purple-50 text-purple-700 border-purple-200', iconColor: 'text-purple-700' },
            delivered: { label: 'Delivered', icon: 'CheckCircle', className: 'bg-success/10 text-success border-success/20', iconColor: 'text-success' },
            cancelled: { label: 'Cancelled', icon: 'XCircle', className: 'bg-error/10 text-error border-error/20', iconColor: 'text-error' },
            refunded: { label: 'Refunded', icon: 'RefreshCw', className: 'bg-gray-50 text-gray-700 border-gray-200', iconColor: 'text-gray-700' }
        };
        return configs?.[status] || configs?.pending;
    };

    const config = getStatusConfig(status);
    const sizeClasses: Record<'sm' | 'default' | 'lg', string> = { sm: 'px-2 py-1 text-xs', default: 'px-3 py-1 text-sm', lg: 'px-4 py-2 text-base' };
    const iconSizes: Record<'sm' | 'default' | 'lg', number> = { sm: 12, default: 14, lg: 16 };

    return (
        <span className={`inline-flex items-center space-x-1 rounded-full border font-medium transition-smooth ${config?.className} ${sizeClasses?.[size]}`}>
            {showIcon && (<Icon name={config?.icon} size={iconSizes?.[size]} className={config?.iconColor} />)}
            <span>{config?.label}</span>
        </span>
    );
};

export default OrderStatusBadge;


