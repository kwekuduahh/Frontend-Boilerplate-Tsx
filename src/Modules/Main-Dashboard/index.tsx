import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import KPICard from './components/KPICard';
import SalesChart from './components/SalesChart';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import AlertCenter from './components/AlertCenter';
import LiveCounter from './components/LiveCounter';
import { Button } from '@/_Shared/Components/Ui/button';
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic';
import { useSidebar } from '@/_Shared/Hooks/useSidebar';

const MainDashboard = () => {
    const navigate = useNavigate();
    const { isCollapsed } = useSidebar();
    const [isLoading, setIsLoading] = useState(true);
    const [dateRange, setDateRange] = useState('7d');
    const [refreshing, setRefreshing] = useState(false);

    // Mock user data
    const user = {
        name: "Alex Thompson",
        email: "alex.thompson@merchstreet.com",
        role: "Super Admin"
    };


    // Mock KPI data
    const kpiData: {
        title: string;
        value: string;
        change: string;
        changeType: 'positive' | 'negative' | 'neutral';
        icon: keyof typeof dynamicIconImports;
        description: string;
    }[] = [
            {
                title: "Total Revenue",
                value: "$47,892",
                change: "+12.5%",
                changeType: "positive",
                icon: "dollar-sign",
                description: "vs last month"
            },
            {
                title: "Total Orders",
                value: "1,247",
                change: "+8.2%",
                changeType: "positive",
                icon: "shopping-cart",
                description: "vs last month"
            },
            {
                title: "Active Customers",
                value: "892",
                change: "+15.3%",
                changeType: "positive",
                icon: "users",
                description: "vs last month"
            },
            {
                title: "Conversion Rate",
                value: "3.24%",
                change: "-2.1%",
                changeType: "negative",
                icon: "trending-up",
                description: "vs last month"
            }
        ];

    // Mock quick action notifications
    const quickActionNotifications = {
        newOrders: 0,
        pendingOrders: 12,
        customerInquiries: 5,
        lowStock: 8,
        failedPayments: 3,
        returns: 2
    };

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setRefreshing(false);
    };

    const handleKPIClick = (title: string) => {
        // Navigate to relevant section based on KPI
        const navigationMap = {
            "Total Revenue": "/analytics-reports",
            "Total Orders": "/order-management",
            "Active Customers": "/customer-directory",
            "Conversion Rate": "/analytics-reports"
        };

        if (navigationMap?.[title as keyof typeof navigationMap]) {
            navigate(navigationMap?.[title as keyof typeof navigationMap]);
        }
    };

    const handleQuickAction = (actionId: string) => {
        console.log(`Quick action triggered: ${actionId}`);

        // Navigate based on action
        const actionRoutes = {
            'new-order': '/order-management',
            'pending-orders': '/order-management',
            'customer-support': '/customer-directory',
            'low-stock': '/inventory-management',
            'failed-payments': '/order-management',
            'returns': '/order-management'
        };

        if (actionRoutes?.[actionId as keyof typeof actionRoutes]) {
            navigate(actionRoutes?.[actionId as keyof typeof actionRoutes]);
        }
    };

    const handleAlertAction = (alertId: number, action: string) => {
        console.log(`Alert ${alertId}: ${action} action`);
    };

    const handleAlertDismiss = (alertId: number) => {
        console.log(`Alert ${alertId} dismissed`);
    };


    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-primary to-accent animate-pulse">
                        <DynamicIcon name="store" size={32} className="text-white" />
                    </div>
                    <h2 className="mb-2 text-xl font-semibold text-foreground">Loading Dashboard</h2>
                    <p className="text-muted-foreground">Please wait while we fetch your data...</p>
                </div>
            </div>
        );
    }

    return (
        <main className={`transition-smooth ${isCollapsed ? 'lg:ml-20' : 'lg:ml-60'
            } pt-16`}>
            <div className="p-6 space-y-6">
                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
                        <p className="text-muted-foreground">
                            Welcome back, {user?.name}. Here's what's happening with your store today.
                        </p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="flex p-1 rounded-lg bg-muted">
                            {['7d', '30d', '90d']?.map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setDateRange(range)}
                                    className={`px-3 py-1 text-sm font-medium rounded-md transition-smooth ${dateRange === range
                                        ? 'bg-primary text-primary-foreground shadow-card'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                                </button>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRefresh}
                            disabled={refreshing}
                        >
                            <DynamicIcon name={refreshing ? "loader-circle" : "refresh-cw"} size={16} className={refreshing ? "animate-spin" : ""} />
                            Refresh
                        </Button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {kpiData?.map((kpi, index) => (
                        <KPICard
                            key={index}
                            title={kpi?.title}
                            value={kpi?.value}
                            change={kpi?.change}
                            changeType={kpi?.changeType as 'positive' | 'negative' | 'neutral'}
                            icon={kpi?.icon}
                            description={kpi?.description}
                            onClick={() => handleKPIClick(kpi?.title)}
                        />
                    ))}
                </div>

                {/* Quick Actions */}
                <QuickActions
                    notifications={quickActionNotifications}
                    onActionClick={handleQuickAction}
                />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    {/* Left Column - Charts */}
                    <div className="space-y-6 xl:col-span-2">
                        <SalesChart
                            title="Revenue & Orders Trend"
                            type="line"
                        />

                        <AlertCenter
                            alerts={[]}
                            onAlertAction={handleAlertAction}
                            onDismiss={handleAlertDismiss}
                        />
                    </div>

                    {/* Right Column - Activity & Live Data */}
                    <div className="space-y-6">
                        <LiveCounter
                            title="Today's Sales"
                            currentValue={12450}
                            target={15000}
                            unit="$"
                            updateInterval={8000}
                            isLive={true}
                        />

                        <ActivityFeed
                            title="Live Activity Feed"
                        />
                    </div>
                </div>

                {/* Bottom Section - Additional Charts */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <SalesChart
                        title="Product Performance"
                        type="bar"
                    />

                    <div className="p-6 border rounded-lg bg-card border-border shadow-card">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-foreground">Quick Stats</h3>
                            <DynamicIcon name="bar-chart-3" size={20} className="text-muted-foreground" />
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success">
                                        <DynamicIcon name="check-circle" size={16} color="white" />
                                    </div>
                                    <span className="font-medium text-foreground">Orders Completed</span>
                                </div>
                                <span className="text-xl font-bold text-foreground">1,247</span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-warning">
                                        <DynamicIcon name="clock" size={16} color="white" />
                                    </div>
                                    <span className="font-medium text-foreground">Pending Orders</span>
                                </div>
                                <span className="text-xl font-bold text-foreground">12</span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
                                        <DynamicIcon name="users" size={16} color="white" />
                                    </div>
                                    <span className="font-medium text-foreground">New Customers</span>
                                </div>
                                <span className="text-xl font-bold text-foreground">89</span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center justify-center w-8 h-8 bg-purple-500 rounded-full">
                                        <DynamicIcon name="package" size={16} color="white" />
                                    </div>
                                    <span className="font-medium text-foreground">Products Sold</span>
                                </div>
                                <span className="text-xl font-bold text-foreground">2,156</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MainDashboard;


