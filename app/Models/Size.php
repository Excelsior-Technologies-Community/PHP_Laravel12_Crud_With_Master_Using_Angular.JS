<?php

// app/Models/Size.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    protected $fillable = ['name', 'code'];

    // Size ni sathe kaya products chhe
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_sizes');
    }
}