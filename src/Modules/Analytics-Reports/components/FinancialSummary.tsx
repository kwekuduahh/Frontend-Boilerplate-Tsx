import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Button } from '@/_Shared/Components/Ui/button';
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic';

interface RevenueData {
    name: string;
    value: number;
    color: string;
    [key: string]: string | number;
}

interface PaymentMethod {
    name: string;
    value: number;
    percentage: number;
    color: string;
}

interface MonthlyFinancial {
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
}

interface Tab {
    id: string;
    label: string;
    icon: keyof typeof dynamicIconImports;
}

const FinancialSummary: React.FC = () => {
    const [activeTab, setActiveTab] = useState('revenue');

    const revenueBreakdown: RevenueData[] = [
        { name: 'Product Sales', value: 156780, color: 'var(--color-primary)' },
        { name: 'Shipping Fees', value: 12450, color: 'var(--color-secondary)' },
        { name: 'Tax Collected', value: 18920, color: 'var(--color-accent)' },
        { name: 'Other Income', value: 3850, color: 'var(--color-success)' }
    ];

    const paymentMethods: PaymentMethod[] = [
        { name: 'Credit Cards', value: 89650, percentage: 65.2, color: 'var(--color-primary)' },
        { name: 'PayPal', value: 32100, percentage: 23.4, color: 'var(--color-secondary)' },
        { name: 'Bank Transfer', value: 12890, percentage: 9.4, color: 'var(--color-accent)' },
        { name: 'Digital Wallets', value: 2760, percentage: 2.0, color: 'var(--color-success)' }
    ];

    const monthlyFinancials: MonthlyFinancial[] = [
        { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
        { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
        { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000 },
        { month: 'Apr', revenue: 61000, expenses: 38000, profit: 23000 },
        { month: 'May', revenue: 58000, expenses: 36000, profit: 22000 },
        { month: 'Jun', revenue: 67000, expenses: 41000, profit: 26000 }
    ];

    const tabs: Tab[] = [
        { id: 'revenue', label: 'Revenue Breakdown', icon: 'dollar-sign' },
        { id: 'payments', label: 'Payment Methods', icon: 'credit-card' },
        { id: 'profit', label: 'Profit Analysis', icon: 'trending-up' }
    ];

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'revenue':
                return (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div>
                            <h4 className="mb-4 text-lg font-semibold text-card-foreground">Revenue Sources</h4>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={revenueBreakdown}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {revenueBreakdown.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value: number) => formatCurrency(value)}
                                            contentStyle={{
                                                backgroundColor: 'var(--color-popover)',
                                                border: '1px solid var(--color-border)',
                                                borderRadius: '8px'
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div>
                            <h4 className="mb-4 text-lg font-semibold text-card-foreground">Breakdown Details</h4>
                            <div className="space-y-4">
                                {revenueBreakdown.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: item.color }}
                                            />
                                            <span className="font-medium text-card-foreground">{item.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-card-foreground">{formatCurrency(item.value)}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {((item.value / revenueBreakdown.reduce((sum, i) => sum + i.value, 0)) * 100).toFixed(1)}%
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'payments':
                return (
                    <div>
                        <h4 className="mb-6 text-lg font-semibold text-card-foreground">Payment Method Distribution</h4>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {paymentMethods.map((method, index) => (
                                <div key={index} className="p-4 rounded-lg bg-muted/30">
                                    <div className="flex items-center justify-between mb-3">
                                        <h5 className="font-medium text-card-foreground">{method.name}</h5>
                                        <DynamicIcon name="credit-card" size={20} className="text-muted-foreground" />
                                    </div>
                                    <p className="mb-1 text-2xl font-bold text-card-foreground">
                                        {formatCurrency(method.value)}
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1 h-2 rounded-full bg-muted">
                                            <div
                                                className="h-2 rounded-full transition-smooth"
                                                style={{
                                                    width: `${method.percentage}%`,
                                                    backgroundColor: method.color
                                                }}
                                            />
                                        </div>
                                        <span className="text-sm text-muted-foreground">{method.percentage}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'profit':
                return (
                    <div>
                        <h4 className="mb-6 text-lg font-semibold text-card-foreground">Monthly Profit Analysis</h4>
                        <div className="mb-6 h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyFinancials} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                                    <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                                    <YAxis stroke="var(--color-muted-foreground)" />
                                    <Tooltip
                                        formatter={(value: number) => formatCurrency(value)}
                                        contentStyle={{
                                            backgroundColor: 'var(--color-popover)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="revenue" fill="var(--color-primary)" name="Revenue" />
                                    <Bar dataKey="expenses" fill="var(--color-error)" name="Expenses" />
                                    <Bar dataKey="profit" fill="var(--color-success)" name="Profit" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="p-4 border rounded-lg bg-success/10 border-success/20">
                                <div className="flex items-center mb-2 space-x-2">
                                    <DynamicIcon name="trending-up" size={20} className="text-success" />
                                    <h5 className="font-medium text-success">Total Profit</h5>
                                </div>
                                <p className="text-2xl font-bold text-success">
                                    {formatCurrency(monthlyFinancials.reduce((sum, month) => sum + month.profit, 0))}
                                </p>
                                <p className="text-sm text-success/80">+15.2% from last period</p>
                            </div>

                            <div className="p-4 border rounded-lg bg-primary/10 border-primary/20">
                                <div className="flex items-center mb-2 space-x-2">
                                    <DynamicIcon name="dollar-sign" size={20} className="text-primary" />
                                    <h5 className="font-medium text-primary">Avg. Margin</h5>
                                </div>
                                <p className="text-2xl font-bold text-primary">32.4%</p>
                                <p className="text-sm text-primary/80">+2.1% from last period</p>
                            </div>

                            <div className="p-4 border rounded-lg bg-warning/10 border-warning/20">
                                <div className="flex items-center mb-2 space-x-2">
                                    <DynamicIcon name="alert-triangle" size={20} className="text-warning" />
                                    <h5 className="font-medium text-warning">Cost Ratio</h5>
                                </div>
                                <p className="text-2xl font-bold text-warning">67.6%</p>
                                <p className="text-sm text-warning/80">-1.8% from last period</p>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="border rounded-lg bg-card border-border shadow-card">
            <div className="p-6 border-b border-border">
                <div className="flex flex-col mb-4 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="mb-4 text-lg font-semibold text-card-foreground sm:mb-0">
                        Financial Summary
                    </h3>
                    <Button variant="outline">
                        <DynamicIcon name="download" size={20} />
                        Export Report
                    </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {tabs.map((tab) => (
                        <Button
                            key={tab.id}
                            variant={activeTab === tab.id ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <DynamicIcon name={tab.icon} size={20} />
                            {tab.label}
                        </Button>
                    ))}
                </div>
            </div>
            <div className="p-6">
                {renderContent()}
            </div>
        </div>
    );
};

export default FinancialSummary;

