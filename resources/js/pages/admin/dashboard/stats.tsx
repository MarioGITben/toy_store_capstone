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
    Award,
    BarChart3,
    Clock,
    DollarSign,
    Eye,
    Gavel,
    MapPin,
    Package,
    PieChart,
    ShoppingCart,
    Store,
    TrendingDown,
    TrendingUp,
    Users,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Register Chart.js components (safe to call multiple times - Chart.js is idempotent)
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

interface StatCardProps {
    icon: typeof Users;
    title: string;
    value: string;
    change: number;
    subtitle?: string;
    trend: 'up' | 'down' | 'neutral';
}

const StatCard = ({
    icon: Icon,
    title,
    value,
    change,
    subtitle,
    trend,
}: StatCardProps) => (
    <div className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg dark:bg-gray-800">
        <div className="mb-4 flex items-start justify-between">
            <div
                className={`rounded-lg p-3 ${
                    trend === 'up'
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : trend === 'down'
                          ? 'bg-red-100 dark:bg-red-900/30'
                          : 'bg-blue-100 dark:bg-blue-900/30'
                }`}
            >
                <Icon
                    className={`h-6 w-6 ${
                        trend === 'up'
                            ? 'text-green-600 dark:text-green-400'
                            : trend === 'down'
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-blue-600 dark:text-blue-400'
                    }`}
                />
            </div>
            {change !== undefined && (
                <div
                    className={`flex items-center gap-1 ${
                        change >= 0
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                    }`}
                >
                    {change >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                    ) : (
                        <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="text-sm font-semibold">
                        {Math.abs(change)}%
                    </span>
                </div>
            )}
        </div>
        <h3 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
            {value}
        </h3>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
        </p>
        {subtitle && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                {subtitle}
            </p>
        )}
    </div>
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
    {
        title: 'Platform Statistics',
        href: '/admin/dashboard/stats',
    },
];

