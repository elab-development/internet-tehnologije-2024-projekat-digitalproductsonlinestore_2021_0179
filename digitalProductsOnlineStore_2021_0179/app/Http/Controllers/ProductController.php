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
            'category_id' => 'required|exists:categories,id',
        ]);
        $product = Product::create($validated);
        return  new ProductResource($product);
    }
    public function show($id){
        
            $product = Product::find($id);
        
            if (!$product) {
                return response()->json(['message' => 'Product not found'], 404);
            }
        
         return new ProductResource($product);
        
    }
    public function update(Request $request,  $id){
        $product = Product::find($id);

        if(!$product){
            return response()->json(['message'=>'Product not found'], 404);
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


    public function destroy($id){
    
        $product = Product::find($id);

         if (!$product) {
             return response()->json(['message' => 'Product not found'], 404);
         }

        $product->delete();

         return response()->json(['message' => 'Product deleted successfully'], 200);

        
    }
}
