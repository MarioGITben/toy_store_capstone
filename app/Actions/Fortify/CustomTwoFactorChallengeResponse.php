<?php

namespace App\Actions\Fortify;

use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\TwoFactorLoginResponse as TwoFactorLoginResponseContract;

class CustomTwoFactorChallengeResponse implements TwoFactorLoginResponseContract
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
        $redirectPath = match($user->role ?? 'user') {
            'admin' => '/admin/dashboard/overview',
            'seller' => '/seller/dashboard',
            'buyer' => '/buyer/dashboard',
            default => '/dashboard', // Default for 'user' role or any other role
        };

        return redirect($redirectPath);
    }
}
