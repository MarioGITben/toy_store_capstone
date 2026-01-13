import AdminLayout from '@/layouts/admin-layout';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface SettingsLayoutWrapperProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

/**
 * Wrapper component that uses the appropriate layout based on user role
 * - Admin users: AdminLayout (with AdminSidebar)
 * - Other users: AppLayout (with AppSidebar)
 */
export function SettingsLayoutWrapper({
    children,
    breadcrumbs = [],
}: SettingsLayoutWrapperProps) {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;
    const role = (user as { role?: string })?.role;

    // Use AdminLayout for admin users, AppLayout for others
    if (role === 'admin') {
        return (
            <AdminLayout breadcrumbs={breadcrumbs}>
                {children}
            </AdminLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {children}
        </AppLayout>
    );
}
