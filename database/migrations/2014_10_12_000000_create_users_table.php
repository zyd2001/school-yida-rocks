<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->boolean('isTeacher')->default(false);
            $table->string('avatar')->default('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498570329231&di=c9682486fc6ada2dedcd46219ad1302f&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2014-10-08%2F041717696.jpg');
            $table->text('setting')->nullable(); //json
            $table->boolean('isVerified')->default(false);
            $table->string('verifyCode', 6);
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
