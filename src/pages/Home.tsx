import React, { useState } from 'react';
import {
    LayoutDashboard,
    BarChart3,
    Users,
    DollarSign,
    FileText,
    Settings,
    Zap,
    Search,
    Bell,
    ChevronDown,
    Calendar,
    Download,
    RefreshCw,
    TrendingUp,
    TrendingDown,
    User,
    ShoppingCart,
    RotateCcw,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    Menu,
    X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'up' | 'down';
    icon: React.ReactNode;
    iconBg: string;
}

interface SalesRecord {
    id: string;
    customer: {
        name: string;
        email: string;
        avatar: string;
    };
    product: string;
    date: string;
    amount: string;
    status: 'completed' | 'pending' | 'failed';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeType, icon, iconBg }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
                <div className="flex items-center mt-2 text-sm">
                    <span className={`flex items-center font-medium ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {changeType === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                        {change}
                    </span>
                    <span className="text-gray-500 ml-2">vs last period</span>
                </div>
            </div>
            <div className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center`}>
                {icon}
            </div>
        </div>
    </div>
);

const StatusBadge: React.FC<{ status: 'completed' | 'pending' | 'failed' }> = ({ status }) => {
    const styles = {
        completed: 'bg-green-100 text-green-800',
        pending: 'bg-amber-100 text-amber-800',
        failed: 'bg-red-100 text-red-800'
    };

    const labels = {
        completed: 'Completed',
        pending: 'Pending',
        failed: 'Failed'
    };

    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
            {labels[status]}
        </span>
    );
};

