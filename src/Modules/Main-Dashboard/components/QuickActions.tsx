import React, { useState } from 'react';
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic';
import { Button } from '@/_Shared/Components/Ui/button';

interface QuickActionsProps {
    notifications: {
        newOrders: number;
        pendingOrders: number;
        customerInquiries: number;
        lowStock: number;
        failedPayments: number;
        returns: number;
    };
    onActionClick: (actionId: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick = () => { } }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const quickActions: {
        id: string;
        title: string;
        description: string;
        icon: keyof typeof dynamicIconImports;
        color: string;
        badge: number;
        urgent: boolean;
    }[] = [
            {
                id: 'new-order',
                title: 'Process New Order',
                description: 'Create and process customer orders',
                icon: 'plus',
                color: 'bg-primary',
                badge: 0,
                urgent: false
            },
            {
                id: 'pending-orders',
                title: 'Pending Orders',
                description: 'Review orders awaiting processing',
                icon: 'clock',
                color: 'bg-warning',
                badge: 12,
                urgent: true
            },
            {
                id: 'customer-support',
                title: 'Customer Inquiries',
                description: 'Respond to customer messages',
                icon: 'message-square',
                color: 'bg-blue-500',
                badge: 5,
                urgent: false
            },
            {
                id: 'low-stock',
                title: 'Low Stock Items',
                description: 'Review inventory alerts',
                icon: 'alert-triangle',
                color: 'bg-error',
                badge: 8,
                urgent: true
            },
            {
                id: 'failed-payments',
                title: 'Failed Payments',
                description: 'Handle payment issues',
                icon: 'credit-card',
                color: 'bg-orange-500',
                badge: 3,
                urgent: true
            },
            {
                id: 'returns',
                title: 'Process Returns',
                description: 'Handle return requests',
                icon: 'rotate-ccw',
                color: 'bg-purple-500',
                badge: 2,
                urgent: false
            }
        ];

    const urgentActions = quickActions?.filter(action => action?.urgent);
    // const regularActions = quickActions?.filter(action => !action?.urgent);
    const displayActions = isExpanded ? quickActions : quickActions?.slice(0, 4);

    const handleActionClick = (actionId: string) => {
        onActionClick(actionId);

        // Mock navigation based on action
        const navigationMap = {
            'new-order': '/order-management',
            'pending-orders': '/order-management',
            'customer-support': '/customer-directory',
            'low-stock': '/inventory-management',
            'failed-payments': '/order-management',
            'returns': '/order-management'
        };

        if (navigationMap?.[actionId as keyof typeof navigationMap]) {
            // In a real app, this would use navigate from react-router-dom
            console.log(`Navigate to: ${navigationMap?.[actionId as keyof typeof navigationMap]}`);
        }
    };

    const getTotalUrgentNotifications = () => {
        return urgentActions?.reduce((total, action) => total + action?.badge, 0);
    };

    return (
        <div className="p-6 border rounded-lg bg-card border-border shadow-card">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
                    <p className="text-sm text-muted-foreground">Manage urgent tasks and operations</p>
                </div>

                {getTotalUrgentNotifications() > 0 && (
                    <div className="flex items-center px-3 py-1 space-x-2 rounded-full bg-error/10 text-error">
                        <DynamicIcon name="alert-circle" size={16} />
                        <span className="text-sm font-medium">
                            {getTotalUrgentNotifications()} urgent
                        </span>
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                {displayActions?.map((action) => (
                    <div
                        key={action?.id}
                        onClick={() => handleActionClick(action?.id)}
                        className={`relative p-4 rounded-lg border cursor-pointer transition-smooth group hover:shadow-elevation ${action?.urgent
                            ? 'border-error/20 bg-error/5 hover:border-error/40' : 'border-border hover:border-primary/40'
                            }`}
                    >
                        {action?.urgent && (
                            <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-error animate-pulse"></div>
                        )}

                        <div className="flex items-center mb-3 space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action?.color} group-hover:scale-105 transition-smooth`}>
                                <DynamicIcon name={action?.icon} size={20} color="white" />
                            </div>

                            {action?.badge > 0 && (
                                <div className={`px-2 py-1 rounded-full text-xs font-medium ${action?.urgent
                                    ? 'bg-error text-error-foreground'
                                    : 'bg-primary text-primary-foreground'
                                    } animate-pulse-slow`}>
                                    {action?.badge > 99 ? '99+' : action?.badge}
                                </div>
                            )}
                        </div>

                        <div>
                            <h4 className="mb-1 font-medium text-foreground group-hover:text-primary transition-smooth">
                                {action?.title}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                                {action?.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {quickActions?.length > 4 && (
                <div className="pt-4 mt-4 border-t border-border">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full"
                    >
                        {isExpanded ? 'Show Less' : `Show ${quickActions?.length - 4} More Actions`}
                        <DynamicIcon name={isExpanded ? "chevron-up" : "chevron-down"} size={16} className='ml-2' />
                    </Button>
                </div>
            )}
        </div>
    );
};

export default QuickActions;


