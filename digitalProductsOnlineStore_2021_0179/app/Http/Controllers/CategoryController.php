<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CategoryResource::collection(Category::all());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $category = Category::create($validated);
        return  new CategoryResource($category->fresh());
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = Category::find($id);
        
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
    
     return new CategoryResource($category);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $category = Category::find($id);

        if(!$category){
            return response()->json(['message'=>'Category not found'], 404);
        }
        $validated = $request->validate([
            'name' => 'string|max:255',
        ]);

        $category->update($validated);
        return response()->json(new CategoryResource($category->fresh()), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::find($id);

         if (!$category) {
             return response()->json(['message' => 'Category not found'], 404);
         }

        $category->delete();

         return response()->json(['message' => 'Category deleted successfully'], 200);

    }
}
