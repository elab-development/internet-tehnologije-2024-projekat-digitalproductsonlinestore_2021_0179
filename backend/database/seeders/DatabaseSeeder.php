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
            'file_path' => 'audio/the_power_of_now.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Atomic Habits',
            'description' => 'Proven strategies to build good habits and break bad ones.',
            'price' => 21.99,
            'file_path' => 'audio/atomic_habits.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => '1984 – Narrated Edition',
            'description' => 'A dystopian classic brought to life with immersive narration.',
            'price' => 17.99,
            'file_path' => 'audio/1984_narrated.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Rich Dad Poor Dad',
            'description' => 'Learn key principles of financial literacy and investing.',
            'price' => 19.99,
            'file_path' => 'audio/rich_dad_poor_dad.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'The Art of War – Modern Edition',
            'description' => 'Timeless strategies adapted for modern challenges.',
            'price' => 16.99,
            'file_path' => 'audio/art_of_war_modern.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Think and Grow Rich',
            'description' => 'The mindset and habits of successful people, in audio format.',
            'price' => 18.49,
            'file_path' => 'audio/think_and_grow_rich.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'A Short History of Nearly Everything',
            'description' => 'An accessible journey through science and discovery.',
            'price' => 22.99,
            'file_path' => 'audio/short_history_everything.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'The Subtle Art of Not Giving a F*ck',
            'description' => 'A counterintuitive approach to living a good life.',
            'price' => 20.00,
            'file_path' => 'audio/subtle_art.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Yoga Nidra – Deep Rest',
            'description' => 'A guided practice for complete relaxation and healing.',
            'price' => 13.99,
            'file_path' => 'audio/yoga_nidra_rest.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'The Alchemist – Paulo Coelho',
            'description' => 'A magical story about following your dreams.',
            'price' => 19.50,
            'file_path' => 'audio/the_alchemist.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Sleep Stories for Adults',
            'description' => 'Relaxing bedtime tales to help you fall asleep peacefully.',
            'price' => 15.49,
            'file_path' => 'audio/sleep_stories_adults.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Mindful Productivity',
            'description' => 'A guide to staying focused and achieving more with less stress.',
            'price' => 18.00,
            'file_path' => 'audio/mindful_productivity.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Learn Spanish While You Sleep',
            'description' => 'Improve your Spanish listening skills effortlessly.',
            'price' => 27.99,
            'file_path' => 'audio/learn_spanish_sleep.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Classic Fairy Tales Collection',
            'description' => 'A timeless collection of beloved children’s fairy tales.',
            'price' => 14.50,
            'file_path' => 'audio/classic_fairy_tales.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'The Psychology of Money',
            'description' => 'Explore how people think about money and make decisions.',
            'price' => 20.00,
            'file_path' => 'audio/psychology_of_money.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'ASMR Relaxing Audio Stories',
            'description' => 'Whispered storytelling with calming effects.',
            'price' => 12.99,
            'file_path' => 'audio/asmr_audio_stories.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Deep Focus: Ambient Soundtrack',
            'description' => 'Background audio to help you concentrate and work deeply.',
            'price' => 11.99,
            'file_path' => 'audio/deep_focus_soundtrack.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Public Speaking Confidence',
            'description' => 'Audio training to improve your speech delivery and stage presence.',
            'price' => 17.75,
            'file_path' => 'audio/public_speaking.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'History of the Ancient World',
            'description' => 'Engaging stories from ancient civilizations.',
            'price' => 23.49,
            'file_path' => 'audio/history_ancient_world.mp3',
            'category_id' => $categories['Audio Books']->id,
        ]);

        Product::create([
            'name' => 'Ambient Chill Background Loop',
            'description' => 'Smooth ambient loop for videos, meditation, or relaxation.',
            'price' => 9.99,
            'file_path' => 'audio/ambient_chill_loop.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Morning Nature Soundscape',
            'description' => 'Birdsong and light breeze to start the day calmly.',
            'price' => 7.99,
            'file_path' => 'audio/morning_nature.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Deep Ocean Waves',
            'description' => 'Loopable ocean wave recording for sleep and focus.',
            'price' => 8.49,
            'file_path' => 'audio/ocean_waves.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Rain on Window – 60 Min',
            'description' => 'Soothing rain ambience perfect for relaxation or work.',
            'price' => 10.00,
            'file_path' => 'audio/rain_on_window.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Calm Piano Loop',
            'description' => 'Minimalist piano track suitable for intros and reels.',
            'price' => 6.99,
            'file_path' => 'audio/calm_piano_loop.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'ASMR Whisper Pack Vol.1',
            'description' => 'Collection of relaxing ASMR whisper samples.',
            'price' => 11.49,
            'file_path' => 'audio/asmr_whispers_vol1.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Focus Zone – Productivity Loop',
            'description' => 'Seamless loop to boost concentration and block distractions.',
            'price' => 9.99,
            'file_path' => 'audio/focus_zone_loop.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Fireplace Crackle',
            'description' => 'Realistic fire crackling sounds, ideal for cozy atmosphere.',
            'price' => 5.99,
            'file_path' => 'audio/fireplace_crackle.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Lo-fi Beat Loop Pack',
            'description' => '10 seamless lo-fi beats perfect for background music or YouTube.',
            'price' => 13.99,
            'file_path' => 'audio/lofi_beat_pack.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Thunderstorm Ambience',
            'description' => 'Heavy thunder and rainstorm sounds for mood or sleep.',
            'price' => 9.49,
            'file_path' => 'audio/thunderstorm_ambience.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Digital Notification Sound Pack',
            'description' => 'Pack of 12 custom UI/UX notification tones.',
            'price' => 4.99,
            'file_path' => 'audio/notification_sounds.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Forest Soundscape – 45 Min',
            'description' => 'Birds, wind and rustling leaves in a calm forest.',
            'price' => 8.99,
            'file_path' => 'audio/forest_soundscape.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Meditation Gong Hit Pack',
            'description' => 'High-quality gong sounds for yoga and meditation.',
            'price' => 6.49,
            'file_path' => 'audio/meditation_gong.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Wind Chimes Ambience',
            'description' => 'Relaxing and melodic wind chime recordings.',
            'price' => 6.99,
            'file_path' => 'audio/wind_chimes.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Dark Sci-Fi Background Loop',
            'description' => 'Perfect for game menus, trailers or dystopian content.',
            'price' => 12.00,
            'file_path' => 'audio/sci_fi_background.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Instrumental Hip Hop Track',
            'description' => 'Royalty-free hip hop beat for intros and background use.',
            'price' => 10.99,
            'file_path' => 'audio/instrumental_hiphop.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Binaural Beats for Study',
            'description' => 'Enhance focus and memory with binaural audio frequencies.',
            'price' => 14.99,
            'file_path' => 'audio/binaural_study.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Waterfall and River Ambience',
            'description' => 'Sound of fresh running water – great for nature lovers.',
            'price' => 7.49,
            'file_path' => 'audio/waterfall_river.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Vintage Radio Static FX',
            'description' => 'Old school radio transitions and static effects.',
            'price' => 3.99,
            'file_path' => 'audio/vintage_radio_fx.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Cafe Background Sounds',
            'description' => 'Gentle café ambience with chatter, mugs, and soft music.',
            'price' => 9.99,
            'file_path' => 'audio/cafe_ambience.mp3',
            'category_id' => $categories['Audio Files']->id,
        ]);

        Product::create([
            'name' => 'Cinematic Opener Pack',
            'description' => 'High-quality cinematic intros for YouTube and trailers.',
            'price' => 24.99,
            'file_path' => 'video/cinematic_opener.mp4',
            'category_id' => $categories['Video Content']->id,
        ]);

        Product::create([
            'name' => 'Yoga Flow Routine – 30 Min',
            'description' => 'Guided yoga practice video with calming background music.',
            'price' => 14.99,
            'file_path' => 'video/yoga_flow.mp4',
            'category_id' => $categories['Video Content']->id,
        ]);

        Product::create([
            'name' => 'Product Promo Template',
            'description' => 'Dynamic product promotion video with placeholders.',
            'price' => 19.99,
            'file_path' => 'video/product_promo.mp4',
            'category_id' => $categories['Video Content']->id,
        ]);

        Product::create([
            'name' => 'Nature Timelapse Collection',
            'description' => '4K timelapse shots of forests, oceans, and mountains.',
            'price' => 29.99,
            'file_path' => 'video/nature_timelapse.mp4',
            'category_id' => $categories['Video Content']->id,
        ]);

        Product::create([
            'name' => 'Tech Logo Animation',
            'description' => 'Modern technology-style logo reveal animation.',
            'price' => 12.99,
            'file_path' => 'video/tech_logo.mp4',
            'category_id' => $categories['Video Content']->id,
        ]);

        Product::create([
            'name' => 'Galaxy Abstract Wallpaper',
            'description' => 'High-resolution digital art for desktop and mobile.',
            'price' => 6.99,
            'file_path' => 'art/galaxy_wallpaper.png',
            'category_id' => $categories['Digital Art']->id,
        ]);

        Product::create([
            'name' => 'Cyberpunk Character Pack',
            'description' => 'A set of 5 original cyberpunk digital artworks.',
            'price' => 18.99,
            'file_path' => 'art/cyberpunk_characters.zip',
            'category_id' => $categories['Digital Art']->id,
        ]);

        Product::create([
            'name' => 'Fantasy Creature Poster',
            'description' => 'Printable fantasy-themed art for wall decor.',
            'price' => 9.49,
            'file_path' => 'art/fantasy_poster.jpg',
            'category_id' => $categories['Digital Art']->id,
        ]);

        Product::create([
            'name' => 'Minimalist Illustration Bundle',
            'description' => '10 clean vector illustrations in SVG/PNG.',
            'price' => 14.99,
            'file_path' => 'art/minimalist_bundle.zip',
            'category_id' => $categories['Digital Art']->id,
        ]);

        Product::create([
            'name' => '3D Futuristic Landscape',
            'description' => 'Surreal 3D-rendered digital scene.',
            'price' => 11.99,
            'file_path' => 'art/3d_landscape.png',
            'category_id' => $categories['Digital Art']->id,
        ]);

        Product::create([
            'name' => 'Resume Template – Modern Style',
            'description' => 'A modern CV design in Word and PDF format.',
            'price' => 4.99,
            'file_path' => 'templates/resume_modern.zip',
            'category_id' => $categories['Templates']->id,
        ]);

        Product::create([
            'name' => 'Business Invoice Template',
            'description' => 'Professional invoice layout in Excel and PDF.',
            'price' => 5.99,
            'file_path' => 'templates/invoice_template.zip',
            'category_id' => $categories['Templates']->id,
        ]);

        Product::create([
            'name' => 'Instagram Story Templates',
            'description' => 'Editable Canva/PSD templates for social media.',
            'price' => 9.99,
            'file_path' => 'templates/instagram_stories.zip',
            'category_id' => $categories['Templates']->id,
        ]);

        Product::create([
            'name' => 'Presentation Template – Gradient Style',
            'description' => 'Creative slides for business or school use.',
            'price' => 7.49,
            'file_path' => 'templates/presentation_gradient.zip',
            'category_id' => $categories['Templates']->id,
        ]);

        Product::create([
            'name' => 'Newsletter Email Layouts',
            'description' => 'Responsive email designs for Mailchimp or custom.',
            'price' => 8.99,
            'file_path' => 'templates/email_layouts.zip',
            'category_id' => $categories['Templates']->id,
        ]);

        Product::create([
            'name' => 'Modern Sans Serif Font',
            'description' => 'Clean, professional sans-serif font for branding.',
            'price' => 3.99,
            'file_path' => 'fonts/modern_sans.ttf',
            'category_id' => $categories['Fonts']->id,
        ]);

        Product::create([
            'name' => 'Calligraphy Script Font',
            'description' => 'Elegant handwritten script font for invitations.',
            'price' => 4.99,
            'file_path' => 'fonts/calligraphy_script.otf',
            'category_id' => $categories['Fonts']->id,
        ]);

        Product::create([
            'name' => 'Retro Display Font',
            'description' => 'Bold vintage font ideal for posters.',
            'price' => 5.49,
            'file_path' => 'fonts/retro_display.ttf',
            'category_id' => $categories['Fonts']->id,
        ]);

        Product::create([
            'name' => 'Minimal Mono Font',
            'description' => 'Monospaced font for UI and code editors.',
            'price' => 4.49,
            'file_path' => 'fonts/minimal_mono.ttf',
            'category_id' => $categories['Fonts']->id,
        ]);

        Product::create([
            'name' => 'Graffiti Marker Font',
            'description' => 'Urban-style graffiti font for digital art projects.',
            'price' => 6.49,
            'file_path' => 'fonts/graffiti_marker.ttf',
            'category_id' => $categories['Fonts']->id,
        ]);

        Product::create([
            'name' => 'Responsive Navigation Bar Kit',
            'description' => 'HTML/CSS responsive navbar components.',
            'price' => 6.99,
            'file_path' => 'web/navbar_kit.zip',
            'category_id' => $categories['Web Assets']->id,
        ]);

        Product::create([
            'name' => 'Hero Section UI Pack',
            'description' => 'Ready-to-use hero blocks in HTML/CSS.',
            'price' => 9.99,
            'file_path' => 'web/hero_ui_pack.zip',
            'category_id' => $categories['Web Assets']->id,
        ]);

        Product::create([
            'name' => 'SVG Icon Set – Essentials',
            'description' => '50+ SVG icons for modern websites.',
            'price' => 7.99,
            'file_path' => 'web/svg_essentials.zip',
            'category_id' => $categories['Web Assets']->id,
        ]);

        Product::create([
            'name' => '404 Page Template',
            'description' => 'Customizable and creative 404 error pages.',
            'price' => 5.49,
            'file_path' => 'web/404_template.zip',
            'category_id' => $categories['Web Assets']->id,
        ]);

        Product::create([
            'name' => 'CSS Animations Library',
            'description' => 'Prebuilt animation classes for web design.',
            'price' => 8.49,
            'file_path' => 'web/css_animations.zip',
            'category_id' => $categories['Web Assets']->id,
        ]);



        // Proizvodi za kategoriju E-books
        // Product::create([
        //     'name' => 'Digital Photography Guide',
        //     'description' => 'Learn the secrets of professional photography.',
        //     'price' => 29.99,
        //     'file_path' => 'photography_guide.pdf',
        //     'category_id' => $categories['E-books']->id,
        // ]);

        // Product::create([
        //     'name' => 'Mastering Web Development',
        //     'description' => 'Comprehensive guide to web development.',
        //     'price' => 39.99,
        //     'file_path' => 'web_dev_guide.pdf',
        //     'category_id' => $categories['E-books']->id,
        // ]);

        // Product::create([
        //     'name' => 'Introduction to Graphic Design',
        //     'description' => 'Learn the basics of graphic design.',
        //     'price' => 24.99,
        //     'file_path' => 'graphic_design_intro.pdf',
        //     'category_id' => $categories['E-books']->id,
        // ]);

        // // Proizvodi za kategoriju Photos
        // Product::create([
        //     'name' => 'Sunset Photography Pack',
        //     'description' => 'A collection of beautiful sunset photos.',
        //     'price' => 19.99,
        //     'file_path' => 'sunset_photos.zip',
        //     'category_id' => $categories['Photos']->id,
        // ]);

        // Product::create([
        //     'name' => 'Nature Photography Pack',
        //     'description' => 'High-quality nature photography.',
        //     'price' => 29.99,
        //     'file_path' => 'nature_photos.zip',
        //     'category_id' => $categories['Photos']->id,
        // ]);

        // Product::create([
        //     'name' => 'Urban Cityscapes',
        //     'description' => 'Collection of modern cityscape images.',
        //     'price' => 25.99,
        //     'file_path' => 'cityscape_photos.zip',
        //     'category_id' => $categories['Photos']->id,
        // ]);

        // // Proizvodi za kategoriju Videos
        // Product::create([
        //     'name' => 'Online Video Editing Course',
        //     'description' => 'Master video editing techniques.',
        //     'price' => 59.99,
        //     'file_path' => 'video_course.mp4',
        //     'category_id' => $categories['Videos']->id,
        // ]);

        // Product::create([
        //     'name' => 'Nature Timelapse Collection',
        //     'description' => 'Timelapse videos of stunning nature scenes.',
        //     'price' => 49.99,
        //     'file_path' => 'nature_timelapse.mp4',
        //     'category_id' => $categories['Videos']->id,
        // ]);

        // Product::create([
        //     'name' => 'Fitness Training Videos',
        //     'description' => 'A series of fitness and workout videos.',
        //     'price' => 34.99,
        //     'file_path' => 'fitness_training_videos.mp4',
        //     'category_id' => $categories['Videos']->id,
        // ]);

        // // Proizvodi za kategoriju Digital Art
        // Product::create([
        //     'name' => 'Abstract Art Collection',
        //     'description' => 'Digital abstract art pieces for inspiration.',
        //     'price' => 44.99,
        //     'file_path' => 'abstract_art_collection.zip',
        //     'category_id' => $categories['Digital Art']->id,
        // ]);

        // Product::create([
        //     'name' => 'Fantasy Illustration Pack',
        //     'description' => 'Beautiful fantasy-inspired illustrations.',
        //     'price' => 39.99,
        //     'file_path' => 'fantasy_illustrations.zip',
        //     'category_id' => $categories['Digital Art']->id,
        // ]);

        // Product::create([
        //     'name' => 'Sci-Fi Concept Art',
        //     'description' => 'Concept art from a sci-fi universe.',
        //     'price' => 59.99,
        //     'file_path' => 'sci_fi_concept_art.zip',
        //     'category_id' => $categories['Digital Art']->id,
        // ]);

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
