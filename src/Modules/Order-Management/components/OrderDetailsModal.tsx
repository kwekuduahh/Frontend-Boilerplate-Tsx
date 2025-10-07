import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import OrderStatusBadge from './OrderStatusBadge';
import Image from '../../../components/AppImage';

const OrderDetailsModal = ({
    order,
    isOpen,
    onClose,
    onStatusUpdate,
    onRefund,
    onAddNote
}) => {
    const [activeTab, setActiveTab] = useState('details');
    const [newNote, setNewNote] = useState('');
    const [refundAmount, setRefundAmount] = useState('');
    const [refundReason, setRefundReason] = useState('');

    if (!isOpen || !order) return null;

    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    const refundReasonOptions = [
        { value: 'customer-request', label: 'Customer Request' },
        { value: 'damaged-item', label: 'Damaged Item' },
        { value: 'wrong-item', label: 'Wrong Item Sent' },
        { value: 'quality-issue', label: 'Quality Issue' },
        { value: 'shipping-delay', label: 'Shipping Delay' },
        { value: 'other', label: 'Other' }
    ];

    const tabs = [
        { id: 'details', label: 'Order Details', icon: 'FileText' },
        { id: 'customer', label: 'Customer Info', icon: 'User' },
        { id: 'shipping', label: 'Shipping', icon: 'Truck' },
        { id: 'notes', label: 'Notes', icon: 'MessageSquare' },
        { id: 'refunds', label: 'Refunds', icon: 'RefreshCw' }
    ];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })?.format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString)?.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleAddNote = () => {
        if (newNote?.trim()) {
            onAddNote(order?.id, newNote?.trim());
            setNewNote('');
        }
    };

    const handleRefund = () => {
        if (refundAmount && refundReason) {
            onRefund(order?.id, {
                amount: parseFloat(refundAmount),
                reason: refundReason,
                type: parseFloat(refundAmount) === order?.total ? 'full' : 'partial'
            });
            setRefundAmount('');
            setRefundReason('');
        }
    };

    return (
        <div className="fixed inset-0 overflow-y-auto z-1200">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 transition-opacity bg-black/50"
                    onClick={onClose}
                />

                {/* Modal */}
                <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform rounded-lg bg-surface shadow-modal">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                        <div className="flex items-center space-x-4">
                            <h2 className="text-xl font-semibold text-foreground">
                                Order #{order?.orderNumber}
                            </h2>
                            <OrderStatusBadge status={order?.status} />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Select
                                options={statusOptions}
                                value={order?.status}
                                onChange={(status) => onStatusUpdate(order?.id, status)}
                                className="w-40"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                iconName="X"
                            />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-border">
                        <nav className="flex px-6 space-x-8">
                            {tabs?.map((tab) => (
                                <button
                                    key={tab?.id}
                                    onClick={() => setActiveTab(tab?.id)}
                                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${activeTab === tab?.id
                                        ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                                        }`}
                                >
                                    <Icon name={tab?.icon} size={16} />
                                    <span>{tab?.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6 overflow-y-auto max-h-96">
                        {activeTab === 'details' && (
                            <div className="space-y-6">
                                {/* Order Summary */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="p-4 rounded-lg bg-muted">
                                        <h3 className="mb-2 font-medium text-foreground">Order Total</h3>
                                        <p className="text-2xl font-bold text-foreground">{formatCurrency(order?.total)}</p>
                                        <p className="text-sm text-muted-foreground">Payment: {order?.paymentStatus}</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-muted">
                                        <h3 className="mb-2 font-medium text-foreground">Items</h3>
                                        <p className="text-2xl font-bold text-foreground">{order?.items}</p>
                                        <p className="text-sm text-muted-foreground">Products ordered</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-muted">
                                        <h3 className="mb-2 font-medium text-foreground">Order Date</h3>
                                        <p className="text-sm font-medium text-foreground">{formatDate(order?.date)}</p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div>
                                    <h3 className="mb-4 font-medium text-foreground">Order Items</h3>
                                    <div className="space-y-3">
                                        {order?.orderItems?.map((item, index) => (
                                            <div key={index} className="flex items-center p-4 space-x-4 rounded-lg bg-muted">
                                                <Image
                                                    src={item?.image}
                                                    alt={item?.name}
                                                    className="object-cover w-16 h-16 rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-foreground">{item?.name}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item?.variant && `${item?.variant} • `}Qty: {item?.quantity}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-foreground">{formatCurrency(item?.price)}</p>
                                                    <p className="text-sm text-muted-foreground">each</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'customer' && (
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <Image
                                        src={order?.customer?.avatar}
                                        alt={order?.customer?.name}
                                        className="object-cover w-16 h-16 rounded-full"
                                    />
                                    <div>
                                        <h3 className="text-lg font-medium text-foreground">{order?.customer?.name}</h3>
                                        <p className="text-muted-foreground">{order?.customer?.email}</p>
                                        <p className="text-sm text-muted-foreground">Customer since {order?.customer?.joinDate}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <h4 className="mb-3 font-medium text-foreground">Billing Address</h4>
                                        <div className="p-4 space-y-1 rounded-lg bg-muted">
                                            <p className="text-foreground">{order?.billingAddress?.name}</p>
                                            <p className="text-muted-foreground">{order?.billingAddress?.street}</p>
                                            <p className="text-muted-foreground">
                                                {order?.billingAddress?.city}, {order?.billingAddress?.state} {order?.billingAddress?.zip}
                                            </p>
                                            <p className="text-muted-foreground">{order?.billingAddress?.country}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="mb-3 font-medium text-foreground">Shipping Address</h4>
                                        <div className="p-4 space-y-1 rounded-lg bg-muted">
                                            <p className="text-foreground">{order?.shippingAddress?.name}</p>
                                            <p className="text-muted-foreground">{order?.shippingAddress?.street}</p>
                                            <p className="text-muted-foreground">
                                                {order?.shippingAddress?.city}, {order?.shippingAddress?.state} {order?.shippingAddress?.zip}
                                            </p>
                                            <p className="text-muted-foreground">{order?.shippingAddress?.country}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'shipping' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="p-4 rounded-lg bg-muted">
                                        <h4 className="mb-3 font-medium text-foreground">Shipping Method</h4>
                                        <p className="text-foreground">{order?.shippingMethod}</p>
                                        <p className="text-sm text-muted-foreground">Estimated delivery: {order?.estimatedDelivery}</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-muted">
                                        <h4 className="mb-3 font-medium text-foreground">Tracking</h4>
                                        {order?.trackingNumber ? (
                                            <div>
                                                <p className="font-mono text-foreground">{order?.trackingNumber}</p>
                                                <Button variant="link" size="sm" iconName="ExternalLink" iconPosition="right">
                                                    Track Package
                                                </Button>
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground">No tracking number assigned</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notes' && (
                            <div className="space-y-6">
                                <div>
                                    <h4 className="mb-3 font-medium text-foreground">Add Note</h4>
                                    <div className="space-y-3">
                                        <Input
                                            type="text"
                                            placeholder="Add a note about this order..."
                                            value={newNote}
                                            onChange={(e) => setNewNote(e?.target?.value)}
                                        />
                                        <Button
                                            onClick={handleAddNote}
                                            disabled={!newNote?.trim()}
                                            iconName="Plus"
                                            iconPosition="left"
                                        >
                                            Add Note
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="mb-3 font-medium text-foreground">Order Notes</h4>
                                    <div className="space-y-3">
                                        {order?.notes?.map((note, index) => (
                                            <div key={index} className="p-4 rounded-lg bg-muted">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-foreground">{note?.author}</span>
                                                    <span className="text-sm text-muted-foreground">{formatDate(note?.date)}</span>
                                                </div>
                                                <p className="text-foreground">{note?.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'refunds' && (
                            <div className="space-y-6">
                                <div>
                                    <h4 className="mb-3 font-medium text-foreground">Process Refund</h4>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            type="number"
                                            label="Refund Amount"
                                            placeholder="0.00"
                                            value={refundAmount}
                                            onChange={(e) => setRefundAmount(e?.target?.value)}
                                            description={`Max refundable: ${formatCurrency(order?.total)}`}
                                        />
                                        <Select
                                            label="Refund Reason"
                                            options={refundReasonOptions}
                                            value={refundReason}
                                            onChange={setRefundReason}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <Button
                                            onClick={handleRefund}
                                            disabled={!refundAmount || !refundReason}
                                            variant="destructive"
                                            iconName="RefreshCw"
                                            iconPosition="left"
                                        >
                                            Process Refund
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="mb-3 font-medium text-foreground">Refund History</h4>
                                    <div className="space-y-3">
                                        {order?.refunds?.map((refund, index) => (
                                            <div key={index} className="p-4 rounded-lg bg-muted">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm text-muted-foreground">{formatDate(refund?.date)}</span>
                                                    <span className="font-medium text-foreground">
                                                        {formatCurrency(refund?.amount)} - {refund?.type}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">Reason: {refund?.reason}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end px-6 py-4 space-x-3 border-t border-border bg-muted/30">
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            iconName="Printer"
                            iconPosition="left"
                        >
                            Print Order
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;


