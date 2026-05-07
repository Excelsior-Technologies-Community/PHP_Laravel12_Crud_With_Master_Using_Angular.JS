<?php

namespace App\Http\Controllers;

use App\Models\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    public function index()
    {
        return response()->json(Size::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50'
        ]);
        return response()->json(Size::create($request->all()));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50'
        ]);
        $size = Size::findOrFail($id);
        $size->update($request->all());
        return response()->json($size);
    }

    public function destroy($id)
    {
        Size::destroy($id);
        return response()->json(['success' => true]);
    }
}