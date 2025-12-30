<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
  // Return products with category for index
public function index() {
    $products = Product::with('category')->get();
    return response()->json($products);
}

// Return product with category for store (save)
public function store(Request $request) {
    $product = Product::create($request->all());
    $product->load('category'); // load category object
    return response()->json($product);
}




    public function edit($id){
        return response()->json(Product::find($id));
    }

    // Return product with category for update
public function update(Request $request, Product $product) {
    $product->update($request->all());
    $product->load('category'); // load category object
    return response()->json($product);
}

    public function destroy($id){
        Product::destroy($id);
        return response()->json(['success'=>true]);
    }
}

