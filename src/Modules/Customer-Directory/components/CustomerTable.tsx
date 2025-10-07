import React, { useState, useMemo } from 'react';
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic';
import AppImage from '@/_Shared/Components/AppImage';
import { Button } from '@/_Shared/Components/Ui/button';
import type { Customer } from '@/Modules/Customer-Directory/types';

interface CustomerTableProps {
    customers?: Customer[];
    onViewProfile: (customer: Customer) => void;
    onSendEmail: (customer: Customer) => void;
    onManageAccount: (customer: Customer) => void;
    searchTerm?: string;
    selectedSegment?: string;
    sortConfig?: { key: string | null; direction: 'asc' | 'desc' };
}

const CustomerTable: React.FC<CustomerTableProps> = ({
    customers = [],
    onViewProfile,
    onSendEmail,
    onManageAccount,
    searchTerm = '',
    selectedSegment = 'all',
    sortConfig = { key: "", direction: 'asc' as 'asc' | 'desc' }
}) => {
    const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);

    const filteredAndSortedCustomers = useMemo(() => {
        const filtered = customers?.filter((customer: Customer) => {
            const matchesSearch = customer?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                customer?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());

            const matchesSegment = selectedSegment === 'all' || customer?.segment === selectedSegment;

            return matchesSearch && matchesSegment;
        });

        if ((sortConfig)?.key) {
            filtered?.sort((a, b) => {
                let aValue = a?.[(sortConfig)?.key as keyof Customer["registrationDate"]];
                let bValue = b?.[(sortConfig)?.key as keyof Customer["registrationDate"]];

                if ((sortConfig)?.key === 'registrationDate') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                } else if ((sortConfig)?.key === 'lifetimeValue') {
                    aValue = parseFloat(aValue?.replace('$', '')?.replace(',', ''));
                    bValue = parseFloat(bValue?.replace('$', '')?.replace(',', ''));
                }

                if (aValue < bValue) return (sortConfig)?.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return (sortConfig)?.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [customers, searchTerm, selectedSegment, sortConfig]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedCustomers(filteredAndSortedCustomers?.map((c: any) => c?.id));
        } else {
            setSelectedCustomers([]);
        }
    };

    const handleSelectCustomer = (customerId: string, checked: boolean) => {
        if (checked) {
            setSelectedCustomers((prev) => [...prev, customerId]);
        } else {
            setSelectedCustomers((prev) => prev?.filter((id) => id !== customerId));
        }
    };

    const getStatusBadge = (status: string) => {
        const statusConfig: Record<string, { color: string; label: string }> = {
            active: { color: 'bg-success text-success-foreground', label: 'Active' },
            inactive: { color: 'bg-muted text-muted-foreground', label: 'Inactive' },
            suspended: { color: 'bg-error text-error-foreground', label: 'Suspended' },
            pending: { color: 'bg-warning text-warning-foreground', label: 'Pending' }
        };

        const config = statusConfig?.[status] || statusConfig?.active;
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
                {config?.label}
            </span>
        );
    };

    const getSegmentBadge = (segment: string) => {
        const segmentConfig: Record<string, { color: string; icon: keyof typeof dynamicIconImports }> = {
            vip: { color: 'bg-secondary text-secondary-foreground', icon: 'crown' },
            frequent: { color: 'bg-primary text-primary-foreground', icon: 'repeat' },
            'at-risk': { color: 'bg-warning text-warning-foreground', icon: 'alert-triangle' },
            new: { color: 'bg-accent text-accent-foreground', icon: 'sparkles' }
        };

        const config = segmentConfig?.[segment];
        if (!config) return null;

        return (
            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
                <DynamicIcon name={config?.icon} size={12} />
                <span className="capitalize">{segment?.replace('-', ' ')}</span>
            </div>
        );
    };

    return (
        <div className="border rounded-lg bg-card border-border shadow-card">
            {/* Table Header with Bulk Actions */}
            {selectedCustomers?.length > 0 && (
                <div className="px-6 py-4 border-b border-border bg-muted/50">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            {selectedCustomers?.length} customer{selectedCustomers?.length > 1 ? 's' : ''} selected
                        </span>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                                <DynamicIcon name="mail" size={16} />
                                Send Email
                            </Button>
                            <Button variant="outline" size="sm">
                                <DynamicIcon name="download" size={16} />
                                Export
                            </Button>
                            <Button variant="outline" size="sm">
                                <DynamicIcon name="more-horizontal" size={16} />
                                More Actions
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto lg:block">
                <table className="w-full">
                    <thead className="border-b bg-muted/30 border-border">
                        <tr>
                            <th className="px-6 py-4 text-left">
                                <input
                                    type="checkbox"
                                    checked={selectedCustomers?.length === filteredAndSortedCustomers?.length && filteredAndSortedCustomers?.length > 0}
                                    onChange={(e) => handleSelectAll((e?.target as HTMLInputElement)?.checked)}
                                    className="rounded border-border"
                                />
                            </th>
                            <th className="px-6 py-4 text-sm font-medium text-left text-muted-foreground">Customer</th>
                            <th className="px-6 py-4 text-sm font-medium text-left text-muted-foreground">Registration</th>
                            <th className="px-6 py-4 text-sm font-medium text-left text-muted-foreground">Orders</th>
                            <th className="px-6 py-4 text-sm font-medium text-left text-muted-foreground">Lifetime Value</th>
                            <th className="px-6 py-4 text-sm font-medium text-left text-muted-foreground">Segment</th>
                            <th className="px-6 py-4 text-sm font-medium text-left text-muted-foreground">Status</th>
                            <th className="px-6 py-4 text-sm font-medium text-left text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredAndSortedCustomers?.map((customer: any) => (
                            <tr key={customer?.id} className="hover:bg-muted/30 transition-hover">
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedCustomers?.includes(customer?.id)}
                                        onChange={(e) => handleSelectCustomer(customer?.id, (e?.target as HTMLInputElement)?.checked)}
                                        className="rounded border-border"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full bg-muted">
                                            <AppImage
                                                src={customer?.avatar}
                                                alt={customer?.name}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium truncate text-foreground">{customer?.name}</p>
                                            <p className="text-sm truncate text-muted-foreground">{customer?.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm">
                                        <p className="text-foreground">{customer?.registrationDate}</p>
                                        <p className="text-muted-foreground">{customer?.registrationTime}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm">
                                        <p className="font-medium text-foreground">{customer?.orderCount}</p>
                                        <p className="text-muted-foreground">Last: {customer?.lastOrderDate}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="font-medium text-foreground">{customer?.lifetimeValue}</p>
                                </td>
                                <td className="px-6 py-4">
                                    {getSegmentBadge(customer?.segment)}
                                </td>
                                <td className="px-6 py-4">
                                    {getStatusBadge(customer?.status)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onViewProfile(customer)}
                                            title="View Profile"
                                        >
                                            <DynamicIcon name="eye" size={16} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onSendEmail(customer)}
                                            title="Send Email"
                                        >
                                            <DynamicIcon name="mail" size={16} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onManageAccount(customer)}
                                            title="Manage Account"
                                        >
                                            <DynamicIcon name="settings" size={16} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Mobile Card Layout */}
            <div className="divide-y lg:hidden divide-border">
                {filteredAndSortedCustomers?.map((customer: any) => (
                    <div key={customer?.id} className="p-4">
                        <div className="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                checked={selectedCustomers?.includes(customer?.id)}
                                onChange={(e) => handleSelectCustomer(customer?.id, (e?.target as HTMLInputElement)?.checked)}
                                className="mt-1 rounded border-border"
                            />
                            <div className="flex-shrink-0 w-12 h-12 overflow-hidden rounded-full bg-muted">
                                <AppImage
                                    src={customer?.avatar}
                                    alt={customer?.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium truncate text-foreground">{customer?.name}</h3>
                                        <p className="text-sm truncate text-muted-foreground">{customer?.email}</p>
                                    </div>
                                    <div className="flex items-center ml-2 space-x-1">
                                        {getSegmentBadge(customer?.segment)}
                                        {getStatusBadge(customer?.status)}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Orders:</span>
                                        <span className="ml-1 font-medium">{customer?.orderCount}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Value:</span>
                                        <span className="ml-1 font-medium">{customer?.lifetimeValue}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Joined:</span>
                                        <span className="ml-1">{customer?.registrationDate}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Last Order:</span>
                                        <span className="ml-1">{customer?.lastOrderDate}</span>
                                    </div>
                                </div>

                                <div className="flex items-center mt-3 space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onViewProfile(customer)}
                                    >
                                        <DynamicIcon name="eye" size={16} />
                                        Profile
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onSendEmail(customer)}
                                    >
                                        <DynamicIcon name="mail" size={16} />
                                        Email
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onManageAccount(customer)}
                                    >
                                        <DynamicIcon name="settings" size={16} />
                                        Manage
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Empty State */}
            {filteredAndSortedCustomers?.length === 0 && (
                <div className="p-12 text-center">
                    <DynamicIcon name="users" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-medium text-foreground">No customers found</h3>
                    <p className="text-muted-foreground">
                        {searchTerm || selectedSegment !== 'all' ? 'Try adjusting your search or filter criteria' : 'No customers have been added yet'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CustomerTable;


