import React, { useState } from 'react';
import CustomerStats from '@/Modules/Customer-Directory/components/CustomerStats';
import CustomerFilters from '@/Modules/Customer-Directory/components/CustomerFilters';
import CustomerTable from '@/Modules/Customer-Directory/components/CustomerTable';
import CustomerProfileModal from '@/Modules/Customer-Directory/components/CustomerProfileModal';
import EmailModal from '@/Modules/Customer-Directory/components/EmailModal';

import { Button } from '@/_Shared/Components/Ui/button';
import type { Customer } from './types';
import { useSidebar } from '@/_Shared/Hooks/useSidebar';
import { DynamicIcon } from 'lucide-react/dynamic';

const CustomerDirectory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSegment, setSelectedSegment] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const [sortConfig] = useState({ key: "", direction: 'asc' });
    const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);

    const { isCollapsed } = useSidebar();
    // Mock customer data
    const mockCustomers = [
        {
            id: 'CUST-001',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@email.com',
            phone: '+1 (555) 123-4567',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            registrationDate: '2024-01-15',
            registrationTime: '10:30 AM',
            orderCount: 24,
            lifetimeValue: '$3,240.50',
            avgOrderValue: '$135.02',
            lastOrderDate: '2024-09-10',
            lastActivity: '2 hours ago',
            segment: 'vip',
            status: 'active',
            billingAddress: '123 Main St, New York, NY 10001',
            shippingAddress: '123 Main St, New York, NY 10001',
            recentOrders: [
                { id: 'ORD-1001', date: '2024-09-10', items: 3, total: '$156.99', status: 'delivered' },
                { id: 'ORD-0987', date: '2024-08-28', items: 2, total: '$89.50', status: 'delivered' },
                { id: 'ORD-0945', date: '2024-08-15', items: 1, total: '$45.00', status: 'delivered' }
            ],
            communications: [
                {
                    id: 'COMM-001',
                    type: 'email',
                    subject: 'Order Confirmation - ORD-1001',
                    preview: 'Thank you for your recent order. Your items are being processed...',
                    date: '2024-09-10',
                    status: 'delivered',
                    sender: 'System'
                }
            ],
            supportTickets: [
                {
                    id: 'TICK-001',
                    subject: 'Question about return policy',
                    description: 'Customer inquiring about return timeframe for recent purchase',
                    status: 'resolved',
                    priority: 'low',
                    created: '2024-09-05',
                    updated: '2024-09-06',
                    assignee: 'Mike Chen'
                }
            ]
        },
        {
            id: 'CUST-002',
            name: 'Michael Rodriguez',
            email: 'michael.rodriguez@email.com',
            phone: '+1 (555) 234-5678',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            registrationDate: '2024-02-20',
            registrationTime: '2:15 PM',
            orderCount: 18,
            lifetimeValue: '$2,890.75',
            avgOrderValue: '$160.60',
            lastOrderDate: '2024-09-08',
            lastActivity: '1 day ago',
            segment: 'frequent',
            status: 'active',
            billingAddress: '456 Oak Ave, Los Angeles, CA 90210',
            shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
            recentOrders: [
                { id: 'ORD-1002', date: '2024-09-08', items: 2, total: '$198.50', status: 'shipped' },
                { id: 'ORD-0988', date: '2024-08-25', items: 4, total: '$267.99', status: 'delivered' }
            ],
            communications: [],
            supportTickets: []
        },
        {
            id: 'CUST-003',
            name: 'Emily Chen',
            email: 'emily.chen@email.com',
            phone: '+1 (555) 345-6789',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            registrationDate: '2024-03-10',
            registrationTime: '11:45 AM',
            orderCount: 12,
            lifetimeValue: '$1,567.25',
            avgOrderValue: '$130.60',
            lastOrderDate: '2024-09-05',
            lastActivity: '4 days ago',
            segment: 'frequent',
            status: 'active',
            billingAddress: '789 Pine St, Chicago, IL 60601',
            shippingAddress: '789 Pine St, Chicago, IL 60601',
            recentOrders: [
                { id: 'ORD-0989', date: '2024-09-05', items: 1, total: '$75.00', status: 'processing' }
            ],
            communications: [],
            supportTickets: []
        },
        {
            id: 'CUST-004',
            name: 'David Thompson',
            email: 'david.thompson@email.com',
            phone: '+1 (555) 456-7890',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            registrationDate: '2024-08-15',
            registrationTime: '4:20 PM',
            orderCount: 3,
            lifetimeValue: '$287.50',
            avgOrderValue: '$95.83',
            lastOrderDate: '2024-08-30',
            lastActivity: '2 weeks ago',
            segment: 'new',
            status: 'active',
            billingAddress: '321 Elm St, Houston, TX 77001',
            shippingAddress: '321 Elm St, Houston, TX 77001',
            recentOrders: [
                { id: 'ORD-0946', date: '2024-08-30', items: 2, total: '$125.00', status: 'delivered' }
            ],
            communications: [],
            supportTickets: []
        },
        {
            id: 'CUST-005',
            name: 'Lisa Anderson',
            email: 'lisa.anderson@email.com',
            phone: '+1 (555) 567-8901',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
            registrationDate: '2023-11-20',
            registrationTime: '9:10 AM',
            orderCount: 8,
            lifetimeValue: '$945.00',
            avgOrderValue: '$118.13',
            lastOrderDate: '2024-07-15',
            lastActivity: '2 months ago',
            segment: 'at-risk',
            status: 'inactive',
            billingAddress: '654 Maple Dr, Phoenix, AZ 85001',
            shippingAddress: '654 Maple Dr, Phoenix, AZ 85001',
            recentOrders: [
                { id: 'ORD-0847', date: '2024-07-15', items: 1, total: '$89.99', status: 'delivered' }
            ],
            communications: [],
            supportTickets: []
        },
        {
            id: 'CUST-006',
            name: 'James Wilson',
            email: 'james.wilson@email.com',
            phone: '+1 (555) 678-9012',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            registrationDate: '2024-09-01',
            registrationTime: '1:30 PM',
            orderCount: 1,
            lifetimeValue: '$67.50',
            avgOrderValue: '$67.50',
            lastOrderDate: '2024-09-02',
            lastActivity: '11 days ago',
            segment: 'new',
            status: 'pending',
            billingAddress: '987 Cedar Ln, Miami, FL 33101',
            shippingAddress: '987 Cedar Ln, Miami, FL 33101',
            recentOrders: [
                { id: 'ORD-0990', date: '2024-09-02', items: 1, total: '$67.50', status: 'pending' }
            ],
            communications: [],
            supportTickets: []
        }
    ];

    // Mock statistics
    const mockStats = {
        totalCustomers: 1247,
        activeCustomers: 1089,
        newThisMonth: 156,
        vipCustomers: 89,
        avgLifetimeValue: '$1,456.75',
        retentionRate: '87.3%',
        totalCustomersChange: '+12%',
        activeCustomersChange: '+8%',
        newThisMonthChange: '+24%',
        vipCustomersChange: '+5%',
        avgLifetimeValueChange: '+15%',
        retentionRateChange: '+3%'
    };

    // Mock segment counts
    const segmentCounts = {
        vip: mockCustomers?.filter(c => c?.segment === 'vip')?.length,
        frequent: mockCustomers?.filter(c => c?.segment === 'frequent')?.length,
        'at-risk': mockCustomers?.filter(c => c?.segment === 'at-risk')?.length,
        new: mockCustomers?.filter(c => c?.segment === 'new')?.length
    };

    const handleViewProfile = (customer: Customer) => {
        setSelectedCustomer(customer);
        setShowProfileModal(true);
    };

    const handleSendEmail = (customer: Customer) => {
        setSelectedCustomer(customer);
        setShowEmailModal(true);
    };

    const handleManageAccount = (customer: Customer) => {
        console.log('Managing account for:', customer?.name);
        // Implementation for account management
    };

    const handleSendEmailAction = async (emailData: {
        recipientEmail: string;
        recipientName: string;
        template: string;
        subject: string;
        message: string;
        priority: string;
        sendCopy: boolean;
    }) => {
        console.log('Sending email:', emailData);
        // Mock email sending
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(undefined);
            }, 1000);
        });
    };

    const handleExport = () => {
        console.log('Exporting customer data');
        // Implementation for data export
    };

    const handleImport = () => {
        console.log('Importing customer data');
        // Implementation for data import
    };

    return (
        <main className={`pt-16 transition-smooth ${isCollapsed ? 'lg:pl-20' : 'lg:pl-60'
            }`}>
            <div className="p-6">
                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Customer Directory</h1>
                            <p className="mt-1 text-muted-foreground">
                                Manage customer relationships and communications
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button
                                variant="outline"
                                onClick={handleExport}
                            >
                                <DynamicIcon name="download" size={16} />
                                Export Data
                            </Button>
                            <Button
                                variant="default"
                            >
                                <DynamicIcon name="user-plus" size={16} />
                                Add Customer
                            </Button>

                        </div>
                    </div>
                </div>

                {/* Customer Statistics */}
                <CustomerStats stats={mockStats} />

                {/* Filters */}
                <CustomerFilters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectedSegment={selectedSegment}
                    onSegmentChange={setSelectedSegment}
                    selectedStatus={selectedStatus}
                    onStatusChange={setSelectedStatus}
                    dateRange={dateRange}
                    onDateRangeChange={setDateRange}
                    segmentCounts={segmentCounts}
                    onExport={handleExport}
                    onImport={handleImport}
                />

                {/* Customer Table */}
                <CustomerTable
                    customers={mockCustomers}
                    onViewProfile={handleViewProfile}
                    onSendEmail={handleSendEmail}
                    onManageAccount={handleManageAccount}
                    searchTerm={searchTerm}
                    selectedSegment={selectedSegment}
                    sortConfig={sortConfig as { key: string | null; direction: 'asc' | 'desc' }}
                />
                <CustomerProfileModal
                    customer={selectedCustomer!}
                    isOpen={showProfileModal}
                    onClose={() => setShowProfileModal(false)}
                    onSendEmail={handleSendEmail}
                    onManageAccount={handleManageAccount}
                />
                <EmailModal
                    customer={selectedCustomer!}
                    isOpen={showEmailModal}
                    onClose={() => setShowEmailModal(false)}
                    onSend={async (payload) => { await handleSendEmailAction(payload); }}
                />
            </div>
        </main>
    );
};

export default CustomerDirectory;


