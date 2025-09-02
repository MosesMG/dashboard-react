import React, { useState } from "react";
import {
    DollarSign,
    ChevronDown,
    Calendar,
    Download,
    RefreshCw,
    User,
    ShoppingCart,
    RotateCcw,
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
} from "lucide-react";
import PageTitle from "../components/ui/PageTitle";
import MetricCard from "../components/MetricCard";
import Bars from "../components/chartjs/Bars";
import type { SalesRecord } from "../types/home";
import Circle from "../components/chartjs/Circle";
import sourceData from "../data/sources.json"
import revenueData from "../data/revenues.json"

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

const Accueil: React.FC = () => {
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
            id: 1,
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
            id: 2,
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
            id: 3,
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
            id: 4,
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

    const timeframes = ['Day', 'Week', 'Month', 'Year'];

    return (
        <>
            <PageTitle title="Page d'accueil" />

            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
                <div className="ms-4">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="px-6 py-4 border-b border-gray-200">
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
                    <div className="px-6 py-4 h-80 flex items-center justify-center">
                        <Bars sourceData={sourceData} />
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Traffic Sources</h3>
                            <button className="text-gray-400 hover:text-gray-500">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="px-6 py-4 h-80 flex items-center justify-center">
                        <Circle sourceData={revenueData} />
                    </div>
                </div>
            </div>

            {/* Recent Activity & Customers */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm lg:col-span-2 hover:shadow-md transition-shadow duration-200">
                    <div className="px-6 py-4 border-b border-gray-200">
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
                                                    <div className="font-medium text-sm text-gray-900">{sale.customer.name}</div>
                                                    <div className="text-gray-500 text-xs">{sale.customer.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">{sale.product}</td>
                                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">{sale.date}</td>
                                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{sale.amount}</td>
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

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
                            <button className="text-gray-400 hover:text-gray-500 p-1">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="space-y-4 overflow-y-auto">
                            {[
                                { name: 'Premium Plan (Annual)', sales: '$12,450', growth: '+18%' },
                                { name: 'Pro Plan (Monthly)', sales: '$8,230', growth: '+12%' },
                                { name: 'Basic Plan (Monthly)', sales: '$5,680', growth: '+8%' },
                                { name: 'Enterprise Plan', sales: '$4,120', growth: '+5%' },
                                { name: 'Startup Plan', sales: '$2,500', growth: '+10%' }
                            ].map((product, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                    <div>
                                        <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                                        <p className="text-xs text-gray-500">{product.sales}</p>
                                    </div>
                                    <span className="text-sm font-medium text-green-600">{product.growth}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Accueil;
