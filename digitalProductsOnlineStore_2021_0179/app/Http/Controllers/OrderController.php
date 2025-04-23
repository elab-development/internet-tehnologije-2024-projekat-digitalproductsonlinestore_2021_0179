<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;
use App\Http\Resources\OrderCollection;

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
            'status' => 'required|string|in:pending,completed,cancelled',
            'notes' => 'nullable|string|max:255',
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',

        ]);
        $order = Order::create([
            'status' => $validated['status'],
            'notes' => $validated['notes'],
            'user_id' => $validated['user_id'],
            'total_price' => 0, // Privremeno, izračunaćemo kasnije
        ]);
        $totalPrice = 0;
        foreach ($validated['products'] as $product) {
            $order->products()->attach($product['id'], ['quantity' => $product['quantity']]);

            // Izračunavamo ukupnu cenu
            $productModel = Product::find($product['id']);
            $totalPrice += $productModel->price * $product['quantity'];
        }

        // Ažuriramo ukupnu cenu narudžbine
        $order->update(['total_price' => $totalPrice]);

        return new OrderResource($order);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
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
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        $validated = $request->validate([
            'user_id' => 'exists:users,id',
            'status' => 'string|in:pending,completed,cancelled',
            'notes' => 'nullable|string|max:255',
            'products' => 'array',
            'product.*.id' => 'exists:products,id',
            'products.*.quantity' => 'integer|min:1',
            'total_price' => 'numeric|min:0',
        ]);
        $order->update($validated);

        // Ako su proizvodi prosleđeni, ažuriramo pivot tabelu
        if (isset($validated['products'])) {
            $order->products()->detach(); // Uklanjamo sve postojeće proizvode
            foreach ($validated['products'] as $product) {
                $order->products()->attach($product['id'], ['quantity' => $product['quantity']]);
            }
        }

        return new OrderResource($order->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        $order->delete();
        return response()->json(['message' => 'Order deleted successfully'], 200);
    }
}
