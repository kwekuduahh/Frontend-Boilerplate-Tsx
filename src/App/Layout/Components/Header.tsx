import { useState, useRef } from 'react';
import { useLocation } from 'react-router';
import { Button } from '@/_Shared/Components/Ui/button';
import { DynamicIcon } from 'lucide-react/dynamic';

const Header = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const profileRef = useRef(null);
    const notificationRef = useRef(null);
    const location = useLocation();

    // const unreadNotifications = notifications?.filter(n => !n?.read)?.length;

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (profileRef?.current && !profileRef?.current?.contains(event?.target)) {
    //             setIsProfileOpen(false);
    //         }
    //         if (notificationRef?.current && !notificationRef?.current?.contains(event?.target)) {
    //             setIsNotificationOpen(false);
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, []);

    // const handleNotificationClick = (notification) => {
    //     onNotificationClick(notification);
    //     setIsNotificationOpen(false);
    // };

    const getPageTitle = (): string => {
        const pathMap = {
            '/main-dashboard': 'Dashboard',
            '/order-management': 'Order Management',
            '/product-catalog': 'Product Catalog',
            '/customer-directory': 'Customer Directory',
            '/inventory-management': 'Inventory Management',
            '/analytics-reports': 'Analytics & Reports'
        };

        return pathMap?.[location?.pathname as keyof typeof pathMap] || 'Merch Street Admin';
    };

    return (
        <header className="fixed top-0 left-0 right-0 border-b bg-surface border-border z-1000 shadow-card">
            <div className="flex items-center justify-between h-16 px-6">
                {/* Logo and Brand */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent">
                            <DynamicIcon name="store" size={20} color="white" strokeWidth={2.5} />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-lg font-semibold text-foreground">Merch Street</h1>
                            <p className="-mt-1 text-xs text-muted-foreground">Admin Portal</p>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <DynamicIcon name={isMobileMenuOpen ? "x" : "menu"} size={20} />
                    </Button>
                </div>

                {/* Page Title - Hidden on mobile */}
                <div className="hidden md:block">
                    <h2 className="text-lg font-medium text-foreground">{getPageTitle()}</h2>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-2">
                    {/* Search - Hidden on small screens */}
                    <div className="hidden lg:block">
                        <div className="relative">
                            <DynamicIcon
                                name="search"
                                size={16}
                                className="absolute transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground"
                            />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-64 py-2 pl-10 pr-4 text-sm border rounded-lg bg-muted border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
                            />
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="relative" ref={notificationRef}>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            className="relative"
                        >
                            <DynamicIcon name="bell" size={20} />
                            {/* {unreadNotifications > 0 && (
                                <span className="absolute flex items-center justify-center w-5 h-5 text-xs rounded-full -top-1 -right-1 bg-accent text-accent-foreground animate-pulse-slow">
                                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                                </span>
                            )} */}
                        </Button>

                        {/* Notifications Dropdown */}
                        {/* {isNotificationOpen && (
                            <div className="absolute right-0 mt-2 border rounded-lg w-80 bg-popover border-border shadow-dropdown z-1200 animate-fade-in">
                                <div className="p-4 border-b border-border">
                                    <h3 className="font-medium text-popover-foreground">Notifications</h3>
                                    {unreadNotifications > 0 && (
                                        <p className="text-sm text-muted-foreground">{unreadNotifications} unread</p>
                                    )}
                                </div>
                                <div className="overflow-y-auto max-h-96">
                                    {notifications?.length > 0 ? (
                                        notifications?.slice(0, 5)?.map((notification) => (
                                            <div
                                                key={notification?.id}
                                                className={`p-4 border-b border-border cursor-pointer transition-hover hover:bg-muted ${!notification?.read ? 'bg-muted/50' : ''
                                                    }`}
                                                onClick={() => handleNotificationClick(notification)}
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <div className={`w-2 h-2 rounded-full mt-2 ${notification?.type === 'error' ? 'bg-error' :
                                                        notification?.type === 'warning' ? 'bg-warning' :
                                                            notification?.type === 'success' ? 'bg-success' : 'bg-primary'
                                                        }`} />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium truncate text-popover-foreground">
                                                            {notification?.title}
                                                        </p>
                                                        <p className="mt-1 text-sm text-muted-foreground">
                                                            {notification?.message}
                                                        </p>
                                                        <p className="mt-2 text-xs text-muted-foreground">
                                                            {notification?.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center">
                                            <Icon name="Bell" size={32} className="mx-auto mb-2 text-muted-foreground" />
                                            <p className="text-muted-foreground">No notifications</p>
                                        </div>
                                    )}
                                </div>
                                {notifications?.length > 5 && (
                                    <div className="p-3 border-t border-border">
                                        <Button variant="ghost" size="sm" className="w-full">
                                            View all notifications
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )} */}
                    </div>

                    {/* User Profile */}
                    <div className="relative" ref={profileRef}>
                        <Button
                            variant="ghost"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center px-3 space-x-2"
                        >
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary">
                                <DynamicIcon name="user" size={16} color="white" />
                            </div>
                            <div className="hidden text-left sm:block">
                                <p className="text-sm font-medium text-foreground">
                                    {'Admin User'}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {'Super Admin'}
                                </p>
                            </div>
                            <DynamicIcon name="chevron-down" size={16} className="text-muted-foreground" />
                        </Button>

                        {/* Profile Dropdown */}
                        {/* {isProfileOpen && (
                            <div className="absolute right-0 w-56 mt-2 border rounded-lg bg-popover border-border shadow-dropdown z-1200 animate-fade-in">
                                <div className="p-4 border-b border-border">
                                    <p className="font-medium text-popover-foreground">{'Admin User'}</p>
                                    <p className="text-sm text-muted-foreground">{user?.email || 'admin@merchstreet.com'}</p>
                                </div>
                                <div className="py-2">
                                    <button
                                        onClick={() => {
                                            onProfileClick('profile');
                                            setIsProfileOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 space-x-2 text-sm text-left text-popover-foreground hover:bg-muted transition-hover"
                                    >
                                        <Icon name="User" size={16} />
                                        <span>Profile Settings</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            onProfileClick('preferences');
                                            setIsProfileOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 space-x-2 text-sm text-left text-popover-foreground hover:bg-muted transition-hover"
                                    >
                                        <Icon name="Settings" size={16} />
                                        <span>Preferences</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            onProfileClick('help');
                                            setIsProfileOpen(false);
                                        }}
                                        className="flex items-center w-full px-4 py-2 space-x-2 text-sm text-left text-popover-foreground hover:bg-muted transition-hover"
                                    >
                                        <Icon name="HelpCircle" size={16} />
                                        <span>Help & Support</span>
                                    </button>
                                    <div className="pt-2 mt-2 border-t border-border">
                                        <button
                                            onClick={() => {
                                                onProfileClick('logout');
                                                setIsProfileOpen(false);
                                            }}
                                            className="flex items-center w-full px-4 py-2 space-x-2 text-sm text-left text-error hover:bg-muted transition-hover"
                                        >
                                            <Icon name="LogOut" size={16} />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 lg:hidden top-16 bg-background z-1100">
                    <div className="p-4">
                        <div className="mb-4">
                            <div className="relative">
                                <DynamicIcon
                                    name="search"
                                    size={16}
                                    className="absolute transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground"
                                />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg bg-muted border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;


