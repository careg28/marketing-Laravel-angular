<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run()
    {
        Service::create([
            'name' => 'Web Básico',
            'description' => 'Sitio web básico con hasta 5 páginas.',
            'price' => 299.99,
        ]);
        Service::create([
            'name' => 'Web Avanzada',
            'description' => 'Sitio web avanzado, blog y tienda.',
            'price' => 799.99,
        ]);
        Service::create([
            'name' => 'Hosting',
            'description' => 'Alojamiento seguro 12 meses.',
            'price' => 120.00,
        ]);
        Service::create([
            'name' => 'Dominio',
            'description' => 'Dominio .com o .net por 1 año.',
            'price' => 15.00,
        ]);
    }
}