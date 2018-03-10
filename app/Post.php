<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class Post extends Model
{
    /**
     * The connection associated with the model.
     *
     * @var string
     */
    protected $connection = 'mongodb';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'body',
        'image',
        'details',
        'category_id',
    ];

    /**
     * Get the comments for the blog post.
     */
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }

    /**
     * Get the category for the blog post.
     */
    public function category()
    {
        return $this->belongsTo('App\Category');
    }

    /**
     * Scope a query to only include post is active
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
            ->orWhere('details', 'LIKE', "%{$q}%")
            ->orWhere('body', 'LIKE', "%{$q}%");
    }

    /**
     * Soft delete the post.
     *
     * @return bool
     */
    public function softDelete(): bool
    {
        $this->active = false;

        return $this->save();
    }

    /**
     * Save the model to the database.
     *
     * @param  array  $options
     * @return bool
     */
    public function save(array $options = []): bool
    {
        // By default make the post as active.
        if (!$this->exists) {
            $this->active = true;
        }

        return parent::save($options);
    }
}
