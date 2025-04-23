<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Order;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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

        // Kreiranje admin korisnika
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin123'),
            'address' => 'Admin Address',
            'role' => 'admin',
        ]);
        
        // Kreiranje 10 korisnika
        User::factory(10)->create();

        // Kreiranje kategorija
        $categories = [
            'E-books' => Category::create(['name' => 'E-books']),
            'Photos' => Category::create(['name' => 'Photos']),
            'Videos' => Category::create(['name' => 'Videos']),
            'Digital Art' => Category::create(['name' => 'Digital Art']),
        ];

        // Proizvodi za kategoriju E-books
        Product::create([
            'name' => 'Digital Photography Guide',
            'description' => 'Learn the secrets of professional photography.',
            'price' => 29.99,
            'file_path' => 'photography_guide.pdf',
            'category_id' => $categories['E-books']->id,
        ]);

        Product::create([
            'name' => 'Mastering Web Development',
            'description' => 'Comprehensive guide to web development.',
            'price' => 39.99,
            'file_path' => 'web_dev_guide.pdf',
            'category_id' => $categories['E-books']->id,
        ]);

        Product::create([
            'name' => 'Introduction to Graphic Design',
            'description' => 'Learn the basics of graphic design.',
            'price' => 24.99,
            'file_path' => 'graphic_design_intro.pdf',
            'category_id' => $categories['E-books']->id,
        ]);

        // Proizvodi za kategoriju Photos
        Product::create([
            'name' => 'Sunset Photography Pack',
            'description' => 'A collection of beautiful sunset photos.',
            'price' => 19.99,
            'file_path' => 'sunset_photos.zip',
            'category_id' => $categories['Photos']->id,
        ]);

        Product::create([
            'name' => 'Nature Photography Pack',
            'description' => 'High-quality nature photography.',
            'price' => 29.99,
            'file_path' => 'nature_photos.zip',
            'category_id' => $categories['Photos']->id,
        ]);

        Product::create([
            'name' => 'Urban Cityscapes',
            'description' => 'Collection of modern cityscape images.',
            'price' => 25.99,
            'file_path' => 'cityscape_photos.zip',
            'category_id' => $categories['Photos']->id,
        ]);

        // Proizvodi za kategoriju Videos
        Product::create([
            'name' => 'Online Video Editing Course',
            'description' => 'Master video editing techniques.',
            'price' => 59.99,
            'file_path' => 'video_course.mp4',
            'category_id' => $categories['Videos']->id,
        ]);

        Product::create([
            'name' => 'Nature Timelapse Collection',
            'description' => 'Timelapse videos of stunning nature scenes.',
            'price' => 49.99,
            'file_path' => 'nature_timelapse.mp4',
            'category_id' => $categories['Videos']->id,
        ]);

        Product::create([
            'name' => 'Fitness Training Videos',
            'description' => 'A series of fitness and workout videos.',
            'price' => 34.99,
            'file_path' => 'fitness_training_videos.mp4',
            'category_id' => $categories['Videos']->id,
        ]);

        // Proizvodi za kategoriju Digital Art
        Product::create([
            'name' => 'Abstract Art Collection',
            'description' => 'Digital abstract art pieces for inspiration.',
            'price' => 44.99,
            'file_path' => 'abstract_art_collection.zip',
            'category_id' => $categories['Digital Art']->id,
        ]);

        Product::create([
            'name' => 'Fantasy Illustration Pack',
            'description' => 'Beautiful fantasy-inspired illustrations.',
            'price' => 39.99,
            'file_path' => 'fantasy_illustrations.zip',
            'category_id' => $categories['Digital Art']->id,
        ]);

        Product::create([
            'name' => 'Sci-Fi Concept Art',
            'description' => 'Concept art from a sci-fi universe.',
            'price' => 59.99,
            'file_path' => 'sci_fi_concept_art.zip',
            'category_id' => $categories['Digital Art']->id,
        ]);

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
