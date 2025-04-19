<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderCollection;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::all();
        return new OrderCollection($orders);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id', 
            'products' => 'required|array',
            'product.*.id' => 'required|exists:products,id', 
            'products.*.quantity' => 'required|integer|min:1', 
            'total_price' => 'required|numeric|min:0',
        ]);
        $order = Order::create($validated);
        return new OrderResource($order);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $order = Order::find($id);
        if(!$order){
            return response()->json(['message'=>'Order not found'], 404);
        }
        return new OrderResource($order);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $order = Order::find($id);
        if(!$order){
            return response()->json(['message'=>'Order not found'], 404);
        }
        $validated = $request->validate([
            //'user_id' => 'exists:users,id', 
            'products' => 'array',
            'product.*.id' => 'exists:products,id', 
            'products.*.quantity' => 'integer|min:1', 
            'total_price' => 'numeric|min:0',
        ]);
        $order->update($validated);
        return new OrderResource($validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $order = Order::find($id);
        if(!$order){
            return response()->json(['message'=>'Order not found'], 404);
        }
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully'], 200);
    }
}
