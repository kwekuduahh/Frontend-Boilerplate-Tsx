import React from 'react';
import Icon from '../../../components/AppIcon';

const InventoryStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Products',
      value: stats?.totalProducts?.toLocaleString(),
      change: stats?.totalProductsChange,
      icon: 'Package',
      color: 'primary'
    },
    {
      title: 'Total Stock Value',
      value: `$${stats?.totalStockValue?.toLocaleString()}`,
      change: stats?.stockValueChange,
      icon: 'DollarSign',
      color: 'success'
    },
    {
      title: 'Low Stock Items',
      value: stats?.lowStockItems?.toLocaleString(),
      change: stats?.lowStockChange,
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      title: 'Out of Stock',
      value: stats?.outOfStockItems?.toLocaleString(),
      change: stats?.outOfStockChange,
      icon: 'XCircle',
      color: 'error'
    }
  ];

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border shadow-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat?.color}/10`}>
              <Icon name={stat?.icon} size={24} className={`text-${stat?.color}`} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor(stat?.change)}`}>
              <Icon name={getChangeIcon(stat?.change)} size={16} />
              <span>{Math.abs(stat?.change)}%</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stat?.value}</h3>
            <p className="text-sm text-muted-foreground">{stat?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryStats;