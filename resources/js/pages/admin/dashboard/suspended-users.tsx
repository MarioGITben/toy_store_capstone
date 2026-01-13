import AdminLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Calendar,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    Download,
    Eye,
    Mail,
    MapPin,
    Phone,
    Search,
    UserX,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';

interface SuspendedUser {
    id: number;
    userName: string;
    email: string;
    phone: string;
    storeName: string;
    storeDescription: string;
    location: string;
    suspensionDate: string;
    suspensionReason: string;
    status: string;
    appealSubmitted?: boolean;
    appealDate?: string;
    appealReason?: string;
    violations: string[];
}

export default function SuspendedUsers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<SuspendedUser | null>(
        null,
    );

    const suspendedUsers: SuspendedUser[] = [
        {
            id: 1,
            userName: 'Juan Dela Cruz',
            email: 'juan.delacruz@email.com',
            phone: '+63 912 345 6789',
            storeName: 'Toy World Bacoor',
            storeDescription:
                'Family toy store with educational toys and games',
            location: 'Bacoor, Cavite',
            suspensionDate: 'Jan 15, 2025',
            suspensionReason:
                'Multiple policy violations - selling counterfeit products',
            status: 'Suspended',
            appealSubmitted: true,
            appealDate: 'Jan 18, 2025',
            appealReason:
                'I was unaware the products were counterfeit. I have removed all such items and will only sell verified authentic products going forward.',
            violations: ['Counterfeit Products', 'Policy Violation'],
        },
        {
            id: 2,
            userName: 'Maria Santos',
            email: 'maria.santos@email.com',
            phone: '+63 923 456 7890',
            storeName: 'Kids Play Store',
            storeDescription:
                'Colorful toys and educational games for children',
            location: 'Imus, Cavite',
            suspensionDate: 'Jan 12, 2025',
            suspensionReason: 'Inappropriate content in product listings',
            status: 'Appeal Pending',
            appealSubmitted: true,
            appealDate: 'Jan 16, 2025',
            appealReason:
                'The content was flagged by mistake. All product descriptions have been reviewed and updated to comply with platform guidelines.',
            violations: ['Inappropriate Content'],
        },
        {
            id: 3,
            userName: 'Carlos Reyes',
            email: 'carlos.reyes@email.com',
            phone: '+63 934 567 8901',
            storeName: 'Action Heroes',
            storeDescription: 'Superhero figures and collectible action toys',
            location: 'Dasmariñas, Cavite',
            suspensionDate: 'Jan 10, 2025',
            suspensionReason:
                'Account compromised and used for fraudulent activities',
            status: 'Appeal Approved',
            appealSubmitted: true,
            appealDate: 'Jan 14, 2025',
            appealReason:
                'My account was hacked. I have changed all passwords, enabled 2FA, and contacted authorities. I have full control of my account now.',
            violations: ['Fraudulent Activity', 'Security Breach'],
        },
        {
            id: 4,
            userName: 'Elena Garcia',
            email: 'elena.garcia@email.com',
            phone: '+63 945 678 9012',
            storeName: 'Doll House',
            storeDescription: 'Beautiful dolls and accessories for collectors',
            location: 'Cavite City, Cavite',
            suspensionDate: 'Jan 8, 2025',
            suspensionReason:
                'Multiple customer complaints about product quality',
            status: 'Appeal Rejected',
            appealSubmitted: true,
            appealDate: 'Jan 11, 2025',
            appealReason:
                'I have improved my product quality control processes and all new listings include detailed product specifications.',
            violations: ['Product Quality', 'Customer Complaints'],
        },
    ];

    const stats = [
        { label: 'Suspended Users', value: '23', icon: UserX },
        { label: 'Pending Appeals', value: '8', icon: Clock },
        { label: 'Appeal Approved', value: '12', icon: CheckCircle },
        { label: 'Appeal Rejected', value: '3', icon: XCircle },
    ];

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Manage users',
            href: '/admin/manage/users',
        },
        {
            title: 'All users',
            href: '/admin/manage/users',
        },
        {
            title: 'Suspended users',
            href: '/admin/manage/suspended/users',
        },
    ];

    const handleSelectUser = (userId: number) => {
        setSelectedUsers((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId],
        );
    };

    const handleSelectAll = () => {
        if (selectedUsers.length === suspendedUsers.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(suspendedUsers.map((u: SuspendedUser) => u.id));
        }
    };

    const openReviewModal = (user: SuspendedUser) => {
        setSelectedUser(user);
        setShowReviewModal(true);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Suspended Users - Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="mx-auto w-full max-w-7xl px-6 py-8">
                    {/* Page Header with Filters and Export */}
                    <div className="mb-8">
                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 dark:text-white">
                                    <UserX className="h-8 w-8 text-red-600" />
                                    Suspended Users
                                </h1>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Manage suspended user accounts and review
                                    appeal requests
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
                                    placeholder="Search by name, email, or suspension reason..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-4 pl-10 text-gray-900 focus:ring-2 focus:ring-red-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                            <select
                                value={filterStatus}
                                onChange={(e) =>
                                    setFilterStatus(e.target.value)
                                }
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-red-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            >
                                <option value="all">All Status</option>
                                <option value="suspended">Suspended</option>
                                <option value="appeal_pending">
                                    Appeal Pending
                                </option>
                                <option value="appeal_approved">
                                    Appeal Approved
                                </option>
                                <option value="appeal_rejected">
                                    Appeal Rejected
                                </option>
                            </select>
                        </div>
                    </div>

                    {/* Selected Actions Bar */}
                    {selectedUsers.length > 0 && (
                        <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                            <p className="text-sm font-medium text-red-900 dark:text-red-100">
                                {selectedUsers.length} user
                                {selectedUsers.length > 1 ? 's' : ''} selected
                            </p>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700">
                                    <CheckCircle className="h-4 w-4" />
                                    Restore Access
                                </button>
                                <button className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700">
                                    <XCircle className="h-4 w-4" />
                                    Reject Appeal
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Suspended Users Table */}
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-4 text-left">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    selectedUsers.length ===
                                                    suspendedUsers.length
                                                }
                                                onChange={handleSelectAll}
                                                className="h-4 w-4 rounded text-red-600 focus:ring-red-500"
                                            />
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            User
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Store Details
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Suspension Info
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Violations
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {suspendedUsers.map(
                                        (user: SuspendedUser) => (
                                            <tr
                                                key={`user-${user.id}`}
                                                className="transition hover:bg-gray-50 dark:hover:bg-gray-700"
                                            >
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedUsers.includes(
                                                            user.id,
                                                        )}
                                                        onChange={() =>
                                                            handleSelectUser(
                                                                user.id,
                                                            )
                                                        }
                                                        className="h-4 w-4 rounded text-red-600 focus:ring-red-500"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 font-semibold text-white">
                                                            {user.userName.charAt(
                                                                0,
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {user.userName}
                                                            </p>
                                                            <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                                <Mail className="h-3 w-3" />
                                                                {user.email}
                                                            </div>
                                                            <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                                <Phone className="h-3 w-3" />
                                                                {user.phone}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1">
                                                        <p className="font-semibold text-gray-900 dark:text-white">
                                                            {user.storeName}
                                                        </p>
                                                        <p className="line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
                                                            {
                                                                user.storeDescription
                                                            }
                                                        </p>
                                                        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                            <MapPin className="h-3 w-3" />
                                                            {user.location}
                                                        </div>
                                                        <div className="mt-2">
                                                            <p className="text-xs font-medium text-red-600 dark:text-red-400">
                                                                Suspension
                                                                Reason:
                                                            </p>
                                                            <p className="mt-1 text-xs text-gray-700 dark:text-gray-300">
                                                                {
                                                                    user.suspensionReason
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-gray-400" />
                                                            <span>
                                                                Suspended:{' '}
                                                                {
                                                                    user.suspensionDate
                                                                }
                                                            </span>
                                                        </div>
                                                        {user.appealSubmitted &&
                                                            user.appealDate && (
                                                                <div className="flex items-center gap-2">
                                                                    <Clock className="h-4 w-4 text-gray-400" />
                                                                    <span>
                                                                        Appeal:{' '}
                                                                        {
                                                                            user.appealDate
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-2">
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                                                user.status ===
                                                                'Suspended'
                                                                    ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                                                    : user.status ===
                                                                        'Appeal Pending'
                                                                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                                                                      : user.status ===
                                                                          'Appeal Approved'
                                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                                                        : user.status ===
                                                                            'Appeal Rejected'
                                                                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                                                          : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
                                                            }`}
                                                        >
                                                            {user.status}
                                                        </span>
                                                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                            <Calendar className="h-3 w-3" />
                                                            {
                                                                user.suspensionDate
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                            Violation Reports
                                                        </p>
                                                        <div className="flex flex-wrap gap-1">
                                                            {user.violations
                                                                .slice(0, 2)
                                                                .map(
                                                                    (
                                                                        violation,
                                                                        idx,
                                                                    ) => (
                                                                        <span
                                                                            key={
                                                                                idx
                                                                            }
                                                                            className="inline-flex items-center rounded bg-red-100 px-2 py-0.5 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                                                        >
                                                                            {violation.length >
                                                                            12
                                                                                ? violation.substring(
                                                                                      0,
                                                                                      10,
                                                                                  ) +
                                                                                  '...'
                                                                                : violation}
                                                                        </span>
                                                                    ),
                                                                )}
                                                        </div>
                                                        {user.violations
                                                            .length > 2 && (
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                +
                                                                {user.violations
                                                                    .length -
                                                                    2}{' '}
                                                                more
                                                            </p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-2">
                                                        <button
                                                            onClick={() =>
                                                                openReviewModal(
                                                                    user,
                                                                )
                                                            }
                                                            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                                                        >
                                                            <Eye className="h-3 w-3" />
                                                            Review Appeal
                                                        </button>
                                                        {user.status ===
                                                            'Suspended' && (
                                                            <>
                                                                <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-green-600 transition hover:bg-green-50 dark:hover:bg-green-900/20">
                                                                    Restore
                                                                    Access
                                                                </button>
                                                                <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20">
                                                                    Permanent
                                                                    Ban
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Showing <span className="font-medium">1</span>{' '}
                                to <span className="font-medium">4</span> of{' '}
                                <span className="font-medium">23</span>{' '}
                                suspended users
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
                                <button className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            {showReviewModal && selectedUser && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
                    <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-xl dark:bg-gray-800">
                        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Appeal Review
                            </h3>
                            <button
                                onClick={() => setShowReviewModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <XCircle className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="space-y-6 p-6">
                            {/* User Info */}
                            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                                    User Information
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Full Name
                                        </p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {selectedUser.userName}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Email
                                        </p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {selectedUser.email}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Phone
                                        </p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {selectedUser.phone}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Location
                                        </p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {selectedUser.location}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Suspension Info */}
                            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                                    Suspension Details
                                </h4>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Suspension Date
                                        </p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {selectedUser.suspensionDate}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Reason for Suspension
                                        </p>
                                        <p className="font-medium text-red-600 dark:text-red-400">
                                            {selectedUser.suspensionReason}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Store Affected
                                        </p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {selectedUser.storeName}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Appeal Details */}
                            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                                    Appeal Information
                                </h4>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Appeal Submitted
                                        </p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {selectedUser.appealDate ||
                                                'Not submitted'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Appeal Reason
                                        </p>
                                        <p className="text-gray-900 dark:text-white">
                                            {selectedUser.appealReason ||
                                                'No appeal submitted'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Evidence Provided
                                        </p>
                                        <div className="mt-1 flex flex-wrap gap-2">
                                            <span className="inline-flex items-center rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                                Appeal Letter
                                            </span>
                                            <span className="inline-flex items-center rounded bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                                Screenshots
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Violation History */}
                            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                                    Violation History
                                </h4>
                                <div className="space-y-2">
                                    {selectedUser.violations.map(
                                        (violation, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between rounded border border-gray-200 bg-white p-3 dark:border-gray-600 dark:bg-gray-800"
                                            >
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                        {violation}
                                                    </span>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Violation #{idx + 1}
                                                    </p>
                                                </div>
                                                <span className="text-xs font-medium text-red-600 dark:text-red-400">
                                                    Critical
                                                </span>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* Appeal Decision */}
                            <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                                <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                                    Appeal Decision
                                </h4>
                                <textarea
                                    rows={3}
                                    className="mb-3 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:ring-2 focus:ring-red-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                    placeholder="Add review comments or rejection reason..."
                                ></textarea>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() =>
                                            setShowReviewModal(false)
                                        }
                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                                    >
                                        <CheckCircle className="h-4 w-4" />
                                        Restore Access
                                    </button>
                                    <button
                                        onClick={() =>
                                            setShowReviewModal(false)
                                        }
                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                                    >
                                        <XCircle className="h-4 w-4" />
                                        Reject Appeal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
