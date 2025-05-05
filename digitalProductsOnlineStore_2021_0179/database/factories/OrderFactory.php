<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = ['pending', 'completed', 'cancelled'];
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'total_price' => $this->faker->randomFloat(2, 20, 500),
            'status' => $this->faker->randomElement($status),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
        
    }
    public function configure()
    {
        return $this->afterCreating(function (Order $order) {
            // Nasumično dodajemo proizvode narudžbini
            $products = Product::inRandomOrder()->limit(rand(1, 5))->pluck('id')->toArray();
            foreach ($products as $productId) {
                $order->products()->attach($productId, ['quantity' => rand(1, 3)]);
            }
        });
    }

}
