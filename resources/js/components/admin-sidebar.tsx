import { NavUser } from '@/components/nav-user';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useDashboardRoute } from '@/lib/dashboard-route';
import { resolveUrl } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import {
    ChevronRight,
    LayoutGrid,
    Users,
    Store,
    Building2,
    Package,
    Tag,
    ClipboardList,
    Settings,
} from 'lucide-react';
import AppLogo from './app-logo';

interface NavSubItem {
    title: string;
    href: string;
}

interface NavItem {
    title: string;
    href?: string;
    icon: typeof LayoutGrid;
    items?: NavSubItem[];
}

const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard/overview',
        icon: LayoutGrid,
        items: [
            { title: 'Overview', href: '/admin/dashboard/overview' },
            { title: 'Platform stats', href: '/admin/dashboard/stats' },
        ],
    },
    {
        title: 'Users',
        icon: Users,
        items: [
            { title: 'All users', href: '/admin/manage/users' },
            { title: 'Suspended users', href: '/admin/manage/suspended/users' },
        ],
    },
    {
        title: 'Sellers',
        icon: Store,
        items: [
                { title: 'Seller application', href: '/admin/manage/applications/sellers' },
            { title: 'Approved seller', href: '/admin/manage/sellers/approved' },
            { title: 'Suspended seller', href: '/admin/manage/sellers/suspended' },
        ],
    },
    {
        title: 'Stores',
        icon: Building2,
        items: [
            { title: 'All stores', href: '/admin/stores' },
            { title: 'Store details', href: '/admin/stores/details' },
            { title: 'Disable / Enable store', href: '/admin/stores/manage' },
        ],
    },
    {
        title: 'Products',
        icon: Package,
        items: [
            { title: 'All products', href: '/admin/products' },
            { title: 'Pending approval', href: '/admin/products/pending' },
            { title: 'Reported products', href: '/admin/products/reported' },
        ],
    },
    {
        title: 'Categories',
        icon: Tag,
        items: [
            { title: 'Categories', href: '/admin/categories' },
            { title: 'Subcategories', href: '/admin/categories/subcategories' },
            { title: 'Attributes', href: '/admin/categories/attributes' },
        ],
    },
    {
        title: 'Orders',
        icon: ClipboardList,
        items: [
            { title: 'All orders', href: '/admin/orders' },
            { title: 'Dispute/Returns', href: '/admin/orders/disputes' },
            { title: 'Refund requests', href: '/admin/orders/refunds' },
        ],
    },
    {
        title: 'Settings',
        href: '/admin/settings',
        icon: Settings,
    },
];

export function AdminSidebar() {
    const dashboardRoute = useDashboardRoute();
    const page = usePage();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardRoute} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {adminNavItems.map((item) => {
                        const hasSubItems = item.items && item.items.length > 0;
                        
                        // Check if any sub-item matches the current URL
                        const hasActiveSubItem = item.items?.some((subItem) => {
                            const subUrl = resolveUrl(subItem.href);
                            const currentUrl = page.url.split('?')[0]; // Remove query params
                            return currentUrl === subUrl || currentUrl.startsWith(subUrl + '/');
                        });
                        
                        // Check if the parent item matches the current URL
                        const currentUrl = page.url.split('?')[0]; // Remove query params
                        const parentUrl = item.href ? resolveUrl(item.href) : '';
                        const isActive = item.href
                            ? currentUrl === parentUrl || (parentUrl !== '' && currentUrl.startsWith(parentUrl + '/'))
                            : false;
                        
                        // Parent is active if it matches or has an active sub-item
                        const isParentActive = isActive || hasActiveSubItem;

                        if (hasSubItems) {
                            return (
                                <Collapsible
                                    key={item.title}
                                    defaultOpen={hasActiveSubItem || isActive}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <div className="flex items-center group/menu-item w-full">
                                            {item.href ? (
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={isParentActive}
                                                    tooltip={{ children: item.title }}
                                                    className="flex-1"
                                                >
                                                    <Link href={item.href} prefetch>
                                                        <item.icon />
                                                        <span>{item.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            ) : (
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton
                                                        isActive={isParentActive}
                                                        tooltip={{ children: item.title }}
                                                        className="flex-1 cursor-pointer"
                                                    >
                                                        <item.icon />
                                                        <span>{item.title}</span>
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                            )}
                                            <CollapsibleTrigger className="p-1.5 hover:bg-sidebar-accent rounded-md transition-colors flex-shrink-0">
                                                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </CollapsibleTrigger>
                                        </div>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items?.map((subItem) => {
                                                    const subUrl = resolveUrl(subItem.href);
                                                    const currentUrl = page.url.split('?')[0]; // Remove query params
                                                    const isSubActive = currentUrl === subUrl || currentUrl.startsWith(subUrl + '/');
                                                    return (
                                                        <SidebarMenuSubItem
                                                            key={subItem.title}
                                                        >
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                isActive={isSubActive}
                                                            >
                                                                <Link
                                                                    href={subItem.href}
                                                                    prefetch
                                                                >
                                                                    <span>
                                                                        {subItem.title}
                                                                    </span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    );
                                                })}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            );
                        }

                        // For non-collapsible items, check if current URL matches
                        const currentUrlForItem = page.url.split('?')[0]; // Remove query params
                        const itemUrl = item.href ? resolveUrl(item.href) : '';
                        const isItemActive = item.href
                            ? currentUrlForItem === itemUrl || (itemUrl !== '' && currentUrlForItem.startsWith(itemUrl + '/'))
                            : false;

                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isItemActive}
                                    tooltip={{ children: item.title }}
                                >
                                    <Link
                                        href={item.href || '#'}
                                        prefetch={!!item.href}
                                    >
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
