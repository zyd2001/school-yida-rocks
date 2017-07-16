<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
        'verifyCode' => 'AAAAAA',
        'isVerified' => true,
    ];
});

$factory->define(App\Course::class, function (Faker\Generator $faker)
{
    return [
        'name' => $faker->name,
    ];
});

$factory->define(App\Assignment::class, function (Faker\Generator $faker)
{
    return [
        'name' => $faker->name,
        'course_id' => 1,
        'content' => $faker->text,
        'dueTime' => $faker->time('H:i:s'),
    ];
});

$factory->define(App\Grade::class, function (Faker\Generator $faker)
{
    return [
        'user_id' => 1,
        'course_id' => 1,
        'assignment_id' => factory(App\Assignment::class)->create()->id,
    ];
});

$factory->define(App\File::class, function (Faker\Generator $faker)
{
    return [
        'name' => $faker->name,
        'url' => $faker->url,
        'user_id' => 1,
    ];
});