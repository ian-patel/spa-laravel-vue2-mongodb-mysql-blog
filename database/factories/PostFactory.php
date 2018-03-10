<?php

use Faker\Generator as Faker;

$factory->define(App\Post::class, function (Faker $faker) {

    $body = '';
    for ($i=0; $i < mt_rand(10, 20); $i++) { 
        $body .= $faker->realText(mt_rand(200, 500)) . "\n";
    }   

    return [
        'title' => $faker->realText(mt_rand(40, 70)),
        'details' => $faker->realText(mt_rand(200, 500)),
        'body' => $body,
        'likes' => $faker->randomDigitNotNull,
        'clicks' => $faker->randomDigitNotNull,
        'active' => true,
        'image' => 'https://picsum.photos/640/480/?random',
        'category_id' => App\Category::all()->random()->id,
    ];
});
