<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    public function run()
    {
        Project::create([
            'user_id' => 2, 
            'name' => 'Proyecto Cliente 1',
            'description' => 'Web básica con hosting y dominio',
            'status' => 'en desarrollo',
            'estimated_days' => 5,
            
        ]);
    }
}
