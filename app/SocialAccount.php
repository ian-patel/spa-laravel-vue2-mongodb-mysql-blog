<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;

class SocialAccount extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'provider',
        'provider_user_id',
    ];

    /**
     * Get the user for the account.
     */
    public function user(): Relation
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Scope a query to only include provider.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeProvider($query, $provider)
    {
        return $query->where('provider', $provider);
    }
}
