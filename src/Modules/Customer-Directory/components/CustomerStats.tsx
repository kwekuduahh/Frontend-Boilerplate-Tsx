import React from 'react';
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic';

interface CustomerStatsProps {
    stats?: Record<string, string | number>;
}

const CustomerStats: React.FC<CustomerStatsProps> = ({ stats = {} }) => {
    const defaultStats = {
        totalCustomers: 0,
        activeCustomers: 0,
        newThisMonth: 0,
        vipCustomers: 0,
        avgLifetimeValue: '$0',
        retentionRate: '0%',
        ...stats
    } as Record<string, string | number>;

    const statCards = [
        {
            title: 'Total Customers',
            value: defaultStats?.totalCustomers?.toLocaleString(),
            icon: 'users',
            color: 'text-primary',
            bgColor: 'bg-primary/10',
            change: defaultStats?.totalCustomersChange || '+12%',
            changeType: 'positive'
        },
        {
            title: 'Active Customers',
            value: defaultStats?.activeCustomers?.toLocaleString(),
            icon: 'user-check',
            color: 'text-success',
            bgColor: 'bg-success/10',
            change: defaultStats?.activeCustomersChange || '+8%',
            changeType: 'positive'
        },
        {
            title: 'New This Month',
            value: defaultStats?.newThisMonth?.toLocaleString(),
            icon: 'user-plus',
            color: 'text-accent',
            bgColor: 'bg-accent/10',
            change: defaultStats?.newThisMonthChange || '+24%',
            changeType: 'positive'
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-3">
            {statCards?.map((stat, index) => (
                <div key={index} className="p-4 border rounded-lg bg-card border-border shadow-card">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="mb-1 text-sm text-muted-foreground">{stat?.title}</p>
                            <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
                            <div className="flex items-center mt-2 space-x-1">
                                <DynamicIcon
                                    name={stat?.changeType === 'positive' ? 'trending-up' : 'trending-down'}
                                    size={12}
                                    className={stat?.changeType === 'positive' ? 'text-success' : 'text-error'}
                                />
                                <span className={`text-xs font-medium ${stat?.changeType === 'positive' ? 'text-success' : 'text-error'
                                    }`}>
                                    {stat?.change}
                                </span>
                                <span className="text-xs text-muted-foreground">vs last month</span>
                            </div>
                        </div>
                        <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
                            <DynamicIcon name={stat?.icon as keyof typeof dynamicIconImports} size={20} className={stat?.color} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CustomerStats;


