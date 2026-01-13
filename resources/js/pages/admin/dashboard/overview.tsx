import AdminLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import {
    Activity,
    DollarSign,
    Eye,
    Gavel,
    LayoutGrid,
    Package,
    Store,
    TrendingUp,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard/overview',
    },
    {
        title: 'Overview',
        href: '/admin/dashboard/overview',
    },


];

interface StatCardProps {
    icon: typeof Store;
    title: string;
    value: string;
    change: number;
    color: string;
}

const StatCard = ({
    icon: Icon,
    title,
    value,
    change,
    color,
}: StatCardProps) => {
    const [timeRange] = useState('week');
    return (
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
            <div className="flex items-center justify-between">
                <div>
                    <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                        {title}
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {value}
                    </h3>
                    <p
                        className={`mt-2 text-sm ${
                            change >= 0
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                        }`}
                    >
                        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last{' '}
                        {timeRange}
                    </p>
                </div>
                <div className={`rounded-full p-3 ${color}`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>
        </div>
    );
};

export default function AdminDashboardOverview() {
    const [timeRange, setTimeRange] = useState('7days');
    const [selectedRegion, setSelectedRegion] = useState('all');

    // Sample data
    const salesData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Store Sales',
                data: [24, 32, 28, 35, 42, 58, 51],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
            },
            {
                label: 'Auctions',
                data: [18, 22, 25, 30, 35, 48, 41],
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                tension: 0.4,
            },
            {
                label: 'Views',
                data: [156, 189, 203, 245, 298, 412, 367],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
            },
        ],
    };

    const categoryData = {
        labels: [
            'Action Figures',
            'Collectibles',
            'Vintage Toys',
            'Model Kits',
        ],
        datasets: [
            {
                data: [35, 28, 22, 15],
                backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981'],
                borderWidth: 0,
            },
        ],
    };

    const recentAuctions = [
        {
            id: 1,
            item: 'Vintage Voltron Set',
            currentBid: '₱12,500',
            bids: 23,
            timeLeft: '2h 15m',
        },
        {
            id: 2,
            item: 'Gundam RX-78-2 MG',
            currentBid: '₱3,200',
            bids: 15,
            timeLeft: '5h 42m',
        },
        {
            id: 3,
            item: 'Hot Toys Iron Man',
            currentBid: '₱18,900',
            bids: 31,
            timeLeft: '1h 08m',
        },
        {
            id: 4,
            item: 'Transformers G1 Optimus',
            currentBid: '₱8,750',
            bids: 19,
            timeLeft: '3h 35m',
        },
    ];

    const topStores = [
        { name: 'Toy Haven Cavite', sales: '₱145,200', rating: 4.8 },
        { name: "Collector's Paradise", sales: '₱128,400', rating: 4.9 },
        { name: 'Vintage Vault', sales: '₱98,750', rating: 4.7 },
        { name: 'Action Station', sales: '₱87,300', rating: 4.6 },
    ];

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return `${label}: ${value}%`;
                    },
                },
            },
        },
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard - Overview" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-7xl px-6 py-8">
                    {/* Page Header with Filters and Export */}
                    <div className="mb-8">
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                                    <LayoutGrid className="h-8 w-8 text-blue-600" />
                                    Dashboard Overview
                                </h1>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Real-time insights and key performance
                                    metrics
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <select
                                    value={selectedRegion}
                                    onChange={(e) =>
                                        setSelectedRegion(e.target.value)
                                    }
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                >
                                    <option value="all">All Regions</option>
                                    <option value="bacoor">Bacoor</option>
                                    <option value="imus">Imus</option>
                                    <option value="dasma">Dasmariñas</option>
                                    <option value="cavite">Cavite City</option>
                                </select>
                                <select
                                    value={timeRange}
                                    onChange={(e) =>
                                        setTimeRange(e.target.value)
                                    }
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                >
                                    <option value="7days">Last 7 Days</option>
                                    <option value="30days">Last 30 Days</option>
                                    <option value="90days">Last 90 Days</option>
                                    <option value="year">This Year</option>
                                </select>
                                <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                                    Export Report
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            icon={Store}
                            title="Active Stores"
                            value="47"
                            change={12}
                            color="bg-blue-500"
                        />
                        <StatCard
                            icon={Users}
                            title="Registered Collectors"
                            value="1,284"
                            change={8}
                            color="bg-purple-500"
                        />
                        <StatCard
                            icon={Gavel}
                            title="Active Auctions"
                            value="89"
                            change={-3}
                            color="bg-pink-500"
                        />
                        <StatCard
                            icon={Eye}
                            title="Showroom Views"
                            value="8,542"
                            change={15}
                            color="bg-green-500"
                        />
                    </div>

                    {/* Charts Row */}
                    <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Activity Chart */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Platform Activity
                            </h3>
                            <div className="h-[300px]">
                                <Line data={salesData} options={chartOptions} />
                            </div>
                        </div>

                        {/* Category Distribution */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                Popular Categories
                            </h3>
                            <div className="h-[300px]">
                                <Pie data={categoryData} options={pieOptions} />
                            </div>
                        </div>
                    </div>

                    {/* Tables Row */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Live Auctions */}
                        <div className="rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="border-b border-gray-200 p-6 dark:border-gray-700">
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    <Activity className="h-5 w-5 text-red-500" />
                                    Live Auctions
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {recentAuctions.map((auction) => (
                                        <div
                                            key={auction.id}
                                            className="flex items-center justify-between rounded-lg bg-gray-50 p-4 transition hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                                        >
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 dark:text-white">
                                                    {auction.item}
                                                </h4>
                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    {auction.bids} bids ·{' '}
                                                    {auction.timeLeft} left
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                                    {auction.currentBid}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Top Performing Stores */}
                        <div className="rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="border-b border-gray-200 p-6 dark:border-gray-700">
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    <TrendingUp className="h-5 w-5 text-blue-500" />
                                    Top Performing Stores
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {topStores.map((store, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 font-bold text-white">
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900 dark:text-white">
                                                        {store.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Rating: {store.rating}{' '}
                                                        ⭐
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                    {store.sales}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Footer */}
                    <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                        <div className="rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800">
                            <DollarSign className="mx-auto mb-2 h-8 w-8 text-green-500" />
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                ₱2.4M
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Total Sales
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800">
                            <Package className="mx-auto mb-2 h-8 w-8 text-blue-500" />
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                3,421
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Listed Items
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800">
                            <Gavel className="mx-auto mb-2 h-8 w-8 text-purple-500" />
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                156
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Completed Auctions
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800">
                            <Eye className="mx-auto mb-2 h-8 w-8 text-pink-500" />
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                98.2%
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Platform Uptime
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
