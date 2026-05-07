<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::with('category', 'sizes')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:255',
            'price'       => 'required|numeric|min:0',
        ]);

        $product = Product::create($request->only(['category_id', 'name', 'price']));

        if ($request->has('size_ids') && is_array($request->size_ids)) {
            $product->sizes()->sync($request->size_ids);
        }

        $product->load('category', 'sizes');
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:255',
            'price'       => 'required|numeric|min:0',
        ]);

        $product = Product::findOrFail($id);
        $product->update($request->only(['category_id', 'name', 'price']));

        if ($request->has('size_ids') && is_array($request->size_ids)) {
            $product->sizes()->sync($request->size_ids);
        } else {
            $product->sizes()->detach();
        }

        $product->load('category', 'sizes');
        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->sizes()->detach();
        $product->delete();
        return response()->json(['success' => true]);
    }
}