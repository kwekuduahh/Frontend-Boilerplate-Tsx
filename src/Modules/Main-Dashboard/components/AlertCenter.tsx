import { useState } from 'react';
import { Button } from '@/_Shared/Components/Ui/button';
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic';

interface AlertProps {
    alerts: {
        id: number;
        type: string;
        category: string;
        title: string;
        message: string;
        timestamp: number;
        actionRequired: boolean;
        actions: string[];
        affectedItems: number;
        customer?: string;
        securityLevel?: string;
    }[];
    onAlertAction: (alertId: number, action: string) => void;
    onDismiss: (alertId: number) => void;
}


const AlertCenter: React.FC<AlertProps> = ({ alerts, onAlertAction = () => { }, onDismiss = () => { } }) => {
    const [filter, setFilter] = useState('all');
    const [isMinimized, setIsMinimized] = useState(false);

    const mockAlerts = alerts?.length > 0 ? alerts : [
        {
            id: 1,
            type: 'critical',
            category: 'inventory',
            title: 'Critical Stock Alert',
            message: 'Premium T-Shirt (Black, L) is out of stock. 15 pending orders affected.',
            timestamp: Date.now() - 300000,
            actionRequired: true,
            actions: ['Restock', 'Notify Customers'],
            affectedItems: 15
        },
        {
            id: 2,
            type: 'warning',
            category: 'payment',
            title: 'Payment Gateway Issue',
            message: 'Stripe webhook failed for 3 transactions. Manual verification needed.',
            timestamp: Date.now() - 600000,
            actionRequired: true,
            actions: ['Verify Payments', 'Contact Support'],
            affectedItems: 3
        },
        {
            id: 3,
            type: 'info',
            category: 'system',
            title: 'System Maintenance Scheduled',
            message: 'Scheduled maintenance window: Tonight 2:00 AM - 4:00 AM EST.',
            timestamp: Date.now() - 1800000,
            actionRequired: false,
            actions: ['View Details']
        },
        {
            id: 4,
            type: 'warning',
            category: 'customer',
            title: 'High Priority Customer Complaint',
            message: 'VIP customer Sarah Johnson reported damaged product. Immediate response required.',
            timestamp: Date.now() - 2400000,
            actionRequired: true,
            actions: ['Contact Customer', 'Process Refund'],
            customer: 'Sarah Johnson'
        },
        {
            id: 5,
            type: 'critical',
            category: 'security',
            title: 'Multiple Failed Login Attempts',
            message: 'Detected 10+ failed login attempts from IP 192.168.1.100 in the last hour.',
            timestamp: Date.now() - 3600000,
            actionRequired: true,
            actions: ['Block IP', 'Review Logs'],
            securityLevel: 'high'
        }
    ];

    const getAlertIcon = (type: string) => {
        const iconMap: { [key: string]: keyof typeof dynamicIconImports } = {
            critical: 'alert-circle',
            warning: 'alert-triangle',
            info: 'info',
            security: 'shield',
            payment: 'credit-card',
            inventory: 'package',
            customer: 'message-square'
        };
        return iconMap?.[type] || 'info-circle';
    };

    const getAlertColor = (type: string) => {
        const colorMap: Record<string, string> = {
            critical: 'border-error bg-error/5 text-error',
            warning: 'border-warning bg-warning/5 text-warning',
            info: 'border-blue-500 bg-blue-50 text-blue-600'
        };
        return colorMap?.[type] || 'border-muted bg-muted/5 text-muted-foreground';
    };

    const getAlertBadgeColor = (type: string) => {
        const colorMap: Record<string, string> = {
            critical: 'bg-error text-error-foreground',
            warning: 'bg-warning text-warning-foreground',
            info: 'bg-blue-500 text-white'
        };
        return colorMap?.[type] || 'bg-muted text-muted-foreground';
    };

    const formatTimeAgo = (timestamp: number) => {
        const now = new Date();
        const diff = now.getTime() - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        return `${hours}h ago`;
    };

    const filteredAlerts = filter === 'all'
        ? mockAlerts
        : mockAlerts?.filter(alert => alert?.type === filter);

    const criticalCount = mockAlerts?.filter(alert => alert?.type === 'critical')?.length;
    const warningCount = mockAlerts?.filter(alert => alert?.type === 'warning')?.length;

    const filterOptions = [
        { value: 'all', label: 'All', count: mockAlerts?.length },
        { value: 'critical', label: 'Critical', count: criticalCount },
        { value: 'warning', label: 'Warning', count: warningCount },
        { value: 'info', label: 'Info', count: mockAlerts?.filter(alert => alert?.type === 'info')?.length }
    ];

    const handleAlertAction = (alertId: number, action: string) => {
        onAlertAction(alertId, action);
        console.log(`Alert ${alertId}: ${action} action triggered`);
    };

    return (
        <div className="border rounded-lg bg-card border-border shadow-card">
            <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-foreground">Alert Center</h3>
                        {(criticalCount > 0 || warningCount > 0) && (
                            <div className="flex items-center space-x-2">
                                {criticalCount > 0 && (
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-error text-error-foreground animate-pulse-slow">
                                        {criticalCount} Critical
                                    </span>
                                )}
                                {warningCount > 0 && (
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-warning text-warning-foreground">
                                        {warningCount} Warning
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMinimized(!isMinimized)}
                    >
                        <DynamicIcon name={isMinimized ? "chevron-down" : "chevron-up"} size={16} />
                    </Button>
                </div>

                {!isMinimized && (
                    <div className="flex p-1 mt-4 space-x-1 rounded-lg bg-muted">
                        {filterOptions?.map((option: { value: string; label: string; count: number }) => (
                            <Button
                                key={option?.value}
                                variant="ghost"
                                size="sm"
                                onClick={() => setFilter(option?.value)}
                            >
                                {option?.label}
                                {option?.count > 0 && (
                                    <span className="px-1.5 py-0.5 rounded-full text-xs">{option?.count}</span>
                                )}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
            {!isMinimized && (
                <div className="overflow-y-auto max-h-96">
                    {filteredAlerts?.length > 0 ? (
                        <div className="space-y-1">
                            {filteredAlerts?.map((alert) => (
                                <div
                                    key={alert?.id}
                                    className={`p-4 border-l-4 hover:bg-muted/30 transition-smooth ${getAlertColor(alert?.type)}`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start flex-1 space-x-3">
                                            <DynamicIcon name={getAlertIcon(alert?.type)} size={20} className='mt-0.5 flex-shrink-0' />

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center mb-1 space-x-2">
                                                    <h4 className="font-medium text-foreground">{alert?.title}</h4>
                                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getAlertBadgeColor(alert?.type)}`}>
                                                        {alert?.type?.toUpperCase()}
                                                    </span>
                                                </div>

                                                <p className="mb-2 text-sm text-muted-foreground">
                                                    {alert?.message}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-muted-foreground">
                                                        {formatTimeAgo(alert?.timestamp)}
                                                    </span>

                                                    {alert?.affectedItems && (
                                                        <span className="text-xs text-muted-foreground">
                                                            {alert?.affectedItems} items affected
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onDismiss(alert?.id)}
                                            className="flex-shrink-0 ml-2"
                                        >
                                            <DynamicIcon name="x" size={16} />
                                        </Button>
                                    </div>

                                    {alert?.actionRequired && alert?.actions && (
                                        <div className="flex flex-wrap gap-2 mt-3 ml-8">
                                            {alert?.actions?.map((action, index) => (
                                                <Button
                                                    key={index}
                                                    variant={index === 0 ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => handleAlertAction(alert?.id, action)}
                                                >
                                                    {action}
                                                </Button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-32 text-center">
                            <DynamicIcon name="check-circle" size={32} className="mb-2 text-success" />
                            <p className="text-sm text-muted-foreground">No alerts at this time</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AlertCenter;


