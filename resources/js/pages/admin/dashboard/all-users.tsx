import AdminLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  UserPlus,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  MapPin,
  ShoppingBag,
  Gavel,
  Eye,
  Ban,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  userType: 'Collector' | 'Store Owner' | 'Both';
  status: 'Active' | 'Pending';
  joinDate: string;
  location: string;
  totalPurchases: number;
  totalAuctions: number;
  lastActive: string;
  verified: boolean;
};

const ITEMS_PER_PAGE = 10;
const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Manage users',
    href: '/admin/manage/users',
  },
  {
    title: 'All users',
    href: '/admin/manage/users',
  },
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'collector' | 'store' | 'both'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Fixed: Wrap allUsers in useMemo to prevent recreation on every render
  const allUsers = useMemo<User[]>(() => [
    {
      id: 1,
      name: 'Juan Dela Cruz',
      email: 'juan.delacruz@email.com',
      phone: '+63 912 345 6789',
      userType: 'Collector' as const,
      status: 'Active' as const,
      joinDate: 'Jan 15, 2025',
      location: 'Bacoor, Cavite',
      totalPurchases: 24,
      totalAuctions: 12,
      lastActive: '2 hours ago',
      verified: true
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '+63 923 456 7890',
      userType: 'Store Owner' as const,
      status: 'Active' as const,
      joinDate: 'Dec 8, 2024',
      location: 'Imus, Cavite',
      totalPurchases: 5,
      totalAuctions: 0,
      lastActive: '1 day ago',
      verified: true
    },
    {
      id: 3,
      name: 'Pedro Reyes',
      email: 'pedro.reyes@email.com',
      phone: '+63 934 567 8901',
      userType: 'Both' as const,
      status: 'Active' as const,
      joinDate: 'Nov 22, 2024',
      location: 'Dasmariñas, Cavite',
      totalPurchases: 48,
      totalAuctions: 35,
      lastActive: '5 mins ago',
      verified: true
    },
    {
      id: 4,
      name: 'Ana Garcia',
      email: 'ana.garcia@email.com',
      phone: '+63 945 678 9012',
      userType: 'Collector' as const,
      status: 'Pending' as const,
      joinDate: 'Jan 10, 2025',
      location: 'Cavite City, Cavite',
      totalPurchases: 0,
      totalAuctions: 0,
      lastActive: '3 hours ago',
      verified: false
    },
    {
      id: 5,
      name: 'Roberto Cruz',
      email: 'roberto.cruz@email.com',
      phone: '+63 956 789 0123',
      userType: 'Store Owner' as const,
      status: 'Active' as const,
      joinDate: 'Oct 5, 2024',
      location: 'Kawit, Cavite',
      totalPurchases: 2,
      totalAuctions: 0,
      lastActive: '12 hours ago',
      verified: true
    },
    {
      id: 6,
      name: 'Sofia Mendoza',
      email: 'sofia.mendoza@email.com',
      phone: '+63 967 890 1234',
      userType: 'Collector' as const,
      status: 'Active' as const,
      joinDate: 'Sep 18, 2024',
      location: 'Bacoor, Cavite',
      totalPurchases: 67,
      totalAuctions: 28,
      lastActive: '30 mins ago',
      verified: true
    },
    {
      id: 7,
      name: 'Miguel Torres',
      email: 'miguel.torres@email.com',
      phone: '+63 978 901 2345',
      userType: 'Both' as const,
      status: 'Pending' as const,
      joinDate: 'Jan 11, 2025',
      location: 'Imus, Cavite',
      totalPurchases: 1,
      totalAuctions: 0,
      lastActive: '1 hour ago',
      verified: false
    },
    {
      id: 8,
      name: 'Carmen Flores',
      email: 'carmen.flores@email.com',
      phone: '+63 989 012 3456',
      userType: 'Collector' as const,
      status: 'Active' as const,
      joinDate: 'Aug 30, 2024',
      location: 'Dasmariñas, Cavite',
      totalPurchases: 92,
      totalAuctions: 45,
      lastActive: '10 mins ago',
      verified: true
    }
  ], []);

  // Fixed: Use explicit color classes instead of dynamic strings
  const stats = [
    { label: 'Total Users', value: '1,331', icon: Eye, bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
    { label: 'Collectors', value: '864', icon: ShoppingBag, bgColor: 'bg-purple-100', textColor: 'text-purple-600' },
    { label: 'Store Owners', value: '47', icon: Gavel, bgColor: 'bg-pink-100', textColor: 'text-pink-600' },
    { label: 'Pending Verification', value: '13', icon: Clock, bgColor: 'bg-orange-100', textColor: 'text-orange-600' }
  ];

  // Memoized filtered & searched users
  const filteredUsers = useMemo(() => {
    let result = [...allUsers];

    // Search
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(term) ||
          u.email.toLowerCase().includes(term) ||
          u.phone.includes(term)
      );
    }

    // Filter by type
    if (filterType !== 'all') {
      const typeMap = {
        collector: 'Collector',
        store: 'Store Owner',
        both: 'Both',
      };
      result = result.filter((u) => u.userType === typeMap[filterType]);
    }

    // Filter by status
    if (filterStatus !== 'all') {
      const statusMap = { active: 'Active', pending: 'Pending' };
      result = result.filter((u) => u.status === statusMap[filterStatus]);
    }

    return result;
  }, [allUsers, searchTerm, filterType, filterStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSelectUser = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map((u) => u.id));
    }
  };

  // You should also use paginatedUsers in your table instead of allUsers
  const usersToDisplay = paginatedUsers;

  return (
    <AdminLayout breadcrumbs={breadcrumbs}>
      <Head title="All Users - Admin Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <div className="max-w-7xl mx-auto w-full px-6 py-8">
          {/* Page Header with Filters and Export */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <UserPlus className="w-8 h-8 text-blue-600" />
                  All Users
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Manage and monitor all platform users
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Add User
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="collector">Collectors</option>
                  <option value="store">Store Owners</option>
                  <option value="both">Both</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                </select>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  More Filters
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Verification Status</label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All</option>
                      <option>Verified</option>
                      <option>Unverified</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Location</label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All Locations</option>
                      <option>Bacoor</option>
                      <option>Imus</option>
                      <option>Dasmariñas</option>
                      <option>Cavite City</option>
                      <option>Kawit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Join Date</label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All Time</option>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>Last 90 Days</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Selected Actions Bar */}
          {selectedUsers.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6 flex items-center justify-between">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-700 rounded-lg text-sm font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 transition">
                  Send Email
                </button>
                <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-700 rounded-lg text-sm font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 transition">
                  Export Selected
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
                  Suspend Selected
                </button>
              </div>
            </div>
          )}

          {/* Users Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === usersToDisplay.length}
                        onChange={handleSelectAll}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Activity</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {usersToDisplay.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectUser(user.id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                              {user.verified && (
                                <CheckCircle className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              <Calendar className="w-3 h-3" />
                              {user.joinDate}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {user.phone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {user.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          user.userType === 'Collector' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                          user.userType === 'Store Owner' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                          'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        }`}>
                          {user.userType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                          'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4 text-gray-400" />
                            {user.totalPurchases} purchases
                          </div>
                          <div className="flex items-center gap-2">
                            <Gavel className="w-4 h-4 text-gray-400" />
                            {user.totalAuctions} auctions
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.lastActive}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition">
                            View
                          </button>
                          <button className="p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> 
                to <span className="font-medium">{Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)}</span> 
                of <span className="font-medium">{filteredUsers.length}</span> users
              </p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 3 && currentPage > 2 && currentPage < totalPages - 1 && (
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    ...
                  </button>
                )}
                {totalPages > 3 && currentPage < totalPages - 1 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    {totalPages}
                  </button>
                )}
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}