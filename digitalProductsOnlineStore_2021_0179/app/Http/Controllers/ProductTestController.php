<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;

class ProductTestController extends Controller
{
    public function index(){
        $products = Product::all();
        return $products;
    }
    public function show(Product $product){
        // $product = Product::find($id);
        return new ProductResource($product);
    }
}
