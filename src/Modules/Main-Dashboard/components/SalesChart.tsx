import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DynamicIcon } from 'lucide-react/dynamic';
import { Button } from '@/_Shared/Components/Ui/button';

interface SalesDataPoint {
    name: string;
    revenue: number;
    orders?: number;
    customers?: number;
}

const SalesChart = ({ data = [], title = "Sales Overview", type = "line" }) => {
    const [chartType, setChartType] = useState(type);
    const [timeRange, setTimeRange] = useState('7d');

    const timeRanges = [
        { value: '7d', label: '7 Days' },
        { value: '30d', label: '30 Days' },
        { value: '90d', label: '90 Days' },
        { value: '1y', label: '1 Year' }
    ];

    const mockData = data?.length > 0 ? data : [
        { name: 'Jan', revenue: 45000, orders: 120, customers: 89 },
        { name: 'Feb', revenue: 52000, orders: 145, customers: 102 },
        { name: 'Mar', revenue: 48000, orders: 132, customers: 95 },
        { name: 'Apr', revenue: 61000, orders: 168, customers: 118 },
        { name: 'May', revenue: 55000, orders: 152, customers: 108 },
        { name: 'Jun', revenue: 67000, orders: 185, customers: 134 },
        { name: 'Jul', revenue: 72000, orders: 198, customers: 145 }
    ];

    const CustomTooltip = ({ active, payload, label }: { active: boolean, payload: SalesDataPoint[], label: string }) => {
        if (active && payload && payload?.length) {
            return (
                <div className="p-3 border rounded-lg bg-popover border-border shadow-dropdown">
                    <p className="mb-2 font-medium text-popover-foreground">{label}</p>
                    {payload?.map((entry: SalesDataPoint, index: number) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: "var(--color-primary)" }}
                            />
                            <span className="capitalize text-muted-foreground">{entry?.name}:</span>
                            <span className="font-medium text-popover-foreground">
                                {entry?.revenue ? `$${entry?.revenue?.toLocaleString()}` : entry?.revenue}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="p-6 border rounded-lg bg-card border-border shadow-card">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground">Track your business performance</p>
                </div>

                <div className="flex items-center space-x-2">
                    {/* Time Range Selector */}
                    <div className="flex p-1 rounded-lg bg-muted">
                        {timeRanges?.map((range) => (
                            <button
                                key={range?.value}
                                onClick={() => setTimeRange(range?.value)}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-smooth ${timeRange === range?.value
                                    ? 'bg-primary text-primary-foreground shadow-card'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {range?.label}
                            </button>
                        ))}
                    </div>

                    {/* Chart Type Toggle */}
                    <div className="flex p-1 rounded-lg bg-muted">
                        <button
                            onClick={() => setChartType('line')}
                            className={`p-2 rounded-md transition-smooth ${chartType === 'line' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <DynamicIcon name="trending-up" size={16} />
                        </button>
                        <button
                            onClick={() => setChartType('bar')}
                            className={`p-2 rounded-md transition-smooth ${chartType === 'bar' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <DynamicIcon name="bar-chart-3" size={16} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full h-80" aria-label={`${title} Chart`}>
                <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'line' ? (
                        <LineChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                            <XAxis
                                dataKey="name"
                                stroke="var(--color-muted-foreground)"
                                fontSize={12}
                            />
                            <YAxis
                                stroke="var(--color-muted-foreground)"
                                fontSize={12}
                            />
                            <Tooltip content={<CustomTooltip active={true} payload={mockData} label='Mock Data' />} />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="var(--color-primary)"
                                strokeWidth={3}
                                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="orders"
                                stroke="var(--color-accent)"
                                strokeWidth={2}
                                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 3 }}
                            />
                        </LineChart>
                    ) : (
                        <BarChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                            <XAxis
                                dataKey="name"
                                stroke="var(--color-muted-foreground)"
                                fontSize={12}
                            />
                            <YAxis
                                stroke="var(--color-muted-foreground)"
                                fontSize={12}
                            />
                            <Tooltip content={<CustomTooltip active={true} payload={mockData} label='Mock Data' />} />
                            <Bar dataKey="revenue" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="orders" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-muted-foreground">Revenue</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-accent"></div>
                        <span className="text-muted-foreground">Orders</span>
                    </div>
                </div>

                <Button variant="ghost" size="sm">
                    <DynamicIcon name="download" size={16} className='mr-2' />
                    Export Data
                </Button>
            </div>
        </div>
    );
};

export default SalesChart;


