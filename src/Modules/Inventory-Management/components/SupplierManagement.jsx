import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SupplierManagement = ({ suppliers, onCreatePO, onContactSupplier, onEditSupplier }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuppliers = suppliers?.filter(supplier =>
    supplier?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    supplier?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'inactive': return 'text-muted-foreground bg-muted';
      case 'pending': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPerformanceColor = (rating) => {
    if (rating >= 4.5) return 'text-success';
    if (rating >= 3.5) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Building" size={20} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Supplier Management</h2>
              <p className="text-sm text-muted-foreground">Manage vendor relationships and purchase orders</p>
            </div>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={() => onEditSupplier(null)}
            iconName="Plus"
            iconSize={16}
          >
            Add Supplier
          </Button>
        </div>

        <Input
          type="search"
          placeholder="Search suppliers by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="w-full"
        />
      </div>
      <div className="p-6">
        {filteredSuppliers?.length > 0 ? (
          <div className="grid gap-6">
            {filteredSuppliers?.map((supplier) => (
              <div
                key={supplier?.id}
                className="p-6 bg-muted/30 rounded-lg border border-border hover:shadow-card transition-smooth"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <Icon name="Building" size={24} color="white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{supplier?.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(supplier?.status)}`}>
                          {supplier?.status?.charAt(0)?.toUpperCase() + supplier?.status?.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Icon name="Mail" size={14} className="text-muted-foreground" />
                            <span className="text-muted-foreground">Email:</span>
                            <span className="text-foreground">{supplier?.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Icon name="Phone" size={14} className="text-muted-foreground" />
                            <span className="text-muted-foreground">Phone:</span>
                            <span className="text-foreground">{supplier?.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Icon name="MapPin" size={14} className="text-muted-foreground" />
                            <span className="text-muted-foreground">Location:</span>
                            <span className="text-foreground">{supplier?.location}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Icon name="Star" size={14} className="text-muted-foreground" />
                            <span className="text-muted-foreground">Rating:</span>
                            <div className="flex items-center space-x-1">
                              <span className={`font-medium ${getPerformanceColor(supplier?.rating)}`}>
                                {supplier?.rating?.toFixed(1)}
                              </span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5]?.map((star) => (
                                  <Icon
                                    key={star}
                                    name="Star"
                                    size={12}
                                    className={star <= supplier?.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Icon name="Clock" size={14} className="text-muted-foreground" />
                            <span className="text-muted-foreground">Lead Time:</span>
                            <span className="text-foreground">{supplier?.leadTime} days</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Icon name="Package" size={14} className="text-muted-foreground" />
                            <span className="text-muted-foreground">Products:</span>
                            <span className="text-foreground">{supplier?.productCount}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <span>Last Order: {supplier?.lastOrderDate}</span>
                        <span>Total Orders: {supplier?.totalOrders}</span>
                        <span>Total Value: ${supplier?.totalValue?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onContactSupplier(supplier)}
                      iconName="MessageSquare"
                      iconSize={16}
                    >
                      Contact
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => onCreatePO(supplier)}
                      iconName="ShoppingCart"
                      iconSize={16}
                    >
                      Create PO
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditSupplier(supplier)}
                      iconName="Edit"
                      iconSize={16}
                    />
                  </div>
                </div>
                
                {supplier?.notes && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <Icon name="MessageSquare" size={14} className="inline mr-2" />
                      {supplier?.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Building" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No suppliers found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'No suppliers match your search criteria.' : 'Start by adding your first supplier.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierManagement;