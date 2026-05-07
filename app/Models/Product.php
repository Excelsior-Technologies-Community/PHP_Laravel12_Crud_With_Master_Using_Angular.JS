<?php

// app/Models/Product.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['category_id', 'name', 'price'];

    // Product belongs to one Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Product has many Sizes (many-to-many via product_sizes pivot)
    public function sizes()
    {
        return $this->belongsToMany(Size::class, 'product_sizes');
    }
}