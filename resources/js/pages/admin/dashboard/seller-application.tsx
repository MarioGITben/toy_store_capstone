import React, { useState } from 'react';
import { Search, Filter, Download, Store, Mail, Phone, Calendar, MapPin, FileText, CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight, Eye, AlertCircle } from 'lucide-react';
import AdminLayout from '@/layouts/admin-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Application {
    id: number;
    applicantName: string;
    email: string;
    phone: string;
    storeName: string;
    storeDescription: string;
    businessType: string;
    location: string;
    address: string;
    applicationDate: string;
    status: string;
    experience: string;
    expectedRevenue: string;
    hasBusinessPermit: boolean;
    hasTaxId: boolean;
    documents: string[];
    bankDetails: string;
    facebook?: string;
    instagram?: string;
    rejectionReason?: string;
}

export default function SellerApplications() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedApplications, setSelectedApplications] = useState<number[]>([]);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

    const applications: Application[] = [
        {
            id: 1,
            applicantName: 'Maria Santos',
            email: 'maria.santos@email.com',
            phone: '+63 923 456 7890',
            storeName: 'Toy Haven Cavite',
            storeDescription: 'Premium toy store specializing in action figures and collectibles',
            businessType: 'Physical Store',
            location: 'Bacoor, Cavite',
            address: '123 Main Street, Bacoor, Cavite',
            applicationDate: 'Jan 10, 2025',
            status: 'Pending',
            experience: '5 years',
            expectedRevenue: '₱50,000 - ₱100,000/month',
            hasBusinessPermit: true,
            hasTaxId: true,
            documents: ['Business Permit', 'DTI Registration', 'Valid ID', 'Proof of Address'],
            bankDetails: 'BDO - 1234567890',
            facebook: 'facebook.com/toyhavencavite',
            instagram: '@toyhavencavite'
        },
        {
            id: 2,
            applicantName: 'Roberto Cruz',
            email: 'roberto.cruz@email.com',
            phone: '+63 956 789 0123',
            storeName: "Collector's Paradise",
            storeDescription: 'Vintage and rare toy collectibles from the 80s and 90s',
            businessType: 'Online Only',
            location: 'Imus, Cavite',
            address: '456 Oak Avenue, Imus, Cavite',
            applicationDate: 'Jan 12, 2025',
            status: 'Under Review',
            experience: '3 years',
            expectedRevenue: '₱30,000 - ₱50,000/month',
            hasBusinessPermit: true,
            hasTaxId: true,
            documents: ['Business Permit', 'DTI Registration', 'Valid ID'],
            bankDetails: 'BPI - 0987654321',
            facebook: 'facebook.com/collectorsparadise',
            instagram: '@collectorsparadise'
        },
        {
            id: 3,
            applicantName: 'Sofia Mendoza',
            email: 'sofia.mendoza@email.com',
            phone: '+63 967 890 1234',
            storeName: 'Vintage Vault',
            storeDescription: 'Specializing in vintage Japanese toys and limited editions',
            businessType: 'Both',
            location: 'Dasmariñas, Cavite',
            address: '789 Pine Street, Dasmariñas, Cavite',
            applicationDate: 'Jan 8, 2025',
            status: 'Approved',
            experience: '7 years',
            expectedRevenue: '₱100,000+/month',
            hasBusinessPermit: true,
            hasTaxId: true,
            documents: ['Business Permit', 'DTI Registration', 'Valid ID', 'Proof of Address', 'Mayor\'s Permit'],
            bankDetails: 'Metrobank - 1122334455',
            facebook: 'facebook.com/vintagevault',
            instagram: '@vintagevault'
        },
        {
            id: 4,
            applicantName: 'Carlos Reyes',
            email: 'carlos.reyes@email.com',
            phone: '+63 934 567 8901',
            storeName: 'Action Station',
            storeDescription: 'Modern action figures and model kits',
            businessType: 'Physical Store',
            location: 'Cavite City, Cavite',
            address: '321 Maple Drive, Cavite City, Cavite',
            applicationDate: 'Jan 11, 2025',
            status: 'Rejected',
            experience: '1 year',
            expectedRevenue: '₱20,000 - ₱30,000/month',
            hasBusinessPermit: false,
            hasTaxId: true,
            documents: ['DTI Registration', 'Valid ID'],
            bankDetails: 'Landbank - 5566778899',
            facebook: 'facebook.com/actionstation',
            rejectionReason: 'Missing required business permit and insufficient experience'
        }
    ];

    const stats = [
        { label: 'Total Applications', value: '87', icon: FileText },
        { label: 'Pending Review', value: '23', icon: Clock },
        { label: 'Approved', value: '52', icon: CheckCircle },
        { label: 'Rejected', value: '12', icon: XCircle }
    ];

    

    const breadcrumbs: BreadcrumbItem[] = [
        {
          title: 'Manage sellers',
          href: '/admin/manage/applications/seller',
        },
        {
            title: 'Applications',
            href: '/admin/manage/applications/seller',
        },
      ];

    const handleSelectApplication = (appId: number) => {
        setSelectedApplications(prev =>
            prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
        );
    };

    const handleSelectAll = () => {
        if (selectedApplications.length === applications.length) {
            setSelectedApplications([]);
        } else {
            setSelectedApplications(applications.map((a: Application) => a.id));
        }
    };

    const openReviewModal = (application: Application) => {
        setSelectedApplication(application);
        setShowReviewModal(true);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Seller Applications - Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="max-w-7xl mx-auto w-full px-6 py-8">
                    {/* Page Header with Filters and Export */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                                    <Store className="w-8 h-8 text-purple-600" />
                                    Seller Applications
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    Review and manage store owner applications
                                </p>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Export Applications
                                </button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30`}>
                                            <stat.icon className={`w-6 h-6 text-purple-600 dark:text-purple-400`} />
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
                                    placeholder="Search by name, email, or store name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="review">Under Review</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    {/* Selected Actions Bar */}
                    {selectedApplications.length > 0 && (
                        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                                {selectedApplications.length} application{selectedApplications.length > 1 ? 's' : ''} selected
                            </p>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    Approve Selected
                                </button>
                                <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition flex items-center gap-2">
                                    <XCircle className="w-4 h-4" />
                                    Reject Selected
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Applications Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                    <tr>
                                        <th className="px-6 py-4 text-left">
                                            <input
                                                type="checkbox"
                                                checked={selectedApplications.length === applications.length}
                                                onChange={handleSelectAll}
                                                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                                            />
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Applicant</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Store Details</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Business Info</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Documents</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {applications.map((app: Application) => (
                                        <tr key={`app-${app.id}`} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                            <td className="px-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedApplications.includes(app.id)}
                                                    onChange={() => handleSelectApplication(app.id)}
                                                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                                        {app.applicantName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">{app.applicantName}</p>
                                                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                            <Mail className="w-3 h-3" />
                                                            {app.email}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                            <Phone className="w-3 h-3" />
                                                            {app.phone}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <Store className="w-4 h-4 text-purple-500" />
                                                        <p className="font-semibold text-gray-900 dark:text-white">{app.storeName}</p>
                                                    </div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{app.storeDescription}</p>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        <MapPin className="w-3 h-3" />
                                                        {app.location}
                                                    </div>
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                                                        app.businessType === 'Physical Store' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                                        app.businessType === 'Online Only' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                                                        'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                                    }`}>
                                                        {app.businessType}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                                                    <p><span className="font-medium">Experience:</span> {app.experience}</p>
                                                    <p><span className="font-medium">Revenue:</span> {app.expectedRevenue}</p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        {app.hasBusinessPermit ? (
                                                            <span className="flex items-center gap-1 text-green-600">
                                                                <CheckCircle className="w-3 h-3" />
                                                                Permit
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-1 text-red-600">
                                                                <XCircle className="w-3 h-3" />
                                                                No Permit
                                                            </span>
                                                        )}
                                                        {app.hasTaxId && (
                                                            <span className="flex items-center gap-1 text-green-600">
                                                                <CheckCircle className="w-3 h-3" />
                                                                Tax ID
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-2">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                        app.status === 'Pending' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
                                                        app.status === 'Under Review' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                                        app.status === 'Approved' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                                                        'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                                    }`}>
                                                        {app.status}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                        <Calendar className="w-3 h-3" />
                                                        {app.applicationDate}
                                                    </div>
                                                    {app.status === 'Rejected' && app.rejectionReason && (
                                                        <div className="flex items-start gap-1 text-xs text-red-600 mt-2">
                                                            <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                                            <p className="line-clamp-2">{app.rejectionReason}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{app.documents.length} documents</p>
                                                    <div className="flex flex-wrap gap-1">
                                                        {app.documents.slice(0, 2).map((doc, idx) => (
                                                            <span key={idx} className="inline-flex items-center px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                                                                {doc.length > 12 ? doc.substring(0, 10) + '...' : doc}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    {app.documents.length > 2 && (
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">+{app.documents.length - 2} more</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-2">
                                                    <button
                                                        onClick={() => openReviewModal(app)}
                                                        className="px-3 py-1.5 text-sm font-medium text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition flex items-center gap-1"
                                                    >
                                                        <Eye className="w-3 h-3" />
                                                        Review
                                                    </button>
                                                    {(app.status === 'Pending' || app.status === 'Under Review') && (
                                                        <>
                                                            <button className="px-3 py-1.5 text-sm font-medium text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition">
                                                                Approve
                                                            </button>
                                                            <button className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
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
                                Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">87</span> applications
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">1</button>
                                <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition">2</button>
                                <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition">3</button>
                                <button className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            {showReviewModal && selectedApplication && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Application Review</h3>
                            <button
                                onClick={() => setShowReviewModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Applicant Info */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Applicant Information</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Full Name</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.applicantName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Email</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Phone</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Location</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.location}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Store Info */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Store Information</h4>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Store Name</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.storeName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Description</p>
                                        <p className="text-gray-900 dark:text-white">{selectedApplication.storeDescription}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Business Type</p>
                                            <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.businessType}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Address</p>
                                            <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Business Details */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Business Details</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Experience</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.experience}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Expected Revenue</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.expectedRevenue}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Bank Details</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{selectedApplication.bankDetails}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Social Media</p>
                                        <div className="space-y-1">
                                            {selectedApplication.facebook && (
                                                <p className="text-xs text-gray-900 dark:text-white">{selectedApplication.facebook}</p>
                                            )}
                                            {selectedApplication.instagram && (
                                                <p className="text-xs text-gray-900 dark:text-white">{selectedApplication.instagram}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Submitted Documents</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {selectedApplication.documents.map((doc, idx) => (
                                        <div key={idx} className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                                            <FileText className="w-5 h-5 text-blue-500" />
                                            <span className="text-sm text-gray-900 dark:text-white">{doc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Compliance Check */}
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Compliance Verification</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Business Permit</span>
                                        {selectedApplication.hasBusinessPermit ? (
                                            <span className="flex items-center gap-1 text-green-600 font-medium">
                                                <CheckCircle className="w-4 h-4" />
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-red-600 font-medium">
                                                <XCircle className="w-4 h-4" />
                                                Missing
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600">
                                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Tax ID / DTI Registration</span>
                                        {selectedApplication.hasTaxId ? (
                                            <span className="flex items-center gap-1 text-green-600 font-medium">
                                                <CheckCircle className="w-4 h-4" />
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-red-600 font-medium">
                                                <XCircle className="w-4 h-4" />
                                                Missing
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Decision Section */}
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Review Decision</h4>
                                <textarea
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3"
                                    placeholder="Add review comments or rejection reason..."
                                ></textarea>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowReviewModal(false)}
                                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Approve Application
                                    </button>
                                    <button
                                        onClick={() => setShowReviewModal(false)}
                                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                                    >
                                        <XCircle className="w-4 h-4" />
                                        Reject Application
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