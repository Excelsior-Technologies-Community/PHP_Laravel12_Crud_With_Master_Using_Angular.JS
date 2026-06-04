<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Spiritual'],
            ['name' => 'Electronics'],
            ['name' => 'Clothing'],
            ['name' => 'Books'],
            ['name' => 'Furniture'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}