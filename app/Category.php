<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class Category extends Model
{
    /**
     * The connection associated with the model.
     *
     * @var string
     */
    protected $connection = 'mongodb';

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'active' => 'boolean',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'posts_count'
    ];

    /**
     * Get the blog posts for the category.
     */
    public function posts()
    {
        return $this->hasMany('App\Post');
    }

    /**
     * Scope a query to only include category is active
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
            ->where('title', 'LIKE', "%{$q}%")
            ->orWhere('desc', 'LIKE', "%{$q}%");
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
     * Count the total posts for the category.
     *
     * Mongodb Library do not support `withCount`
     * Manually add attribute count
     *
     * @return int
     */
    public function getPostsCountAttribute(): int
    {
        return $this->posts()->count();
    }
}
