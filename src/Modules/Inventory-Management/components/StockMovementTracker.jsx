import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const StockMovementTracker = ({ movements }) => {
  const [filterType, setFilterType] = useState('all');
  const [timeRange, setTimeRange] = useState('today');

  const movementTypeOptions = [
    { value: 'all', label: 'All Movements' },
    { value: 'sale', label: 'Sales' },
    { value: 'return', label: 'Returns' },
    { value: 'adjustment', label: 'Adjustments' },
    { value: 'restock', label: 'Restocks' },
    { value: 'damage', label: 'Damage/Loss' }
  ];

  const timeRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const getMovementIcon = (type) => {
    switch (type) {
      case 'sale': return 'ShoppingCart';
      case 'return': return 'RotateCcw';
      case 'adjustment': return 'Edit';
      case 'restock': return 'Package';
      case 'damage': return 'AlertTriangle';
      default: return 'Activity';
    }
  };

  const getMovementColor = (type, quantity) => {
    if (quantity > 0) {
      return 'text-success bg-success/10';
    } else {
      return 'text-error bg-error/10';
    }
  };

  const formatQuantityChange = (quantity) => {
    return quantity > 0 ? `+${quantity}` : quantity?.toString();
  };

  const filteredMovements = movements?.filter(movement => {
    const matchesType = filterType === 'all' || movement?.type === filterType;
    // In a real app, you'd filter by time range here
    return matchesType;
  });

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Stock Movement Tracker</h2>
              <p className="text-sm text-muted-foreground">Recent inventory changes and transactions</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconSize={16}
          >
            Export
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            options={movementTypeOptions}
            value={filterType}
            onChange={setFilterType}
            placeholder="Movement Type"
            className="w-full sm:w-48"
          />
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            placeholder="Time Range"
            className="w-full sm:w-48"
          />
        </div>
      </div>
      <div className="p-6">
        {filteredMovements?.length > 0 ? (
          <div className="space-y-4">
            {filteredMovements?.map((movement) => (
              <div
                key={movement?.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-hover"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getMovementColor(movement?.type, movement?.quantityChange)}`}>
                    <Icon 
                      name={getMovementIcon(movement?.type)} 
                      size={20} 
                      className={movement?.quantityChange > 0 ? 'text-success' : 'text-error'}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-medium text-foreground">{movement?.productName}</h3>
                      <span className="text-xs font-mono text-muted-foreground">
                        SKU: {movement?.sku}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        movement?.quantityChange > 0 ? 'bg-success text-success-foreground' : 'bg-error text-error-foreground'
                      }`}>
                        {formatQuantityChange(movement?.quantityChange)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <span className="capitalize">{movement?.type?.replace('-', ' ')}</span>
                      <span>{movement?.timestamp}</span>
                      {movement?.reference && (
                        <span>Ref: {movement?.reference}</span>
                      )}
                      {movement?.user && (
                        <span>By: {movement?.user}</span>
                      )}
                    </div>
                    
                    {movement?.reason && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Reason: {movement?.reason}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-medium text-foreground">
                    Stock: {movement?.stockAfter?.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Was: {movement?.stockBefore?.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Activity" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No movements found</h3>
            <p className="text-muted-foreground">No stock movements match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockMovementTracker;