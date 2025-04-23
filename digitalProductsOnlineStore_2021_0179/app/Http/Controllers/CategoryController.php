<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return new CategoryCollection($categories);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'products' => 'array',
            'products.*' => 'exists:products,id',

        ]);
        $category = Category::create(['name' => $validated['name']]);
        if (isset($validated['products'])) {
            foreach ($validated['products'] as $productId) {
                $product = Product::find($productId);
                if ($product) {
                    $product->category_id = $category->id; // Postavljamo category_id
                    $product->save(); // Čuvamo promene u bazi
                }
            }
        }

        return new CategoryResource($category->fresh());
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

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
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
    public function getProducts($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404);
        }

        return response()->json($category->products, 200);
    }
}
