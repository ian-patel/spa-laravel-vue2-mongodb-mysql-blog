<?php

use Faker\Generator as Faker;

$factory->define(App\Comment::class, function (Faker $faker) {
    return [
        'comment' => $faker->realText(150),
        'active' => true,
        'commenter_id' => App\User::all()->random()->id,
    ];
});
