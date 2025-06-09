<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserCollection;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $users = User::all();
        // return new UserCollection($users);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show($user_id)
    {
        // $user = User::find($user_id);
        // if (is_null($user)) {
        //     return response()->json("Data not found", 404);
        // }
        // return new UserResource($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
    public function getOrders($userId)
    {
        if(!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $user = User::with(['orders.products'])->find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $orders = $user->orders->map(function ($order) {
            return [
                'order_id' => $order->id,
                'status' => $order->status,
                'total_price' => $order->total_price,
                'created_at' => $order->created_at,
                'products' => $order->products->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'price' => $product->price,
                        'quantity' => $product->pivot->quantity,
                    ];
                }),
               
            ];
        });
        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
            'orders' => $orders,
        ], 200);
          
    }
}
