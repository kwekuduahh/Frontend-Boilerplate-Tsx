import React from 'react';
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic';


interface MetricsCardProps {
    title: string;
    value: string;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    icon: keyof typeof dynamicIconImports;
    description?: string;
    trend?: number[];
}

const MetricsCard: React.FC<MetricsCardProps> = ({
    title,
    value,
    change,
    changeType,
    icon,
    description,
    trend = []
}) => {
    const getChangeColor = () => {
        if (changeType === 'positive') return 'text-success';
        if (changeType === 'negative') return 'text-error';
        return 'text-muted-foreground';
    };

    const getChangeIcon = (): keyof typeof dynamicIconImports => {
        if (changeType === 'positive') return 'trending-up';
        if (changeType === 'negative') return 'trending-down';
        return 'minus';
    };

    return (
        <div className="p-6 border rounded-lg bg-card border-border shadow-card hover:shadow-elevation transition-smooth">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                        <DynamicIcon name={icon} size={20} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                        <p className="mt-1 text-2xl font-bold text-card-foreground">{value}</p>
                    </div>
                </div>

                {change && (
                    <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
                        <DynamicIcon name={getChangeIcon()} size={16} />
                        <span className="text-sm font-medium">{change}</span>
                    </div>
                )}
            </div>
            {description && (
                <p className="mb-3 text-sm text-muted-foreground">{description}</p>
            )}
            {/* Mini trend chart */}
            {trend.length > 0 && (
                <div className="flex items-end h-8 space-x-1">
                    {trend.map((point, index) => (
                        <div
                            key={index}
                            className="flex-1 rounded-sm bg-primary/20"
                            style={{ height: `${(point / Math.max(...trend)) * 100}%` }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MetricsCard;

