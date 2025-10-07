import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LowStockAlerts = ({ alerts, onReorderClick, onDismissAlert }) => {
  if (alerts?.length === 0) {
    return null;
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'border-error bg-error/5';
      case 'high': return 'border-warning bg-warning/5';
      case 'medium': return 'border-accent bg-accent/5';
      default: return 'border-border bg-muted/5';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Info';
      default: return 'Bell';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card mb-6">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Low Stock Alerts</h2>
              <p className="text-sm text-muted-foreground">
                {alerts?.length} product{alerts?.length !== 1 ? 's' : ''} need immediate attention
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => alerts?.forEach(alert => onDismissAlert(alert?.id))}
            iconName="X"
            iconSize={16}
          >
            Dismiss All
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid gap-4">
          {alerts?.map((alert) => (
            <div
              key={alert?.id}
              className={`p-4 rounded-lg border-2 ${getPriorityColor(alert?.priority)} transition-smooth`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    alert?.priority === 'critical' ? 'bg-error/10' :
                    alert?.priority === 'high'? 'bg-warning/10' : 'bg-accent/10'
                  }`}>
                    <Icon 
                      name={getPriorityIcon(alert?.priority)} 
                      size={16} 
                      className={
                        alert?.priority === 'critical' ? 'text-error' :
                        alert?.priority === 'high'? 'text-warning' : 'text-accent'
                      }
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-foreground">{alert?.productName}</h3>
                      <span className="text-xs font-mono text-muted-foreground">
                        SKU: {alert?.sku}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert?.priority === 'critical' ? 'bg-error text-error-foreground' :
                        alert?.priority === 'high' ? 'bg-warning text-warning-foreground' :
                        'bg-accent text-accent-foreground'
                      }`}>
                        {alert?.priority?.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Current Stock</p>
                        <p className="font-medium text-foreground">{alert?.currentStock}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Reorder Point</p>
                        <p className="font-medium text-foreground">{alert?.reorderPoint}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Recommended Qty</p>
                        <p className="font-medium text-primary">{alert?.recommendedQuantity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Lead Time</p>
                        <p className="font-medium text-foreground">{alert?.leadTime} days</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon name="Building" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">Supplier:</span>
                        <span className="font-medium text-foreground">{alert?.supplierName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Phone" size={14} className="text-muted-foreground" />
                        <span className="text-primary hover:underline cursor-pointer">
                          {alert?.supplierContact}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReorderClick(alert)}
                    iconName="ShoppingCart"
                    iconSize={16}
                  >
                    Create PO
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDismissAlert(alert?.id)}
                    iconName="X"
                    iconSize={16}
                  />
                </div>
              </div>
              
              {alert?.notes && (
                <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <Icon name="MessageSquare" size={14} className="inline mr-2" />
                    {alert?.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LowStockAlerts;