export default function PlatformStats() {
    const [timeRange, setTimeRange] = useState('30days');
    const [selectedRegion, setSelectedRegion] = useState('all');

    const revenueChartRef = useRef<HTMLCanvasElement>(null);
    const categoryChartRef = useRef<HTMLCanvasElement>(null);
    const growthChartRef = useRef<HTMLCanvasElement>(null);
    const regionChartRef = useRef<HTMLCanvasElement>(null);

    const revenueChartInstance = useRef<ChartJS | null>(null);
    const categoryChartInstance = useRef<ChartJS | null>(null);
    const growthChartInstance = useRef<ChartJS | null>(null);
    const regionChartInstance = useRef<ChartJS | null>(null);

    useEffect(() => {
        // Revenue Trends Chart
        if (revenueChartRef.current) {
            if (revenueChartInstance.current)
                revenueChartInstance.current.destroy();

            const ctx = revenueChartRef.current.getContext('2d');
            if (!ctx) return;
            revenueChartInstance.current = new ChartJS(ctx, {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [
                        {
                            label: 'Total Revenue',
                            data: [45000, 52000, 48000, 65000],
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            fill: true,
                            tension: 0.4,
                        },
                        {
                            label: 'Commission Earned',
                            data: [4500, 5200, 4800, 6500],
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: (value) =>
                                    '₱' + value.toLocaleString(),
                            },
                        },
                    },
                },
            });
        }

        // Category Performance Chart
        if (categoryChartRef.current) {
            if (categoryChartInstance.current)
                categoryChartInstance.current.destroy();

            const ctx = categoryChartRef.current.getContext('2d');
            if (!ctx) return;
            categoryChartInstance.current = new ChartJS(ctx, {
                type: 'bar',
                data: {
                    labels: [
                        'Action Figures',
                        'Collectibles',
                        'Vintage Toys',
                        'Model Kits',
                        'Trading Cards',
                        'Board Games',
                    ],
                    datasets: [
                        {
                            label: 'Sales Volume',
                            data: [2850, 2100, 1950, 1600, 1400, 980],
                            backgroundColor: [
                                '#3b82f6',
                                '#8b5cf6',
                                '#ec4899',
                                '#10b981',
                                '#f59e0b',
                                '#06b6d4',
                            ],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: (value) =>
                                    '₱' + value.toLocaleString(),
                            },
                        },
                    },
                },
            });
        }

        // User Growth Chart
        if (growthChartRef.current) {
            if (growthChartInstance.current)
                growthChartInstance.current.destroy();

            const ctx = growthChartRef.current.getContext('2d');
            if (!ctx) return;
            growthChartInstance.current = new ChartJS(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Collectors',
                            data: [420, 580, 710, 890, 1050, 1284],
                            borderColor: '#3b82f6',
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            fill: true,
                            tension: 0.4,
                        },
                        {
                            label: 'Store Owners',
                            data: [12, 18, 25, 32, 39, 47],
                            borderColor: '#8b5cf6',
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' },
                    },
                    scales: {
                        y: { beginAtZero: true },
                    },
                },
            });
        }

        // Regional Distribution Chart
        if (regionChartRef.current) {
            if (regionChartInstance.current)
                regionChartInstance.current.destroy();

            const ctx = regionChartRef.current.getContext('2d');
            if (!ctx) return;
            regionChartInstance.current = new ChartJS(ctx, {
                type: 'doughnut',
                data: {
                    labels: [
                        'Bacoor',
                        'Imus',
                        'Dasmariñas',
                        'Cavite City',
                        'Kawit',
                        'Others',
                    ],
                    datasets: [
                        {
                            data: [28, 22, 18, 15, 10, 7],
                            backgroundColor: [
                                '#3b82f6',
                                '#8b5cf6',
                                '#ec4899',
                                '#10b981',
                                '#f59e0b',
                                '#64748b',
                            ],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' },
                    },
                },
            });
        }

        return () => {
            if (revenueChartInstance.current)
                revenueChartInstance.current.destroy();
            if (categoryChartInstance.current)
                categoryChartInstance.current.destroy();
            if (growthChartInstance.current)
                growthChartInstance.current.destroy();
            if (regionChartInstance.current)
                regionChartInstance.current.destroy();
        };
    }, [timeRange, selectedRegion]);

    const topStores = [
        {
            rank: 1,
            name: 'Toy Haven Cavite',
            revenue: '₱145,200',
            growth: '+24%',
            items: 234,
        },
        {
            rank: 2,
            name: "Collector's Paradise",
            revenue: '₱128,400',
            growth: '+18%',
            items: 198,
        },
        {
            rank: 3,
            name: 'Vintage Vault',
            revenue: '₱98,750',
            growth: '+32%',
            items: 156,
        },
        {
            rank: 4,
            name: 'Action Station',
            revenue: '₱87,300',
            growth: '+15%',
            items: 142,
        },
        {
            rank: 5,
            name: 'Nostalgia Corner',
            revenue: '₱76,500',
            growth: '+21%',
            items: 128,
        },
    ];

    const topAuctions = [
        {
            item: 'Vintage Voltron Complete Set',
            finalBid: '₱45,000',
            bids: 87,
            winner: 'Collector #1245',
        },
        {
            item: 'Hot Toys Iron Man Mark 50',
            finalBid: '₱38,500',
            bids: 65,
            winner: 'Collector #892',
        },
        {
            item: 'Transformers G1 Optimus Prime',
            finalBid: '₱32,000',
            bids: 54,
            winner: 'Collector #2103',
        },
        {
            item: 'Gundam PG Unicorn',
            finalBid: '₱28,750',
            bids: 48,
            winner: 'Collector #1567',
        },
    ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Platform Statistics - Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-7xl px-6 py-8">
                    {/* Page Header with Filters and Export */}
                    <div className="mb-8">
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                                    <BarChart3 className="h-8 w-8 text-blue-600" />
                                    Platform Statistics
                                </h1>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Comprehensive analytics and performance
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

                    {/* Key Metrics Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            icon={Users}
                            title="Total Users"
                            value="1,331"
                            change={18.2}
                            subtitle="864 collectors, 47 stores"
                            trend="up"
                        />
                        <StatCard
                            icon={DollarSign}
                            title="Total Revenue"
                            value="₱2.4M"
                            change={24.5}
                            subtitle="₱184K this month"
                            trend="up"
                        />
                        <StatCard
                            icon={Gavel}
                            title="Auctions Completed"
                            value="892"
                            change={12.3}
                            subtitle="89 currently active"
                            trend="up"
                        />
                        <StatCard
                            icon={ShoppingCart}
                            title="Transactions"
                            value="3,421"
                            change={-3.2}
                            subtitle="₱703 avg value"
                            trend="down"
                        />
                    </div>

                    {/* Secondary Metrics */}
                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
                        <div className="rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800">
                            <Store className="mx-auto mb-2 h-6 w-6 text-purple-500" />
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                47
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Active Stores
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800">
                            <Package className="mx-auto mb-2 h-6 w-6 text-blue-500" />
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                8,542
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Listed Items
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800">
                            <Eye className="mx-auto mb-2 h-6 w-6 text-pink-500" />
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                45.2K
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Showroom Views
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800">
                            <Award className="mx-auto mb-2 h-6 w-6 text-yellow-500" />
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                4.8
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Avg Rating
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800">
                            <Clock className="mx-auto mb-2 h-6 w-6 text-green-500" />
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                98.7%
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Uptime
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-4 text-center shadow dark:bg-gray-800">
                            <Activity className="mx-auto mb-2 h-6 w-6 text-red-500" />
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                1,284
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Active Today
                            </p>
                        </div>
                    </div>

                    {/* Charts Section */}
                    <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Revenue Trends */}
                        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Revenue Trends
                                </h3>
                                <TrendingUp className="h-5 w-5 text-green-500" />
                            </div>
                            <div style={{ height: '300px' }}>
                                <canvas ref={revenueChartRef}></canvas>
                            </div>
                        </div>

                        {/* Category Performance */}
                        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Category Performance
                                </h3>
                                <PieChart className="h-5 w-5 text-blue-500" />
                            </div>
                            <div style={{ height: '300px' }}>
                                <canvas ref={categoryChartRef}></canvas>
                            </div>
                        </div>

                        {/* User Growth */}
                        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    User Growth
                                </h3>
                                <Users className="h-5 w-5 text-purple-500" />
                            </div>
                            <div style={{ height: '300px' }}>
                                <canvas ref={growthChartRef}></canvas>
                            </div>
                        </div>

                        {/* Regional Distribution */}
                        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Regional Distribution
                                </h3>
                                <MapPin className="h-5 w-5 text-pink-500" />
                            </div>
                            <div style={{ height: '300px' }}>
                                <canvas ref={regionChartRef}></canvas>
                            </div>
                        </div>
                    </div>

                    {/* Top Performers */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Top Stores */}
                        <div className="rounded-lg bg-white shadow-md dark:bg-gray-800">
                            <div className="border-b border-gray-200 p-6 dark:border-gray-700">
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    <Award className="h-5 w-5 text-yellow-500" />
                                    Top Performing Stores
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {topStores.map((store) => (
                                        <div
                                            key={store.rank}
                                            className="flex items-center justify-between rounded-lg bg-gray-50 p-4 transition hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${
                                                        store.rank === 1
                                                            ? 'bg-yellow-500'
                                                            : store.rank === 2
                                                              ? 'bg-gray-400'
                                                              : store.rank === 3
                                                                ? 'bg-orange-600'
                                                                : 'bg-blue-500'
                                                    }`}
                                                >
                                                    #{store.rank}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                                        {store.name}
                                                    </h4>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                        {store.items} items
                                                        listed
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-gray-900 dark:text-white">
                                                    {store.revenue}
                                                </p>
                                                <p className="text-xs font-medium text-green-600 dark:text-green-400">
                                                    {store.growth}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Top Auctions */}
                        <div className="rounded-lg bg-white shadow-md dark:bg-gray-800">
                            <div className="border-b border-gray-200 p-6 dark:border-gray-700">
                                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    <Gavel className="h-5 w-5 text-purple-500" />
                                    Highest Value Auctions
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {topAuctions.map((auction, idx) => (
                                        <div
                                            key={idx}
                                            className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
                                        >
                                            <div className="mb-2 flex items-start justify-between">
                                                <h4 className="flex-1 font-semibold text-gray-900 dark:text-white">
                                                    {auction.item}
                                                </h4>
                                                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                                    {auction.finalBid}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                                                <span>{auction.bids} bids</span>
                                                <span>
                                                    Won by {auction.winner}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
