<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
   public function run()
{
    $this->call([
        UserSeeder::class,
        PackageSeeder::class,
        ServiceSeeder::class,
        ProjectSeeder::class,
        ProjectServiceSeeder::class,
        ConversationSeeder::class,
        ContactMessageSeeder::class,
        TestimonialSeeder::class, 
        PackageFeatureSeeder::class,
       
    ]);
    }
}
