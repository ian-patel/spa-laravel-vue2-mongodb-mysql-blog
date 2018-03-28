<?php

use Illuminate\Database\Seeder;

class PostsCollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Post::class, 50)
            ->create()
            ->each(function ($post) {
                $post->comments()->saveMany(
                    factory(App\Comment::class, mt_rand(1, 10))->make()
                );
            });
    }
}
