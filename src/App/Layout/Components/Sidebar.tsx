import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button } from '@/_Shared/Components/Ui/button';
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic';
import { useSidebar } from '@/_Shared/Hooks/useSidebar';

const Sidebar = () => {
    const { isCollapsed, onToggle } = useSidebar();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const navigationItems = [
        {
            label: 'Dashboard',
            path: '/main-dashboard',
            icon: 'layout-dashboard',
            description: 'Overview and KPIs'
        },
        {
            label: 'Orders',
            path: '/order-management',
            icon: 'shopping-cart',
            description: 'Order processing and fulfillment',
            badge: 0
        },
        {
            label: 'Products',
            path: '/product-catalog',
            icon: 'package',
            description: 'Product catalog management'
        },
        {
            label: 'Customers',
            path: '/customer-directory',
            icon: 'users',
            description: 'Customer relationship management',
            badge: 3
        },
        {
            label: 'Inventory',
            path: '/inventory-management',
            icon: 'warehouse',
            description: 'Stock monitoring and control',
            badge: 1
        },
        {
            label: 'Analytics',
            path: '/analytics-reports',
            icon: 'bar-chart-3',
            description: 'Business intelligence and reports'
        }
    ];

    const handleNavigation = (path: string) => {
        navigate(path);
        setIsMobileOpen(false);
    };

    const isActive = (path: string) => location?.pathname === path;

    const SidebarContent = () => (
        <>
            {/* Logo Section */}
            <div className={`flex items-center px-6 py-4 border-b border-border ${isCollapsed ? 'justify-center px-4' : ''}`}>
                <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent">
                        <DynamicIcon name="store" size={20} color="white" strokeWidth={2.5} />
                    </div>
                    {!isCollapsed && (
                        <div className="min-w-0">
                            <h1 className="text-lg font-semibold truncate text-foreground">Merch Street</h1>
                            <p className="-mt-1 text-xs text-muted-foreground">Admin Portal</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {navigationItems?.map((item) => {
                    const active = isActive(item?.path);
                    return (
                        <div key={item?.path} className="relative group">
                            <button
                                onClick={() => handleNavigation(item?.path)}
                                className={`w-full flex items-center px-3 py-3 rounded-lg text-left transition-smooth relative ${active
                                    ? 'bg-primary text-primary-foreground shadow-card'
                                    : 'text-foreground hover:bg-muted hover:text-foreground'
                                    } ${isCollapsed ? 'justify-center' : 'space-x-3'}`}
                                title={isCollapsed ? item?.label : ''}
                            >
                                <DynamicIcon
                                    name={item?.icon as keyof typeof dynamicIconImports}
                                    size={20}
                                    className={`flex-shrink-0 ${active ? 'text-primary-foreground' : ''}`}
                                />
                                {!isCollapsed && (
                                    <>
                                        <div className="flex-1 min-w-0">
                                            <span className="block font-medium truncate">{item?.label}</span>
                                            <span className={`text-xs truncate block ${active ? 'text-primary-foreground/80' : 'text-muted-foreground'
                                                }`}>
                                                {item?.description}
                                            </span>
                                        </div>
                                        {item?.badge && item?.badge > 0 && (
                                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${active
                                                ? 'bg-primary-foreground text-primary'
                                                : 'bg-accent text-accent-foreground'
                                                } animate-pulse-slow`}>
                                                {item?.badge > 99 ? '99+' : item?.badge}
                                            </span>
                                        )}
                                    </>
                                )}
                                {isCollapsed && item && item.badge && item.badge > 0 && (
                                    <span className="absolute flex items-center justify-center w-5 h-5 text-xs rounded-full -top-1 -right-1 bg-accent text-accent-foreground animate-pulse-slow">
                                        {item?.badge && item?.badge > 9 ? '9+' : item?.badge}
                                    </span>
                                )}
                            </button>
                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                                <div className="absolute px-3 py-2 ml-2 text-sm transform -translate-y-1/2 rounded-lg opacity-0 pointer-events-none left-full top-1/2 bg-popover text-popover-foreground shadow-dropdown group-hover:opacity-100 transition-smooth z-1200 whitespace-nowrap">
                                    <div className="font-medium">{item?.label}</div>
                                    <div className="text-xs text-muted-foreground">{item?.description}</div>
                                    <div className="absolute left-0 w-2 h-2 transform rotate-45 -translate-x-1 -translate-y-1/2 border-t border-l top-1/2 bg-popover border-border"></div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Collapse Toggle */}
            <div className={`px-4 py-4 border-t border-border ${isCollapsed ? 'px-2' : ''}`}>
                <Button
                    variant="ghost"
                    size={isCollapsed ? "icon" : "sm"}
                    onClick={onToggle}
                    className={`w-full ${isCollapsed ? '' : 'justify-start space-x-2'}`}
                    title={isCollapsed ? (isCollapsed ? 'Expand sidebar' : 'Collapse sidebar') : ''}
                >
                    <DynamicIcon name={isCollapsed ? "chevron-right" : "chevron-left"} size={16} />
                    {!isCollapsed && <span>Collapse</span>}
                </Button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-900 lg:flex-col bg-surface border-r border-border shadow-card transition-smooth ${isCollapsed ? 'lg:w-20' : 'lg:w-60'
                }`}>
                <SidebarContent />
            </aside>
            {/* Mobile Sidebar Toggle */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed lg:hidden bottom-4 right-4 z-1100 bg-primary text-primary-foreground shadow-modal hover:bg-primary/90"
                onClick={() => setIsMobileOpen(true)}
            >
                <DynamicIcon name="menu" size={20} />
            </Button>
            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div className="fixed inset-0 lg:hidden z-1100">
                    <div
                        className="absolute inset-0 bg-black/50 transition-smooth"
                        onClick={() => setIsMobileOpen(false)}
                    />
                    <aside className="absolute top-0 bottom-0 left-0 flex flex-col w-64 border-r bg-surface border-border shadow-modal animate-slide-in">
                        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent">
                                    <DynamicIcon name="store" size={20} color="white" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold text-foreground">Merch Street</h1>
                                    <p className="-mt-1 text-xs text-muted-foreground">Admin Portal</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsMobileOpen(false)}
                            >
                                <DynamicIcon name="x" size={20} />
                            </Button>
                        </div>

                        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                            {navigationItems?.map((item) => {
                                const active = isActive(item?.path);
                                return (
                                    <button
                                        key={item?.path}
                                        onClick={() => handleNavigation(item?.path)}
                                        className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-smooth ${active
                                            ? 'bg-primary text-primary-foreground shadow-card'
                                            : 'text-foreground hover:bg-muted hover:text-foreground'
                                            }`}
                                    >
                                        <DynamicIcon
                                            name={item?.icon as keyof typeof dynamicIconImports}
                                            size={20}
                                            className={`flex-shrink-0 ${active ? 'text-primary-foreground' : ''}`}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <span className="block font-medium truncate">{item?.label}</span>
                                            <span className={`text-xs truncate block ${active ? 'text-primary-foreground/80' : 'text-muted-foreground'
                                                }`}>
                                                {item?.description}
                                            </span>
                                        </div>
                                        {item && item.badge && item?.badge > 0 && (
                                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${active
                                                ? 'bg-primary-foreground text-primary'
                                                : 'bg-accent text-accent-foreground'
                                                } animate-pulse-slow`}>
                                                {item?.badge > 99 ? '99+' : item?.badge}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>
                </div>
            )}
        </>
    );
};

export default Sidebar;


