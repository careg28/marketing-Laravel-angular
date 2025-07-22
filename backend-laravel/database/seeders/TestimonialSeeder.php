<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Testimonial;

class TestimonialSeeder extends Seeder
{
    public function run()
    {
        // Consigue todos los proyectos existentes (o los primeros dos)
        $projects = Project::take(2)->get();

        $nombres = ['Juan Pérez', 'Marta García'];
        $contenidos = [
            '¡Excelente servicio y diseño!',
            'La web me ayudó a conseguir más clientes.'
        ];
        $ratings = [5, 4];

        foreach ($projects as $i => $project) {
            Testimonial::create([
                'project_id' => $project->id,
                'author_name' => $nombres[$i] ?? 'Cliente',
                'content' => $contenidos[$i] ?? 'Comentario genérico.',
                'rating' => $ratings[$i] ?? 5
            ]);
        }
    }
}

