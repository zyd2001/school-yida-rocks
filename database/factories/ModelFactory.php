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
        'name'           => $faker->name,
        'email'          => $faker->unique()->safeEmail,
        'password'       => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
        'verifyCode'     => 'AAAAAA',
        'isVerified'     => true,
    ];
});

$factory->define(App\Course::class, function (Faker\Generator $faker) {
    return [
        'name'       => $faker->name,
        'accessCode' => 'AAAAAA',
    ];
});

$factory->define(App\Assignment::class, function (Faker\Generator $faker) {
    $questions = <<< AAA
{"0":{"question":"The Hebrews believed that God protected them because","answer":{"A":" of annual ceremonies.","B":" of a covenant.","C":"of ritual sacrifice."},"option":null,"type":0},"1":{"question":"are you ok?","answer":{"A":"haha","B":"yes","C":"no"},"option":null,"type":0},"2":{"question":"Hinduism and Buddhism differ significantly in their beliefs about","answer":{"A":"reincarnation.","B":"perfect understanding.","C":"the caste system."},"option":null,"type":0},"3":{"question":"The two items below that are most similar are","answer":{"A":"moksha and nirvana.","B":"nirvana and varnas.","C":"ethical monotheism and Hammurabi's Code."},"option":null,"type":0},"4":{"question":"The Hebrews believed that God protected them because","answer":{"A":" of annual ceremonies.","B":" of a covenant.","C":"of ritual sacrifice."},"option":null,"type":0},"5":{"question":"The Hebrews believed that God protected them because","answer":{"A":" of annual ceremonies.","B":" of a covenant.","C":"of ritual sacrifice."},"option":null,"type":0},"6":{"question":"The Hebrews believed that God protected them because","answer":{"A":" of annual ceremonies.","B":" of a covenant.","C":"of ritual sacrifice."},"option":null,"type":0},"7":{"question":"The Hebrews believed that God protected them because","answer":{"A":" of annual ceremonies.","B":" of a covenant.","C":"of ritual sacrifice."},"option":null,"type":0},"8":{"question":"The Hebrews believed that God protected them because","answer":{"A":" of annual ceremonies.","B":" of a covenant.","C":"of ritual sacrifice."},"option":null,"type":0},"9":{"question":"The Hebrews believed that God protected them because","answer":{"A":" of annual ceremonies.","B":" of a covenant.","C":"of ritual sacrifice."},"option":null,"type":0}}
AAA;
    $correct = <<<AAA
{"0":"B","1":"C","2":"B","3":"A","4":"B","5":"B","6":"B","7":"B","8":"B","9":"B"}
AAA;
    return [
        'name'      => $faker->name,
        'course_id' => 1,
        'questions' => $questions,
        'correct'   => $correct,
        'setting'   => '{"open":true,"attempt":3}',
        'dueTime'   => $faker->dateTime,
    ];
});

$factory->define(App\Grade::class, function (Faker\Generator $faker) {
    return [
        'user_id'       => 1,
        'course_id'     => 1,
        'assignment_id' => factory(App\Assignment::class)->create()->id,
    ];
});

$factory->define(App\File::class, function (Faker\Generator $faker) {
    return [
        'name'    => $faker->name,
        'url'     => $faker->url,
        'user_id' => 1,
    ];
});