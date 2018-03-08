<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class Category extends Model
{
    /**
     * The collection associated with the model.
     *
     * @var string
     */
    protected $connection = 'mongodb';

    /**
     * Get the blog posts for the category.
     */
    public function posts()
    {
        return $this->hasMany('App\Post');
    }
}
