import { SearchBar } from '@/components/landing-page-style/searchBar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { dashboard, login,register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronDown, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { LoginDialog } from '../components/landing-page-style/loginDialog';
import { useEffect } from 'react';
export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    const [postContent, setPostContent] = useState('');

    // Mock data - replace with actual backend data
    const featuredProducts = [
        {
            id: 1,
            name: 'Godslann',
            price: 'PHP 100,000',
            image: '/api/placeholder/200/300',
        },
        {
            id: 2,
            name: 'Godslann',
            price: 'PHP 100,000',
            image: '/api/placeholder/200/300',
        },
        {
            id: 3,
            name: 'Godslann',
            price: 'PHP 100,000',
            image: '/api/placeholder/200/300',
        },
        {
            id: 4,
            name: 'Godslann',
            price: 'PHP 100,000',
            image: '/api/placeholder/200/300',
        },
    ];

    const posts = [
        {
            id: 1,
            user: 'Mabsa Jang 🎉',
            timeAgo: '18h ago',
            content: 'Some nigger selling here is a scammer. careful.',
        },
        {
            id: 2,
            user: 'Mabsa Jang 🎉',
            timeAgo: '18h ago',
            content: 'Some nigger selling here is a fuckass fake. careful.',
        },
    ];
    const navItems = [
        {
            label: 'Store',
            items: [
                { label: 'New Arrivals', href: '/store/new' },
                { label: 'Best Sellers', href: '/store/best' },
                { label: 'Action Figures', href: '/store/action-figures' },
                { label: 'Collectibles', href: '/store/collectibles' },
            ],
        },
        {
            label: 'Auction',
            items: [
                { label: 'Live Auctions', href: '/auction/live' },
                { label: 'Upcoming', href: '/auction/upcoming' },
                { label: 'Past Auctions', href: '/auction/past' },
                { label: 'My Bids', href: '/auction/my-bids' },
            ],
        },
        {
            label: 'Community',
            items: [
                { label: 'Forums', href: '/community/forums' },
                { label: 'Events', href: '/community/events' },
                { label: 'Collectors Club', href: '/community/club' },
                { label: 'News', href: '/community/news' },
            ],
        },
    ];
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);

    return (
        <>
            <LoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] text-[#1b1b18] lg:justify-center dark:bg-[#0a0a0a]">
                <div className="w-full">
                    <header className="mb-6 w-full bg-neutral-700 p-2 text-sm not-has-[nav]:hidden">
                        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 p-2">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <div className="left-nav flex gap-4">
                                        <Link
                                            href={register()}
                                            className="px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        >
                                            Tutoy
                                        </Link>
                                        {navItems.map((item) => (
                                            <DropdownMenu key={item.label}>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:bg-transparent hover:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                                                    >
                                                        {item.label}
                                                        <ChevronDown className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="border-border/40 bg-[#2a2a2a]">
                                                    {item.items.map(
                                                        (subItem) => (
                                                            <DropdownMenuItem
                                                                key={
                                                                    subItem.label
                                                                }
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={
                                                                        subItem.href
                                                                    }
                                                                    className="cursor-pointer text-gray-300 hover:text-white focus:bg-white/10 focus:text-white focus:outline-none focus-visible:outline-none"
                                                                >
                                                                    {
                                                                        subItem.label
                                                                    }
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        ),
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        ))}
                                    </div>
                                    <div className="right-nav flex">
                                        <div className="hidden flex-1 justify-center px-8 md:flex">
                                            <SearchBar />
                                        </div>
                                        <Link
                                            href={login()}
                                            className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                            onClick={() => setLoginDialogOpen(true)}
                                            >
                                            Log in
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            onClick={() => setLoginDialogOpen(true)}
                                            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:bg-transparent hover:text-white"
                                            >
                                             <User className="h-4 w-4" />
                                             <span className="hidden sm:inline">Log In</span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="relative text-gray-300 hover:text-white"
                                        >
                                            <ShoppingCart className="h-5 w-5" />
                                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                                0
                                            </span>
                                        </Button>
                                        <div className="border-t border-border/40 px-4 py-2 md:hidden">
                                            <SearchBar />
                                        </div>
                                        {canRegister && (
                                    <Link
                                        href={register()}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                )}
                                    </div>
                                </>
                            )}
                        </nav>
                    </header>
                    <div className="mx-auto flex w-full max-w-7xl items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                        <main className="flex w-full flex-col-reverse lg:flex-row">
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-yellow-600 to-yellow-400">
                                    <div className="text-center">
                                        <p className="mb-2 text-sm">
                                            Some nigger is selling here is a
                                            fuckass fake. careful.
                                        </p>
                                        <h2 className="mb-4 text-4xl font-bold">
                                            Tutoy Shop is now Open!
                                        </h2>
                                        <p className="mb-6 text-xl">
                                            purchase. sell. bid your items here
                                        </p>
                                        <button className="rounded-full bg-red-500 px-8 py-3 font-semibold text-white hover:bg-red-600">
                                            Come join us now!
                                        </button>
                                    </div>
                                    <div className="absolute top-1/2 right-20 -translate-y-1/2 transform">
                                        <div className="relative">
                                            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-yellow-500 text-6xl font-bold">
                                                $
                                            </div>
                                            <div className="absolute -right-4 -bottom-4 rotate-12 rounded-lg bg-red-500 px-4 py-2 font-bold text-white">
                                                DISCOUNT
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="w-full px-6 py-8">
                                {/* Featured Products */}
                                <section className="mb-12">
                                    <h3 className="mb-6 text-2xl font-bold">
                                        Featured Products
                                    </h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                        {featuredProducts.map((product) => (
                                            <div
                                                key={product.id}
                                                className="overflow-hidden rounded-lg bg-gray-800 transition hover:ring-2 hover:ring-blue-500"
                                            >
                                                <div className="relative">
                                                    <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                                                        <div className="text-center text-gray-500">
                                                            <div className="mb-2 text-6xl">
                                                                ⚔️
                                                            </div>
                                                            <div className="text-sm">
                                                                Product Image
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-2 left-2 rounded bg-red-500 px-2 py-1 text-xs">
                                                        Featured
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <h4 className="mb-2 font-semibold">
                                                        {product.name}
                                                    </h4>
                                                    <p className="font-bold text-yellow-400">
                                                        {product.price}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Community Feed */}
                                <section>
                                    <h3 className="mb-6 text-2xl font-bold">
                                        Community
                                    </h3>

                                    {/* Post Input */}
                                    <div className="mb-6 rounded-lg bg-gray-800 p-4">
                                        <div className="flex gap-3">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    placeholder="Hello, I'm new here!"
                                                    value={postContent}
                                                    onChange={(e) =>
                                                        setPostContent(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full rounded-lg bg-gray-700 px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                />
                                            </div>
                                            <button className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 hover:bg-gray-100">
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                                POST
                                            </button>
                                        </div>
                                    </div>

                                    {/* Posts */}
                                    <div className="space-y-4">
                                        {posts.map((post) => (
                                            <div
                                                key={post.id}
                                                className="rounded-lg bg-gray-800 p-6"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-600"></div>
                                                    <div className="flex-1">
                                                        <div className="mb-2 flex items-center gap-2">
                                                            <span className="font-semibold">
                                                                {post.user}
                                                            </span>
                                                            <span className="text-sm text-gray-400">
                                                                {post.timeAgo}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-300">
                                                            {post.content}
                                                        </p>
                                                        <div className="mt-4 flex items-center gap-6 text-gray-400">
                                                            <button className="flex items-center gap-2 hover:text-white">
                                                                <svg
                                                                    className="h-5 w-5"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <button className="flex items-center gap-2 hover:text-white">
                                                                <svg
                                                                    className="h-5 w-5"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <button className="flex items-center gap-2 hover:text-white">
                                                                <svg
                                                                    className="h-5 w-5"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M5 15l7-7 7 7"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </main>
                    </div>
                    <div className="hidden h-14.5 lg:block"></div>
                </div>
            </div>
        </>
    );
}
