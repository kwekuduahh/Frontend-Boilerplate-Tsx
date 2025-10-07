import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import OrderStatusBadge from './OrderStatusBadge';
import Image from '../../../components/AppImage';

const OrderTable = ({
    orders = [],
    selectedOrders = [],
    onOrderSelect,
    onOrderClick,
    onStatusUpdate,
    sortConfig,
    onSort,
    loading = false
}) => {
    const [hoveredRow, setHoveredRow] = useState(null);

    const sortedOrders = useMemo(() => {
        if (!sortConfig?.key) return orders;

        return [...orders]?.sort((a, b) => {
            const aValue = a?.[sortConfig?.key];
            const bValue = b?.[sortConfig?.key];

            if (sortConfig?.key === 'date') {
                return sortConfig?.direction === 'asc'
                    ? new Date(aValue) - new Date(bValue)
                    : new Date(bValue) - new Date(aValue);
            }

            if (sortConfig?.key === 'total') {
                return sortConfig?.direction === 'asc'
                    ? aValue - bValue
                    : bValue - aValue;
            }

            if (typeof aValue === 'string') {
                return sortConfig?.direction === 'asc'
                    ? aValue?.localeCompare(bValue)
                    : bValue?.localeCompare(aValue);
            }

            return sortConfig?.direction === 'asc' ? aValue - bValue : bValue - aValue;
        });
    }, [orders, sortConfig]);

    const handleSelectAll = (checked) => {
        if (checked) {
            onOrderSelect(orders?.map(order => order?.id));
        } else {
            onOrderSelect([]);
        }
    };

    const handleRowSelect = (orderId, checked) => {
        if (checked) {
            onOrderSelect([...selectedOrders, orderId]);
        } else {
            onOrderSelect(selectedOrders?.filter(id => id !== orderId));
        }
    };

    const getSortIcon = (column) => {
        if (sortConfig?.key !== column) {
            return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
        }
        return sortConfig?.direction === 'asc'
            ? <Icon name="ArrowUp" size={14} className="text-primary" />
            : <Icon name="ArrowDown" size={14} className="text-primary" />;
    };

    const formatDate = (dateString) => {
        return new Date(dateString)?.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })?.format(amount);
    };

    const getCustomerTypeIcon = (type) => {
        switch (type) {
            case 'vip': return <Icon name="Crown" size={14} className="text-warning" />;
            case 'returning': return <Icon name="RotateCcw" size={14} className="text-blue-600" />;
            default: return <Icon name="User" size={14} className="text-muted-foreground" />;
        }
    };

    if (loading) {
        return (
            <div className="border rounded-lg bg-surface border-border shadow-card">
                <div className="p-8 text-center">
                    <div className="w-8 h-8 mx-auto mb-4 border-2 rounded-full animate-spin border-primary border-t-transparent"></div>
                    <p className="text-muted-foreground">Loading orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden border rounded-lg bg-surface border-border shadow-card">
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto lg:block">
                <table className="w-full">
                    <thead className="border-b bg-muted border-border">
                        <tr>
                            <th className="w-12 px-4 py-3">
                                <Checkbox
                                    checked={selectedOrders?.length === orders?.length && orders?.length > 0}
                                    onChange={(e) => handleSelectAll(e?.target?.checked)}
                                />
                            </th>
                            {[
                                { key: 'orderNumber', label: 'Order #' },
                                { key: 'customer', label: 'Customer' },
                                { key: 'date', label: 'Date' },
                                { key: 'status', label: 'Status' },
                                { key: 'total', label: 'Total' },
                                { key: 'actions', label: 'Actions', sortable: false }
                            ]?.map((column) => (
                                <th
                                    key={column?.key}
                                    className={`px-4 py-3 text-left text-sm font-medium text-foreground ${column?.sortable !== false ? 'cursor-pointer hover:bg-muted/80 transition-smooth' : ''
                                        }`}
                                    onClick={() => column?.sortable !== false && onSort(column?.key)}
                                >
                                    <div className="flex items-center space-x-2">
                                        <span>{column?.label}</span>
                                        {column?.sortable !== false && getSortIcon(column?.key)}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {sortedOrders?.map((order) => (
                            <tr
                                key={order?.id}
                                className={`transition-smooth cursor-pointer ${hoveredRow === order?.id ? 'bg-muted/50' : 'hover:bg-muted/30'
                                    }`}
                                onMouseEnter={() => setHoveredRow(order?.id)}
                                onMouseLeave={() => setHoveredRow(null)}
                                onClick={() => onOrderClick(order)}
                            >
                                <td className="px-4 py-4" onClick={(e) => e?.stopPropagation()}>
                                    <Checkbox
                                        checked={selectedOrders?.includes(order?.id)}
                                        onChange={(e) => handleRowSelect(order?.id, e?.target?.checked)}
                                    />
                                </td>
                                <td className="px-4 py-4">
                                    <div className="font-medium text-foreground">#{order?.orderNumber}</div>
                                    <div className="text-sm text-muted-foreground">{order?.items} items</div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center space-x-3">
                                        <Image
                                            src={order?.customer?.avatar}
                                            alt={order?.customer?.name}
                                            className="object-cover w-8 h-8 rounded-full"
                                        />
                                        <div>
                                            <div className="flex items-center space-x-1">
                                                <span className="font-medium text-foreground">{order?.customer?.name}</span>
                                                {getCustomerTypeIcon(order?.customer?.type)}
                                            </div>
                                            <div className="text-sm text-muted-foreground">{order?.customer?.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="text-sm text-foreground">{formatDate(order?.date)}</div>
                                </td>
                                <td className="px-4 py-4">
                                    <OrderStatusBadge status={order?.status} />
                                </td>
                                <td className="px-4 py-4">
                                    <div className="font-semibold text-foreground">{formatCurrency(order?.total)}</div>
                                    <div className="text-sm text-muted-foreground">{order?.paymentStatus}</div>
                                </td>
                                <td className="px-4 py-4" onClick={(e) => e?.stopPropagation()}>
                                    <div className="flex items-center space-x-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            iconName="Eye"
                                            onClick={() => onOrderClick(order)}
                                            title="View Details"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            iconName="Edit"
                                            onClick={() => onStatusUpdate(order?.id, 'processing')}
                                            title="Update Status"
                                        />
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            iconName="MoreHorizontal"
                                            title="More Actions"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Mobile Cards */}
            <div className="p-4 space-y-4 lg:hidden">
                {sortedOrders?.map((order) => (
                    <div
                        key={order?.id}
                        className="p-4 space-y-3 border rounded-lg cursor-pointer bg-card border-border transition-smooth hover:shadow-elevation"
                        onClick={() => onOrderClick(order)}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    checked={selectedOrders?.includes(order?.id)}
                                    onChange={(e) => {
                                        e?.stopPropagation();
                                        handleRowSelect(order?.id, e?.target?.checked);
                                    }}
                                />
                                <span className="font-medium text-foreground">#{order?.orderNumber}</span>
                            </div>
                            <OrderStatusBadge status={order?.status} size="sm" />
                        </div>

                        <div className="flex items-center space-x-3">
                            <Image
                                src={order?.customer?.avatar}
                                alt={order?.customer?.name}
                                className="object-cover w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                                <div className="flex items-center space-x-1">
                                    <span className="font-medium text-foreground">{order?.customer?.name}</span>
                                    {getCustomerTypeIcon(order?.customer?.type)}
                                </div>
                                <div className="text-sm text-muted-foreground">{order?.customer?.email}</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{formatDate(order?.date)}</span>
                            <span className="font-semibold text-foreground">{formatCurrency(order?.total)}</span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border">
                            <span className="text-sm text-muted-foreground">{order?.items} items</span>
                            <div className="flex items-center space-x-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    iconName="Eye"
                                    onClick={(e) => {
                                        e?.stopPropagation();
                                        onOrderClick(order);
                                    }}
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    iconName="Edit"
                                    onClick={(e) => {
                                        e?.stopPropagation();
                                        onStatusUpdate(order?.id, 'processing');
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Empty State */}
            {orders?.length === 0 && !loading && (
                <div className="p-12 text-center">
                    <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-medium text-foreground">No orders found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
                </div>
            )}
        </div>
    );
};

export default OrderTable;


