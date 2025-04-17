<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    public function index(){
        $categories = Category::where('user_id', auth()->id)->get();
        return response()->json(CategoryResource::collection($categories), 200);
    }
}
