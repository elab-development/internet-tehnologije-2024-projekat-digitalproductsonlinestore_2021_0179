<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductCollection;

class ProductController extends Controller
{
    public function index()
    {

        $products = Product::all();
        return new ProductCollection($products);
    }
    
    public function store(Request $request)
    {
       
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden: Only admins can create products'], 403);
        }

        // Validate request data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'exists:categories,id',
        ]);

        $product = Product::create($validated);
        return new ProductResource($product);
    }

    public function show($id)
    {

        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return new ProductResource($product);
    }

    public function update(Request $request,  $id)
    {
        if(!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden: Only admins can update products'], 403);
        }
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $validated = $request->validate([
            'name' => 'string|max:255',
            'description' => 'string',
            'price' => 'numeric|min:0',
            'category_id' => 'exists:categories,id',
        ]);

        $product->update($validated);
        return response()->json(new ProductResource($product->fresh()), 200);
    }

    public function destroy($id)
    {
        if(!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden: Only admins can delete products'], 403);
        }
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }

    public function search(Request $request)
    {
        $query = $request->input('query'); // Dobijanje ključne reči iz zahteva

        $products = Product::where('name', 'LIKE', '%' . $query . '%')->get();

        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found'], 404);
        }

        return ProductResource::collection($products);
    }
}
