<?php

namespace App\Actions\Fortify;

use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class CustomLoginResponse implements LoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        $user = $request->user();

        if (!$user) {
            return redirect('/dashboard');
        }

        // Refresh the user model to ensure we have the latest role
        $user->refresh();

        // Define role-based redirect paths
        // Use null coalescing to handle cases where role might be null
        $redirectPath = match($user->role ?? 'user') {
            'admin' => '/admin/dashboard/overview',
            'seller' => '/seller/dashboard',
            'buyer' => '/buyer/dashboard',
            default => '/dashboard', // Default for 'user' role or any other role
        };

        // Use redirect() instead of intended() to ensure our custom path is used
        // intended() will use a stored URL from session if available, which can override our logic
        return redirect($redirectPath);
    }
}
