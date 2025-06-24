<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Admin;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Order;
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

        User::create([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);
        // Kreiranje 10 korisnika
        User::factory(10)->create();

        // Kreiranje kategorija
        $categories = [
            'Audio Books' => Category::create(['name' => 'Audio Books']),
            'Audio Files' => Category::create(['name' => 'Audio Files']),
            'Video Content' => Category::create(['name' => 'Video Content']),
            'Digital Art' => Category::create(['name' => 'Digital Art']),
            'Templates' => Category::create(['name' => 'Templates']),
            'Fonts' => Category::create(['name' => 'Fonts']),
            'Web Assets' => Category::create(['name' => 'Web Assets']),
        ];

        Product::create([
            'name' => 'The Power of Now',
            'description' => 'A spiritual guide to mindfulness and living in the present moment.',
            'price' => 24.99,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Atomic Habits',
            'description' => 'Proven strategies to build good habits and break bad ones.',
            'price' => 21.99,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => '1984 – Narrated Edition',
            'description' => 'A dystopian classic brought to life with immersive narration.',
            'price' => 17.99,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Rich Dad Poor Dad',
            'description' => 'Learn key principles of financial literacy and investing.',
            'price' => 19.99,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'The Art of War – Modern Edition',
            'description' => 'Timeless strategies adapted for modern challenges.',
            'price' => 16.99,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Think and Grow Rich',
            'description' => 'The mindset and habits of successful people, in audio format.',
            'price' => 18.49,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'A Short History of Nearly Everything',
            'description' => 'An accessible journey through science and discovery.',
            'price' => 22.99,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'The Subtle Art of Not Giving a F*ck',
            'description' => 'A counterintuitive approach to living a good life.',
            'price' => 20.00,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Yoga Nidra – Deep Rest',
            'description' => 'A guided practice for complete relaxation and healing.',
            'price' => 13.99,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'The Alchemist – Paulo Coelho',
            'description' => 'A magical story about following your dreams.',
            'price' => 19.50,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Sleep Stories for Adults',
            'description' => 'Relaxing bedtime tales to help you fall asleep peacefully.',
            'price' => 15.49,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Mindful Productivity',
            'description' => 'A guide to staying focused and achieving more with less stress.',
            'price' => 18.00,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Learn Spanish While You Sleep',
            'description' => 'Improve your Spanish listening skills effortlessly.',
            'price' => 27.99,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Classic Fairy Tales Collection',
            'description' => 'A timeless collection of beloved children’s fairy tales.',
            'price' => 14.50,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'The Psychology of Money',
            'description' => 'Explore how people think about money and make decisions.',
            'price' => 20.00,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'ASMR Relaxing Audio Stories',
            'description' => 'Whispered storytelling with calming effects.',
            'price' => 12.99,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Deep Focus: Ambient Soundtrack',
            'description' => 'Background audio to help you concentrate and work deeply.',
            'price' => 11.99,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Public Speaking Confidence',
            'description' => 'Audio training to improve your speech delivery and stage presence.',
            'price' => 17.75,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'History of the Ancient World',
            'description' => 'Engaging stories from ancient civilizations.',
            'price' => 23.49,
            'file_path' => 'audio_book.mp3',
            'preview_path' => 'storage/previews/audio_book.mp4',
            'image_url' => 'storage/product_images/audio_book.jpg',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Ambient Chill Background Loop',
            'description' => 'Smooth ambient loop for videos, meditation, or relaxation.',
            'price' => 9.99,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Morning Nature Soundscape',
            'description' => 'Birdsong and light breeze to start the day calmly.',
            'price' => 7.99,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Deep Ocean Waves',
            'description' => 'Loopable ocean wave recording for sleep and focus.',
            'price' => 8.49,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Rain on Window – 60 Min',
            'description' => 'Soothing rain ambience perfect for relaxation or work.',
            'price' => 10.00,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Calm Piano Loop',
            'description' => 'Minimalist piano track suitable for intros and reels.',
            'price' => 6.99,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'ASMR Whisper Pack Vol.1',
            'description' => 'Collection of relaxing ASMR whisper samples.',
            'price' => 11.49,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Focus Zone – Productivity Loop',
            'description' => 'Seamless loop to boost concentration and block distractions.',
            'price' => 9.99,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Fireplace Crackle',
            'description' => 'Realistic fire crackling sounds, ideal for cozy atmosphere.',
            'price' => 5.99,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Lo-fi Beat Loop Pack',
            'description' => '10 seamless lo-fi beats perfect for background music or YouTube.',
            'price' => 13.99,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Thunderstorm Ambience',
            'description' => 'Heavy thunder and rainstorm sounds for mood or sleep.',
            'price' => 9.49,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Digital Notification Sound Pack',
            'description' => 'Pack of 12 custom UI/UX notification tones.',
            'price' => 4.99,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Forest Soundscape – 45 Min',
            'description' => 'Birds, wind and rustling leaves in a calm forest.',
            'price' => 8.99,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Meditation Gong Hit Pack',
            'description' => 'High-quality gong sounds for yoga and meditation.',
            'price' => 6.49,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Wind Chimes Ambience',
            'description' => 'Relaxing and melodic wind chime recordings.',
            'price' => 6.99,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4,',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Dark Sci-Fi Background Loop',
            'description' => 'Perfect for game menus, trailers or dystopian content.',
            'price' => 12.00,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Instrumental Hip Hop Track',
            'description' => 'Royalty-free hip hop beat for intros and background use.',
            'price' => 10.99,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Binaural Beats for Study',
            'description' => 'Enhance focus and memory with binaural audio frequencies.',
            'price' => 14.99,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Waterfall and River Ambience',
            'description' => 'Sound of fresh running water – great for nature lovers.',
            'price' => 7.49,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Vintage Radio Static FX',
            'description' => 'Old school radio transitions and static effects.',
            'price' => 3.99,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Cafe Background Sounds',
            'description' => 'Gentle café ambience with chatter, mugs, and soft music.',
            'price' => 9.99,
            'file_path' => 'audio_file.mp3',
            'preview_path' => 'storage/previews/audio_file.mp4',
            'image_url' => 'storage/product_images/audio_file.jpg',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Cinematic Opener Pack',
            'description' => 'High-quality cinematic intros for YouTube and trailers.',
            'price' => 24.99,
            'file_path' => 'video.mp4',
            'preview_path' => 'storage/previews/video.mp4',
            'image_url' => 'storage/product_images/video.jpg',
            'category_id' => $categories['Video Content']->id,
        ]);

        Product::create([
            'name' => 'Yoga Flow Routine – 30 Min',
            'description' => 'Guided yoga practice video with calming background music.',
            'price' => 14.99,
            'file_path' => 'video.mp4',
            'preview_path' => 'storage/previews/video.mp4',
            'image_url' => 'storage/product_images/video.jpg',
            'category_id' => $categories['Video Content']->id,
        ]);

        Product::create([
            'name' => 'Product Promo Template',
            'description' => 'Dynamic product promotion video with placeholders.',
            'price' => 19.99,
            'file_path' => 'video.mp4',
            'preview_path' => 'storage/previews/video.mp4',
            'image_url' => 'storage/product_images/video.jpg',
            'category_id' => $categories['Video Content']->id,
        ]);

        Product::create([
            'name' => 'Nature Timelapse Collection',
            'description' => '4K timelapse shots of forests, oceans, and mountains.',
            'price' => 29.99,
            'file_path' => 'video.mp4',
            'preview_path' => 'storage/previews/video.mp4',
            'image_url' => 'storage/product_images/video.jpg',
            'category_id' => $categories['Video Content']->id,
        ]);

        Product::create([
            'name' => 'Tech Logo Animation',
            'description' => 'Modern technology-style logo reveal animation.',
            'price' => 12.99,
            'file_path' => 'video.mp4',
            'preview_path' => 'storage/previews/video.mp4',
            'image_url' => 'storage/product_images/video.jpg',
            'category_id' => $categories['Video Content']->id,
        ]);

        Product::create([
            'name' => 'Galaxy Abstract Wallpaper',
            'description' => 'High-resolution digital art for desktop and mobile.',
            'price' => 6.99,
            'file_path' => 'art.jpg',
            'preview_path' => 'storage/previews/art.jpg',
            'image_url' => 'storage/product_images/art.jpg',
            'category_id' => $categories['Digital Art']->id,
        ]);

        Product::create([
            'name' => 'Cyberpunk Character Pack',
            'description' => 'A set of 5 original cyberpunk digital artworks.',
            'price' => 18.99,
            'file_path' => 'art.jpg',
            'preview_path' => 'storage/previews/art.jpg',
            'image_url' => 'storage/product_images/art.jpg',
            'category_id' => $categories['Digital Art']->id,
        ]);

        Product::create([
            'name' => 'Fantasy Creature Poster',
            'description' => 'Printable fantasy-themed art for wall decor.',
            'price' => 9.49,
            'file_path' => 'art.jpg',
            'preview_path' => 'storage/previews/art.jpg',
            'image_url' => 'storage/product_images/art.jpg',
            'category_id' => $categories['Digital Art']->id,
        ]);

        Product::create([
            'name' => 'Minimalist Illustration Bundle',
            'description' => '10 clean vector illustrations in SVG/PNG.',
            'price' => 14.99,
            'file_path' => 'art.jpg',
            'preview_path' => 'storage/previews/art.jpg',
            'image_url' => 'storage/product_images/art.jpg',
            'category_id' => $categories['Digital Art']->id,
        ]);

        Product::create([
            'name' => '3D Futuristic Landscape',
            'description' => 'Surreal 3D-rendered digital scene.',
            'price' => 11.99,
            'file_path' => 'art.jpg',
            'preview_path' => 'storage/previews/art.jpg',
            'image_url' => 'storage/product_images/art.jpg',
            'category_id' => $categories['Digital Art']->id,
        ]);

        Product::create([
            'name' => 'Resume Template – Modern Style',
            'description' => 'A modern CV design in Word and PDF format.',
            'price' => 4.99,
            'file_path' => 'docs.pdf',
            'preview_path' => 'storage/previews/docs.pdf',
            'image_url' => 'storage/product_images/template.jpg',
            'category_id' => $categories['Templates']->id,
        ]);

        Product::create([
            'name' => 'Business Invoice Template',
            'description' => 'Professional invoice layout in Excel and PDF.',
            'price' => 5.99,
            'file_path' => 'docs.pdf',
            'preview_path' => 'storage/previews/docs.pdf',
            'image_url' => 'storage/product_images/template.jpg',
            'category_id' => $categories['Templates']->id,
        ]);

        Product::create([
            'name' => 'Instagram Story Templates',
            'description' => 'Editable Canva/PSD templates for social media.',
            'price' => 9.99,
            'file_path' => 'docs.pdf',
            'preview_path' => 'storage/previews/docs.pdf',
            'image_url' => 'storage/product_images/template.jpg',
            'category_id' => $categories['Templates']->id,
        ]);

        Product::create([
            'name' => 'Presentation Template – Gradient Style',
            'description' => 'Creative slides for business or school use.',
            'price' => 7.49,
            'file_path' => 'docs.pdf',
            'preview_path' => 'storage/previews/docs.pdf',
            'image_url' => 'storage/product_images/template.jpg',
            'category_id' => $categories['Templates']->id,
        ]);

        Product::create([
            'name' => 'Newsletter Email Layouts',
            'description' => 'Responsive email designs for Mailchimp or custom.',
            'price' => 8.99,
            'file_path' => 'docs.pdf',
            'preview_path' => 'storage/previews/docs.pdf',
            'image_url' => 'storage/product_images/template.jpg',
            'category_id' => $categories['Templates']->id,
        ]);

        Product::create([
            'name' => 'Modern Sans Serif Font',
            'description' => 'Clean, professional sans-serif font for branding.',
            'price' => 3.99,
            'file_path' => 'docs.pdf',
            'preview_path' => 'storage/previews/docs.pdf',
            'image_url' => 'storage/product_images/font.jpg',
            'category_id' => $categories['Fonts']->id,
        ]);

        Product::create([
            'name' => 'Calligraphy Script Font',
            'description' => 'Elegant handwritten script font for invitations.',
            'price' => 4.99,
            'file_path' => 'docs.pdf',
            'preview_path' => 'storage/previews/docs.pdf',
            'image_url' => 'storage/product_images/font.jpg',
            'category_id' => $categories['Fonts']->id,
        ]);

        Product::create([
            'name' => 'Retro Display Font',
            'description' => 'Bold vintage font ideal for posters.',
            'price' => 5.49,
            'file_path' => 'docs.pdf',
            'preview_path' => 'storage/previews/docs.pdf',
            'image_url' => 'storage/product_images/font.jpg',
            'category_id' => $categories['Fonts']->id,
        ]);

        Product::create([
            'name' => 'Minimal Mono Font',
            'description' => 'Monospaced font for UI and code editors.',
            'price' => 4.49,
            'file_path' => 'docs.pdf',
            'preview_path' => 'storage/previews/docs.pdf',
            'image_url' => 'storage/product_images/font.jpg',
            'category_id' => $categories['Fonts']->id,
        ]);

        Product::create([
            'name' => 'Graffiti Marker Font',
            'description' => 'Urban-style graffiti font for digital art projects.',
            'price' => 6.49,
            'file_path' => 'docs.pdf',
            'preview_path' => 'storage/previews/docs.pdf',
            'image_url' => 'storage/product_images/font.jpg',
            'category_id' => $categories['Fonts']->id,
        ]);

        Product::create([
            'name' => 'Responsive Navigation Bar Kit',
            'description' => 'HTML/CSS responsive navbar components.',
            'price' => 6.99,
            'file_path' => 'docs.pdf',
            'preview_path' => 'storage/previews/docs.pdf',
            'image_url' => 'storage/product_images/web.jpg',
            'category_id' => $categories['Web Assets']->id,
        ]);

        Product::create([
            'name' => 'Hero Section UI Pack',
            'description' => 'Ready-to-use hero blocks in HTML/CSS.',
            'price' => 9.99,
            'file_path' => 'docs.pdf',
            'preview_path' => 'storage/previews/docs.pdf',
            'image_url' => 'storage/product_images/web.jpg',
            'category_id' => $categories['Web Assets']->id,
        ]);

        Product::create([
            'name' => 'SVG Icon Set – Essentials',
            'description' => '50+ SVG icons for modern websites.',
            'price' => 7.99,
            'file_path' => 'docs.pdf',
            'preview_path' => 'storage/previews/docs.pdf',
            'image_url' => 'storage/product_images/web.jpg',
            'category_id' => $categories['Web Assets']->id,
        ]);

        Product::create([
            'name' => '404 Page Template',
            'description' => 'Customizable and creative 404 error pages.',
            'price' => 5.49,
            'file_path' => 'docs.pdf',
            'preview_path' => 'storage/previews/docs.pdf',
            'image_url' => 'storage/product_images/web.jpg',
            'category_id' => $categories['Web Assets']->id,
        ]);

        Product::create([
            'name' => 'CSS Animations Library',
            'description' => 'Prebuilt animation classes for web design.',
            'price' => 8.49,
            'file_path' => 'docs.pdf',
            'preview_path' => 'storage/previews/docs.pdf',
            'image_url' => 'storage/product_images/web.jpg',
            'category_id' => $categories['Web Assets']->id,
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
