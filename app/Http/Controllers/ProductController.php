<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Size;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category', 'sizes')->get();
        return response()->json([
            'success' => true,
            'data' => $products
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'category_id' => 'required|exists:categories,id',
                'name' => 'required|string|max:255',
                'price' => 'required|numeric|min:0',
                'size_ids' => 'nullable|array'
            ]);

            $product = Product::create([
                'category_id' => $request->category_id,
                'name' => $request->name,
                'price' => $request->price
            ]);

            if ($request->has('size_ids') && is_array($request->size_ids)) {
                $product->sizes()->sync($request->size_ids);
            }

            $product->load('category', 'sizes');

            return response()->json([
                'success' => true,
                'message' => 'Product created successfully!',
                'data' => $product
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 422);
        }
    }

    public function edit($id)
    {
        $product = Product::with('sizes')->find($id);
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'data' => $product
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);
            
            $request->validate([
                'category_id' => 'required|exists:categories,id',
                'name' => 'required|string|max:255',
                'price' => 'required|numeric|min:0',
                'size_ids' => 'nullable|array'
            ]);

            $product->update([
                'category_id' => $request->category_id,
                'name' => $request->name,
                'price' => $request->price
            ]);

            if ($request->has('size_ids')) {
                $product->sizes()->sync($request->size_ids);
            }

            $product->load('category', 'sizes');

            return response()->json([
                'success' => true,
                'message' => 'Product updated successfully!',
                'data' => $product
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 422);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->sizes()->detach();
            $product->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 422);
        }
    }
}