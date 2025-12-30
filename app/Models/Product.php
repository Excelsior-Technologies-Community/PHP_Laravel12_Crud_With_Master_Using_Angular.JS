<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['category_id','name','price'];

    // app/Models/Product.php
public function category() {
    return $this->belongsTo(Category::class);
}

}
