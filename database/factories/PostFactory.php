<?php

use Faker\Generator as Faker;

$factory->define(App\Post::class, function (Faker $faker) {
    return [
        'title' => $faker->sentence,
        'details' => $faker->paragraph,
        'body' => $faker->realText(5000),
        'likes' => $faker->randomDigitNotNull,
        'clicks' => $faker->randomDigitNotNull,
        'active' => true,
        'image' => $faker->imageUrl(),
        'category_id' => App\Category::all()->random()->id,
    ];
});
