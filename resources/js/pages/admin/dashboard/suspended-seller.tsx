import React, { useState, useMemo } from 'react';
import {
    AlertCircle,
    AlertTriangle,
    Ban,
    Calendar,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    Download,
    Eye,
    FileText,
    Filter,
    Mail,
    MapPin,
    Phone,
    RotateCcw,
    Search,
    Store,
    XCircle,
} from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type SuspendedSeller = {
    id: number;
    storeName: string;
    ownerName: string;
    email: string;
    phone: string;
    businessType: string;
    location: string;
    address: string;
    suspensionDate: string;
    suspensionReason: string;
    suspendedBy: string;
    duration: 'Permanent' | '30 Days' | '60 Days' | '90 Days';
    details: string;
    totalReports: number;
    previousSuspensions: number;
    activeListings: number;
    totalSales: string;
    completedOrders: number;
    lastActive: string;
    warningsSent: number;
  }
const ITEMS_PER_PAGE = 10;
export default function SuspendedSellersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterReason, setFilterReason] = useState('all');
    const [filterDuration, setFilterDuration] = useState('all');
    const [selectedSellers, setSelectedSellers] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
  
    const [selectedSeller, setSelectedSeller] = useState<SuspendedSeller | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showReinstateModal, setShowReinstateModal] = useState(false);

    const suspendedSellers = useMemo<SuspendedSeller[]>(() => [
    {
      id: 1,
      storeName: 'Shady Collectibles',
      ownerName: 'Carlos Mercado',
      email: 'carlos.mercado@email.com',
      phone: '+63 912 111 2222',
      businessType: 'Online Only',
      location: 'Bacoor, Cavite',
      address: '123 Fake Street, Bacoor, Cavite',
      suspensionDate: 'Jan 5, 2025',
      suspensionReason: 'Counterfeit Products',
      suspendedBy: 'Admin #001',
      duration: 'Permanent',
      details: 'Multiple reports of selling fake collectibles and misleading product descriptions',
      totalReports: 15,
      previousSuspensions: 2,
      activeListings: 89,
      totalSales: '₱245,000',
      completedOrders: 156,
      lastActive: 'Jan 4, 2025',
      warningsSent: 3
    },
    {
      id: 2,
      storeName: 'Quick Toys PH',
      ownerName: 'Linda Ramos',
      email: 'linda.ramos@email.com',
      phone: '+63 923 222 3333',
      businessType: 'Physical Store',
      location: 'Imus, Cavite',
      address: '456 Main Road, Imus, Cavite',
      suspensionDate: 'Jan 8, 2025',
      suspensionReason: 'Payment Issues',
      suspendedBy: 'Admin #002',
      duration: '90 Days',
      details: 'Failed to remit platform fees for 3 consecutive months',
      totalReports: 8,
      previousSuspensions: 1,
      activeListings: 124,
      totalSales: '₱189,500',
      completedOrders: 203,
      lastActive: 'Jan 7, 2025',
      warningsSent: 5
    },
    {
      id: 3,
      storeName: 'Discount Toys Hub',
      ownerName: 'Ramon Santos',
      email: 'ramon.santos@email.com',
      phone: '+63 934 333 4444',
      businessType: 'Both',
      location: 'Dasmariñas, Cavite',
      address: '789 Commerce Ave, Dasmariñas, Cavite',
      suspensionDate: 'Jan 3, 2025',
      suspensionReason: 'Policy Violation',
      suspendedBy: 'Admin #001',
      duration: '30 Days',
      details: 'Repeated violation of pricing policies and auction manipulation',
      totalReports: 6,
      previousSuspensions: 0,
      activeListings: 67,
      totalSales: '₱142,300',
      completedOrders: 98,
      lastActive: 'Jan 2, 2025',
      warningsSent: 2
    },
    {
      id: 4,
      storeName: 'ToyWorld Express',
      ownerName: 'Beatriz Lopez',
      email: 'beatriz.lopez@email.com',
      phone: '+63 945 444 5555',
      businessType: 'Online Only',
      location: 'Cavite City, Cavite',
      address: '321 Digital Street, Cavite City, Cavite',
      suspensionDate: 'Dec 28, 2024',
      suspensionReason: 'Customer Complaints',
      suspendedBy: 'Admin #003',
      duration: '60 Days',
      details: 'Excessive customer complaints about non-delivery and poor communication',
      totalReports: 12,
      previousSuspensions: 1,
      activeListings: 45,
      totalSales: '₱98,700',
      completedOrders: 67,
      lastActive: 'Dec 27, 2024',
      warningsSent: 4
    },
    {
      id: 5,
      storeName: 'Mega Toys Store',
      ownerName: 'Diego Martinez',
      email: 'diego.martinez@email.com',
      phone: '+63 956 555 6666',
      businessType: 'Physical Store',
      location: 'Kawit, Cavite',
      address: '654 Trade Center, Kawit, Cavite',
      suspensionDate: 'Jan 10, 2025',
      suspensionReason: 'Spam/Scam Activity',
      suspendedBy: 'Admin #002',
      duration: 'Permanent',
      details: 'Attempting to redirect customers off-platform and phishing attempts',
      totalReports: 20,
      previousSuspensions: 3,
      activeListings: 0,
      totalSales: '₱67,400',
      completedOrders: 34,
      lastActive: 'Jan 9, 2025',
      warningsSent: 6
    }
  ], []);

  const filteredSellers = useMemo(() => {
    let result = [...suspendedSellers];

    // Search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (s) =>
          s.storeName.toLowerCase().includes(term) ||
          s.ownerName.toLowerCase().includes(term) ||
          s.email.toLowerCase().includes(term)
      );
    }

    // Filter by reason
    if (filterReason !== 'all') {
      result = result.filter((s) => s.suspensionReason === filterReason);
    }

    // Filter by duration
    if (filterDuration !== 'all') {
      const isPermanent = filterDuration === 'permanent';
      result = result.filter((s) =>
        isPermanent ? s.duration === 'Permanent' : s.duration !== 'Permanent'
      );
    }

    return result;
  }, [suspendedSellers, searchTerm, filterReason, filterDuration]);
  const stats = [
    { label: 'Total Suspended', value: '18', icon: Ban },
    { label: 'Permanent Bans', value: '5', icon: XCircle },
    { label: 'Temporary Suspensions', value: '13', icon: Clock },
    { label: 'Pending Review', value: '3', icon: AlertCircle },
  ];
  // Pagination
  const totalPages = Math.ceil(filteredSellers.length / ITEMS_PER_PAGE);
  const paginatedSellers = filteredSellers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSelectSeller = (sellerId: number) => {
    setSelectedSellers((prev) =>
      prev.includes(sellerId)
        ? prev.filter((id) => id !== sellerId)
        : [...prev, sellerId]
    );
  };

  const handleSelectAll = () => {
    if (selectedSellers.length === paginatedSellers.length) {
      setSelectedSellers([]);
    } else {
      setSelectedSellers(paginatedSellers.map((s) => s.id));
    }
  };

  const openDetailsModal = (seller: SuspendedSeller) => {
    setSelectedSeller(seller);
    setShowDetailsModal(true);
  };

  const openReinstateModal = (seller: SuspendedSeller) => {
    setSelectedSeller(seller);
    setShowReinstateModal(true);
  };

  const closeModals = () => {
    setShowDetailsModal(false);
    setShowReinstateModal(false);
    setSelectedSeller(null);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/dashboard/overview' },
    { title: 'Sellers', href: '/admin/application/sellers/' },
    { title: 'Suspended Sellers', href: '/admin/manage/sellers/suspended' },
  ];

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Suspended Sellers - Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-7xl px-6 py-8">
                    {/* Page Header with Filters and Export */}
                    <div className="mb-8">
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                                    <Ban className="h-8 w-8 text-red-600" />
                                    Suspended Sellers
                                </h1>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Monitor and manage suspended store accounts
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
                                            className={`rounded-lg bg-red-100 p-3 dark:bg-red-900/30`}
                                        >
                                            <stat.icon
                                                className={`h-6 w-6 text-red-600 dark:text-red-400`}
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
                                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-gray-900 focus:ring-2 focus:ring-red-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                            <div className="flex gap-3">
                                <select
                                    value={filterReason}
                                    onChange={(e) =>
                                        setFilterReason(e.target.value)
                                    }
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-red-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                >
                                    <option value="all">All Reasons</option>
                                    <option value="counterfeit">Counterfeit Products</option>
                                    <option value="payment">Payment Issues</option>
                                    <option value="policy">Policy Violation</option>
                                    <option value="complaints">Customer Complaints</option>
                                    <option value="spam">Spam/Scam Activity</option>
                                </select>
                                <select
                                    value={filterDuration}
                                    onChange={(e) =>
                                        setFilterDuration(e.target.value)
                                    }
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-red-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                >
                                    <option value="all">All Durations</option>
                                    <option value="permanent">Permanent</option>
                                    <option value="temporary">Temporary</option>
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
                        <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                            <p className="text-sm font-medium text-red-900 dark:text-red-100">
                                {selectedSellers.length} seller
                                {selectedSellers.length > 1 ? 's' : ''} selected
                            </p>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 dark:border-red-700 dark:bg-gray-800 dark:text-red-300 dark:hover:bg-red-900/20">
                                    <FileText className="h-4 w-4" />
                                    View Reports
                                </button>
                                <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700">
                                    <RotateCcw className="h-4 w-4" />
                                    Reinstate Selected
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Suspended Sellers Table */}
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
                                                    suspendedSellers.length
                                                }
                                                onChange={handleSelectAll}
                                                className="h-4 w-4 rounded text-red-600 focus:ring-red-500"
                                            />
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Store
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Owner
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Suspension Details
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Reason
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Reports & History
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {suspendedSellers.map((seller: SuspendedSeller) => (
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
                                                    className="h-4 w-4 rounded text-red-600 focus:ring-red-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-500 text-lg font-semibold text-white">
                                                        {seller.storeName.charAt(
                                                            0,
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                                {seller.storeName}
                                                            </p>
                                                            <Ban className="h-4 w-4 text-red-500" />
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
                                                <div className="space-y-1 text-sm">
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                        <Calendar className="h-4 w-4 text-gray-400" />
                                                        {seller.suspensionDate}
                                                    </div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                        By:{' '}
                                                        <span className="font-medium">
                                                            {seller.suspendedBy}
                                                        </span>
                                                    </p>
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                            seller.duration ===
                                                            'Permanent'
                                                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                                                : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                                                        }`}
                                                    >
                                                        {seller.duration}
                                                    </span>
                                                    {seller.previousSuspensions >
                                                        0 && (
                                                        <p className="mt-1 text-xs font-medium text-red-600">
                                                            ⚠️{' '}
                                                            {
                                                                seller.previousSuspensions
                                                            }{' '}
                                                            previous suspension
                                                            {seller.previousSuspensions >
                                                            1
                                                                ? 's'
                                                                : ''}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                            seller.suspensionReason ===
                                                            'Counterfeit Products'
                                                                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                                                : seller.suspensionReason ===
                                                                    'Payment Issues'
                                                                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                                                                  : seller.suspensionReason ===
                                                                      'Policy Violation'
                                                                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                                                                    : seller.suspensionReason ===
                                                                        'Customer Complaints'
                                                                      ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300'
                                                                      : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                                                        }`}
                                                    >
                                                        {seller.suspensionReason}
                                                    </span>
                                                    <p className="mt-2 line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
                                                        {seller.details}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <AlertTriangle className="h-4 w-4 text-red-500" />
                                                        <span className="text-sm font-semibold text-red-600">
                                                            {seller.totalReports}{' '}
                                                            reports
                                                        </span>
                                                    </div>
                                                    <div className="space-y-0.5 text-xs text-gray-600 dark:text-gray-400">
                                                        <p>
                                                            ⚠️{' '}
                                                            {seller.warningsSent}{' '}
                                                            warnings sent
                                                        </p>
                                                        <p>
                                                            📦{' '}
                                                            {seller.activeListings}{' '}
                                                            listings (frozen)
                                                        </p>
                                                        <p>
                                                            💰 {seller.totalSales}{' '}
                                                            total sales
                                                        </p>
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
                                                    <button
                                                        onClick={() =>
                                                            openReinstateModal(
                                                                seller,
                                                            )
                                                        }
                                                        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-green-600 transition hover:bg-green-50 dark:hover:bg-green-900/20"
                                                    >
                                                        <RotateCcw className="h-3 w-3" />
                                                        Reinstate
                                                    </button>
                                                    <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                                                        <FileText className="h-3 w-3" />
                                                        Reports
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
                                to <span className="font-medium">5</span> of{' '}
                                <span className="font-medium">18</span> suspended
                                sellers
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                    <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button className="rounded-lg bg-red-600 px-4 py-2 text-white">
                                    1
                                </button>
                                <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                    2
                                </button>
                                <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                    3
                                </button>
                                <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                    4
                                </button>
                                <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
      </div>

                    {/* Details Modal */}
                    {showDetailsModal && selectedSeller && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-xl dark:bg-gray-800">
                                <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-red-100 p-3 dark:bg-red-900/30">
                                            <Ban className="h-6 w-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                {selectedSeller.storeName}
                                            </h3>
                                            <p className="text-sm text-red-600">
                                                Suspended Account
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setShowDetailsModal(false)
                                        }
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <XCircle className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="space-y-6 p-6">
                                    {/* Suspension Summary */}
                                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                                        <h4 className="mb-3 font-semibold text-red-900 dark:text-red-100">
                                            Suspension Summary
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-red-700 dark:text-red-300">
                                                    Suspension Reason
                                                </p>
                                                <p className="font-medium text-red-900 dark:text-red-100">
                                                    {
                                                        selectedSeller.suspensionReason
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-red-700 dark:text-red-300">
                                                    Duration
                                                </p>
                                                <p className="font-medium text-red-900 dark:text-red-100">
                                                    {selectedSeller.duration}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-red-700 dark:text-red-300">
                                                    Suspension Date
                                                </p>
                                                <p className="font-medium text-red-900 dark:text-red-100">
                                                    {
                                                        selectedSeller.suspensionDate
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-red-700 dark:text-red-300">
                                                    Suspended By
                                                </p>
                                                <p className="font-medium text-red-900 dark:text-red-100">
                                                    {
                                                        selectedSeller.suspendedBy
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-3 border-t border-red-200 pt-3 dark:border-red-800">
                                            <p className="text-sm text-red-800 dark:text-red-200">
                                                {selectedSeller.details}
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
                                                    Store Name
                                                </p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {selectedSeller.storeName}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    Owner Name
                                                </p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {selectedSeller.ownerName}
                                                </p>
                                            </div>
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
                                        </div>
                                    </div>

                                    {/* Violation History */}
                                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                        <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                                            Violation History
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between rounded border border-gray-200 bg-white p-3 dark:border-gray-600 dark:bg-gray-800">
                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    Total Reports
                                                </span>
                                                <span className="font-semibold text-red-600">
                                                    {selectedSeller.totalReports}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between rounded border border-gray-200 bg-white p-3 dark:border-gray-600 dark:bg-gray-800">
                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    Warnings Sent
                                                </span>
                                                <span className="font-semibold text-orange-600">
                                                    {selectedSeller.warningsSent}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between rounded border border-gray-200 bg-white p-3 dark:border-gray-600 dark:bg-gray-800">
                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    Previous Suspensions
                                                </span>
                                                <span className="font-semibold text-red-600">
                                                    {
                                                        selectedSeller.previousSuspensions
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Performance Before Suspension */}
                                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                        <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                                            Performance Before Suspension
                                        </h4>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {selectedSeller.activeListings}
                                                </p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    Active Listings
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {selectedSeller.totalSales}
                                                </p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    Total Sales
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {selectedSeller.completedOrders}
                                                </p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                                    Orders Completed
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                setShowDetailsModal(false);
                                                openReinstateModal(
                                                    selectedSeller,
                                                );
                                            }}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                                        >
                                            <RotateCcw className="h-4 w-4" />
                                            Reinstate Seller
                                        </button>
                                        <button className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                                            View Full Reports
                                        </button>
                                    </div>
            </div>
          </div>
        </div>
      )}

                    {/* Reinstate Modal */}
                    {showReinstateModal && selectedSeller && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="rounded-lg bg-green-100 p-3 dark:bg-green-900/30">
                                        <RotateCcw className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Reinstate Seller
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Restore seller account access
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                    <p className="mb-2 font-medium text-gray-900 dark:text-white">
                                        {selectedSeller.storeName}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {selectedSeller.ownerName}
                                    </p>
                                    <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-600">
                                        <p className="mb-1 text-xs text-gray-600 dark:text-gray-400">
                                            Suspended for:{' '}
                                            <span className="font-medium text-red-600">
                                                {selectedSeller.suspensionReason}
                                            </span>
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Duration:{' '}
                                            <span className="font-medium">
                                                {selectedSeller.duration}
                                            </span>
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Total Reports:{' '}
                                            <span className="font-medium text-red-600">
                                                {selectedSeller.totalReports}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Reinstatement Note
                                    </label>
                                    <textarea
                                        rows={3}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-green-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                        placeholder="Add a note about this reinstatement (required)..."
                                    ></textarea>
                                </div>

                                <div className="mb-4">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded text-green-600 focus:ring-green-500"
                                        />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            Send notification email to seller
                                        </span>
                                    </label>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() =>
                                            setShowReinstateModal(false)
                                        }
                                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowReinstateModal(false);
                                            setSelectedSeller(null);
                                        }}
                                        className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                                    >
                                        Confirm Reinstate
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
        </AdminLayout>
    );
};