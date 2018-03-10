<?php

use Faker\Generator as Faker;

$factory->define(App\Category::class, function (Faker $faker) {
    return [
        'title' => $faker->word,
        'url' => $faker->url,
        'image' => $faker->imageUrl(),
        'active' => true,
        'desc' => $faker->paragraph,
    ];
});
