<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    protected $fillable = ['name', 'description', 'price'];

    // Un paquete puede estar en muchos proyectos
        // Relación con proyectos
        public function projects()
        {
            return $this->hasMany(Project::class);
        }
    
        // Relación con características
        public function features()
        {
            return $this->hasMany(PackageFeature::class);
        }
    
}
