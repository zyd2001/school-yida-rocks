<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGradesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('grades', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('course_id');
            $table->integer('assignment_id');
            $table->integer('status')->default(0); //0 => none, 1 => done, 2 => process;
            $table->integer('attempt')->default(0);
            $table->text('answer')->nullable();
            $table->integer('total')->nullable();
            $table->integer('raw')->nullable();
            $table->integer('percent')->nullable();
            $table->char('grade', 1)->nullable();
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
        Schema::dropIfExists('grades');
    }
}
