<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fee_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('is_once')->default(0);

            // default
            $table->unsignedBigInteger('created_by')->index()->default(2);
            $table->unsignedBigInteger('updated_by')->index()->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        DB::table('fee_categories')->insert([
            [
                'name' => 'Annual',
                'is_once' => '0',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],[
                'name' => 'Monthly',
                'is_once' => '0',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'name' => 'Subscription',
                'is_once' => '1',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fee_categories');
    }
};
