<?php

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
        return response()->json(Category::create($request->all()));
    }

    public function edit($id)
    {
        return response()->json(Category::find($id));
    }

    public function update(Request $request, $id)
    {
        $cat = Category::find($id);
        $cat->update($request->all());
        return response()->json($cat);
    }

    public function destroy($id)
    {
        Category::destroy($id);
        return response()->json(['success' => true]);
    }
}
