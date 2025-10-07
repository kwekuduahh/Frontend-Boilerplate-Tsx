import React, { useState } from 'react';
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic';
import { Button } from '@/_Shared/Components/Ui/button';
import AppImage from '@/_Shared/Components/AppImage';
import type { Customer } from '../types';

interface CustomerProfileModalProps {
    customer: Customer;
    isOpen: boolean;
    onClose: () => void;
    onSendEmail: (customer: Customer) => void;
    onManageAccount: (customer: Customer) => void;
}

const CustomerProfileModal: React.FC<CustomerProfileModalProps> = ({ customer, isOpen, onClose, onSendEmail, onManageAccount }) => {
    const [activeTab, setActiveTab] = useState('overview');

    if (!isOpen || !customer) return null;

    const tabs: { id: string; label: string; icon: keyof typeof dynamicIconImports }[] = [
        { id: 'overview', label: 'Overview', icon: 'user' },
        { id: 'orders', label: 'Order History', icon: 'shopping-cart' },
        { id: 'communications', label: 'Communications', icon: 'mail' },
        { id: 'support', label: 'Support Tickets', icon: 'help-circle' }
    ];

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

    const renderOverviewTab = () => (
        <div className="space-y-6">
            {/* Customer Info */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                    <h3 className="font-medium text-foreground">Personal Information</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm text-muted-foreground">Full Name</label>
                            <p className="font-medium">{customer?.name}</p>
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground">Email Address</label>
                            <p className="font-medium">{customer?.email}</p>
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground">Phone Number</label>
                            <p className="font-medium">{customer?.phone || 'Not provided'}</p>
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground">Registration Date</label>
                            <p className="font-medium">{customer?.registrationDate} at {customer?.registrationTime}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-medium text-foreground">Account Details</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="text-sm text-muted-foreground">Customer ID</label>
                            <p className="font-mono font-medium">{customer?.id}</p>
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground">Account Status</label>
                            <div className="mt-1">{getStatusBadge(customer?.status)}</div>
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground">Customer Segment</label>
                            <div className="mt-1">{getSegmentBadge(customer?.segment)}</div>
                        </div>
                        <div>
                            <label className="text-sm text-muted-foreground">Last Activity</label>
                            <p className="font-medium">{customer?.lastActivity || 'No recent activity'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Purchase Summary */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-2">
                        <DynamicIcon name="shopping-cart" size={16} className="text-primary" />
                        <span className="text-sm text-muted-foreground">Total Orders</span>
                    </div>
                    <p className="mt-1 text-2xl font-bold text-foreground">{customer?.orderCount}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-2">
                        <DynamicIcon name="dollar-sign" size={16} className="text-success" />
                        <span className="text-sm text-muted-foreground">Lifetime Value</span>
                    </div>
                    <p className="mt-1 text-2xl font-bold text-foreground">{customer?.lifetimeValue}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-2">
                        <DynamicIcon name="trending-up" size={16} className="text-accent" />
                        <span className="text-sm text-muted-foreground">Avg Order Value</span>
                    </div>
                    <p className="mt-1 text-2xl font-bold text-foreground">{customer?.avgOrderValue || '$0'}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-2">
                        <DynamicIcon name="calendar" size={16} className="text-warning" />
                        <span className="text-sm text-muted-foreground">Last Order</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-foreground">{customer?.lastOrderDate}</p>
                </div>
            </div>

            {/* Addresses */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Billing Address</h3>
                    <div className="p-4 rounded-lg bg-muted/30">
                        <p className="text-sm text-foreground">
                            {customer?.billingAddress || 'No billing address on file'}
                        </p>
                    </div>
                </div>
                <div className="space-y-3">
                    <h3 className="font-medium text-foreground">Shipping Address</h3>
                    <div className="p-4 rounded-lg bg-muted/30">
                        <p className="text-sm text-foreground">
                            {customer?.shippingAddress || 'No shipping address on file'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderOrdersTab = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Order History</h3>
                <Button variant="outline" size="sm">
                    <DynamicIcon name="download" size={16} />
                    Export Orders
                </Button>
            </div>

            <div className="space-y-3">
                {customer?.recentOrders?.map((order) => (
                    <div key={order?.id} className="p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-foreground">Order #{order?.id}</p>
                                <p className="text-sm text-muted-foreground">{order?.date} • {order?.items} items</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-foreground">{order?.total}</p>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${order?.status === 'delivered' ? 'bg-success text-success-foreground' :
                                    order?.status === 'shipped' ? 'bg-primary text-primary-foreground' :
                                        order?.status === 'processing' ? 'bg-warning text-warning-foreground' :
                                            'bg-muted text-muted-foreground'
                                    }`}>
                                    {order?.status}
                                </span>
                            </div>
                        </div>
                    </div>
                )) || (
                        <div className="py-8 text-center">
                            <DynamicIcon name="shopping-cart" size={48} className="mx-auto mb-4 text-muted-foreground" />
                            <p className="text-muted-foreground">No orders found</p>
                        </div>
                    )}
            </div>
        </div>
    );

    const renderCommunicationsTab = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Communication History</h3>
                <Button
                    variant="default"
                    size="sm"
                    onClick={() => onSendEmail(customer)}
                >
                    <DynamicIcon name="mail" size={16} className='mr-1' />
                    Send Email
                </Button>
            </div>

            <div className="space-y-3">
                {customer?.communications?.map((comm) => (
                    <div key={comm?.id} className="p-4 rounded-lg bg-muted/30">
                        <div className="flex items-start space-x-3">
                            <DynamicIcon name={comm?.type === 'email' ? 'mail' : 'message-square'} size={16} className="mt-1 text-primary" />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="font-medium text-foreground">{comm?.subject}</p>
                                    <span className="text-xs text-muted-foreground">{comm?.date}</span>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">{comm?.preview}</p>
                                <div className="flex items-center mt-2 space-x-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${comm?.status === 'sent' ? 'bg-success text-success-foreground' :
                                        comm?.status === 'delivered' ? 'bg-primary text-primary-foreground' :
                                            comm?.status === 'opened' ? 'bg-accent text-accent-foreground' :
                                                'bg-muted text-muted-foreground'
                                        }`}>
                                        {comm?.status}
                                    </span>
                                    <span className="text-xs text-muted-foreground">by {comm?.sender}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )) || (
                        <div className="py-8 text-center">
                            <DynamicIcon name="mail" size={48} className="mx-auto mb-4 text-muted-foreground" />
                            <p className="text-muted-foreground">No communications found</p>
                        </div>
                    )}
            </div>
        </div>
    );

    const renderSupportTab = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Support Tickets</h3>
                <Button variant="default" size="sm">
                    <DynamicIcon name="plus" size={16} className='mr-1' />
                    Create Ticket
                </Button>
            </div>

            <div className="space-y-3">
                {customer?.supportTickets?.map((ticket) => (
                    <div key={ticket?.id} className="p-4 rounded-lg bg-muted/30">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <p className="font-medium text-foreground">#{ticket?.id}</p>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${ticket?.priority === 'high' ? 'bg-error text-error-foreground' :
                                        ticket?.priority === 'medium' ? 'bg-warning text-warning-foreground' :
                                            'bg-muted text-muted-foreground'
                                        }`}>
                                        {ticket?.priority} priority
                                    </span>
                                </div>
                                <p className="mt-1 text-sm font-medium text-foreground">{ticket?.subject}</p>
                                <p className="mt-1 text-sm text-muted-foreground">{ticket?.description}</p>
                                <div className="flex items-center mt-2 space-x-4 text-xs text-muted-foreground">
                                    <span>Created: {ticket?.created}</span>
                                    <span>Updated: {ticket?.updated}</span>
                                    <span>Assigned to: {ticket?.assignee}</span>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${ticket?.status === 'open' ? 'bg-error text-error-foreground' :
                                ticket?.status === 'in-progress' ? 'bg-warning text-warning-foreground' :
                                    ticket?.status === 'resolved' ? 'bg-success text-success-foreground' :
                                        'bg-muted text-muted-foreground'
                                }`}>
                                {ticket?.status}
                            </span>
                        </div>
                    </div>
                )) || (
                        <div className="py-8 text-center">
                            <DynamicIcon name="help-circle" size={48} className="mx-auto mb-4 text-muted-foreground" />
                            <p className="text-muted-foreground">No support tickets found</p>
                        </div>
                    )}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 z-1300">
            <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 overflow-hidden rounded-full bg-muted">
                            <AppImage
                                src={customer?.avatar}
                                alt={customer?.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">{customer?.name}</h2>
                            <p className="text-sm text-muted-foreground">{customer?.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onSendEmail(customer)}
                        >
                            <DynamicIcon name="mail" size={16} className='mr-1' />
                            Send Email
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onManageAccount(customer)}
                        >
                            <DynamicIcon name="settings" size={16} className='mr-1' />
                            Manage Account
                        </Button>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <DynamicIcon name="x" size={20} />
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-border">
                    <nav className="flex px-6 space-x-8">
                        {tabs?.map((tab) => (
                            <button
                                key={tab?.id}
                                onClick={() => setActiveTab(tab?.id)}
                                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-smooth ${activeTab === tab?.id
                                    ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <DynamicIcon name={tab?.icon} size={16} />
                                <span>{tab?.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {activeTab === 'overview' && renderOverviewTab()}
                    {activeTab === 'orders' && renderOrdersTab()}
                    {activeTab === 'communications' && renderCommunicationsTab()}
                    {activeTab === 'support' && renderSupportTab()}
                </div>
            </div>
        </div>
    );
};

export default CustomerProfileModal;


