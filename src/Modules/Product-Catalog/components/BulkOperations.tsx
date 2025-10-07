import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

interface BulkOperationsProps {
    selectedProducts: number[];
    onBulkAction: (data: any) => void;
    onClearSelection: () => void;
    onImportCSV: (file: File) => void;
    onExportCSV: (ids?: number[]) => void;
}

const BulkOperations: React.FC<BulkOperationsProps> = ({ selectedProducts, onBulkAction, onClearSelection, onImportCSV, onExportCSV }) => {
    const [showBulkMenu, setShowBulkMenu] = useState(false);
    const [bulkUpdateData, setBulkUpdateData] = useState<any>({ action: '', category: '', priceAdjustment: '', adjustmentType: 'percentage' });

    const bulkActionOptions = [
        { value: 'update-category', label: 'Update Category' },
        { value: 'adjust-price', label: 'Adjust Prices' },
        { value: 'toggle-featured', label: 'Toggle Featured' },
        { value: 'toggle-sale', label: 'Toggle Sale Status' },
        { value: 'archive', label: 'Archive Products' },
        { value: 'delete', label: 'Delete Products' }
    ];

    const categoryOptions = [
        { value: 'electronics', label: 'Electronics' },
        { value: 'clothing', label: 'Clothing' },
        { value: 'home-garden', label: 'Home & Garden' },
        { value: 'sports', label: 'Sports & Outdoors' },
        { value: 'books', label: 'Books' },
        { value: 'toys', label: 'Toys & Games' }
    ];

    const adjustmentTypeOptions = [
        { value: 'percentage', label: 'Percentage (%)' },
        { value: 'fixed', label: 'Fixed Amount ($)' }
    ];

    const handleBulkAction = () => {
        if (!bulkUpdateData?.action) return;
        const actionData: any = { action: bulkUpdateData?.action, productIds: selectedProducts, data: {} };
        switch (bulkUpdateData?.action) {
            case 'update-category': actionData.data.category = bulkUpdateData?.category; break;
            case 'adjust-price': actionData.data.adjustment = parseFloat(bulkUpdateData?.priceAdjustment); actionData.data.adjustmentType = bulkUpdateData?.adjustmentType; break;
        }
        onBulkAction(actionData);
        setShowBulkMenu(false);
        setBulkUpdateData({ action: '', category: '', priceAdjustment: '', adjustmentType: 'percentage' });
    };

    const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        if (file && file?.type === 'text/csv') onImportCSV(file);
        event.target.value = '' as any;
    };

    if (selectedProducts?.length === 0) {
        return (
            <div className="p-4 mb-6 border rounded-lg bg-card border-border">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="flex items-center space-x-4">
                        <h3 className="font-medium text-foreground">Bulk Operations</h3>
                        <span className="text-sm text-muted-foreground">Select products to perform bulk actions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type="file" accept=".csv" onChange={handleFileImport} className="hidden" id="csv-import" />
                        <Button variant="outline" size="sm" onClick={() => (document.getElementById('csv-import') as HTMLInputElement)?.click()} iconName="Upload" iconPosition="left">Import CSV</Button>
                        <Button variant="outline" size="sm" onClick={() => onExportCSV()} iconName="Download" iconPosition="left">Export CSV</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 mb-6 border rounded-lg bg-card border-border">
            <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2"><Icon name="CheckSquare" size={20} className="text-primary" /><span className="font-medium text-foreground">{selectedProducts?.length} product{selectedProducts?.length > 1 ? 's' : ''} selected</span></div>
                    <Button variant="ghost" size="sm" onClick={onClearSelection} iconName="X" iconPosition="left">Clear Selection</Button>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setShowBulkMenu(!showBulkMenu)} iconName="Settings" iconPosition="left">Bulk Actions</Button>
                    <Button variant="outline" size="sm" onClick={() => onExportCSV(selectedProducts)} iconName="Download" iconPosition="left">Export Selected</Button>
                </div>
            </div>
            {showBulkMenu && (
                <div className="pt-4 mt-4 border-t border-border animate-fade-in">
                    <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4">
                        <Select label="Bulk Action" options={bulkActionOptions} value={bulkUpdateData?.action} onChange={(value: string) => setBulkUpdateData((prev: any) => ({ ...prev, action: value }))} placeholder="Select action..." />
                        {bulkUpdateData?.action === 'update-category' && (<Select label="New Category" options={categoryOptions} value={bulkUpdateData?.category} onChange={(value: string) => setBulkUpdateData((prev: any) => ({ ...prev, category: value }))} placeholder="Select category..." />)}
                        {bulkUpdateData?.action === 'adjust-price' && (<>
                            <Select label="Adjustment Type" options={adjustmentTypeOptions} value={bulkUpdateData?.adjustmentType} onChange={(value: string) => setBulkUpdateData((prev: any) => ({ ...prev, adjustmentType: value }))} />
                            <Input label={`Price ${bulkUpdateData?.adjustmentType === 'percentage' ? 'Percentage' : 'Amount'}`} type="number" placeholder={bulkUpdateData?.adjustmentType === 'percentage' ? '10' : '5.00'} value={bulkUpdateData?.priceAdjustment} onChange={(e) => setBulkUpdateData((prev: any) => ({ ...prev, priceAdjustment: (e?.target as HTMLInputElement).value }))} />
                        </>)}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            {bulkUpdateData?.action === 'delete' && (<span className="text-error">⚠️ This action cannot be undone</span>)}
                            {bulkUpdateData?.action === 'archive' && (<span>Products will be hidden from storefront</span>)}
                            {bulkUpdateData?.action === 'adjust-price' && bulkUpdateData?.priceAdjustment && (<span>{bulkUpdateData?.adjustmentType === 'percentage' ? `${bulkUpdateData?.priceAdjustment}% price adjustment` : `$${bulkUpdateData?.priceAdjustment} price adjustment`}</span>)}
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => setShowBulkMenu(false)}>Cancel</Button>
                            <Button variant={bulkUpdateData?.action === 'delete' ? 'destructive' : 'default'} size="sm" onClick={handleBulkAction} disabled={!bulkUpdateData?.action || (bulkUpdateData?.action === 'update-category' && !bulkUpdateData?.category) || (bulkUpdateData?.action === 'adjust-price' && !bulkUpdateData?.priceAdjustment)} iconName="Check" iconPosition="left">Apply Changes</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BulkOperations;


