<?php

namespace Database\Seeders;
use App\Models\PackageFeature;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PackageFeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $labels = [
            'Hosting incluido',
            'Certificado SSL',
            'Soporte técnico 24/7',
            'Dominio personalizado',
            'Diseño responsive'
        ];

        foreach ([1, 2, 3, 4] as $packageId) {
            foreach ($labels as $label) {
                PackageFeature::create([
                    'package_id' => $packageId,
                    'label' => $label,
                    'included' => true
                ]);
            }
        }
    }
}
