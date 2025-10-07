import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const StockAdjustmentModal = ({ isOpen, onClose, product, onSave }) => {
  const [adjustmentType, setAdjustmentType] = useState('increase');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const adjustmentTypeOptions = [
    { value: 'increase', label: 'Increase Stock' },
    { value: 'decrease', label: 'Decrease Stock' },
    { value: 'set', label: 'Set Exact Amount' }
  ];

  const reasonOptions = [
    { value: 'restock', label: 'Restock/Delivery' },
    { value: 'damage', label: 'Damage/Loss' },
    { value: 'theft', label: 'Theft/Shrinkage' },
    { value: 'return', label: 'Customer Return' },
    { value: 'correction', label: 'Inventory Correction' },
    { value: 'promotion', label: 'Promotional Use' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    if (isOpen && product) {
      setAdjustmentType('increase');
      setQuantity('');
      setReason('');
      setNotes('');
    }
  }, [isOpen, product]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!quantity || !reason) return;

    setIsLoading(true);
    
    try {
      const adjustmentData = {
        productId: product?.id,
        type: adjustmentType,
        quantity: parseInt(quantity),
        reason,
        notes,
        timestamp: new Date()?.toISOString(),
        user: 'Current User' // In real app, get from auth context
      };

      await onSave(adjustmentData);
      onClose();
    } catch (error) {
      console.error('Failed to save adjustment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateNewStock = () => {
    if (!quantity || !product) return product?.currentStock || 0;
    
    const qty = parseInt(quantity);
    switch (adjustmentType) {
      case 'increase':
        return product?.currentStock + qty;
      case 'decrease':
        return Math.max(0, product?.currentStock - qty);
      case 'set':
        return qty;
      default:
        return product?.currentStock;
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1200 p-4">
      <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-md animate-fade-in">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Edit" size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Stock Adjustment</h2>
                <p className="text-sm text-muted-foreground">{product?.name}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Current Stock:</span>
              <span className="font-medium text-foreground">{product?.currentStock?.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">New Stock:</span>
              <span className="font-medium text-primary">{calculateNewStock()?.toLocaleString()}</span>
            </div>
          </div>

          <Select
            label="Adjustment Type"
            options={adjustmentTypeOptions}
            value={adjustmentType}
            onChange={setAdjustmentType}
            required
          />

          <Input
            label={adjustmentType === 'set' ? 'Set Stock To' : 'Quantity'}
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e?.target?.value)}
            placeholder={adjustmentType === 'set' ? 'Enter exact stock amount' : 'Enter quantity to adjust'}
            min="0"
            required
          />

          <Select
            label="Reason"
            options={reasonOptions}
            value={reason}
            onChange={setReason}
            placeholder="Select reason for adjustment"
            required
          />

          <Input
            label="Notes (Optional)"
            type="text"
            value={notes}
            onChange={(e) => setNotes(e?.target?.value)}
            placeholder="Additional notes about this adjustment"
          />

          <div className="flex items-center space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isLoading}
              className="flex-1"
            >
              Save Adjustment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockAdjustmentModal;