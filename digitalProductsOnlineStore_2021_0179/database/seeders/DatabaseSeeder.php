<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Order;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        Category::truncate();
        Product::truncate();
        User::truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

    
        // Kreiranje 10 korisnika
        User::factory(10)->create();

        // Kreiranje 5 kategorija i dodavanje 10 proizvoda u svaku
        Category::factory(5)->create()->each(function ($category) {
            Product::factory(10)->create([
                'category_id' => $category->id
            ]);
        });

        // Kreiranje 10 narudžbina i dodeljivanje nasumičnih proizvoda
        Order::factory(10)->create()->each(function ($order) {
            // Nasumično biramo između 2 i 5 proizvoda
            $products = Product::all()->random(rand(2, 5));

            // Dodavanje proizvoda u narudžbinu kroz pivot tabelu
            foreach ($products as $product) {
                $order->products()->attach($product->id, [
                    'quantity' => rand(1, 3), // Nasumična količina
                ]);
            }
        });
    }
}
        
    
