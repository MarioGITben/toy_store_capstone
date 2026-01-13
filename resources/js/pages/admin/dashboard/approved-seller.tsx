import AdminLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    BarChart3,
    Calendar,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    DollarSign,
    Download,
    Eye,
    Filter,
    Mail,
    MapPin,
    MoreVertical,
    Package,
    Phone,
    Search,
    ShoppingBag,
    Star,
    Store,
    TrendingUp,
} from 'lucide-react';
import { useState } from 'react';
interface Seller {
    id: number;
    storeName: string;
    ownerName: string;
    email: string;
    phone: string;
    businessType: string;
    location: string;
    address: string;
    approvalDate: string;
    activeListings: number;
    totalSales: string;
    completedOrders: number;
    rating: number;
    reviews: number;
    monthlyRevenue: string;
    performance: string;
    verified: boolean;
    lastActive: string;
    categories: string[];
}

export default function ApprovedSellersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPerformance, setFilterPerformance] = useState('all');
    const [filterLocation, setFilterLocation] = useState('all');
    const [selectedSellers, setSelectedSellers] = useState<number[]>([]);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);

    const sellers: Seller[] = [
        {
            id: 1,
            storeName: 'Toy Haven Cavite',
            ownerName: 'Maria Santos',
            email: 'maria.santos@email.com',
            phone: '+63 923 456 7890',
            businessType: 'Physical Store',
            location: 'Bacoor, Cavite',
            address: '123 Main Street, Bacoor, Cavite',
            approvalDate: 'Dec 8, 2024',
            activeListings: 234,
            totalSales: '₱145,200',
            completedOrders: 156,
            rating: 4.8,
            reviews: 142,
            monthlyRevenue: '₱48,400',
            performance: 'Excellent',
            verified: true,
            lastActive: '2 hours ago',
            categories: ['Action Figures', 'Collectibles', 'Vintage Toys'],
        },
        {
            id: 2,
            storeName: "Collector's Paradise",
            ownerName: 'Roberto Cruz',
            email: 'roberto.cruz@email.com',
            phone: '+63 956 789 0123',
            businessType: 'Online Only',
            location: 'Imus, Cavite',
            address: '456 Oak Avenue, Imus, Cavite',
            approvalDate: 'Nov 15, 2024',
            activeListings: 198,
            totalSales: '₱128,400',
            completedOrders: 134,
            rating: 4.9,
            reviews: 128,
            monthlyRevenue: '₱42,800',
            performance: 'Excellent',
            verified: true,
            lastActive: '1 day ago',
            categories: ['Vintage Toys', 'Collectibles'],
        },
        {
            id: 3,
            storeName: 'Vintage Vault',
            ownerName: 'Sofia Mendoza',
            email: 'sofia.mendoza@email.com',
            phone: '+63 967 890 1234',
            businessType: 'Both',
            location: 'Dasmariñas, Cavite',
            address: '789 Pine Street, Dasmariñas, Cavite',
            approvalDate: 'Oct 5, 2024',
            activeListings: 312,
            totalSales: '₱198,750',
            completedOrders: 203,
            rating: 4.7,
            reviews: 189,
            monthlyRevenue: '₱66,250',
            performance: 'Excellent',
            verified: true,
            lastActive: '30 mins ago',
            categories: ['Vintage Toys', 'Model Kits', 'Limited Editions'],
        },
        {
            id: 4,
            storeName: 'Action Station',
            ownerName: 'Miguel Torres',
            email: 'miguel.torres@email.com',
            phone: '+63 934 567 8901',
            businessType: 'Physical Store',
            location: 'Cavite City, Cavite',
            address: '321 Maple Drive, Cavite City, Cavite',
            approvalDate: 'Jan 5, 2025',
            activeListings: 87,
            totalSales: '₱42,300',
            completedOrders: 45,
            rating: 4.5,
            reviews: 38,
            monthlyRevenue: '₱21,150',
            performance: 'Good',
            verified: true,
            lastActive: '5 hours ago',
            categories: ['Action Figures', 'Model Kits'],
        },
        {
            id: 5,
            storeName: 'Nostalgia Corner',
            ownerName: 'Ana Garcia',
            email: 'ana.garcia@email.com',
            phone: '+63 945 678 9012',
            businessType: 'Online Only',
            location: 'Kawit, Cavite',
            address: '654 Cedar Lane, Kawit, Cavite',
            approvalDate: 'Sep 20, 2024',
            activeListings: 156,
            totalSales: '₱87,500',
            completedOrders: 92,
            rating: 4.6,
            reviews: 84,
            monthlyRevenue: '₱29,167',
            performance: 'Good',
            verified: true,
            lastActive: '3 days ago',
            categories: ['Retro Toys', 'Memorabilia'],
        },
        {
            id: 6,
            storeName: 'Epic Collectibles',
            ownerName: 'Carlos Reyes',
            email: 'carlos.reyes@email.com',
            phone: '+63 978 901 2345',
            businessType: 'Both',
            location: 'Bacoor, Cavite',
            address: '987 Elm Street, Bacoor, Cavite',
            approvalDate: 'Aug 12, 2024',
            activeListings: 45,
            totalSales: '₱28,900',
            completedOrders: 32,
            rating: 4.2,
            reviews: 28,
            monthlyRevenue: '₱9,633',
            performance: 'Average',
            verified: true,
            lastActive: '1 week ago',
            categories: ['Collectibles'],
        },
    ];

    const stats = [
        { label: 'Total Approved Sellers', value: '47', icon: Store },
        { label: 'Active Listings', value: '8,542', icon: Package },
        { label: 'Total Revenue', value: '₱2.4M', icon: DollarSign },
        { label: 'Avg Rating', value: '4.7', icon: Star },
    ];

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/admin/dashboard/overview' },
        { title: 'Approved Sellers', href: '/admin/sellers/approved' },
    ];

    const handleSelectSeller = (sellerId: number) => {
        setSelectedSellers((prev) =>
            prev.includes(sellerId)
                ? prev.filter((id) => id !== sellerId)
                : [...prev, sellerId],
        );
    };

    const handleSelectAll = () => {
        if (selectedSellers.length === sellers.length) {
            setSelectedSellers([]);
        } else {
            setSelectedSellers(sellers.map((s) => s.id));
        }
    };

    const openDetailsModal = (seller: Seller) => {
        setSelectedSeller(seller);
        setShowDetailsModal(true);
    };

    const getPerformanceBadge = (performance: Seller['performance']) => {
        const styles: Record<Seller['performance'], string> = {
            Excellent: 'bg-green-100 text-green-700',
            Good: 'bg-blue-100 text-blue-700',
            Average: 'bg-orange-100 text-orange-700',
        };
        return styles[performance];
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Approved Sellers - Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-7xl px-6 py-8">
                    {/* Page Header with Filters and Export */}
                    <div className="mb-8">
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                                    <CheckCircle className="h-8 w-8 text-green-600" />
                                    Approved Sellers
                                </h1>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Monitor and manage active store owners
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                                    <Download className="h-4 w-4" />
                                    Export Report
                                </button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
                            {stats.map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg dark:bg-gray-800"
                                >
                                    <div className="mb-4 flex items-start justify-between">
                                        <div
                                            className={`rounded-lg bg-green-100 p-3 dark:bg-green-900/30`}
                                        >
                                            <stat.icon
                                                className={`h-6 w-6 text-green-600 dark:text-green-400`}
                                            />
                                        </div>
                                    </div>
                                    <h3 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
                                        {stat.value}
                                    </h3>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Search and Filters */}
                    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex flex-col gap-4 lg:flex-row">
                            <div className="relative flex-1">
                                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by store name, owner name, or email..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-gray-900 focus:ring-2 focus:ring-green-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                            <div className="flex gap-3">
                                <select
                                    value={filterPerformance}
                                    onChange={(e) =>
                                        setFilterPerformance(e.target.value)
                                    }
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-green-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                >
                                    <option value="all">All Performance</option>
                                    <option value="excellent">Excellent</option>
                                    <option value="good">Good</option>
                                    <option value="average">Average</option>
                                </select>
                                <select
                                    value={filterLocation}
                                    onChange={(e) =>
                                        setFilterLocation(e.target.value)
                                    }
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-green-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                >
                                    <option value="all">All Locations</option>
                                    <option value="bacoor">Bacoor</option>
                                    <option value="imus">Imus</option>
                                    <option value="dasma">Dasmariñas</option>
                                    <option value="cavite">Cavite City</option>
                                    <option value="kawit">Kawit</option>
                                </select>
                                <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                    <Filter className="h-4 w-4" />
                                    More Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Selected Actions Bar */}
                    {selectedSellers.length > 0 && (
                        <div className="mb-6 flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                            <p className="text-sm font-medium text-green-900 dark:text-green-100">
                                {selectedSellers.length} seller
                                {selectedSellers.length > 1 ? 's' : ''} selected
                            </p>
                            <div className="flex gap-2">
                                <button className="rounded-lg border border-green-300 bg-white px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50 dark:border-green-700 dark:bg-gray-800 dark:text-green-300 dark:hover:bg-green-900/20">
                                    Send Message
                                </button>
                                <button className="rounded-lg border border-green-300 bg-white px-4 py-2 text-sm font-medium text-green-700 transition hover:bg-green-50 dark:border-green-700 dark:bg-gray-800 dark:text-green-300 dark:hover:bg-green-900/20">
                                    Export Selected
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Sellers Table */}
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-4 text-left">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    selectedSellers.length ===
                                                    sellers.length
                                                }
                                                onChange={handleSelectAll}
                                                className="h-4 w-4 rounded text-green-600 focus:ring-green-500"
                                            />
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Store
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Owner
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Performance
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Sales Metrics
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Rating
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {sellers.map((seller: Seller) => (
                                        <tr
                                            key={`seller-${seller.id}`}
                                            className="transition hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedSellers.includes(
                                                        seller.id,
                                                    )}
                                                    onChange={() =>
                                                        handleSelectSeller(
                                                            seller.id,
                                                        )
                                                    }
                                                    className="h-4 w-4 rounded text-green-600 focus:ring-green-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-blue-500 text-lg font-semibold text-white">
                                                        {seller.storeName.charAt(
                                                            0,
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                                {
                                                                    seller.storeName
                                                                }
                                                            </p>
                                                            {seller.verified && (
                                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                            )}
                                                        </div>
                                                        <span
                                                            className={`mt-1 inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${
                                                                seller.businessType ===
                                                                'Physical Store'
                                                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                                                    : seller.businessType ===
                                                                        'Online Only'
                                                                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                                                                      : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                                            }`}
                                                        >
                                                            {
                                                                seller.businessType
                                                            }
                                                        </span>
                                                        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                            <MapPin className="h-3 w-3" />
                                                            {seller.location}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {seller.ownerName}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                        <Mail className="h-3 w-3" />
                                                        {seller.email}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                        <Phone className="h-3 w-3" />
                                                        {seller.phone}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-2">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getPerformanceBadge(seller.performance)}`}
                                                    >
                                                        {seller.performance}
                                                    </span>
                                                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                                                        <div className="flex items-center gap-1">
                                                            <Package className="h-3 w-3" />
                                                            {
                                                                seller.activeListings
                                                            }{' '}
                                                            listings
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <ShoppingBag className="h-3 w-3" />
                                                            {
                                                                seller.completedOrders
                                                            }{' '}
                                                            orders
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1">
                                                        <DollarSign className="h-4 w-4 text-green-500" />
                                                        <p className="font-semibold text-gray-900 dark:text-white">
                                                            {seller.totalSales}
                                                        </p>
                                                    </div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                        Monthly:{' '}
                                                        {seller.monthlyRevenue}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-xs text-green-600">
                                                        <TrendingUp className="h-3 w-3" />
                                                        Growing
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                                        <p className="font-semibold text-gray-900 dark:text-white">
                                                            {seller.rating}
                                                        </p>
                                                    </div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                        {seller.reviews} reviews
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                        <span className="text-sm font-medium text-green-600">
                                                            Active
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Last active:{' '}
                                                        {seller.lastActive}
                                                    </p>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                        <Calendar className="h-3 w-3" />
                                                        Joined{' '}
                                                        {seller.approvalDate}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-2">
                                                    <button
                                                        onClick={() =>
                                                            openDetailsModal(
                                                                seller,
                                                            )
                                                        }
                                                        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                    >
                                                        <Eye className="h-3 w-3" />
                                                        View Details
                                                    </button>
                                                    <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-purple-600 transition hover:bg-purple-50 dark:hover:bg-purple-900/20">
                                                        <BarChart3 className="h-3 w-3" />
                                                        Analytics
                                                    </button>
                                                    <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                                                        <MoreVertical className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Showing <span className="font-medium">1</span>{' '}
                                to <span className="font-medium">6</span> of{' '}
                                <span className="font-medium">47</span> sellers
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button className="rounded-lg bg-green-600 px-4 py-2 text-white">
                                    1
                                </button>
                                <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                    2
                                </button>
                                <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                    3
                                </button>
                                <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                    ...
                                </button>
                                <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                    8
                                </button>
                                <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Details Modal */}
                    {showDetailsModal && selectedSeller && (
                        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
                            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-xl dark:bg-gray-800">
                                <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-blue-500 text-lg font-semibold text-white">
                                            {selectedSeller.storeName.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                {selectedSeller.storeName}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {selectedSeller.ownerName}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setShowDetailsModal(false)
                                        }
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <MoreVertical className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="space-y-6 p-6">
                                    {/* Performance Metrics */}
                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20">
                                            <Package className="mx-auto mb-2 h-6 w-6 text-blue-600" />
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {selectedSeller.activeListings}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                Active Listings
                                            </p>
                                        </div>
                                        <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
                                            <DollarSign className="mx-auto mb-2 h-6 w-6 text-green-600" />
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {selectedSeller.totalSales}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                Total Sales
                                            </p>
                                        </div>
                                        <div className="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-900/20">
                                            <ShoppingBag className="mx-auto mb-2 h-6 w-6 text-purple-600" />
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {selectedSeller.completedOrders}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                Completed Orders
                                            </p>
                                        </div>
                                        <div className="rounded-lg bg-yellow-50 p-4 text-center dark:bg-yellow-900/20">
                                            <Star className="mx-auto mb-2 h-6 w-6 text-yellow-600" />
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {selectedSeller.rating}
                                            </p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                {selectedSeller.reviews} Reviews
                                            </p>
                                        </div>
                                    </div>

                                    {/* Store Information */}
                                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                        <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                                            Store Information
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    Business Type
                                                </p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {
                                                        selectedSeller.businessType
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    Location
                                                </p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {selectedSeller.location}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    Address
                                                </p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {selectedSeller.address}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    Approval Date
                                                </p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {
                                                        selectedSeller.approvalDate
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                        <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                                            Contact Information
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 text-gray-400" />
                                                <p className="text-sm text-gray-900 dark:text-white">
                                                    {selectedSeller.email}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4 text-gray-400" />
                                                <p className="text-sm text-gray-900 dark:text-white">
                                                    {selectedSeller.phone}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Categories */}
                                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                        <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                                            Product Categories
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedSeller.categories.map(
                                                (category, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                                    >
                                                        {category}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                                            View Store Profile
                                        </button>
                                        <button className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
