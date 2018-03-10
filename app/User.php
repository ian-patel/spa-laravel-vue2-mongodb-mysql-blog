<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\HybridRelations;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable,
        HybridRelations;

    /**
     * The connection associated with the model.
     *
     * @var string
     */
    protected $connection = 'mysql';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'avatar'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Get the comments for the blog post.
     */
    public function comments()
    {
        return $this->hasMany('App\Comment', 'commenter_id');
    }

    /**
     * Scope a query to only include the active users.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query, $active = true)
    {
        return $query->where('active', $active);
    }

    /**
     * Scope a query to only include search results.
     *
     * @param string $q
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch($query, string $q): Builder
    {
        return $query
            ->where('name', 'LIKE', "%{$q}%")
            ->orWhere('email', 'LIKE', "%{$q}%");
    }

    /**
     * Soft delete the category.
     *
     * @return bool
     */
    public function softDelete(): bool
    {
        $this->active = false;

        return $this->save();
    }

    /**
     * @return int
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

}
