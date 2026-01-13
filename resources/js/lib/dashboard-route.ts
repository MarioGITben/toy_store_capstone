import { dashboard } from '@/routes';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

/**
 * Hook to get the role-based dashboard URL for the current user
 * @returns The dashboard URL based on user role
 */
export function useDashboardRoute(): string {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;
    const role = (user as { role?: string })?.role;

    // Define role-based dashboard paths
    switch (role) {
        case 'admin':
            return '/admin/dashboard/overview';
        case 'seller':
            return '/seller/dashboard';
        case 'buyer':
            return '/buyer/dashboard';
        default:
            return dashboard().url; // Default dashboard for 'user' role or any other role
    }
}
