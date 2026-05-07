<?php

// database/migrations/xxxx_create_sizes_table.php
// Run: php artisan migrate

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // sizes master table - S, M, L, XL vagere
        Schema::create('sizes', function (Blueprint $table) {
            $table->id();
            $table->string('name');        // e.g. "Small", "Medium"
            $table->string('code');        // e.g. "S", "M", "XL"
            $table->timestamps();
        });

        // product_sizes pivot table - product ane size ni many-to-many relation
        Schema::create('product_sizes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('size_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_sizes');
        Schema::dropIfExists('sizes');
    }
};