<?php

use Faker\Generator as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostsCollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        foreach (range(1, 100) as $index) {
            App\Post::create([
                'title' => $faker->sentence,
                'details' => $faker->realText(2000, 5),
                'likes' => $faker->randomDigitNotNull,
                'clicks' => $faker->randomDigitNotNull,
                'image' => $faker->imageUrl(),
            ]);
        }
    }
}
