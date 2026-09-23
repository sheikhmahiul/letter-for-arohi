<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('love_responses', function (Blueprint $table) {
            $table->id();
            $table->string('recipient_name')->default('special ফুল');
            $table->string('response_status')->default('pending');
            $table->integer('no_click_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('love_responses');
    }
};
