<?php

namespace App\Console\Commands;

use App\Post;
use Illuminate\Console\Command;

class DeletePost extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'delete:post
                            {post : Post Id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete post';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $post = Post::find($this->argument('post'));
        
        if ($post == null) {
            $this->error('Post not found');
            return;
        }

        if ($this->confirm("Are you sure, you want to delete post `{$post->title}` ?")) {
            return $post->softDelete();
        }

        return;
    }
}
