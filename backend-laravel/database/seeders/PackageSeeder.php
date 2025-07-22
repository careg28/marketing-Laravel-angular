<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Package;

class PackageSeeder extends Seeder
{
    public function run()
{
    Package::create([
        'name' => 'Básico',
        'description' => 'Ideal para pequeños negocios o proyectos personales. Incluye hosting, dominio estándar y diseño responsive simple. Rápido de implementar y fácil de mantener. Perfecto como primera presencia online.',
        'price' => 100
    ]);

    Package::create([
        'name' => 'Estándar',
        'description' => 'Pensado para pymes que necesitan una presencia profesional. Cuenta con diseño personalizado, certificado SSL, formulario de contacto y soporte básico. Incluye posicionamiento inicial en buscadores.',
        'price' => 250
    ]);

    Package::create([
        'name' => 'Premium',
        'description' => 'Paquete completo para negocios en crecimiento. Diseño avanzado, integración con redes sociales, blog autogestionable y estadísticas de visitas. Incluye soporte prioritario y mejoras SEO avanzadas.',
        'price' => 500
    ]);

    Package::create([
        'name' => 'Empresarial',
        'description' => 'Solución robusta para empresas con necesidades específicas. Incluye panel de administración, gestor de contenidos, módulos personalizados y asistencia técnica dedicada. Pensado para escalar y evolucionar.',
        'price' => 999
    ]);
}
}