import React from 'react';
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic';

interface KPICardProps {
    title: string;
    value: string;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    icon: keyof typeof dynamicIconImports;
    description?: string;
    loading?: boolean;
    onClick?: () => void;
}

const KPICard: React.FC<KPICardProps> = ({
    title,
    value,
    change,
    changeType = 'positive',
    icon,
    description,
    loading = false,
    onClick = () => { }
}) => {
    const getChangeColor = (): string => {
        if (changeType === 'positive') return 'text-success';
        if (changeType === 'negative') return 'text-error';
        return 'text-muted-foreground';
    };

    const getChangeIcon = (): keyof typeof dynamicIconImports => {
        if (changeType === 'positive') return 'trending-up';
        if (changeType === 'negative') return 'trending-down';
        return 'minus';
    };

    if (loading) {
        return (
            <div className="p-6 border rounded-lg bg-card border-border shadow-card animate-pulse">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-lg bg-muted"></div>
                    <div className="w-16 h-4 rounded bg-muted"></div>
                </div>
                <div className="w-24 h-8 mb-2 rounded bg-muted"></div>
                <div className="w-32 h-4 rounded bg-muted"></div>
            </div>
        );
    }

    return (
        <div
            className="p-6 border rounded-lg cursor-pointer bg-card border-border shadow-card hover:shadow-elevation transition-smooth group"
            onClick={onClick}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent group-hover:scale-105 transition-smooth">
                    <DynamicIcon name={icon} size={24} color="white" strokeWidth={2} />
                </div>
                <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
                    <DynamicIcon name={getChangeIcon()} size={16} />
                    <span className="text-sm font-medium">{change}</span>
                </div>
            </div>

            <div className="space-y-1">
                <h3 className="text-2xl font-bold text-foreground">{value}</h3>
                <p className="text-sm text-muted-foreground">{title}</p>
                {description && (
                    <p className="mt-2 text-xs text-muted-foreground">{description}</p>
                )}
            </div>
        </div>
    );
};

export default KPICard;


