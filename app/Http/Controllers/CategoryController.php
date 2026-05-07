<?php

// app/Http/Controllers/CategoryController.php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('products')->get();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        $cat = Category::create($request->all());
        $cat->products_count = 0;
        return response()->json($cat);
    }

    public function update(Request $request, $id)
    {
        $request->validate(['name' => 'required|string|max:255']);
        $cat = Category::findOrFail($id);
        $cat->update($request->all());
        $cat->loadCount('products');
        return response()->json($cat);
    }

    public function destroy($id)
    {
        Category::destroy($id);
        return response()->json(['success' => true]);
    }
}