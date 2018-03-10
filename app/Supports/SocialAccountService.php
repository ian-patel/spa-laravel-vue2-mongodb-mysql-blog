<?php

namespace App\Supports;

use App\User;
use App\SocialAccount;
use Laravel\Socialite\Contracts\User as ProviderUser;

class SocialAccountService
{
    /**
     * Create/Get the soical user
     *
     * @param  string       $provider
     * @param  ProviderUser $providerUser
     * @return User         $user
     */
    public function createOrGetUser(string $provider, ProviderUser $providerUser): User
    {
        $account = SocialAccount::query()
            ->provider($provider)
            ->whereProviderUserId($providerUser->getId())
            ->first();

        if (null !== $account) {
            return $account->user;
        }

        $account = new SocialAccount([
            'provider_user_id' => $providerUser->getId(),
            'provider' => $provider
        ]);

        $user = User::whereEmail($providerUser->getEmail())->first();

        if (!$user) {
            $user = User::create([
                'email' => $providerUser->getEmail(),
                'name' => $providerUser->getName(),
                'avatar' => $providerUser->getAvatar(),
            ]);
        }

        $account->user()->associate($user);
        $account->save();

        return $user;
    }
}
