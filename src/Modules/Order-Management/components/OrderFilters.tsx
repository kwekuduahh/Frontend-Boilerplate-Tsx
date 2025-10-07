import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const OrderFilters = ({
    filters,
    onFiltersChange,
    onClearFilters,
    totalOrders = 0,
    filteredOrders = 0
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'refunded', label: 'Refunded' }
    ];

    const paymentStatusOptions = [
        { value: 'all', label: 'All Payment Status' },
        { value: 'paid', label: 'Paid' },
        { value: 'pending', label: 'Pending' },
        { value: 'failed', label: 'Failed' },
        { value: 'refunded', label: 'Refunded' }
    ];

    const timeRangeOptions = [
        { value: 'all', label: 'All Time' },
        { value: 'today', label: 'Today' },
        { value: 'yesterday', label: 'Yesterday' },
        { value: 'last7days', label: 'Last 7 Days' },
        { value: 'last30days', label: 'Last 30 Days' },
        { value: 'last90days', label: 'Last 90 Days' },
        { value: 'custom', label: 'Custom Range' }
    ];

    const handleFilterChange = (key, value) => {
        onFiltersChange({
            ...filters,
            [key]: value
        });
    };

    const hasActiveFilters = Object.values(filters)?.some(value =>
        value && value !== 'all' && value !== ''
    );

    return (
        <div className="border rounded-lg bg-surface border-border shadow-card">
            {/* Filter Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Icon name="Filter" size={20} className="text-muted-foreground" />
                        <h3 className="font-medium text-foreground">Filters</h3>
                        {hasActiveFilters && (
                            <span className="px-2 py-1 text-xs rounded-full bg-primary text-primary-foreground">
                                Active
                            </span>
                        )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Showing {filteredOrders?.toLocaleString()} of {totalOrders?.toLocaleString()} orders
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearFilters}
                            iconName="X"
                            iconPosition="left"
                        >
                            Clear All
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                        iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                        iconPosition="right"
                    >
                        {isExpanded ? 'Less' : 'More'} Filters
                    </Button>
                </div>
            </div>
            {/* Quick Filters */}
            <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Search */}
                    <div className="lg:col-span-2">
                        <Input
                            type="search"
                            placeholder="Search orders, customers, or products..."
                            value={filters?.search || ''}
                            onChange={(e) => handleFilterChange('search', e?.target?.value)}
                            className="w-full"
                        />
                    </div>

                    {/* Status Filter */}
                    <Select
                        placeholder="Filter by status"
                        options={statusOptions}
                        value={filters?.status || 'all'}
                        onChange={(value) => handleFilterChange('status', value)}
                    />

                    {/* Time Range */}
                    <Select
                        placeholder="Select time range"
                        options={timeRangeOptions}
                        value={filters?.timeRange || 'all'}
                        onChange={(value) => handleFilterChange('timeRange', value)}
                    />
                </div>

                {/* Expanded Filters */}
                {isExpanded && (
                    <div className="pt-4 border-t border-border">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {/* Payment Status */}
                            <Select
                                label="Payment Status"
                                options={paymentStatusOptions}
                                value={filters?.paymentStatus || 'all'}
                                onChange={(value) => handleFilterChange('paymentStatus', value)}
                            />

                            {/* Order Amount Range */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Order Amount</label>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="number"
                                        placeholder="Min"
                                        value={filters?.minAmount || ''}
                                        onChange={(e) => handleFilterChange('minAmount', e?.target?.value)}
                                    />
                                    <span className="text-muted-foreground">to</span>
                                    <Input
                                        type="number"
                                        placeholder="Max"
                                        value={filters?.maxAmount || ''}
                                        onChange={(e) => handleFilterChange('maxAmount', e?.target?.value)}
                                    />
                                </div>
                            </div>

                            {/* Custom Date Range */}
                            {filters?.timeRange === 'custom' && (
                                <>
                                    <Input
                                        type="date"
                                        label="Start Date"
                                        value={filters?.startDate || ''}
                                        onChange={(e) => handleFilterChange('startDate', e?.target?.value)}
                                    />
                                    <Input
                                        type="date"
                                        label="End Date"
                                        value={filters?.endDate || ''}
                                        onChange={(e) => handleFilterChange('endDate', e?.target?.value)}
                                    />
                                </>
                            )}

                            {/* Customer Type */}
                            <Select
                                label="Customer Type"
                                options={[
                                    { value: 'all', label: 'All Customers' },
                                    { value: 'new', label: 'New Customers' },
                                    { value: 'returning', label: 'Returning Customers' },
                                    { value: 'vip', label: 'VIP Customers' }
                                ]}
                                value={filters?.customerType || 'all'}
                                onChange={(value) => handleFilterChange('customerType', value)}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderFilters;