const Dashboard: React.FC = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
    const [selectedTimeframe, setSelectedTimeframe] = useState('Day');

    const metrics = [
        {
            title: 'Total Revenue',
            value: '$48,294.30',
            change: '12.5%',
            changeType: 'up' as const,
            icon: <DollarSign className="w-6 h-6 text-violet-600" />,
            iconBg: 'bg-violet-100'
        },
        {
            title: 'Active Users',
            value: '12,487',
            change: '8.2%',
            changeType: 'up' as const,
            icon: <User className="w-6 h-6 text-blue-600" />,
            iconBg: 'bg-blue-100'
        },
        {
            title: 'Conversion Rate',
            value: '3.42%',
            change: '1.8%',
            changeType: 'down' as const,
            icon: <RotateCcw className="w-6 h-6 text-amber-600" />,
            iconBg: 'bg-amber-100'
        },
        {
            title: 'Avg. Order Value',
            value: '$128.42',
            change: '4.3%',
            changeType: 'up' as const,
            icon: <ShoppingCart className="w-6 h-6 text-emerald-600" />,
            iconBg: 'bg-emerald-100'
        }
    ];

    const salesData: SalesRecord[] = [
        {
            id: '1',
            customer: {
                name: 'Sarah Johnson',
                email: 'sarah.j@example.com',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face'
            },
            product: 'Premium Plan (Annual)',
            date: 'Aug 12, 2023',
            amount: '$599.00',
            status: 'completed'
        },
        {
            id: '2',
            customer: {
                name: 'Mike Stevens',
                email: 'mike.s@example.com',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
            },
            product: 'Basic Plan (Monthly)',
            date: 'Aug 10, 2023',
            amount: '$29.99',
            status: 'completed'
        },
        {
            id: '3',
            customer: {
                name: 'Lisa Wang',
                email: 'lisa.w@example.com',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
            },
            product: 'Pro Plan (Annual)',
            date: 'Aug 8, 2023',
            amount: '$899.00',
            status: 'pending'
        },
        {
            id: '4',
            customer: {
                name: 'David Kim',
                email: 'david.k@example.com',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
            },
            product: 'Premium Plan (Monthly)',
            date: 'Aug 5, 2023',
            amount: '$59.99',
            status: 'failed'
        }
    ];

    const sidebarItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
        { id: 'analytics', label: 'Analytics', icon: BarChart3, active: false },
        { id: 'customers', label: 'Customers', icon: Users, active: false },
        { id: 'sales', label: 'Sales', icon: DollarSign, active: false },
        { id: 'reports', label: 'Reports', icon: FileText, active: false }
    ];

    const settingsItems = [
        { id: 'account', label: 'Account', icon: User },
        { id: 'integrations', label: 'Integrations', icon: Zap }
    ];

    const timeframes = ['Day', 'Week', 'Month', 'Year'];

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 lg:hidden"
                        >
                            {sidebarCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
                        </button>
                        <div className="flex items-center gap-2">
                            <svg className="w-8 h-8 text-violet-600" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
                                <path d="M12 11L12 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="12" cy="8" r="1" fill="currentColor" />
                            </svg>
                            <span className="text-xl font-bold text-gray-900">InsightDash</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none w-64 transition-all duration-200"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full"></span>
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face"
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                    />
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </button>

                                {profileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                                        <a href="#profile" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-200">
                                            <User className="w-4 h-4 text-gray-500" />
                                            <span>Profile</span>
                                        </a>
                                        <a href="#settings" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors duration-200">
                                            <Settings className="w-4 h-4 text-gray-500" />
                                            <span>Settings</span>
                                        </a>
                                        <hr className="my-1 border-gray-200" />
                                        <p className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:cursor-pointer transition-colors duration-200">
                                            <ChevronRight className="w-4 h-4 text-red-500" />
                                            <span onClick={handleLogout} className='text-red-500'>Déconnexion</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className={`bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-4rem)] transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'
                    }`}>
                    <nav className="p-4 flex-1 overflow-y-auto">
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 mb-6 ml-auto"
                        >
                            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                        </button>

                        <ul className="space-y-1">
                            {sidebarItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.id}>
                                        <a
                                            href={`#${item.id}`}
                                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${item.active
                                                    ? 'bg-violet-50 text-violet-700 font-medium'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                                            title={sidebarCollapsed ? item.label : ''}
                                        >
                                            <Icon className="w-5 h-5 flex-shrink-0" />
                                            {!sidebarCollapsed && <span>{item.label}</span>}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>

                        {!sidebarCollapsed && (
                            <div className="mt-8">
                                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Settings</h3>
                                <ul className="mt-2 space-y-1">
                                    {settingsItems.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <li key={item.id}>
                                                <a
                                                    href={`#${item.id}`}
                                                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                                >
                                                    <Icon className="w-5 h-5" />
                                                    <span>{item.label}</span>
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}

                        {sidebarCollapsed && (
                            <div className="mt-8 space-y-1">
                                {settingsItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            className="flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                            title={item.label}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </nav>

                    {!sidebarCollapsed && (
                        <div className="p-4 border-t border-gray-200">
                            <div className="bg-violet-50 rounded-lg p-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-violet-100 p-2 rounded-lg">
                                        <Zap className="w-5 h-5 text-violet-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">Upgrade to Pro</h4>
                                        <p className="text-xs text-gray-500 mt-1">Get more insights and features</p>
                                    </div>
                                </div>
                                <button className="mt-3 w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                                    Upgrade Now
                                </button>
                            </div>
                        </div>
                    )}
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                            <p className="text-gray-500 mt-1">Analytics and performance metrics</p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <div className="bg-white border border-gray-200 rounded-lg flex items-center p-1 shadow-sm">
                                {timeframes.map((timeframe) => (
                                    <button
                                        key={timeframe}
                                        onClick={() => setSelectedTimeframe(timeframe)}
                                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${selectedTimeframe === timeframe
                                                ? 'bg-violet-50 text-violet-700'
                                                : 'text-gray-500 hover:bg-gray-50'
                                            }`}
                                    >
                                        {timeframe}
                                    </button>
                                ))}
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                                    className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm w-full sm:w-auto"
                                >
                                    <Calendar className="w-4 h-4" />
                                    <span>Last 30 days</span>
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                </button>

                                {dateDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Custom Range</label>
                                            <div className="flex gap-2">
                                                <input type="date" className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm" />
                                                <input type="date" className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm" />
                                            </div>
                                            <div className="flex justify-end">
                                                <button className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200">
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <button className="bg-white border border-gray-200 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                                    <Download className="w-4 h-4" />
                                </button>
                                <button className="bg-white border border-gray-200 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {metrics.map((metric, index) => (
                            <MetricCard key={index} {...metric} />
                        ))}
                    </div>

                    {/* Charts Placeholder */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm lg:col-span-2 hover:shadow-md transition-shadow duration-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                                            <span className="text-sm text-gray-600">Revenue</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                            <span className="text-sm text-gray-600">Profit</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 h-80 flex items-center justify-center">
                                <div className="text-gray-400 text-center">
                                    <BarChart3 className="w-16 h-16 mx-auto mb-4" />
                                    <p>Revenue Chart Placeholder</p>
                                    <p className="text-sm mt-1">Integrate with your preferred chart library</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">Traffic Sources</h3>
                                    <button className="text-gray-400 hover:text-gray-500">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 h-80 flex items-center justify-center">
                                <div className="text-gray-400 text-center">
                                    <BarChart3 className="w-16 h-16 mx-auto mb-4" />
                                    <p>Donut Chart Placeholder</p>
                                    <p className="text-sm mt-1">Direct: 44%, Social: 35%</p>
                                    <p className="text-sm">Referral: 13%, Organic: 8%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity & Customers */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm lg:col-span-2 hover:shadow-md transition-shadow duration-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">Recent Sales</h3>
                                    <button className="text-violet-600 hover:text-violet-700 text-sm font-medium transition-colors duration-200">
                                        View All
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {salesData.map((sale) => (
                                            <tr key={sale.id} className="hover:bg-gray-50 transition-colors duration-200">
                                                <td className="py-4 px-6 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <img
                                                            src={sale.customer.avatar}
                                                            alt={sale.customer.name}
                                                            className="w-8 h-8 rounded-full object-cover mr-3"
                                                        />
                                                        <div>
                                                            <div className="font-medium text-gray-900">{sale.customer.name}</div>
                                                            <div className="text-gray-500 text-sm">{sale.customer.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 whitespace-nowrap text-gray-600">{sale.product}</td>
                                                <td className="py-4 px-6 whitespace-nowrap text-gray-600">{sale.date}</td>
                                                <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-900">{sale.amount}</td>
                                                <td className="py-4 px-6 whitespace-nowrap">
                                                    <StatusBadge status={sale.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="text-sm text-gray-500">Showing 4 of 56 transactions</div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-1.5 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50" disabled>
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                        <button className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 transition-colors duration-200">1</button>
                                        <button className="px-3 py-1.5 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-200">2</button>
                                        <button className="px-3 py-1.5 rounded-md text-gray-600 hover:bg-gray-100 transition-colors duration-200">3</button>
                                        <button className="p-1.5 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors duration-200">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
                                    <button className="text-gray-400 hover:text-gray-500 p-1">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {[
                                        { name: 'Premium Plan (Annual)', sales: '$12,450', growth: '+18%' },
                                        { name: 'Pro Plan (Monthly)', sales: '$8,230', growth: '+12%' },
                                        { name: 'Basic Plan (Monthly)', sales: '$5,680', growth: '+8%' },
                                        { name: 'Enterprise Plan', sales: '$4,120', growth: '+5%' }
                                    ].map((product, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                            <div>
                                                <h4 className="font-medium text-gray-900">{product.name}</h4>
                                                <p className="text-sm text-gray-500">{product.sales}</p>
                                            </div>
                                            <span className="text-sm font-medium text-green-600">{product.growth}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
