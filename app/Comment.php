<?php

namespace App;

use Jenssegers\Mongodb\Eloquent\Model;

class Comment extends Model
{
    /**
     * The connection associated with the model.
     *
     * @var string
     */
    protected $connection = 'mongodb';

    /**
     * Get the blog post for the comment.
     */
    public function post()
    {
        return $this->belongsTo('App\Post');
    }

    /**
     * Get the commenter for the comment.
     */
    public function commenter()
    {
        return $this->belongsTo('App\User');
    }
}
