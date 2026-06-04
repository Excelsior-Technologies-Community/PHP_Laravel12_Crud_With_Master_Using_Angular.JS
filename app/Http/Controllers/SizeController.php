<?php

namespace App\Http\Controllers;

use App\Models\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Size::all()
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'code' => 'required|string|max:50|unique:sizes,code'
            ]);

            $size = Size::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Size created successfully!',
                'data' => $size
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
        $size = Size::find($id);
        if (!$size) {
            return response()->json([
                'success' => false,
                'message' => 'Size not found'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'data' => $size
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            $size = Size::findOrFail($id);
            
            $request->validate([
                'name' => 'required|string|max:255',
                'code' => 'required|string|max:50|unique:sizes,code,' . $id
            ]);

            $size->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Size updated successfully!',
                'data' => $size
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
            $size = Size::findOrFail($id);
            
            // Check if size is used by any product
            if ($size->products()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete size because it is used by products!'
                ], 422);
            }
            
            $size->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Size deleted successfully!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 422);
        }
    }
}