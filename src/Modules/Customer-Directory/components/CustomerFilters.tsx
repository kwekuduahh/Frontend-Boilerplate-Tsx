import React from 'react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { Button } from '@/_Shared/Components/Ui/button';
import { Input } from '@/_Shared/Components/Ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_Shared/Components/Ui/select';
import { Label } from '@/_Shared/Components/Ui/label';


interface CustomerFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedSegment: string;
    onSegmentChange: (value: string) => void;
    selectedStatus: string;
    onStatusChange: (value: string) => void;
    dateRange: string;
    onDateRangeChange: (value: string) => void;
    segmentCounts?: Record<string, number>;
    onExport: () => void;
    onImport: () => void;
}

const CustomerFilters: React.FC<CustomerFiltersProps> = ({
    searchTerm,
    onSearchChange,
    selectedSegment,
    onSegmentChange,
    selectedStatus,
    onStatusChange,
    dateRange,
    onDateRangeChange,
    segmentCounts = {},
    onExport,
    onImport
}) => {
    const segmentOptions = [
        { value: 'all', label: 'All Customers' },
        { value: 'vip', label: `VIP (${segmentCounts?.vip || 0})` },
        { value: 'frequent', label: `Frequent Buyers (${segmentCounts?.frequent || 0})` },
        { value: 'at-risk', label: `At Risk (${segmentCounts?.['at-risk'] || 0})` },
        { value: 'new', label: `New Customers (${segmentCounts?.new || 0})` }
    ];

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'suspended', label: 'Suspended' },
        { value: 'pending', label: 'Pending' }
    ];

    const dateRangeOptions = [
        { value: 'all', label: 'All Time' },
        { value: 'today', label: 'Today' },
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' },
        { value: 'quarter', label: 'This Quarter' },
        { value: 'year', label: 'This Year' },
        { value: 'custom', label: 'Custom Range' }
    ];

    return (
        <div className="p-6 mb-6 border rounded-lg bg-card border-border shadow-card">
            {/* Search and Quick Actions */}
            <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <DynamicIcon
                            name="search"
                            size={16}
                            className="absolute transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground"
                        />
                        <Input
                            type="search"
                            placeholder="Search customers by name or email..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange((e?.target as HTMLInputElement)?.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onImport}
                    >
                        <DynamicIcon name="upload" size={16} />
                        Import
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onExport}
                    >
                        <DynamicIcon name="download" size={16} />
                        Export
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                    >
                        <DynamicIcon name="user-plus" size={16} />
                        Add Customer
                    </Button>
                </div>
            </div>
            {/* Filter Controls */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                    <Label>Customer Segment</Label>
                    <Select onValueChange={(value) => onSegmentChange(value)} value={selectedSegment}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select segment" />
                        </SelectTrigger>
                        <SelectContent>
                            {segmentOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label>Account Status</Label>
                    <Select onValueChange={(value) => onStatusChange(value)} value={selectedStatus}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label>Registration Date</Label>
                    <Select onValueChange={(value) => onDateRangeChange(value)} value={dateRange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                            {dateRangeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-end">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            onSearchChange('');
                            onSegmentChange('all');
                            onStatusChange('all');
                            onDateRangeChange('all');
                        }}
                        className="w-full"
                    >
                        <DynamicIcon name="x" size={12} />
                        Clear Filters
                    </Button>
                </div>
            </div>
            {/* Active Filters Display */}
            {(searchTerm || selectedSegment !== 'all' || selectedStatus !== 'all' || dateRange !== 'all') && (
                <div className="pt-4 mt-4 border-t border-border">
                    <div className="flex flex-wrap items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Active filters:</span>

                        {searchTerm && (
                            <div className="inline-flex items-center px-2 py-1 space-x-1 text-xs rounded-full bg-muted">
                                <DynamicIcon name="search" size={12} />
                                <span>Search: "{searchTerm}"</span>
                                <button
                                    onClick={() => onSearchChange('')}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <DynamicIcon name="x" size={12} />
                                </button>
                            </div>
                        )}

                        {selectedSegment !== 'all' && (
                            <div className="inline-flex items-center px-2 py-1 space-x-1 text-xs rounded-full bg-muted">
                                <DynamicIcon name="users" size={12} />
                                <span>Segment: {segmentOptions?.find(s => s?.value === selectedSegment)?.label}</span>
                                <button
                                    onClick={() => onSegmentChange('all')}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <DynamicIcon name="x" size={12} />
                                </button>
                            </div>
                        )}

                        {selectedStatus !== 'all' && (
                            <div className="inline-flex items-center px-2 py-1 space-x-1 text-xs rounded-full bg-muted">
                                <DynamicIcon name="shield" size={12} />
                                <span>Status: {statusOptions?.find(s => s?.value === selectedStatus)?.label}</span>
                                <button
                                    onClick={() => onStatusChange('all')}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <DynamicIcon name="x" size={12} />
                                </button>
                            </div>
                        )}

                        {dateRange !== 'all' && (
                            <div className="inline-flex items-center px-2 py-1 space-x-1 text-xs rounded-full bg-muted">
                                <DynamicIcon name="calendar" size={12} />
                                <span>Date: {dateRangeOptions?.find(d => d?.value === dateRange)?.label}</span>
                                <button
                                    onClick={() => onDateRangeChange('all')}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <DynamicIcon name="x" size={12} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerFilters;


