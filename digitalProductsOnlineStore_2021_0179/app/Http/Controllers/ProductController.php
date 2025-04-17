<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductCollection;

class ProductController extends Controller
{
    public function index(){
        $products = Product::all();
        return new ProductCollection($products);  
    }
    public function store(Request $request){
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories_id',
        ]);
        $product = Product::create($validated);
        return  new ProductResource($product);
    }
    public function show(Product $product){
        // $product = Product::find($id);
        return new ProductResource($product);
    }
    public function update(Request $request, Product $product){
        $validated = $request->validate([
            'name' => 'string|max:255',
            'description' => 'string',
            'price' => 'numeric|min:0',
            'category_id' => 'exists:categories_id',
        ]);
        $product->update($validated);
        return new ProductResource($product);
    }
    public function destroy(Product $product){
        $product->delete();
        return response()->json(['message'=>'Product deleted succesfully', Response::HTTP_NO_CONTENT]);
        
    }
}
