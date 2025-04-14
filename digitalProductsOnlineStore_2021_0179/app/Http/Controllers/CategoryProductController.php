<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class CategoryProductController extends Controller
{
    public function index($category_id){
        $products = Product::get()->where('category_id', $category_id);
        if(is_null($products)){
            return response()->json("Not found", 404);
        }
        return response()->json($products);
    }
}
