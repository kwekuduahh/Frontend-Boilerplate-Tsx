import React, { useState } from 'react';
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic';
import { Button } from '@/_Shared/Components/Ui/button';
import { Input } from '@/_Shared/Components/Ui/input';
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/_Shared/Components/Ui/select';

interface Filters {
    dateRange: string;
    category: string;
    region: string;
    customerSegment: string;
    startDate: string;
    endDate: string;
}

interface ReportFiltersProps {
    onFiltersChange: (filters: Filters) => void;
    onExport: (format: string) => void;
}

interface SelectOption {
    value: string;
    label: string;
}

interface ExportOption extends SelectOption {
    icon: keyof typeof dynamicIconImports;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({ onFiltersChange, onExport }) => {
    const [filters, setFilters] = useState<Filters>({
        dateRange: '30d',
        category: 'all',
        region: 'all',
        customerSegment: 'all',
        startDate: '',
        endDate: ''
    });
    const [paymentMethod, setPaymentMethod] = useState<string>('all');
    const [orderStatus, setOrderStatus] = useState<string>('all');
    const [trafficSource, setTrafficSource] = useState<string>('all');

    const [showAdvanced, setShowAdvanced] = useState(false);

    const paymentMethodOptions: SelectOption[] = [
        { value: 'all', label: 'All Payment Methods' },
        { value: 'credit-card', label: 'Credit Card' },
        { value: 'paypal', label: 'PayPal' },
        { value: 'bank-transfer', label: 'Bank Transfer' },
    ];

    const orderStatusOptions: SelectOption[] = [
        { value: 'all', label: 'All Order Statuses' },
        { value: 'completed', label: 'Completed' },
        { value: 'pending', label: 'Pending' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    const trafficSourceOptions: SelectOption[] = [
        { value: 'all', label: 'All Traffic Sources' },
        { value: 'organic', label: 'Organic Search' },
        { value: 'paid', label: 'Paid Ads' },
        { value: 'social', label: 'Social Media' },
        { value: 'direct', label: 'Direct' }
    ];

    const dateRangeOptions: SelectOption[] = [
        { value: '7d', label: 'Last 7 days' },
        { value: '30d', label: 'Last 30 days' },
        { value: '90d', label: 'Last 90 days' },
        { value: '1y', label: 'Last year' },
        { value: 'custom', label: 'Custom range' }
    ];

    const categoryOptions: SelectOption[] = [
        { value: 'all', label: 'All Categories' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing', label: 'Clothing & Fashion' },
        { value: 'home', label: 'Home & Garden' },
        { value: 'sports', label: 'Sports & Outdoors' },
        { value: 'books', label: 'Books & Media' }
    ];

    const regionOptions: SelectOption[] = [
        { value: 'all', label: 'All Regions' },
        { value: 'north-america', label: 'North America' },
        { value: 'europe', label: 'Europe' },
        { value: 'asia-pacific', label: 'Asia Pacific' },
        { value: 'latin-america', label: 'Latin America' }
    ];

    const customerSegmentOptions: SelectOption[] = [
        { value: 'all', label: 'All Customers' },
        { value: 'new', label: 'New Customers' },
        { value: 'returning', label: 'Returning Customers' },
        { value: 'vip', label: 'VIP Customers' },
        { value: 'at-risk', label: 'At-Risk Customers' }
    ];

    const exportOptions: ExportOption[] = [
        { value: 'csv', label: 'CSV', icon: 'file-text' },
        { value: 'pdf', label: 'PDF', icon: 'file-text' },
        { value: 'excel', label: 'Excel', icon: 'file-spreadsheet' }
    ];

    const handleFilterChange = (key: keyof Filters, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    const resetFilters = () => {
        const defaultFilters: Filters = {
            dateRange: '30d',
            category: 'all',
            region: 'all',
            customerSegment: 'all',
            startDate: '',
            endDate: ''
        };
        setFilters(defaultFilters);
        onFiltersChange(defaultFilters);
    };

    return (
        <div className="p-6 mb-6 border rounded-lg bg-card border-border shadow-card">
            <div className="flex flex-col mb-6 lg:flex-row lg:items-center lg:justify-between">
                <h3 className="mb-4 text-lg font-semibold text-card-foreground lg:mb-0">Report Filters</h3>

                <div className="flex flex-wrap items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                    >
                        <DynamicIcon name={showAdvanced ? 'chevron-up' : 'chevron-down'} size={20} />
                        Advanced Filters
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={resetFilters}
                    >
                        <DynamicIcon name="refresh-cw" size={20} />
                        Reset
                    </Button>

                    <div className="flex items-center space-x-2">
                        {exportOptions.map((option) => (
                            <Button
                                key={option.value}
                                variant="outline"
                                size="sm"
                                onClick={() => onExport(option.value)}

                            >
                                <DynamicIcon name={option.icon} size={20} />
                                {option.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Date Range */}
                <Select onValueChange={(value) => handleFilterChange('dateRange', value)} value={filters.dateRange}>
                    <SelectLabel>Date Range</SelectLabel>
                    <SelectTrigger>
                        <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                        {dateRangeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Category */}
                <Select onValueChange={(value) => handleFilterChange('category', value)} value={filters.category}>
                    <SelectLabel>Category</SelectLabel>
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Region */}
                <Select onValueChange={(value) => handleFilterChange('region', value)} value={filters.region}>
                    <SelectLabel>Region</SelectLabel>
                    <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                        {regionOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Customer Segment */}
                <Select onValueChange={(value) => handleFilterChange('customerSegment', value)} value={filters.customerSegment}>
                    <SelectLabel>Customer Segment</SelectLabel>
                    <SelectTrigger>
                        <SelectValue placeholder="Select customer segment" />
                    </SelectTrigger>
                    <SelectContent>
                        {customerSegmentOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

            </div>
            {/* Custom Date Range */}
            {filters.dateRange === 'custom' && (
                <div className="grid grid-cols-1 gap-4 p-4 mt-4 rounded-lg md:grid-cols-2 bg-muted/30">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Start Date</label>
                        <Input
                            type="date"
                            value={filters.startDate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterChange('startDate', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">End Date</label>
                        <Input
                            type="date"
                            value={filters.endDate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterChange('endDate', e.target.value)}
                        />
                    </div>

                </div>
            )}
            {/* Advanced Filters */}
            {showAdvanced && (
                <div className="p-4 mt-6 rounded-lg bg-muted/30">
                    <h4 className="mb-4 text-sm font-medium text-card-foreground">Advanced Options</h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <Select onValueChange={(value) => setPaymentMethod(value)} value={paymentMethod} defaultValue="all">
                            <SelectLabel>Payment Method</SelectLabel>
                            <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                                {paymentMethodOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value) => setOrderStatus(value)} value={orderStatus} defaultValue="all">
                            <SelectLabel>Order Status</SelectLabel>
                            <SelectTrigger>
                                <SelectValue placeholder="Select order status" />
                            </SelectTrigger>
                            <SelectContent>
                                {orderStatusOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select onValueChange={(value) => setTrafficSource(value)} value={trafficSource} defaultValue="all">
                            <SelectLabel>Traffic Source</SelectLabel>
                            <SelectTrigger>
                                <SelectValue placeholder="Select traffic source" />
                            </SelectTrigger>
                            <SelectContent>
                                {trafficSourceOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )}
            {/* Active Filters Summary */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {Object.entries(filters).map(([key, value]) => {
                    if (value && value !== 'all' && value !== '') {
                        return (
                            <div
                                key={key}
                                className="flex items-center px-2 py-1 space-x-1 text-sm rounded-md bg-primary/10 text-primary"
                            >
                                <span>{key}: {value}</span>
                                <button
                                    onClick={() => handleFilterChange(key as keyof Filters, key === 'dateRange' ? '30d' : 'all')}
                                    className="hover:bg-primary/20 rounded-sm p-0.5 transition-smooth"
                                >
                                    <DynamicIcon name="x" size={12} />
                                </button>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default ReportFilters;

