<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Default dashboard (for 'user' role)
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin dashboard routes
    Route::prefix('admin/dashboard')->middleware('role:admin')->group(function () {
        Route::get('overview', function () {
            return Inertia::render('admin/dashboard/overview');
        })->name('admin.dashboard.overview');

        Route::get('stats', function () {
            return Inertia::render('admin/dashboard/stats');
        })->name('admin.dashboard.stats');

        // Redirect /admin/dashboard to overview
        Route::get('/', function () {
            return redirect()->route('admin.dashboard.overview');
        });
    });
    Route::prefix('admin/manage')->middleware('role:admin')->group(function () {

        Route::get('users', function () {
            return Inertia::render('admin/dashboard/all-users');
        })->name('admin.manage.users');

        Route::get('suspended/users', function () {
            return Inertia::render('admin/dashboard/suspended-users');
        })->name('admin.manage.suspended-users');

        Route::get('applications/sellers', function () {
            return Inertia::render('admin/dashboard/seller-application');
        })->name('admin.manage.applications.seller');

        Route::get('sellers/approved', function () {
            return Inertia::render('admin/dashboard/approved-seller');
        })->name('admin.manage.sellers.approved');

        Route::get('sellers/suspended', function () {
            return Inertia::render('admin/dashboard/suspended-seller');
        })->name('admin.manage.sellers.suspended');
    });



    // Admin management routes
    



    // Seller dashboard
    Route::get('seller/dashboard', function () {
        return Inertia::render('seller/dashboard');
    })->name('seller.dashboard')->middleware('role:seller');

    // Buyer dashboard
    Route::get('buyer/dashboard', function () {
        return Inertia::render('buyer/dashboard');
    })->name('buyer.dashboard')->middleware('role:buyer');
});

require __DIR__.'/settings.php';
