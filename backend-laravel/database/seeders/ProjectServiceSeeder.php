<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectServiceSeeder extends Seeder
{
    public function run()
    {
        $project = Project::first(); // Primer proyecto creado
        // Asocia servicios al proyecto (por ejemplo: ids 1, 3 y 4)
        $project->services()->attach([
            1 => ['price' => 299.99], // Web Básico
            3 => ['price' => 120.00], // Hosting
            4 => ['price' => 15.00],  // Dominio
        ]);
    }
}
