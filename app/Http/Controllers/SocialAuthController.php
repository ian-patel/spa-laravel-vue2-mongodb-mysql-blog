<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Socialite;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Supports\SocialAccountService;

class SocialAuthController extends Controller
{
    /**
     * Redirect
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $provider
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request, string $provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Redirect
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $provider
     * @return \Illuminate\Http\Response
     */
    public function callback(Request $request, string $provider, SocialAccountService $service)
    {
        if ($request->has('denied')) {
            return redirect('/');
        }

        $providerUser = Socialite::driver($provider)->user();
        $user = $service->createOrGetUser($provider, $providerUser);
        // todo with token
        auth()->login($user);

        return redirect()->to('/');
    }
}
