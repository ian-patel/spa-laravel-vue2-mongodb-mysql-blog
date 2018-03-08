<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class Post extends Model
{
    /**
     * The collection associated with the model.
     *
     * @var string
     */
    protected $connection = 'mongodb';

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
}
