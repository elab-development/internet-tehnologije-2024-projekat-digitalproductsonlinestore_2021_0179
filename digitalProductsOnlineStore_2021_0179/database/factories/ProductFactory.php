<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = \App\Models\Product::class;

    public function definition(): array
    {
            $products = [
                [
                    'name' => 'Digital Photography Guide',
                    'description' => 'Learn the secrets of professional photography.',
                    'price' => 29.99,
                    'file_path' => 'photography_guide.pdf',
                    'category_id' => 1,
                ],
                [
                    'name' => 'Mastering Web Development',
                    'description' => 'Comprehensive guide to web development.',
                    'price' => 39.99,
                    'file_path' => 'web_dev_guide.pdf',
                    'category_id' => 1,
                ],
                [
                    'name' => 'Introduction to Graphic Design',
                    'description' => 'Learn the basics of graphic design.',
                    'price' => 24.99,
                    'file_path' => 'graphic_design_intro.pdf',
                    'category_id' => 1,
                ],
                [
                    'name' => 'Sunset Photography Pack',
                    'description' => 'A collection of beautiful sunset photos.',
                    'price' => 19.99,
                    'file_path' => 'sunset_photos.zip',
                    'category_id' => 2,
                ],
                [
                    'name' => 'Nature Photography Pack',
                    'description' => 'High-quality nature photography.',
                    'price' => 29.99,
                    'file_path' => 'nature_photos.zip',
                    'category_id' => 2,
                ],
                [
                    'name' => 'Urban Cityscapes',
                    'description' => 'Collection of modern cityscape images.',
                    'price' => 25.99,
                    'file_path' => 'cityscape_photos.zip',
                    'category_id' => 2,
                ],
                [
                    'name' => 'Online Video Editing Course',
                    'description' => 'Master video editing techniques.',
                    'price' => 59.99,
                    'file_path' => 'video_course.mp4',
                    'category_id' => 3,
                ],
                [
                    'name' => 'Nature Timelapse Collection',
                    'description' => 'Timelapse videos of stunning nature scenes.',
                    'price' => 49.99,
                    'file_path' => 'nature_timelapse.mp4',
                    'category_id' => 3,
                ],
                [
                    'name' => 'Fitness Training Videos',
                    'description' => 'A series of fitness and workout videos.',
                    'price' => 34.99,
                    'file_path' => 'fitness_training_videos.mp4',
                    'category_id' => 3,
                ],
                [
                    'name' => 'Abstract Art Collection',
                    'description' => 'Digital abstract art pieces for inspiration.',
                    'price' => 44.99,
                    'file_path' => 'abstract_art_collection.zip',
                    'category_id' => 4,
                ],
                [
                    'name' => 'Fantasy Illustration Pack',
                    'description' => 'Beautiful fantasy-inspired illustrations.',
                    'price' => 39.99,
                    'file_path' => 'fantasy_illustrations.zip',
                    'category_id' => 4,
                ],
                [
                    'name' => 'Sci-Fi Concept Art',
                    'description' => 'Concept art from a sci-fi universe.',
                    'price' => 59.99,
                    'file_path' => 'sci_fi_concept_art.zip',
                    'category_id' => 4,
                ],
            ];
        
            $product = $this->faker->randomElement($products);
        
            return [
                'name' => $product['name'],
                'description' => $product['description'],
                'price' => $product['price'],
                'file_path' => $product['file_path'],
                'category_id' => $product['category_id'],
            ];
        }
}
        
    

