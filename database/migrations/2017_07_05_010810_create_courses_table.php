<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->string('name');
            $table->boolean('public')->default(true);
            $table->string('avatar')->default('http://orjf65xeb.bkt.clouddn.com/default.png');
            $table->text('fileStructure')->nullable(); //json
            $table->text('setting')->nullable();//json
            $table->string('accessCode');
            $table->string('type')->default('course');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
