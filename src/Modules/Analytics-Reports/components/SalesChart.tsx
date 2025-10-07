import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/_Shared/Components/Ui/button';
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic';

interface SalesDataPoint {
    name: string;
    revenue: number;
    orders?: number;
    customers?: number;
}

interface SalesChartProps {
    data: SalesDataPoint[];
    title: string;
    type?: 'line' | 'area' | 'bar';
    height?: number;
}

interface ChartType {
    value: 'line' | 'area' | 'bar';
    label: string;
    icon: keyof typeof dynamicIconImports;
}

interface TimeRange {
    value: string;
    label: string;
}

const SalesChart: React.FC<SalesChartProps> = ({ data, title, type = 'line', height = 300 }) => {
    const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>(type);
    const [timeRange, setTimeRange] = useState('7d');

    const chartTypes: ChartType[] = [
        { value: 'line', label: 'Line', icon: 'trending-up' },
        { value: 'area', label: 'Area', icon: 'area-chart' },
        { value: 'bar', label: 'Bar', icon: 'bar-chart-3' }
    ];

    const timeRanges: TimeRange[] = [
        { value: '7d', label: '7 Days' },
        { value: '30d', label: '30 Days' },
        { value: '90d', label: '90 Days' },
        { value: '1y', label: '1 Year' }
    ];

    const renderChart = () => {
        const commonProps = {
            data,
            margin: { top: 5, right: 30, left: 20, bottom: 5 }
        };

        switch (chartType) {
            case 'area':
                return (
                    <AreaChart {...commonProps}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                        <YAxis stroke="var(--color-muted-foreground)" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--color-popover)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px'
                            }}
                        />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="var(--color-primary)"
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                            name="Revenue ($)"
                        />
                    </AreaChart>
                );
            case 'bar':
                return (
                    <BarChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                        <YAxis stroke="var(--color-muted-foreground)" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--color-popover)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px'
                            }}
                        />
                        <Legend />
                        <Bar dataKey="revenue" fill="var(--color-primary)" name="Revenue ($)" />
                    </BarChart>
                );
            default:
                return (
                    <LineChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                        <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                        <YAxis stroke="var(--color-muted-foreground)" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--color-popover)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px'
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="var(--color-primary)"
                            strokeWidth={3}
                            dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                            name="Revenue ($)"
                        />
                    </LineChart>
                );
        }
    };

    return (
        <div className="p-6 border rounded-lg bg-card border-border shadow-card">
            <div className="flex flex-col mb-6 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="mb-4 text-lg font-semibold text-card-foreground sm:mb-0">{title}</h3>

                <div className="flex flex-col gap-3 sm:flex-row">
                    {/* Time Range Selector */}
                    <div className="flex p-1 rounded-lg bg-muted">
                        {timeRanges.map((range) => (
                            <button
                                key={range.value}
                                onClick={() => setTimeRange(range.value)}
                                className={`px-3 py-1 text-sm rounded-md transition-smooth ${timeRange === range.value
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>

                    {/* Chart Type Selector */}
                    <div className="flex p-1 rounded-lg bg-muted">
                        {chartTypes.map((type) => (
                            <Button
                                key={type.value}
                                variant={chartType === type.value ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setChartType(type.value)}
                                className="px-3"
                            >
                                <DynamicIcon name={type.icon} size={16} />
                                {type.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full" style={{ height: `${height}px` }}>
                <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesChart;

