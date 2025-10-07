import React, { useState } from 'react';

import { Button } from '@/_Shared/Components/Ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_Shared/Components/Ui/select';

interface BulkActionsProps {
    selectedOrders: any[];
    onBulkAction: (data: any) => void;
    onClearSelection: () => void;
    loading?: boolean;
}

const BulkActions = ({
    selectedOrders = [],
    onBulkAction,
    onClearSelection,
    loading = false
}) => {
    const [selectedAction, setSelectedAction] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const bulkActionOptions = [
        { value: '', label: 'Select bulk action...' },
        { value: 'update-status', label: 'Update Status' },
        { value: 'print-labels', label: 'Print Shipping Labels' },
        { value: 'export-orders', label: 'Export Orders' },
        { value: 'send-notification', label: 'Send Customer Notification' },
        { value: 'mark-priority', label: 'Mark as Priority' },
        { value: 'assign-fulfillment', label: 'Assign to Fulfillment Center' }
    ];

    const statusUpdateOptions = [
        { value: 'processing', label: 'Mark as Processing' },
        { value: 'shipped', label: 'Mark as Shipped' },
        { value: 'delivered', label: 'Mark as Delivered' },
        { value: 'cancelled', label: 'Cancel Orders' }
    ];

    const handleBulkAction = async () => {
        if (!selectedAction || selectedOrders?.length === 0) return;

        setIsProcessing(true);
        try {
            await onBulkAction(selectedAction, selectedOrders);
            setSelectedAction('');
        } catch (error) {
            console.error('Bulk action failed:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const getActionIcon = (action) => {
        const icons = {
            'update-status': 'RefreshCw',
            'print-labels': 'Printer',
            'export-orders': 'Download',
            'send-notification': 'Mail',
            'mark-priority': 'Star',
            'assign-fulfillment': 'Truck'
        };
        return icons?.[action] || 'Settings';
    };

    if (selectedOrders?.length === 0) {
        return null;
    }

    return (
        <div className="p-4 border rounded-lg bg-surface border-border shadow-card">
            <div className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                {/* Selection Info */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center w-8 h-8 text-sm font-medium rounded-full bg-primary text-primary-foreground">
                            {selectedOrders?.length}
                        </div>
                        <span className="text-sm font-medium text-foreground">
                            {selectedOrders?.length} order{selectedOrders?.length !== 1 ? 's' : ''} selected
                        </span>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClearSelection}
                        iconName="X"
                        iconPosition="left"
                    >
                        Clear Selection
                    </Button>
                </div>

                {/* Bulk Actions */}
                <div className="flex items-center w-full space-x-3 sm:w-auto">
                    <div className="flex-1 sm:flex-initial sm:w-64">
                        <Select
                            placeholder="Choose action..."
                            options={bulkActionOptions}
                            value={selectedAction}
                            onChange={setSelectedAction}
                        />
                    </div>

                    {selectedAction === 'update-status' && (
                        <div className="flex-1 sm:flex-initial sm:w-48">
                            <Select
                                placeholder="Select status..."
                                options={statusUpdateOptions}
                                value=""
                                onChange={(status) => {
                                    onBulkAction('update-status', selectedOrders, { status });
                                    setSelectedAction('');
                                }}
                            />
                        </div>
                    )}

                    <Button
                        variant="default"
                        onClick={handleBulkAction}
                        disabled={!selectedAction || isProcessing}
                        loading={isProcessing}
                        iconName={selectedAction ? getActionIcon(selectedAction) : 'Play'}
                        iconPosition="left"
                    >
                        {isProcessing ? 'Processing...' : 'Apply'}
                    </Button>
                </div>
            </div>
            {/* Quick Actions */}
            <div className="pt-4 mt-4 border-t border-border">
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onBulkAction('update-status', selectedOrders, { status: 'processing' })}
                        iconName="Package"
                        iconPosition="left"
                    >
                        Mark Processing
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onBulkAction('print-labels', selectedOrders)}
                        iconName="Printer"
                        iconPosition="left"
                    >
                        Print Labels
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onBulkAction('export-orders', selectedOrders)}
                        iconName="Download"
                        iconPosition="left"
                    >
                        Export
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onBulkAction('send-notification', selectedOrders)}
                        iconName="Mail"
                        iconPosition="left"
                    >
                        Notify Customers
                    </Button>
                </div>
            </div>
            {/* Progress Indicator */}
            {isProcessing && (
                <div className="pt-4 mt-4 border-t border-border">
                    <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 border-2 rounded-full animate-spin border-primary border-t-transparent"></div>
                        <span className="text-sm text-muted-foreground">
                            Processing {selectedOrders?.length} orders...
                        </span>
                    </div>
                    <div className="w-full h-2 mt-2 rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary animate-pulse" style={{ width: '45%' }}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BulkActions;


